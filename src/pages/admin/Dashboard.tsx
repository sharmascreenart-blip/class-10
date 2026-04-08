import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  FileText, 
  Play, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  LayoutDashboard,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubjects: 0,
    totalChapters: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time users count
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userData = snapshot.docs.map(doc => doc.data());
      setStats(prev => ({
        ...prev,
        totalUsers: userData.length,
        activeUsers: userData.filter(u => u.onboarded).length
      }));
    });

    // Real-time subjects count
    const unsubscribeSubjects = onSnapshot(collection(db, 'subjects'), (snapshot) => {
      setStats(prev => ({
        ...prev,
        totalSubjects: snapshot.docs.length
      }));
    });

    setLoading(false);
    return () => {
      unsubscribeUsers();
      unsubscribeSubjects();
    };
  }, []);

  const chartData = [
    { name: 'Mon', users: 12 },
    { name: 'Tue', users: 19 },
    { name: 'Wed', users: 15 },
    { name: 'Thu', users: 22 },
    { name: 'Fri', users: 30 },
    { name: 'Sat', users: 25 },
    { name: 'Sun', users: 18 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Setup Alert */}
      {stats.totalSubjects === 0 && !loading && (
        <div className="bg-orange-50 border-2 border-dashed border-orange-200 p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-orange-600 shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-900">Database is Empty</h3>
              <p className="text-orange-700 mt-1">Your syllabus is currently empty. You can migrate the default NCERT chapters from settings.</p>
            </div>
          </div>
          <Link 
            to="/admin/settings"
            className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Setup Syllabus Now
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="Total Students" 
          value={stats.totalUsers} 
          color="blue" 
          trend="+12%" 
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Active Users" 
          value={stats.activeUsers} 
          color="green" 
          trend="+5%" 
        />
        <StatCard 
          icon={BookOpen} 
          label="Total Subjects" 
          value={stats.totalSubjects} 
          color="purple" 
        />
        <StatCard 
          icon={LayoutDashboard} 
          label="Total Chapters" 
          value={stats.totalChapters} 
          color="orange" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-8">User Activity (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-8">Platform Health</h3>
          <div className="space-y-6">
            <HealthItem label="Database Status" status="Healthy" color="green" />
            <HealthItem label="AI Services" status="Active" color="green" />
            <HealthItem label="Storage Usage" status="15% Used" color="blue" />
            <HealthItem label="API Latency" status="45ms" color="green" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Recent Updates</h3>
        <div className="space-y-4">
          <ActivityItem 
            icon={FileText} 
            label="New Chapter Added" 
            detail="Real Numbers in Maths" 
            time="2 hours ago" 
          />
          <ActivityItem 
            icon={Play} 
            label="Video Updated" 
            detail="Chemical Reactions in Science" 
            time="5 hours ago" 
          />
          <ActivityItem 
            icon={Users} 
            label="New User Joined" 
            detail="Rahul Sharma" 
            time="1 day ago" 
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, trend }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors[color]} rounded-2xl flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function HealthItem({ label, status, color }: any) {
  const colors: any = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
      <span className="text-sm font-bold text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colors[color]}`} />
        <span className="text-sm font-bold text-gray-900">{status}</span>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, label, detail, time }: any) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all">
      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
      <span className="text-xs text-gray-400 font-medium">{time}</span>
    </div>
  );
}
