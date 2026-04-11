export default function ProgressBar({ percentage, color = 'from-primary to-teal', label, showLabel = true, height = 'h-3' }) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted">{label}</span>
          <span className="text-sm font-bold text-white">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-surface rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} rounded-full bg-gradient-to-r ${color} progress-bar-fill transition-all duration-1000 ease-out relative overflow-hidden`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 shimmer-effect" />
        </div>
      </div>
    </div>
  );
}
