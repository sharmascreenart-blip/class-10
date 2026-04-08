import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { handleFirestoreError, OperationType } from './lib/firestore-utils';
import { UserProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  ClipboardCheck, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  Plus, 
  MessageSquare, 
  FileText, 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  BrainCircuit, 
  Target, 
  Clock, 
  Flame, 
  Trophy, 
  Search, 
  Menu, 
  X, 
  Calculator, 
  FlaskConical, 
  Globe, 
  Languages, 
  ArrowLeft, 
  Send, 
  Bot, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

// Pages
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import ChapterDetailPage from './pages/ChapterDetailPage';
import AiNotesPage from './pages/AiNotesPage';
import ChatbotPage from './pages/ChatbotPage';
import TestPage from './pages/TestPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import SyllabusManager from './pages/admin/SyllabusManager';
import ChapterEditor from './pages/admin/ChapterEditor';
import UserManager from './pages/admin/UserManager';
import SettingsPage from './pages/admin/Settings';
import AnnouncementsPage from './pages/admin/Announcements';

// Context
interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true, isAdmin: false });

export const useAuth = () => useContext(AuthContext);

// Components
const Navbar = () => {
  const { user, profile, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  if (!user) return null;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/chatbot', icon: MessageSquare, label: 'Chat' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', icon: LayoutDashboard, label: 'Admin' });
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 px-6 items-center justify-between shadow-sm">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-gray-900">Study Hub</span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-6 py-3 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, profile, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;
  if (user && profile && !profile.onboarded && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  return <>{children}</>;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Listen to profile changes
        const unsubscribeProfile = onSnapshot(doc(db, 'users', currentUser.uid), async (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile(null);
          }
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
          setLoading(false);
        });
        return () => unsubscribeProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const isAdmin = profile?.role === 'admin' || user?.email === 'karanmssale@gmail.com' || user?.email === 'sharmascreenart@gmail.com';

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin }}>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20 md:pb-0 md:pt-16">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
              
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />

              <Route path="/subjects" element={
                <ProtectedRoute>
                  <SubjectsPage />
                </ProtectedRoute>
              } />

              <Route path="/subjects/:subjectId" element={
                <ProtectedRoute>
                  <SubjectDetailPage />
                </ProtectedRoute>
              } />

              <Route path="/subjects/:subjectId/chapters/:chapterId" element={
                <ProtectedRoute>
                  <ChapterDetailPage />
                </ProtectedRoute>
              } />

              <Route path="/ai-notes" element={
                <ProtectedRoute>
                  <AiNotesPage />
                </ProtectedRoute>
              } />

              <Route path="/chatbot" element={
                <ProtectedRoute>
                  <ChatbotPage />
                </ProtectedRoute>
              } />

              <Route path="/test/:chapterId" element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />

              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="syllabus" element={<SyllabusManager />} />
                <Route path="chapters/:subjectId/:chapterId" element={<ChapterEditor />} />
                <Route path="users" element={<UserManager />} />
                <Route path="announcements" element={<AnnouncementsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
