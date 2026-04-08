import { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { auth, db } from '../firebase';
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Target, 
  Clock, 
  Calendar, 
  LogOut, 
  ChevronRight, 
  BrainCircuit, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  X,
  Save,
  LayoutDashboard,
  Flame,
  Trophy
} from 'lucide-react';
import { Progress } from '../types';

export default function ProfilePage() {
  const { profile, user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState<Progress[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: '',
    targetPercentage: '',
    studyHours: '',
    examDate: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || '',
        targetPercentage: profile.targetPercentage || '95%',
        studyHours: profile.studyHours || '3-4 hrs',
        examDate: profile.examDate || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'progress'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const progData = snapshot.docs.map(doc => doc.data() as Progress);
      setProgress(progData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'progress');
    });
    return () => unsubscribe();
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...formData,
        lastUpdated: new Date().toISOString()
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  const completedChapters = progress.filter(p => p.completed).length;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-200">
            {profile.displayName?.[0].toUpperCase() || 'S'}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{profile.displayName || 'Student'}</h1>
        {profile.email && <p className="text-gray-400 text-sm mt-1">{profile.email}</p>}
        <p className="text-gray-500 mt-1">Class 10 Student</p>
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">
            {profile.role}
          </span>
          <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full uppercase tracking-widest">
            {completedChapters} Chapters Done
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-3">
            <Flame className="text-orange-500 w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{profile.streak || 0}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Day Streak</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center mb-3">
            <Trophy className="text-yellow-500 w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{profile.points || 0}</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total XP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Target className="text-blue-600 w-5 h-5" />
              Academic Goals
            </h2>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Edit Goals
              </button>
            )}
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Display Name</label>
                  <input 
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Target %</label>
                    <input 
                      type="text"
                      value={formData.targetPercentage}
                      onChange={(e) => setFormData({...formData, targetPercentage: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Study Hours</label>
                    <input 
                      type="text"
                      value={formData.studyHours}
                      onChange={(e) => setFormData({...formData, studyHours: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Exam Date</label>
                  <input 
                    type="date"
                    value={formData.examDate}
                    onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Target className="text-gray-400 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-600">Target Percentage</span>
                  </div>
                  <span className="font-bold text-blue-600">{profile.targetPercentage || '95%'}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Clock className="text-gray-400 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-600">Daily Study Hours</span>
                  </div>
                  <span className="font-bold text-gray-900">{profile.studyHours || '3-4 hrs'}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-600">Exam Date</span>
                  </div>
                  <span className="font-bold text-gray-900">{profile.examDate || 'Not set'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="text-purple-600 w-5 h-5" />
            Account Settings
          </h2>
          <div className="space-y-2">
            {isAdmin && (
              <Link 
                to="/admin"
                className="w-full p-4 flex items-center justify-between hover:bg-blue-50 rounded-2xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-blue-600 transition-colors">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-blue-700">Admin Control Panel</span>
                </div>
                <ChevronRight className="text-gray-300 w-5 h-5" />
              </Link>
            )}
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-700">Edit Profile</span>
              </div>
              <ChevronRight className="text-gray-300 w-5 h-5" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors">
                  <BrainCircuit className="text-gray-400 w-5 h-5" />
                </div>
                <span className="font-bold text-gray-700">AI Preferences</span>
              </div>
              <ChevronRight className="text-gray-300 w-5 h-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="w-full p-4 flex items-center justify-between hover:bg-red-50 rounded-2xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-400 group-hover:text-red-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                </div>
                <span className="font-bold text-red-600">Logout</span>
              </div>
              <ChevronRight className="text-gray-300 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400">Class 10 AI Study Hub v1.0.0</p>
        <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-widest font-bold">Made for CBSE Students</p>
      </div>
    </div>
  );
}
