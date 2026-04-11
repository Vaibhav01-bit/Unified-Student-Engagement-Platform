import chatData from '../data/chatResponses.json';

/**
 * Keyword-based chatbot response engine
 */
export function getChatResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  const { keywords, default: defaultResponse } = chatData;

  // Check each keyword pattern
  for (const [keyword, data] of Object.entries(keywords)) {
    if (input.includes(keyword)) {
      return {
        text: data.response,
        suggestions: data.suggestions || [],
        isBot: true,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Default fallback
  return {
    text: defaultResponse,
    suggestions: ['Tell me about Canada', 'MBA programs', 'IELTS preparation', 'Education loans'],
    isBot: true,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create a user message object
 */
export function createUserMessage(text) {
  return {
    text,
    isBot: false,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format timestamp for display
 */
export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
