import { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { 
  Bell, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Loader2, 
  Send, 
  X,
  Calendar,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    type: 'info',
    active: true
  });

  useEffect(() => {
    const unsubscribe = dataService.subscribeAnnouncements(setAnnouncements);
    setLoading(false);
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.message.trim()) return;
    await dataService.addAnnouncement(newAnnouncement);
    setNewAnnouncement({ title: '', message: '', type: 'info', active: true });
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this announcement?")) return;
    await dataService.deleteAnnouncement(id);
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Bell className="text-blue-600 w-6 h-6" />
          Global Announcements
        </h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[40px] border border-blue-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-gray-900">Create Announcement</h4>
            <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">Title</label>
              <input 
                type="text" 
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                placeholder="e.g. New Chapter Uploaded"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">Type</label>
              <div className="flex gap-2">
                {['info', 'warning', 'success'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setNewAnnouncement({...newAnnouncement, type})}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm capitalize transition-all ${
                      newAnnouncement.type === type 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Message</label>
            <textarea 
              rows={3}
              value={newAnnouncement.message}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
              placeholder="Write your announcement message here..."
              className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button 
              onClick={handleAdd}
              className="flex items-center gap-2 px-10 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
            >
              <Send className="w-5 h-5" />
              Publish Now
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {announcements.map((ann) => (
          <div 
            key={ann.id}
            className={`p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-200 transition-all group`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                ann.type === 'success' ? 'bg-green-50 text-green-600' : 
                ann.type === 'warning' ? 'bg-orange-50 text-orange-600' : 
                'bg-blue-50 text-blue-600'
              }`}>
                {ann.type === 'success' ? <CheckCircle2 className="w-7 h-7" /> : 
                 ann.type === 'warning' ? <AlertCircle className="w-7 h-7" /> : 
                 <Info className="w-7 h-7" />}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-xl font-bold text-gray-900">{ann.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    ann.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {ann.active ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-500 mt-1">{ann.message}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Eye className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(ann.id)}
                className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {announcements.length === 0 && !isAdding && (
          <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No announcements yet.</p>
            <button 
              onClick={() => setIsAdding(true)}
              className="text-blue-600 font-bold mt-2 hover:underline"
            >
              Send your first notification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
