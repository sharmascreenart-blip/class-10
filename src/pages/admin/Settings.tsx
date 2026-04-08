import { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { SUBJECTS, CHAPTERS_DUMMY } from '../../constants';
import { 
  Settings as SettingsIcon, 
  Database, 
  Palette, 
  ShieldCheck, 
  Save, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  LayoutDashboard, 
  FileText, 
  Play, 
  ClipboardCheck,
  RefreshCw
} from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState<any>({
    appName: 'Class 10 AI Hub',
    themeColor: '#3b82f6',
    features: {
      aiNotes: true,
      tests: true,
      videos: true
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await dataService.getSettings();
      if (data) setSettings(data);
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await dataService.saveSettings(settings);
      alert('Settings saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    setMigrationStatus("Starting migration...");
    console.log("Migration started...");
    try {
      for (const subject of SUBJECTS) {
        console.log(`Migrating subject: ${subject.name}`);
        await dataService.addSubject(subject);
        const chapters = CHAPTERS_DUMMY[subject.id] || [];
        setMigrationStatus(`Migrating ${subject.name} chapters...`);
        for (const chapter of chapters) {
          console.log(`Migrating chapter: ${chapter.title}`);
          await dataService.saveChapter(subject.id, {
            ...chapter,
            features: { video: true, pdf: true, test: true, notes: true }
          });
          if (chapter.questions) {
            console.log(`Migrating quiz for: ${chapter.title}`);
            await dataService.saveQuiz(chapter.id, chapter.questions);
          }
        }
      }
      setMigrationStatus("Migration complete!");
      console.log("Migration successful!");
      setTimeout(() => setMigrationStatus(null), 3000);
    } catch (err) {
      console.error("Migration error:", err);
      setMigrationStatus("Migration failed. Check console.");
    } finally {
      setMigrating(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Palette className="text-blue-600 w-6 h-6" />
            General Settings
          </h3>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Application Name</label>
            <input 
              type="text" 
              value={settings.appName}
              onChange={(e) => setSettings({...settings, appName: e.target.value})}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">Theme Color</label>
            <div className="flex gap-4">
              <input 
                type="color" 
                value={settings.themeColor}
                onChange={(e) => setSettings({...settings, themeColor: e.target.value})}
                className="w-16 h-14 p-1 bg-white border border-gray-100 rounded-2xl cursor-pointer"
              />
              <input 
                type="text" 
                value={settings.themeColor}
                onChange={(e) => setSettings({...settings, themeColor: e.target.value})}
                className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50">
          <h4 className="font-bold text-gray-900 mb-6">Global Feature Toggles</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureToggle 
              active={settings.features.aiNotes} 
              onClick={() => setSettings({...settings, features: {...settings.features, aiNotes: !settings.features.aiNotes}})} 
              icon={Sparkles} 
              label="AI Notes" 
            />
            <FeatureToggle 
              active={settings.features.tests} 
              onClick={() => setSettings({...settings, features: {...settings.features, tests: !settings.features.tests}})} 
              icon={ClipboardCheck} 
              label="Chapter Tests" 
            />
            <FeatureToggle 
              active={settings.features.videos} 
              onClick={() => setSettings({...settings, features: {...settings.features, videos: !settings.features.videos}})} 
              icon={Play} 
              label="Video Lessons" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database className="text-orange-600 w-6 h-6" />
          Data Management
        </h3>
        <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
              <RefreshCw className={`w-6 h-6 ${migrating ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h4 className="font-bold text-orange-900">Migrate Hardcoded Data</h4>
              <p className="text-sm text-orange-700 mt-1">Populate Firestore with initial subjects and chapters from constants.</p>
            </div>
          </div>
          <button 
            onClick={handleMigrate}
            disabled={migrating}
            className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all disabled:opacity-50"
          >
            {migrating ? 'Migrating...' : 'Start Migration'}
          </button>
        </div>
        {migrationStatus && (
          <div className="flex items-center gap-2 text-sm font-bold text-orange-600 px-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            {migrationStatus}
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureToggle({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
        active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-400'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
        <span className="text-sm font-bold">{label}</span>
      </div>
      <div className={`w-10 h-6 rounded-full relative transition-all ${active ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
      </div>
    </button>
  );
}
