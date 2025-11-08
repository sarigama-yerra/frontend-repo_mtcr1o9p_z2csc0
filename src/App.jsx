import React, { useEffect, useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import NavBar from './components/NavBar';
import TemplateManager from './components/TemplateManager';
import AnnouncementForm from './components/AnnouncementForm';

function getDefaultTemplates() {
  // Seed a couple of useful defaults if none exist
  try {
    const raw = localStorage.getItem('announcement_templates');
    if (raw) return JSON.parse(raw);
  } catch {}
  const seed = [
    {
      id: crypto.randomUUID(),
      name: 'Passenger Alert Template',
      pattern: 'कृपया {{name}} जी गेट नंबर {{gate}} पर पहुँचें।',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'gate', label: 'Gate Number', type: 'dropdown', options: ['1', '2', '3', '4', '5'] },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: 'Security Alert Template',
      pattern: 'सुरक्षा विभाग से अनुरोध है कि {{location}} पर तुरंत पहुँचे।',
      fields: [
        { key: 'location', label: 'Location / Area', type: 'text' },
      ],
    },
  ];
  localStorage.setItem('announcement_templates', JSON.stringify(seed));
  return seed;
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [templates, setTemplates] = useState(getDefaultTemplates());

  useEffect(() => {
    if (!selected && templates.length > 0) setSelected(templates[0]);
  }, [templates, selected]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <NavBar />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <HeroSection />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <TemplateManager onSelect={(tpl) => setSelected(tpl)} />
          </div>
          <div className="lg:col-span-3">
            <AnnouncementForm template={selected} />
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-500">
        Built for control rooms • Hindi TTS ready • Template-first workflow
      </footer>
    </div>
  );
}
