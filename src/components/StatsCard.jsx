export default function StatsCard({ icon, value, label, color = 'text-primary', bg = 'bg-primary/10', trend }) {
  return (
    <div className="card flex items-center gap-4 animate-slide-up">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        <p className="text-sm text-muted truncate">{label}</p>
      </div>
      {trend && (
        <div className="text-xs text-green-400 font-medium flex-shrink-0">{trend}</div>
      )}
    </div>
  );
}
