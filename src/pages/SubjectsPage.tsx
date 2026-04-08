import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calculator, 
  FlaskConical, 
  Globe, 
  BookOpen, 
  Languages, 
  ChevronRight, 
  BrainCircuit, 
  Play, 
  FileText, 
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { Subject } from '../types';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = dataService.subscribeSubjects((data) => {
      setSubjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  const getSubjectColor = (id: string) => {
    switch (id.toLowerCase()) {
      case 'maths': return 'bg-blue-500';
      case 'science': return 'bg-green-500';
      case 'sst': case 'social science': return 'bg-orange-500';
      case 'english': return 'bg-purple-500';
      case 'hindi': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">All Subjects</h1>
        <p className="text-gray-500">Select a subject to view chapters and start learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => {
          const Icon = getSubjectIcon(subject.id);
          const color = getSubjectColor(subject.id);
          
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/subjects/${subject.id}`}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group block"
              >
                <div className={`${color} h-32 flex items-center justify-center relative overflow-hidden`}>
                  <Icon className="text-white w-16 h-16 relative z-10 group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/5 rounded-full blur-2xl" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{subject.name}</h2>
                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                      <Play className="w-3 h-3" />
                      <span>Videos</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                      <FileText className="w-3 h-3" />
                      <span>Notes</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Tests</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* AI Quick Access */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-purple-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <BrainCircuit className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Need AI Help?</h2>
              <p className="text-purple-100">Generate notes or ask doubts instantly.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/ai-notes" className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors">
              AI Notes
            </Link>
            <Link to="/chatbot" className="px-6 py-3 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
              Doubt AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
