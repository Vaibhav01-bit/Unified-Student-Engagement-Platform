import { Check } from 'lucide-react';

export default function ChecklistItem({ item, checked, onToggle }) {
  const { label, category } = item;

  return (
    <div
      className={`checklist-item flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
        checked ? 'bg-teal/10 border border-teal/20' : 'bg-surface hover:bg-surface-card border border-transparent hover:border-surface-border'
      }`}
      onClick={() => onToggle(item.id)}
    >
      {/* Checkbox */}
      <div
        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 ${
          checked
            ? 'bg-teal border-teal'
            : 'border-surface-border group-hover:border-primary/50'
        }`}
      >
        {checked && <Check size={12} className="text-white" strokeWidth={3} />}
      </div>

      {/* Label */}
      <span
        className={`text-sm flex-1 transition-all duration-200 ${
          checked ? 'text-muted line-through' : 'text-white'
        }`}
      >
        {label}
      </span>

      {/* Badge */}
      {checked && (
        <span className="text-xs text-teal-400 font-medium animate-fade-in">Done ✓</span>
      )}
    </div>
  );
}
