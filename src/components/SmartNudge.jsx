import { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { updateActivity } from '../utils/streaks';
import { AnimatedCard } from './ui/AnimatedCard';

export default function SmartNudge({ message, cta, ctaPath, onDismiss }) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    updateActivity();
    onDismiss?.();
  };

  const handleCta = () => {
    updateActivity();
    handleDismiss();
    if (ctaPath) navigate(ctaPath);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-in">
      <AnimatedCard className="border border-primary/40 bg-gradient-to-br from-primary/20 to-surface-card shadow-xl shadow-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0">
            <Bell size={20} className="text-blue-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-1">Hey! 👋</p>
            <p className="text-sm text-muted leading-relaxed">{message}</p>
            {cta && (
              <button
                onClick={handleCta}
                className="mt-3 text-xs font-semibold text-blue-300 hover:text-white transition-colors underline-offset-2 hover:underline"
              >
                {cta} →
              </button>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg hover:bg-surface transition-colors text-muted hover:text-white flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      </AnimatedCard>
    </div>
  );
}
