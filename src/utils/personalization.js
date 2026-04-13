import storage from './storage';
import checklistData from '../data/checklist.json';
import { getProgressPercentage } from './scoring';

const BEHAVIOR_KEY = 'edupath_behavior';

export function trackPageView(page) {
  const saved = storage.get(BEHAVIOR_KEY, null);
  const data = saved || { pages: {}, lastPage: null, totalViews: 0 };
  if (!data.pages) data.pages = {};
  if (!data.totalViews) data.totalViews = 0;
  
  data.pages[page] = (data.pages[page] || 0) + 1;
  data.lastPage = page;
  data.totalViews += 1;
  storage.set(BEHAVIOR_KEY, data);
}

export function getPersonalizedSuggestions(profile) {
  const saved = storage.get(BEHAVIOR_KEY, null);
  const behavior = saved || { pages: {}, totalViews: 0 };
  if (!behavior.pages) behavior.pages = {};
  
  const completedIds = storage.get('edupath_checklist_completed', []);
  const progress = getProgressPercentage(completedIds, checklistData.length);
  const suggestions = [];

  if (progress < 25) {
    suggestions.push({
      id: 'start_checklist',
      title: 'Start Your Checklist',
      desc: 'You\'ve completed less than 25% of your documents. Begin with your passport today.',
      icon: '📋',
      path: '/progress',
      priority: 10,
      color: 'border-l-blue-500',
    });
  }

  if (!behavior.pages['/finance'] && profile.budget) {
    suggestions.push({
      id: 'roi_calc',
      title: 'Calculate Your ROI',
      desc: `With your ${profile.targetCourse} ambitions, see if the investment pays off.`,
      icon: '📈',
      path: '/finance',
      priority: 8,
      color: 'border-l-teal-500',
    });
  }

  if (!behavior.pages['/predictor']) {
    suggestions.push({
      id: 'try_predictor',
      title: 'Know Your Admission Odds',
      desc: 'Enter your GPA and IELTS to get your admission probability score.',
      icon: '🎯',
      path: '/predictor',
      priority: 7,
      color: 'border-l-purple-500',
    });
  }

  if (!behavior.pages['/sop']) {
    suggestions.push({
      id: 'generate_sop',
      title: 'Draft Your SOP with AI',
      desc: 'Let our AI write a personalized Statement of Purpose for your application.',
      icon: '✍️',
      path: '/sop',
      priority: 9,
      color: 'border-l-yellow-500',
    });
  }

  if (!behavior.pages['/loans']) {
    suggestions.push({
      id: 'explore_loans',
      title: 'Explore Loan Options',
      desc: 'Check personalized loan offers from top banks for your target country.',
      icon: '🏦',
      path: '/loans',
      priority: 8,
      color: 'border-l-orange-500',
    });
  }

  if (!behavior.pages['/content']) {
    suggestions.push({
      id: 'read_insights',
      title: 'Read AI Insights',
      desc: 'Fresh articles on loans, country comparisons, and IELTS strategies.',
      icon: '📰',
      path: '/content',
      priority: 5,
      color: 'border-l-pink-500',
    });
  }

  return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

export function getMostVisitedSection() {
  const data = storage.get(BEHAVIOR_KEY, { pages: {} });
  if (!data.pages) return null;
  const entries = Object.entries(data.pages);
  if (entries.length === 0) return null;
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}
