import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, RotateCcw, PlayCircle, FileText } from 'lucide-react';

function renderPattern(pattern, values) {
  return pattern.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const k = String(key).trim();
    return values[k] ?? '';
  });
}

function FieldInput({ field, value, onChange }) {
  const common = 'w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50';
  if (field.type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={common + ' min-h-[88px]'}
        placeholder={field.label}
      />
    );
  }
  if (field.type === 'dropdown') {
    return (
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={common}
      >
        <option value="" className="bg-slate-900 text-white">Select {field.label}</option>
        {(field.options || []).map((opt) => (
          <option key={opt} value={opt} className="bg-slate-900 text-white">
            {opt}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === 'number') {
    return (
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={common}
        placeholder={field.label}
      />
    );
  }
  if (field.type === 'date' || field.type === 'time') {
    return (
      <input
        type={field.type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={common}
        placeholder={field.label}
      />
    );
  }
  return (
    <input
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={common}
      placeholder={field.label}
    />
  );
}

export default function AnnouncementForm({ template }) {
  const [values, setValues] = useState({});
  const [text, setText] = useState('');
  const audioRef = useRef(null);

  const pattern = template?.pattern || 'कृपया {{name}} जी {{location}} पर पहुँचें।';

  useEffect(() => {
    const v = {};
    template?.fields?.forEach((f) => {
      v[f.key] = '';
    });
    setValues(v);
  }, [template]);

  useEffect(() => {
    setText(renderPattern(pattern, values));
  }, [pattern, values]);

  const reset = () => {
    const v = {};
    template?.fields?.forEach((f) => (v[f.key] = ''));
    setValues(v);
  };

  const synthesize = async () => {
    // For now use browser SpeechSynthesis for Hindi. Can be switched to backend TTS later.
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'hi-IN';
    utter.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-white/80" />
        <h3 className="text-lg font-semibold text-white">Announcement</h3>
      </div>

      {!template ? (
        <p className="text-sm text-white/60">Select a template to begin.</p>
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-3">
            {template.fields.map((f) => (
              <div key={f.key} className="grid gap-1">
                <label className="text-sm text-white/70">{f.label}</label>
                <FieldInput
                  field={f}
                  value={values[f.key]}
                  onChange={(val) => setValues((v) => ({ ...v, [f.key]: val }))}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-white/70">Preview Text</label>
            <div className="rounded-md border border-white/10 bg-white/10 p-3 text-white/90">
              {text || '—'}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={synthesize} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white">
              <PlayCircle className="h-5 w-5" /> Play Voice
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-white/90">
              <RotateCcw className="h-5 w-5" /> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
