import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Target, AlertCircle, Loader2, ChevronRight, Calculator, FlaskConical, Globe, BookOpen, Languages, Clock, Calendar } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'targetPercentage',
    question: 'What is your target percentage?',
    options: ['80%', '90%', '95%', '100%'],
    icon: Target,
    color: 'bg-blue-500'
  },
  {
    id: 'hardSubjects',
    question: 'Which subjects are hardest for you?',
    options: ['Maths', 'Science', 'SST', 'English', 'Hindi'],
    multi: true,
    icon: AlertCircle,
    color: 'bg-red-500'
  },
  {
    id: 'studyHours',
    question: 'How many hours can you study daily?',
    options: ['1–2 hrs', '3–4 hrs', '5+ hrs'],
    icon: Clock,
    color: 'bg-green-500'
  },
  {
    id: 'learningPreference',
    question: 'Do you prefer videos or notes for learning?',
    options: ['Videos', 'Notes', 'Both'],
    icon: BookOpen,
    color: 'bg-purple-500'
  },
  {
    id: 'examDate',
    question: 'When is your exam?',
    type: 'date',
    icon: Calendar,
    color: 'bg-orange-500'
  }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({
    targetPercentage: '',
    hardSubjects: [],
    studyHours: '',
    learningPreference: '',
    examDate: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (option: string) => {
    const currentQuestion = QUESTIONS[step];
    if (currentQuestion.multi) {
      const current = answers[currentQuestion.id] || [];
      if (current.includes(option)) {
        setAnswers({ ...answers, [currentQuestion.id]: current.filter((o: string) => o !== option) });
      } else {
        setAnswers({ ...answers, [currentQuestion.id]: [...current, option] });
      }
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: option });
      if (step < QUESTIONS.length - 1) {
        setTimeout(() => setStep(step + 1), 300);
      }
    }
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    const userPath = `users/${auth.currentUser.uid}`;
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        ...answers,
        onboarded: true
      });
      navigate('/dashboard');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, userPath);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = QUESTIONS[step];
  const Icon = currentQuestion.icon;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {QUESTIONS.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <div className={`w-12 h-12 ${currentQuestion.color} rounded-xl flex items-center justify-center mb-6 text-white`}>
              <Icon className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">{currentQuestion.question}</h2>

            {currentQuestion.type === 'date' ? (
              <input
                type="date"
                value={answers.examDate}
                onChange={(e) => setAnswers({ ...answers, examDate: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 mb-8">
                {currentQuestion.options?.map((option) => {
                  const isSelected = currentQuestion.multi 
                    ? answers[currentQuestion.id]?.includes(option)
                    : answers[currentQuestion.id] === option;
                  
                  return (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-4 rounded-xl border-2 transition-all text-left font-medium flex items-center justify-between ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200'
                      }`}
                    >
                      {option}
                      {isSelected && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="text-gray-400 font-medium disabled:opacity-0"
              >
                Back
              </button>
              
              <button
                onClick={handleNext}
                disabled={loading || (currentQuestion.multi ? answers[currentQuestion.id].length === 0 : !answers[currentQuestion.id])}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : step === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
                {!loading && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
