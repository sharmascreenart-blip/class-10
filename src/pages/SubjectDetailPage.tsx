import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  BrainCircuit, 
  ClipboardCheck, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Loader2,
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  Languages
} from 'lucide-react';
import { Chapter, Progress, Subject } from '../types';

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!subjectId || !auth.currentUser) return;

    // Load subject
    const loadSubject = async () => {
      const subjects = await dataService.getSubjects();
      const found = subjects.find(s => s.id === subjectId);
      setSubject(found || null);
    };
    loadSubject();

    // Load chapters
    const unsubscribeChapters = dataService.subscribeChapters(subjectId, setChapters);

    // Load progress
    const q = query(collection(db, 'progress'), where('userId', '==', auth.currentUser.uid), where('subjectId', '==', subjectId));
    const unsubscribeProgress = onSnapshot(q, (snapshot) => {
      const progMap: Record<string, Progress> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data() as Progress;
        progMap[data.chapterId] = data;
      });
      setProgress(progMap);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'progress');
      setLoading(false);
    });

    return () => {
      unsubscribeChapters();
      unsubscribeProgress();
    };
  }, [subjectId]);

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

  const toggleComplete = async (chapterId: string) => {
    if (!auth.currentUser || !subjectId) return;
    
    const progressId = `${auth.currentUser.uid}_${chapterId}`;
    const isCompleted = progress[chapterId]?.completed;

    try {
      if (isCompleted) {
        await deleteDoc(doc(db, 'progress', progressId));
      } else {
        await setDoc(doc(db, 'progress', progressId), {
          userId: auth.currentUser.uid,
          chapterId,
          subjectId,
          completed: true,
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredChapters = chapters.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
  const completedCount = Object.values(progress).filter(p => p.completed).length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100) || 0;

  if (!subject) return <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

  const SubjectIcon = getSubjectIcon(subject.id);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <Link to="/subjects" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to Subjects
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <SubjectIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
              <p className="text-gray-500">{chapters.length} Chapters • {completedCount} Completed</p>
            </div>
          </div>
          
          <div className="w-full md:w-64 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{progressPercent}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search chapters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-500 hover:text-blue-600 transition-colors">
          <Filter className="w-6 h-6" />
        </button>
      </div>

      {/* Chapters List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : filteredChapters.length > 0 ? (
          filteredChapters.map((chapter, index) => {
            const isCompleted = progress[chapter.id]?.completed;
            
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white p-5 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center gap-6 group ${
                  isCompleted ? 'border-green-100 bg-green-50/30' : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => toggleComplete(chapter.id)}
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-300 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">Chapter {chapter.order}</span>
                      {isCompleted && <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-100 px-2 py-0.5 rounded-full">Completed</span>}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link 
                    to={`/subjects/${subjectId}/chapters/${chapter.id}`}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    <Play className="w-4 h-4" />
                    Learn Now
                  </Link>
                  <Link 
                    to={`/test/${chapter.id}`}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <ClipboardCheck className="w-4 h-4 text-orange-500" />
                    Test
                  </Link>
                  <Link 
                    to={`/ai-notes?topic=${chapter.title}`}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <BrainCircuit className="w-4 h-4 text-purple-500" />
                    AI Notes
                  </Link>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500">No chapters found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
