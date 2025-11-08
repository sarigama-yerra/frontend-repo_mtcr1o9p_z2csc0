import React, { useEffect, useMemo, useState } from 'react';
import { PlusCircle, Edit3, Trash2, Folder } from 'lucide-react';
import TemplateBuilder from './TemplateBuilder';

function loadTemplates() {
  try {
    const raw = localStorage.getItem('announcement_templates');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export default function TemplateManager({ onSelect }) {
  const [templates, setTemplates] = useState(loadTemplates());
  const [showBuilder, setShowBuilder] = useState(false);

  useEffect(() => {
    const handler = () => setTemplates(loadTemplates());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const remove = (id) => {
    const next = templates.filter((t) => t.id !== id);
    localStorage.setItem('announcement_templates', JSON.stringify(next));
    setTemplates(next);
  };

  const handleSaved = (tpl) => {
    setShowBuilder(false);
    const next = loadTemplates();
    setTemplates(next);
    onSelect?.(tpl);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder className="h-5 w-5 text-white/80" />
          <h3 className="text-lg font-semibold text-white">Templates</h3>
        </div>
        <button onClick={() => setShowBuilder(true)} className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700">
          <PlusCircle className="h-4 w-4" /> New Template
        </button>
      </div>

      {showBuilder ? (
        <TemplateBuilder onClose={handleSaved} />
      ) : (
        <div className="grid gap-3">
          {templates.length === 0 && (
            <p className="text-sm text-white/60">No templates yet. Create one to get started.</p>
          )}
          {templates.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 p-3">
              <div>
                <p className="font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/60">{t.fields.length} fields</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onSelect?.(t)} className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300 hover:bg-emerald-500/20">
                  Use
                </button>
                <button onClick={() => remove(t.id)} className="rounded-md border border-red-500/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
