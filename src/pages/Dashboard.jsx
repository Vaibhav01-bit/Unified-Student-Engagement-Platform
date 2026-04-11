import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, DollarSign, TrendingUp, Calendar, CheckSquare, ArrowRight } from 'lucide-react';
import storage from '../utils/storage';
import { updateStreak, getStreak, isInactive, updateActivity } from '../utils/streaks';
import { getLoanReadinessScore, getProgressPercentage } from '../utils/scoring';
import DailyTip from '../components/DailyTip';
import SmartNudge from '../components/SmartNudge';
import StreakCounter from '../components/StreakCounter';
import ProgressBar from '../components/ProgressBar';
import checklistData from '../data/checklist.json';

const navCards = [
  {
    path: '/explore',
    title: 'Explore',
    description: 'Chat with AI & discover universities',
    icon: Compass,
    gradient: 'from-blue-600 to-blue-800',
    glow: 'shadow-blue-500/20',
    emoji: '🌍',
  },
  {
    path: '/finance',
    title: 'Finance',
    description: 'ROI calculator & loan eligibility',
    icon: DollarSign,
    gradient: 'from-teal-600 to-teal-800',
    glow: 'shadow-teal-500/20',
    emoji: '💰',
  },
  {
    path: '/predictor',
    title: 'Predictor',
    description: 'Admission probability score',
    icon: TrendingUp,
    gradient: 'from-purple-600 to-purple-800',
    glow: 'shadow-purple-500/20',
    emoji: '📊',
  },
  {
    path: '/timeline',
    title: 'Timeline',
    description: 'Your application road map',
    icon: Calendar,
    gradient: 'from-orange-600 to-orange-800',
    glow: 'shadow-orange-500/20',
    emoji: '📅',
  },
  {
    path: '/progress',
    title: 'Progress',
    description: 'Track your document checklist',
    icon: CheckSquare,
    gradient: 'from-green-600 to-green-800',
    glow: 'shadow-green-500/20',
    emoji: '✅',
  },
];

export default function Dashboard() {
  const profile = storage.get('edupath_profile', {});
  const [streak, setStreak] = useState(0);
  const [showNudge, setShowNudge] = useState(false);
  const completedIds = storage.get('edupath_checklist_completed', []);
  const progress = getProgressPercentage(completedIds, checklistData.length);
  const loanScore = getLoanReadinessScore(completedIds);

  useEffect(() => {
    const streakData = updateStreak();
    setStreak(streakData.streak);
    updateActivity();

    // Show nudge if been inactive
    if (isInactive(2)) {
      setTimeout(() => setShowNudge(true), 3000);
    }
  }, []);

  const firstName = profile.name ? profile.name.split(' ')[0] : 'Student';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? '🌅 Good morning' : hour < 17 ? '☀️ Good afternoon' : '🌙 Good evening';

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Hero Greeting */}
      <div className="relative overflow-hidden card bg-gradient-to-br from-primary/30 via-surface-card to-teal/20 border-primary/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-muted text-sm mb-1">{greeting},</p>
          <h1 className="text-3xl font-black text-white mb-2">
            {firstName}! <span className="text-gradient">Ready to shine?</span>
          </h1>
          <p className="text-muted text-sm max-w-md">
            You're targeting <span className="text-white font-medium">{profile.targetCourse || 'a great course'}</span> in{' '}
            <span className="text-white font-medium">
              {profile.preferredCountries?.join(', ') || 'amazing countries'}
            </span>.
          </p>
          <div className="mt-4">
            <ProgressBar percentage={progress} label="Overall Progress" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl">📈</div>
          <div>
            <p className="text-2xl font-bold text-white">{progress}%</p>
            <p className="text-sm text-muted">Application Progress</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-2xl">🏦</div>
          <div>
            <p className="text-2xl font-bold text-white">{loanScore}%</p>
            <p className="text-sm text-muted">Loan Readiness Score</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-2xl">
            {streak >= 7 ? '🔥' : streak >= 3 ? '⚡' : '📅'}
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{streak}</p>
            <p className="text-sm text-muted">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navCards.map(({ path, title, description, icon: Icon, gradient, glow, emoji }) => (
            <Link
              key={path}
              to={path}
              id={`nav-card-${title.toLowerCase()}`}
              className={`card-hover group relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative">
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
                  {title}
                </h3>
                <p className="text-sm text-muted">{description}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Streak + Daily Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StreakCounter streak={streak} />
        <DailyTip />
      </div>

      {/* Smart Nudge */}
      {showNudge && (
        <SmartNudge
          message="You haven't checked your progress in a while. Let's see what documents are still pending!"
          cta="Go to Progress"
          ctaPath="/progress"
          onDismiss={() => setShowNudge(false)}
        />
      )}
    </div>
  );
}
