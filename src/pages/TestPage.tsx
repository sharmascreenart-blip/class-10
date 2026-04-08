import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { dataService } from '../services/dataService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Timer, 
  AlertCircle, 
  Loader2, 
  RefreshCw 
} from 'lucide-react';

export default function TestPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chapterId) return;

    const loadQuestions = async () => {
      const quizData = await dataService.getQuiz(chapterId);
      if (quizData && quizData.questions && quizData.questions.length > 0) {
        setQuestions(quizData.questions);
      } else {
        // Fallback or empty
        setQuestions([]);
      }
      setLoading(false);
    };
    loadQuestions();
  }, [chapterId]);

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = async (finalAnswers: number[]) => {
    setIsFinished(true);
    if (!auth.currentUser || !chapterId) return;

    const score = finalAnswers.reduce((acc, curr, idx) => {
      return curr === questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    const progressId = `${auth.currentUser.uid}_${chapterId}`;
    try {
      await setDoc(doc(db, 'progress', progressId), {
        userId: auth.currentUser.uid,
        chapterId,
        testScore: Math.round((score / questions.length) * 100),
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const score = answers.reduce((acc, curr, idx) => {
    return curr === questions[idx].correctAnswer ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((score / questions.length) * 100);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h1>
          <p className="text-gray-500 mb-8">Great job! Here's how you performed.</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <div className="text-5xl font-black text-blue-600 mb-2">{scorePercent}%</div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Score</div>
            <div className="mt-4 flex justify-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                {score} Correct
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <XCircle className="w-4 h-4" />
                {questions.length - score} Wrong
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link 
              to="/dashboard"
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 block hover:bg-blue-700 transition-all"
            >
              Back to Dashboard
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Retake Test
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto" />
          <h2 className="text-2xl font-bold">No Questions Available</h2>
          <p className="text-gray-500">This test doesn't have any questions yet. Please check back later.</p>
          <Link to="/dashboard" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <Link to={`/subjects`} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Exit Test
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-600 font-bold">
            <Timer className="w-5 h-5 text-orange-500" />
            <span>Question {currentIdx + 1}/{questions.length}</span>
          </div>
        </div>

        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentQuestion.options.map((option: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`p-5 rounded-2xl border-2 transition-all text-left font-bold flex items-center justify-between group ${
                  selectedOption === idx 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    selectedOption === idx ? 'bg-blue-600 text-white' : 'bg-white text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </div>
                {selectedOption === idx && <CheckCircle2 className="w-6 h-6" />}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-blue-700 transition-all"
          >
            {currentIdx === questions.length - 1 ? 'Finish Test' : 'Next Question'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
