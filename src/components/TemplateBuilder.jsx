import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Save, Settings2 } from 'lucide-react';

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'number', label: 'Number' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
];

function cleanKey(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

export default function TemplateBuilder({ onClose }) {
  const [templateName, setTemplateName] = useState('New Template');
  const [fields, setFields] = useState([
    { id: crypto.randomUUID(), type: 'text', label: 'Name' },
  ]);
  const [optionsDraft, setOptionsDraft] = useState({});

  const addField = () => {
    setFields((f) => [
      ...f,
      { id: crypto.randomUUID(), type: 'text', label: 'Field' },
    ]);
  };

  const updateField = (id, patch) => {
    setFields((f) => f.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const removeField = (id) => {
    setFields((f) => f.filter((x) => x.id !== id));
  };

  const saveTemplate = () => {
    const stored = JSON.parse(localStorage.getItem('announcement_templates') || '[]');
    const template = {
      id: crypto.randomUUID(),
      name: templateName.trim() || 'Untitled Template',
      fields: fields.map((f) => ({
        key: cleanKey(f.label || 'field'),
        label: f.label || 'Field',
        type: f.type,
        options: f.type === 'dropdown' ? (optionsDraft[f.id]?.split(',').map((s) => s.trim()).filter(Boolean) || []) : undefined,
      })),
      // Default Hindi sentence builder pattern with tokens like {{name}}
      pattern: 'कृपया {{name}} जी {{location}} पर पहुँचे।',
    };
    const next = [...stored, template];
    localStorage.setItem('announcement_templates', JSON.stringify(next));
    onClose?.(template);
  };

  const canSave = useMemo(() => templateName.trim().length > 0 && fields.length > 0, [templateName, fields.length]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-white/80" />
          <h3 className="text-lg font-semibold text-white">Template Builder</h3>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm text-white/70">Template Name</label>
          <input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none focus:border-violet-400"
            placeholder="Passenger Alert Template"
          />
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-white/80">Fields</h4>
          <button onClick={addField} className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700">
            <Plus className="h-4 w-4" /> Add field
          </button>
        </div>

        <div className="grid gap-3">
          {fields.map((f) => (
            <div key={f.id} className="grid grid-cols-12 items-center gap-2">
              <select
                value={f.type}
                onChange={(e) => updateField(f.id, { type: e.target.value })}
                className="col-span-3 rounded-md border border-white/10 bg-white/10 px-2 py-2 text-sm text-white"
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="bg-slate-900 text-white">
                    {t.label}
                  </option>
                ))}
              </select>
              <input
                value={f.label}
                onChange={(e) => updateField(f.id, { label: e.target.value })}
                placeholder="Field label"
                className="col-span-7 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50"
              />
              <button onClick={() => removeField(f.id)} className="col-span-2 inline-flex items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20">
                <Trash2 className="h-4 w-4" />
              </button>
              {f.type === 'dropdown' && (
                <div className="col-span-12">
                  <input
                    value={optionsDraft[f.id] || ''}
                    onChange={(e) => setOptionsDraft((o) => ({ ...o, [f.id]: e.target.value }))}
                    placeholder="Comma separated options (e.g., 1, 2, 3, 4)"
                    className="mt-2 w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-1">
          <label className="mb-1 block text-sm text-white/70">Sentence Pattern</label>
          <p className="text-xs text-white/60">Use placeholders like {'{{name}}'}, {'{{location}}'}, {'{{gate_number}}'}. They will be replaced with field values.</p>
          <textarea
            defaultValue={'कृपया {{name}} जी {{location}} पर पहुँचे।'}
            onChange={(e) => {
              // store live pattern draft on fields state to bundle at save
              const val = e.target.value;
              setFields((f) => Object.assign([...f], { patternDraft: val }));
            }}
            className="mt-1 min-h-[80px] w-full rounded-md border border-white/10 bg-white/10 p-3 text-white placeholder-white/50"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button onClick={saveTemplate} disabled={!canSave} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60">
            <Save className="h-4 w-4" /> Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
