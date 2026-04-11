import { AnimatedCard } from './ui/AnimatedCard';

export default function StreakCounter({ streak }) {
  const isHot = streak >= 3;
  const isOnFire = streak >= 7;

  return (
    <AnimatedCard hoverable={false} className={`flex items-center gap-4 ${isOnFire ? 'border border-orange-500/30 bg-orange-500/5' : ''}`}>
      <div className={`text-4xl ${isHot ? 'animate-float' : ''}`}>
        {isOnFire ? '🔥' : streak >= 3 ? '⚡' : '📅'}
      </div>
      <div>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-black text-white">{streak}</span>
          <span className="text-sm text-muted mb-1">day{streak !== 1 ? 's' : ''}</span>
        </div>
        <p className="text-sm text-muted">
          {isOnFire
            ? '🔥 You\'re on fire! Keep it up!'
            : isHot
            ? '⚡ Great streak! Don\'t break it!'
            : 'Daily login streak'}
        </p>
      </div>
      {streak > 0 && (
        <div className="ml-auto">
          <div className="flex gap-1">
            {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < streak
                    ? isOnFire ? 'bg-orange-400' : 'bg-primary'
                    : 'bg-surface-border'
                }`}
              />
            ))}
          </div>
          {streak > 7 && <p className="text-xs text-muted text-right mt-1">+{streak - 7}</p>}
        </div>
      )}
    </AnimatedCard>
  );
}
