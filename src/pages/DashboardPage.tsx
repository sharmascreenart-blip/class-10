import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';
import { useAuth } from '../App';
import { dataService } from '../services/dataService';
import { Subject } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Flame, 
  Trophy, 
  BookOpen, 
  Play, 
  FileText, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  BrainCircuit, 
  Calculator, 
  FlaskConical, 
  Globe, 
  Languages,
  Bell,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Progress
    const qProgress = query(collection(db, 'progress'), where('userId', '==', auth.currentUser.uid));
    const unsubscribeProgress = onSnapshot(qProgress, (snapshot) => {
      setProgress(snapshot.docs.map(doc => doc.data()));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'progress');
    });

    // Subjects
    const unsubscribeSubjects = dataService.subscribeSubjects(setSubjects);

    // Announcements
    const unsubscribeAnnouncements = dataService.subscribeAnnouncements((data) => {
      setAnnouncements(data.filter(a => a.active));
    });

    setLoading(false);
    return () => {
      unsubscribeProgress();
      unsubscribeSubjects();
      unsubscribeAnnouncements();
    };
  }, []);

  const completedChapters = progress.filter(p => p.completed).length;
  const totalChapters = subjects.length * 10; // Estimated
  const progressPercent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  const getSubjectIcon = (id: string) => {
    switch (id.toLowerCase()) {
      case 'maths': return Calculator;
      case 'science': return FlaskConical;
      case 'sst': case 'social science': return Globe;
      case 'english': return BookOpen;
      case 'hindi': return Languages;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Announcements */}
      <AnimatePresence>
        {announcements.map((ann) => (
          <motion.div 
            key={ann.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              ann.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' :
              ann.type === 'warning' ? 'bg-orange-50 border-orange-100 text-orange-800' :
              'bg-blue-50 border-blue-100 text-blue-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 shrink-0" />
              <p className="text-sm font-bold">{ann.title}: <span className="font-medium">{ann.message}</span></p>
            </div>
            <button 
              onClick={() => setAnnouncements(announcements.filter(a => a.id !== ann.id))}
              className="p-1 hover:bg-black/5 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
              <Target className="w-5 h-5" />
            </div>
            <span className="font-medium text-blue-100">Target: {profile?.targetPercentage || '95%'}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Hello, {profile?.displayName || 'Student'}! 👋</h1>
          <p className="text-blue-100 max-w-md">Ready to crush your Class 10 goals? Let's start with your daily study plan.</p>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Streak</span>
              </div>
              <span className="text-2xl font-bold">{profile?.streak || 0} Days</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Points</span>
              </div>
              <span className="text-2xl font-bold">{profile?.points || 0} XP</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5" />
              Syllabus Progress
            </h2>
            <span className="text-blue-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-500">You've completed {completedChapters} out of {totalChapters} chapters. Keep it up!</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="text-orange-500 w-5 h-5" />
            Daily Suggestion
          </h2>
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <p className="text-sm font-medium text-orange-800 mb-2">Based on your weak subjects:</p>
            <p className="text-gray-700 text-sm">Today: <span className="font-bold">Maths – Trigonometry</span> (Video + Notes + Test)</p>
            <Link to="/subjects/maths" className="mt-4 inline-flex items-center gap-2 text-orange-600 font-bold text-sm hover:underline">
              Start Now <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/subjects" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900">Syllabus</h3>
          <p className="text-xs text-gray-500 mt-1">Track progress</p>
        </Link>
        <Link to="/subjects" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Play className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900">Videos</h3>
          <p className="text-xs text-gray-500 mt-1">One-shot lessons</p>
        </Link>
        <Link to="/ai-notes" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BrainCircuit className="text-green-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900">AI Notes</h3>
          <p className="text-xs text-gray-500 mt-1">Smart summaries</p>
        </Link>
        <Link to="/chatbot" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare className="text-orange-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900">Doubt AI</h3>
          <p className="text-xs text-gray-500 mt-1">Ask anything</p>
        </Link>
      </div>

      {/* Subjects Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your Subjects</h2>
          <Link to="/subjects" className="text-blue-600 font-bold text-sm hover:underline">View All</Link>
        </div>
        {subjects.length === 0 && !loading ? (
          <div className="bg-white p-12 rounded-[40px] border border-dashed border-gray-200 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-400">No Subjects Available</h3>
            <p className="text-gray-400 max-w-xs mx-auto text-sm">The syllabus is being updated by the administrator. Please check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => {
              const Icon = getSubjectIcon(subject.id);
              const subProgress = progress.filter(p => p.subjectId === subject.id && p.completed).length;
              const totalSubChapters = 10; // Estimated
              const subPercent = Math.round((subProgress / totalSubChapters) * 100);

              return (
                <Link 
                  key={subject.id} 
                  to={`/subjects/${subject.id}`}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{subject.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${subPercent}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">{subPercent}%</span>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-300 w-5 h-5" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
