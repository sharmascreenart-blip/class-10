import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { dataService } from '../../services/dataService';
import { Chapter, QuizQuestion } from '../../types';
import { 
  ArrowLeft, 
  Save, 
  Play, 
  FileText, 
  ClipboardCheck, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash2, 
  Loader2, 
  Eye, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ChapterEditor() {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'test' | 'notes'>('content');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (subjectId && chapterId) {
      const loadData = async () => {
        const chapters = await dataService.getChapters(subjectId);
        const current = chapters.find(c => c.id === chapterId);
        if (current) setChapter(current);
        
        const quizData = await dataService.getQuiz(chapterId);
        if (quizData) setQuiz(quizData.questions);
        
        setLoading(false);
      };
      loadData();
    }
  }, [subjectId, chapterId]);

  const handleSave = async () => {
    if (!subjectId || !chapter) return;
    setSaving(true);
    try {
      await dataService.saveChapter(subjectId, chapter);
      await dataService.saveQuiz(chapter.id, quiz);
      alert('Chapter saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving chapter.');
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = () => {
    setQuiz([...quiz, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuiz = [...quiz];
    if (field === 'question') newQuiz[index].question = value;
    if (field === 'correctAnswer') newQuiz[index].correctAnswer = value;
    setQuiz(newQuiz);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const newQuiz = [...quiz];
    newQuiz[qIndex].options[oIndex] = value;
    setQuiz(newQuiz);
  };

  const deleteQuestion = (index: number) => {
    setQuiz(quiz.filter((_, i) => i !== index));
  };

  if (loading || !chapter) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/syllabus" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{chapter.title}</h2>
            <p className="text-sm text-gray-500">Editing Chapter Content</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
          >
            <Eye className="w-5 h-5" />
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Chapter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 h-fit space-y-2">
          <TabButton 
            active={activeTab === 'content'} 
            onClick={() => setActiveTab('content')} 
            icon={Play} 
            label="Video & PDF" 
          />
          <TabButton 
            active={activeTab === 'notes'} 
            onClick={() => setActiveTab('notes')} 
            icon={BookOpen} 
            label="Chapter Notes" 
          />
          <TabButton 
            active={activeTab === 'test'} 
            onClick={() => setActiveTab('test')} 
            icon={ClipboardCheck} 
            label="Test Questions" 
          />
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'content' && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">YouTube Video URL</label>
                  <div className="relative">
                    <Play className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      value={chapter.videoUrl || ''}
                      onChange={(e) => setChapter({...chapter, videoUrl: e.target.value})}
                      placeholder="https://youtube.com/embed/..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-400 italic">Use embed URL for best results.</p>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700">PDF Document URL</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      value={chapter.pdfUrl || ''}
                      onChange={(e) => setChapter({...chapter, pdfUrl: e.target.value})}
                      placeholder="https://example.com/notes.pdf"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Chapter Description</label>
                <textarea 
                  rows={4}
                  value={chapter.description || ''}
                  onChange={(e) => setChapter({...chapter, description: e.target.value})}
                  placeholder="Short summary of the chapter..."
                  className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-8 border-t border-gray-50">
                <h4 className="font-bold text-gray-900 mb-6">Feature Toggles</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Toggle 
                    active={chapter.features?.video} 
                    onClick={() => setChapter({...chapter, features: {...chapter.features!, video: !chapter.features?.video}})} 
                    label="Video" 
                  />
                  <Toggle 
                    active={chapter.features?.pdf} 
                    onClick={() => setChapter({...chapter, features: {...chapter.features!, pdf: !chapter.features?.pdf}})} 
                    label="PDF" 
                  />
                  <Toggle 
                    active={chapter.features?.test} 
                    onClick={() => setChapter({...chapter, features: {...chapter.features!, test: !chapter.features?.test}})} 
                    label="Test" 
                  />
                  <Toggle 
                    active={chapter.features?.notes} 
                    onClick={() => setChapter({...chapter, features: {...chapter.features!, notes: !chapter.features?.notes}})} 
                    label="Notes" 
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Chapter Notes</h3>
                <button 
                  onClick={async () => {
                    if (!chapter.title) return;
                    const confirm = window.confirm("Generate notes with AI? This will overwrite current notes.");
                    if (!confirm) return;
                    
                    try {
                      const res = await fetch('/api/generate-notes', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ topic: `${chapter.title} for Class 10 CBSE` })
                      });
                      if (!res.ok) throw new Error('Failed to generate notes');
                      const data = await res.json();
                      setChapter({ ...chapter, notes: data.text });
                    } catch (err) {
                      console.error(err);
                      alert('Failed to generate notes with AI.');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 font-bold rounded-xl hover:bg-purple-100 transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate with AI
                </button>
              </div>
              <textarea 
                rows={20}
                value={chapter.notes || ''}
                onChange={(e) => setChapter({...chapter, notes: e.target.value})}
                placeholder="Write chapter notes here (Markdown supported)..."
                className="w-full p-8 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm leading-relaxed"
              />
            </div>
          )}

          {activeTab === 'test' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold">MCQ Test Questions</h3>
                <button 
                  onClick={addQuestion}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Question
                </button>
              </div>

              <div className="space-y-6">
                {quiz.map((q, qIndex) => (
                  <div key={qIndex} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 relative group">
                    <button 
                      onClick={() => deleteQuestion(qIndex)}
                      className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Question {qIndex + 1}</label>
                      <input 
                        type="text" 
                        value={q.question}
                        onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                        placeholder="Enter question text..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              q.correctAnswer === oIndex ? 'border-green-500 bg-green-500 text-white' : 'border-gray-200'
                            }`}
                          >
                            {q.correctAnswer === oIndex && <CheckCircle2 className="w-4 h-4" />}
                          </button>
                          <input 
                            type="text" 
                            value={opt}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreview(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-900">Chapter Preview</h3>
                <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-200 rounded-full">
                  <XIcon className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="max-w-3xl mx-auto space-y-8">
                  <h1 className="text-4xl font-black text-gray-900">{chapter.title}</h1>
                  {chapter.videoUrl && (
                    <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
                      <iframe 
                        src={chapter.videoUrl} 
                        className="w-full h-full" 
                        allowFullScreen 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="prose prose-blue max-w-none">
                    <p className="text-lg text-gray-600 leading-relaxed">{chapter.description}</p>
                    <div className="mt-8 p-8 bg-blue-50 rounded-3xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-4">Chapter Notes</h4>
                      <div className="whitespace-pre-wrap text-blue-800">{chapter.notes}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold ${
        active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function Toggle({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
        active ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 bg-gray-50 text-gray-400'
      }`}
    >
      <span className="text-sm font-bold">{label}</span>
      <div className={`w-10 h-6 rounded-full relative transition-all ${active ? 'bg-green-500' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
      </div>
    </button>
  );
}

function XIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  );
}
