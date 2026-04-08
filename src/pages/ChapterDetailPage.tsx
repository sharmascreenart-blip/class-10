import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  BrainCircuit, 
  Download, 
  CheckCircle2, 
  ChevronRight, 
  Loader2, 
  ExternalLink, 
  Maximize2, 
  Layout, 
  Columns,
  ClipboardCheck,
  X
} from 'lucide-react';
import { Chapter, Progress, Subject } from '../types';

export default function ChapterDetailPage() {
  const { subjectId, chapterId } = useParams<{ subjectId: string, chapterId: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'ai' | 'summary'>('summary');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId || !chapterId || !auth.currentUser) return;

    const loadData = async () => {
      const subjects = await dataService.getSubjects();
      const foundSubject = subjects.find(s => s.id === subjectId);
      setSubject(foundSubject || null);

      const chapters = await dataService.getChapters(subjectId);
      const foundChapter = chapters.find(c => c.id === chapterId);
      setChapter(foundChapter || null);
    };
    loadData();

    // Load progress
    const progressId = `${auth.currentUser.uid}_${chapterId}`;
    const unsubscribe = onSnapshot(doc(db, 'progress', progressId), (docSnap) => {
      setIsCompleted(docSnap.exists() && docSnap.data().completed);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [subjectId, chapterId]);

  const toggleComplete = async () => {
    if (!auth.currentUser || !subjectId || !chapterId) return;
    const progressId = `${auth.currentUser.uid}_${chapterId}`;
    try {
      if (isCompleted) {
        // Keep it simple, just toggle
        await setDoc(doc(db, 'progress', progressId), {
          userId: auth.currentUser.uid,
          chapterId,
          subjectId,
          completed: false,
          lastUpdated: new Date().toISOString()
        });
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

  if (!chapter || !subject) return <div>Chapter not found</div>;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link to={`/subjects/${subjectId}`} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to {subject.name}
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">Chapter {chapter.order}</span>
              {isCompleted && <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest bg-green-100 px-2 py-0.5 rounded-full">Completed</span>}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{chapter.title}</h1>
          </div>
          
          <button 
            onClick={toggleComplete}
            className={`px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isCompleted 
                ? 'bg-green-100 text-green-600 border border-green-200' 
                : 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isCompleted ? 'Completed' : 'Mark as Completed'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-2xl w-full max-w-lg overflow-x-auto">
        <button 
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'summary' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Summary
        </button>
        <button 
          onClick={() => setActiveTab('video')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'video' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Play className="w-4 h-4" />
          Video
        </button>
        <button 
          onClick={() => setActiveTab('pdf')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'pdf' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Notes
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'ai' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          AI
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">Chapter Summary</h2>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  {chapter.description || "Description for this chapter is being updated. Please check back soon!"}
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.features?.test && (
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-orange-900">Ready for a test?</p>
                      <Link to={`/test/${chapter.id}`} className="text-xs font-bold text-orange-600 hover:underline">Take Chapter Test →</Link>
                    </div>
                  </div>
                )}
                {chapter.features?.notes && (
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-purple-900">Need more details?</p>
                      <button onClick={() => setActiveTab('ai')} className="text-xs font-bold text-purple-600 hover:underline">Ask AI for Notes →</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'video' && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="aspect-video w-full"
            >
              {chapter.videoUrl ? (
                <iframe
                  src={chapter.videoUrl}
                  title={chapter.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-400">
                  <Play className="w-12 h-12 mb-4" />
                  <p className="font-bold">No video available for this chapter.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'pdf' && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Chapter PDF Notes</h2>
              <p className="text-gray-500 max-w-sm mb-8">Download or view the detailed handwritten and printed notes for this chapter.</p>
              
              {chapter.pdfUrl ? (
                <div className="flex gap-4">
                  <a 
                    href={chapter.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </a>
                  <a 
                    href={chapter.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Open in New Tab
                  </a>
                </div>
              ) : (
                <p className="text-red-500 font-bold">No PDF available for this chapter.</p>
              )}
              
              <div className="mt-12 w-full max-w-2xl aspect-[3/4] bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                {chapter.pdfUrl ? (
                  <iframe src={chapter.pdfUrl} className="w-full h-full" />
                ) : (
                  <span className="text-gray-400 font-medium">PDF Viewer Placeholder</span>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold">Chapter Notes</h2>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 prose prose-blue max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {chapter.notes || "Notes for this chapter are being prepared."}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button className="flex items-center gap-2 text-gray-400 font-bold hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Previous Chapter
        </button>
        <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
          Next Chapter
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
