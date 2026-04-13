import storage from './storage';
import badgesData from '../data/badges.json';
import checklistData from '../data/checklist.json';
import { getProgressPercentage } from './scoring';

const REWARDS_KEY = 'edupath_rewards';

export function getRewardsState() {
  const fallback = {
    xp: 0,
    earnedBadgeIds: [],
    stats: {
      login_count: 0,
      chatbot_queries: 0,
      roi_calculated: 0,
      loan_checked: 0,
      sop_generated: 0,
      predictor_used: 0,
      timeline_viewed: 0,
      referrals: 0,
      loan_applied: 0,
      streak: 0,
    },
  };
  
  const saved = storage.get(REWARDS_KEY, null);
  if (!saved) return fallback;

  return {
    xp: saved.xp || 0,
    earnedBadgeIds: saved.earnedBadgeIds || [],
    stats: { ...fallback.stats, ...(saved.stats || {}) },
  };
}

function saveRewardsState(state) {
  storage.set(REWARDS_KEY, state);
}

export function trackEvent(eventName, delta = 1) {
  const state = getRewardsState();
  const completedIds = storage.get('edupath_checklist_completed', []);
  const checklistPct = getProgressPercentage(completedIds, checklistData.length);

  if (state.stats[eventName] !== undefined) {
    state.stats[eventName] += delta;
  }

  const newBadges = [];
  const statsWithChecklist = { ...state.stats, checklist_pct: checklistPct };

  badgesData.forEach((badge) => {
    if (state.earnedBadgeIds.includes(badge.id)) return;

    const conditionMet = evalCondition(badge.condition, statsWithChecklist);
    if (conditionMet) {
      state.earnedBadgeIds.push(badge.id);
      state.xp += badge.xp;
      newBadges.push(badge);
    }
  });

  saveRewardsState(state);
  return { newBadges, xp: state.xp };
}

function evalCondition(condition, stats) {
  try {
    const [stat, op, value] = condition.split(' ');
    const statVal = stats[stat] ?? 0;
    const numVal = parseFloat(value);
    if (op === '>=') return statVal >= numVal;
    if (op === '>') return statVal > numVal;
    if (op === '===') return statVal === numVal;
    if (op === '<=') return statVal <= numVal;
    return false;
  } catch {
    return false;
  }
}

export function getLevelInfo(xp) {
  const levels = [
    { level: 1, name: 'Explorer', minXP: 0, maxXP: 200, color: 'text-slate-400' },
    { level: 2, name: 'Aspirant', minXP: 200, maxXP: 500, color: 'text-blue-400' },
    { level: 3, name: 'Applicant', minXP: 500, maxXP: 1000, color: 'text-teal-400' },
    { level: 4, name: 'Scholar', minXP: 1000, maxXP: 2000, color: 'text-purple-400' },
    { level: 5, name: 'Champion', minXP: 2000, maxXP: 99999, color: 'text-yellow-400' },
  ];

  const current = [...levels].reverse().find((l) => xp >= l.minXP) || levels[0];
  const next = levels[Math.min(current.level, levels.length - 1)];

  const progress = next
    ? Math.round(((xp - current.minXP) / (next.maxXP - current.minXP)) * 100)
    : 100;

  return { ...current, next, progress, xp };
}

export function getEarnedBadges() {
  const state = getRewardsState();
  return badgesData.filter((b) => state.earnedBadgeIds.includes(b.id));
}

export function getAllBadgesWithStatus() {
  const state = getRewardsState();
  return badgesData.map((b) => ({
    ...b,
    earned: state.earnedBadgeIds.includes(b.id),
  }));
}

export function syncStreakBadges(streak) {
  const state = getRewardsState();
  state.stats.streak = streak;
  storage.set(REWARDS_KEY, state);
  trackEvent('login_count');
}
