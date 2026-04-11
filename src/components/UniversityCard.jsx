export default function UniversityCard({ university }) {
  const { name, country, flag, course, fees, ranking, acceptanceRate, duration, degree } = university;

  const feesFormatted = fees >= 1000
    ? `$${(fees / 1000).toFixed(0)}k`
    : `$${fees}`;

  const rankColor = ranking <= 20 ? 'text-yellow-400' : ranking <= 100 ? 'text-blue-400' : 'text-muted';

  return (
    <div className="card-hover group animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{flag}</span>
          <div>
            <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-sm text-muted">{country}</p>
          </div>
        </div>
        <span className={`badge bg-surface border border-surface-border ${rankColor} text-xs`}>
          #{ranking} QS
        </span>
      </div>

      {/* Course & Degree */}
      <div className="flex items-center gap-2 mb-4">
        <span className="badge bg-primary/20 text-blue-300 border border-primary/30">{course}</span>
        <span className="badge bg-teal/20 text-teal-300 border border-teal/30">{degree}</span>
        <span className="text-xs text-muted ml-auto">{duration}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface rounded-xl p-3">
          <p className="text-xs text-muted mb-1">Annual Fees</p>
          <p className="text-lg font-bold text-white">{feesFormatted}</p>
          <p className="text-xs text-muted">USD / year</p>
        </div>
        <div className="bg-surface rounded-xl p-3">
          <p className="text-xs text-muted mb-1">Acceptance</p>
          <p className="text-lg font-bold text-white">{acceptanceRate}%</p>
          <div className="w-full bg-surface-border rounded-full h-1 mt-1">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-primary to-teal"
              style={{ width: `${acceptanceRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
