import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  Search, 
  Loader2, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Download, 
  ArrowLeft, 
  AlertCircle 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AiNotesPage() {
  const [searchParams] = useSearchParams();
  const [topic, setTopic] = useState(searchParams.get('topic') || '');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateNotes = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setNotes('');

    try {
      const res = await fetch('/api/generate-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (!res.ok) throw new Error('Failed to generate notes');
      
      const data = await res.json();
      setNotes(data.text || 'Failed to generate notes.');
    } catch (err: any) {
      console.error(err);
      setError('Failed to connect to AI. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('topic')) {
      generateNotes();
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(notes);
    // Show toast or feedback
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium w-fit">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BrainCircuit className="text-purple-600 w-8 h-8" />
          AI Notes Generator
        </h1>
        <p className="text-gray-500">Enter any topic and get smart, exam-ready notes instantly.</p>
      </div>

      <form onSubmit={generateNotes} className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter topic name (e.g. Photosynthesis, Trigonometry...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          Generate
        </button>
      </form>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-3xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-purple-50 rounded-full animate-pulse" />
              <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 w-10 h-10 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Smart Notes...</h2>
            <p className="text-gray-500 max-w-sm">Our AI is analyzing the topic and preparing the best summary for your exams.</p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-100 rounded-3xl p-8 flex items-center gap-4 text-red-600"
          >
            <AlertCircle className="w-8 h-8 shrink-0" />
            <div>
              <h3 className="font-bold">Error Occurred</h3>
              <p className="text-sm">{error}</p>
            </div>
          </motion.div>
        ) : notes ? (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="text-purple-600 w-5 h-5" />
                <span className="font-bold text-gray-700">Study Notes: {topic}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  title="Copy to Clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                  title="Download PDF"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-8 prose prose-purple max-w-none">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="text-gray-300 w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-400">Ready to help you study!</h2>
            <p className="text-gray-400 max-w-xs">Enter a topic above to generate comprehensive AI study notes.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
