import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { generateTimeline } from '../utils/timeline';

const statusColors = {
  prep: 'bg-blue-500',
  apply: 'bg-teal-500',
  offer: 'bg-yellow-500',
  finance: 'bg-orange-500',
  visa: 'bg-red-500',
  travel: 'bg-emerald-500',
};

const statusLabels = {
  prep: { label: 'Preparation', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  apply: { label: 'Application', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  offer: { label: 'Offer Stage', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  finance: { label: 'Finance', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  visa: { label: 'Visa', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  travel: { label: 'Travel', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
};

export default function Timeline() {
  const [intake, setIntake] = useState('Sep');
  const timeline = generateTimeline(intake);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Application Timeline</h1>
        <p className="text-muted text-sm mt-1">Your step-by-step road map to study abroad</p>
      </div>

      {/* Intake Selector */}
      <div className="card">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted mb-2">Select Your Target Intake</p>
            <div className="flex gap-3">
              {['Sep', 'Jan'].map((opt) => (
                <button
                  key={opt}
                  id={`intake-${opt.toLowerCase()}`}
                  onClick={() => setIntake(opt)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    intake === opt
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-surface border border-surface-border text-muted hover:text-white hover:border-primary/30'
                  }`}
                >
                  {opt === 'Sep' ? '🍂 September Intake' : '❄️ January Intake'}
                </button>
              ))}
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-muted">Total Steps</p>
            <p className="text-2xl font-bold text-white">{timeline.length}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusLabels).map(([key, { label, color }]) => (
          <span key={key} className={`badge border ${color}`}>{label}</span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-teal to-emerald-500 opacity-30" />

        <div className="space-y-4">
          {timeline.map((step, i) => {
            const isExpanded = expanded === step.step;
            return (
              <div
                key={step.step}
                className={`relative pl-16 animate-slide-in`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Step circle */}
                <div
                  className={`absolute left-0 w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-2xl shadow-lg border-2 border-bg z-10 cursor-pointer hover:scale-110 transition-transform`}
                  onClick={() => setExpanded(isExpanded ? null : step.step)}
                >
                  {step.icon}
                </div>

                {/* Step card */}
                <div
                  className={`card cursor-pointer transition-all duration-200 hover:border-primary/40 ${
                    isExpanded ? 'border-primary/40' : ''
                  }`}
                  onClick={() => setExpanded(isExpanded ? null : step.step)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-muted">Step {step.step}</span>
                        <span className={`badge border text-xs ${statusLabels[step.status]?.color}`}>
                          {statusLabels[step.status]?.label}
                        </span>
                      </div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-muted mt-1">📅 {step.months}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-muted">Due</p>
                        <p className="text-sm font-semibold text-white">{step.dueDate}</p>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-surface-border animate-fade-in">
                      <p className="text-sm text-white/90 leading-relaxed">{step.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download prompt */}
      <div className="card border border-primary/20 bg-primary/5 text-center py-6">
        <Calendar size={32} className="mx-auto text-primary mb-3" />
        <p className="font-semibold text-white mb-1">All steps sync to your progress tracker</p>
        <p className="text-sm text-muted">Mark items complete in the Progress page to keep everything on track</p>
      </div>
    </div>
  );
}
