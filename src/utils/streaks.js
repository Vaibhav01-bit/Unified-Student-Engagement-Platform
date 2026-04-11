import storage from './storage';

const STREAK_KEY = 'edupath_streak';
const ACTIVITY_KEY = 'edupath_last_activity';

function toDateString(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Update streak on app load
 * Returns { streak, isNew, lastLogin }
 */
export function updateStreak() {
  const today = toDateString(new Date());
  const streakData = storage.get(STREAK_KEY, { streak: 0, lastLogin: null });

  if (!streakData.lastLogin) {
    // First visit
    const newData = { streak: 1, lastLogin: today };
    storage.set(STREAK_KEY, newData);
    return { ...newData, isNew: true };
  }

  if (streakData.lastLogin === today) {
    // Already visited today
    return { ...streakData, isNew: false };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toDateString(yesterday);

  let newStreak;
  if (streakData.lastLogin === yesterdayStr) {
    newStreak = streakData.streak + 1;
  } else {
    newStreak = 1; // Streak broken
  }

  const newData = { streak: newStreak, lastLogin: today };
  storage.set(STREAK_KEY, newData);
  return { ...newData, isNew: newStreak > streakData.streak };
}

/**
 * Get current streak without updating
 */
export function getStreak() {
  const data = storage.get(STREAK_KEY, { streak: 0, lastLogin: null });
  return data.streak;
}

/**
 * Update last activity timestamp
 */
export function updateActivity() {
  storage.set(ACTIVITY_KEY, new Date().toISOString());
}

/**
 * Check if user has been inactive
 * Returns true if inactive for more than `days` days
 */
export function isInactive(days = 2) {
  const lastActivity = storage.get(ACTIVITY_KEY, null);
  if (!lastActivity) return false;

  const diffMs = Date.now() - new Date(lastActivity).getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > days;
}
