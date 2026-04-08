import { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { Subject, Chapter } from '../../types';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  BookOpen, 
  GripVertical, 
  Search, 
  Loader2, 
  PlusCircle,
  FileText,
  Play,
  ClipboardCheck,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function SyllabusManager() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  useEffect(() => {
    const unsubscribe = dataService.subscribeSubjects(setSubjects);
    setLoading(false);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      const unsubscribe = dataService.subscribeChapters(selectedSubject.id, setChapters);
      return () => unsubscribe();
    } else {
      setChapters([]);
    }
  }, [selectedSubject]);

  const handleAddSubject = async () => {
    if (!newSubjectName.trim()) return;
    await dataService.addSubject({ name: newSubjectName, icon: 'BookOpen' });
    setNewSubjectName('');
    setIsAddingSubject(false);
  };

  const handleAddChapter = async () => {
    if (!selectedSubject || !newChapterTitle.trim()) return;
    await dataService.saveChapter(selectedSubject.id, {
      title: newChapterTitle,
      order: chapters.length + 1,
      features: { video: true, pdf: true, test: true, notes: true }
    });
    setNewChapterTitle('');
    setIsAddingChapter(false);
  };

  const handleDeleteSubject = async (id: string) => {
    if (!window.confirm("Are you sure? This will delete the subject. Make sure to delete chapters first.")) return;
    await dataService.deleteSubject(id);
    if (selectedSubject?.id === id) setSelectedSubject(null);
  };

  const handleDeleteChapter = async (chapterId: string) => {
    if (!selectedSubject || !window.confirm("Delete this chapter?")) return;
    await dataService.deleteChapter(selectedSubject.id, chapterId);
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Subjects List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden h-fit">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Subjects</h3>
          <button 
            onClick={() => setIsAddingSubject(true)}
            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {isAddingSubject && (
            <div className="p-4 bg-blue-50 rounded-2xl space-y-3 mb-4">
              <input 
                type="text" 
                placeholder="Subject Name" 
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="w-full p-3 bg-white border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button 
                  onClick={handleAddSubject}
                  className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-xl text-sm"
                >
                  Add
                </button>
                <button 
                  onClick={() => setIsAddingSubject(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-600 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {subjects.map((subject) => (
            <div 
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                selectedSubject?.id === subject.id 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'bg-gray-50 border-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className={`w-5 h-5 ${selectedSubject?.id === subject.id ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-bold">{subject.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteSubject(subject.id); }}
                  className={`p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                    selectedSubject?.id === subject.id ? 'hover:bg-blue-500 text-white' : 'hover:bg-red-50 text-red-500'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className={`w-5 h-5 ${selectedSubject?.id === subject.id ? 'text-white' : 'text-gray-300'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapters List */}
      <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
        {selectedSubject ? (
          <>
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div>
                <h3 className="font-bold text-gray-900">{selectedSubject.name} Chapters</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                  {chapters.length} Chapters Total
                </p>
              </div>
              <button 
                onClick={() => setIsAddingChapter(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Chapter
              </button>
            </div>

            <div className="p-6 space-y-4">
              {isAddingChapter && (
                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 space-y-4">
                  <h4 className="font-bold text-blue-900">New Chapter</h4>
                  <input 
                    type="text" 
                    placeholder="Chapter Title (e.g. Real Numbers)" 
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                    className="w-full p-4 bg-white border border-blue-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <button 
                      onClick={handleAddChapter}
                      className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl"
                    >
                      Create Chapter
                    </button>
                    <button 
                      onClick={() => setIsAddingChapter(false)}
                      className="px-8 py-3 bg-white text-gray-500 font-bold rounded-xl border border-blue-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {chapters.map((chapter) => (
                  <div 
                    key={chapter.id}
                    className="p-6 bg-white border border-gray-100 rounded-3xl hover:border-blue-200 transition-all group shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center font-bold">
                          {chapter.order}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{chapter.title}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <FeatureBadge active={chapter.features?.video} icon={Play} label="Video" />
                            <FeatureBadge active={chapter.features?.pdf} icon={FileText} label="PDF" />
                            <FeatureBadge active={chapter.features?.test} icon={ClipboardCheck} label="Test" />
                            <FeatureBadge active={chapter.features?.notes} icon={BookOpen} label="Notes" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link 
                          to={`/admin/chapters/${selectedSubject.id}/${chapter.id}`}
                          className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                        >
                          <Settings className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteChapter(chapter.id)}
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {chapters.length === 0 && !isAddingChapter && (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold">No chapters yet.</p>
                    <button 
                      onClick={() => setIsAddingChapter(true)}
                      className="text-blue-600 font-bold mt-2 hover:underline"
                    >
                      Add your first chapter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Select a Subject</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              Choose a subject from the left to manage its chapters and content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureBadge({ active, icon: Icon, label }: any) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
      active ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-300'
    }`}>
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}
