import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { BrainCircuit, User, Loader2, AlertCircle, Sparkles, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError('');
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          displayName: name.trim(),
          role: 'student',
          onboarded: false,
          streak: 0,
          points: 0,
          createdAt: new Date().toISOString()
        });
      }
      
      navigate('/onboarding');
    } catch (err: any) {
      console.error("Login Error:", err.code, err.message);
      setError('Kuch galat ho gaya. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Check if this is the admin email
        const isAdmin = user.email === 'karanmssale@gmail.com' || user.email === 'sharmascreenart@gmail.com';
        
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Student',
          role: isAdmin ? 'admin' : 'student',
          onboarded: isAdmin ? true : false,
          streak: 0,
          points: 0,
          createdAt: new Date().toISOString()
        });
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error("Google Login Error:", err.code, err.message);
      setError('Google login fail ho gaya. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
            <BrainCircuit className="text-white w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Class 10 AI Hub</h1>
          <p className="text-gray-500 text-center mt-2">Apna naam enter karein aur padhai shuru karein!</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleStart} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Aapka Naam (Your Name)</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-lg"
                placeholder="e.g. Rahul Sharma"
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading || !name.trim()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-lg"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                <Sparkles className="w-5 h-5" />
                Start Learning
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 disabled:opacity-70 text-lg"
        >
          {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" referrerPolicy="no-referrer" />
              Sign in with Google
            </>
          )}
        </button>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Admin? Use Google Login</p>
        </div>
      </motion.div>
    </div>
  );
}
