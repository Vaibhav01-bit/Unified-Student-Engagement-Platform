import { useState, useEffect } from 'react';
import { CheckSquare, Award } from 'lucide-react';
import storage from '../utils/storage';
import { getLoanReadinessScore, getProgressPercentage } from '../utils/scoring';
import ChecklistItem from '../components/ChecklistItem';
import ProgressBar from '../components/ProgressBar';
import ReferralButton from '../components/ReferralButton';
import checklistData from '../data/checklist.json';
import { PageTransition } from '../components/ui/PageTransition';
import { AnimatedCard } from '../components/ui/AnimatedCard';

const COMPLETED_KEY = 'edupath_checklist_completed';

// Group checklist by category
const grouped = checklistData.reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = [];
  acc[item.category].push(item);
  return acc;
}, {});

const categoryIcons = {
  Documents: '📄',
  Finance: '💰',
  Academic: '📚',
  Visa: '🛂',
  Travel: '✈️',
};

function CircularProgress({ percentage }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color = percentage >= 80 ? '#22c55e' : percentage >= 50 ? '#14916F' : '#1D4E8F';

  return (
    <div className="relative inline-flex items-center justify-center w-36 h-36">
      <svg className="progress-ring w-36 h-36" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#2E3548" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{percentage}%</span>
        <span className="text-xs text-muted">complete</span>
      </div>
    </div>
  );
}

export default function Progress() {
  const [completedIds, setCompletedIds] = useState(() => storage.get(COMPLETED_KEY, []));
  const [showConfetti, setShowConfetti] = useState(false);

  const progress = getProgressPercentage(completedIds, checklistData.length);
  const loanScore = getLoanReadinessScore(completedIds);

  useEffect(() => {
    storage.set(COMPLETED_KEY, completedIds);
    if (progress === 100 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [completedIds]);

  const toggleItem = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const completedCount = completedIds.length;
  const totalCount = checklistData.length;

  return (
    <PageTransition transitionKey="progress">
    <div className="space-y-6">
      {/* Confetti banner */}
      {showConfetti && (
        <AnimatedCard className="border border-yellow-500/40 bg-gradient-to-r from-yellow-500/20 to-orange-500/10 text-center py-6 animate-bounce-in">
          <div className="text-5xl mb-2">🎉</div>
          <h2 className="text-xl font-black text-white">100% Complete! Congratulations!</h2>
          <p className="text-muted text-sm mt-1">You've completed your entire checklist. You're ready to apply!</p>
        </AnimatedCard>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Progress Tracker</h1>
        <p className="text-muted text-sm mt-1">Track your application documents and readiness</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Circular progress */}
        <AnimatedCard className="col-span-1 flex flex-col items-center justify-center py-6">
          <CircularProgress percentage={progress} />
          <p className="text-sm text-muted mt-3 text-center">
            {completedCount} of {totalCount} items done
          </p>
        </AnimatedCard>

        {/* Loan score */}
        <AnimatedCard className="flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal/20 flex items-center justify-center text-xl">🏦</div>
            <div>
              <p className="text-sm text-muted">Loan Readiness</p>
              <p className="text-2xl font-black text-white">{loanScore}%</p>
            </div>
          </div>
          <ProgressBar percentage={loanScore} color="from-teal to-cyan-400" showLabel={false} height="h-2.5" />
          <p className="text-xs text-muted mt-2">
            {loanScore < 60 ? 'Complete financial docs to improve' :
             loanScore < 100 ? 'Almost ready for loan application' :
             '✓ Ready for loan application!'}
          </p>
        </AnimatedCard>

        {/* Achievements */}
        <AnimatedCard>
          <div className="flex items-center gap-3 mb-4">
            <Award size={22} className="text-yellow-400" />
            <h3 className="font-semibold text-white">Milestones</h3>
          </div>
          <div className="space-y-2">
            {[
              { label: 'First Step', done: completedIds.length >= 1, icon: '🥇' },
              { label: 'Halfway there', done: progress >= 50, icon: '⚡' },
              { label: 'Loan Ready', done: loanScore === 100, icon: '🏦' },
              { label: 'All Done!', done: progress === 100, icon: '🎉' },
            ].map((m) => (
              <div key={m.label} className={`flex items-center gap-2 text-sm ${m.done ? 'text-white' : 'text-muted'}`}>
                <span className={m.done ? '' : 'opacity-40'}>{m.icon}</span>
                <span className={m.done ? 'font-medium' : ''}>{m.label}</span>
                {m.done && <span className="ml-auto text-xs text-green-400">✓</span>}
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Checklist by Category */}
      <div className="space-y-5">
        <h2 className="text-lg font-bold text-white">Document Checklist</h2>
        {Object.entries(grouped).map(([category, items]) => {
          const catCompleted = items.filter((i) => completedIds.includes(i.id)).length;
          return (
            <AnimatedCard key={category}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{categoryIcons[category] || '📋'}</span>
                  <h3 className="font-semibold text-white">{category}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">{catCompleted}/{items.length}</span>
                  <div className="w-16 bg-surface rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 bg-gradient-to-r from-primary to-teal rounded-full transition-all duration-500"
                      style={{ width: `${(catCompleted / items.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    checked={completedIds.includes(item.id)}
                    onToggle={toggleItem}
                  />
                ))}
              </div>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Overall progress bar */}
      <AnimatedCard>
        <ProgressBar
          percentage={progress}
          label="Overall Application Progress"
          color="from-primary via-teal to-cyan-400"
          height="h-4"
        />
      </AnimatedCard>

      {/* Referral */}
      <ReferralButton />
    </div>
    </PageTransition>
  );
}
