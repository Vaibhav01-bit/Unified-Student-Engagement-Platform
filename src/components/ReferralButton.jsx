import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

export default function ReferralButton() {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}?ref=EDUPATH${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="card border border-teal/20 bg-gradient-to-br from-teal/10 to-transparent">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-teal/20 flex items-center justify-center flex-shrink-0">
          <Share2 size={20} className="text-teal-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Refer a Friend</h3>
          <p className="text-sm text-muted mt-1">Share EduPath and help a friend start their study abroad journey!</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-surface border border-surface-border rounded-xl px-3 py-2">
          <p className="text-xs text-muted truncate">{referralLink}</p>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
            copied
              ? 'bg-green-500/20 border border-green-500/40 text-green-400'
              : 'btn-teal'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
