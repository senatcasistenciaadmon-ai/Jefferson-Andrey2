import React, { useState } from 'react';
import { X, BookOpen, Search } from 'lucide-react';
import { ARCHIVAL_GLOSSARY } from '../data/casesData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = ARCHIVAL_GLOSSARY.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Glosario Archivístico · Vocabulario Técnico
              </h3>
              <span className="text-xs text-slate-500">
                Terminología Oficial del Archivo General de la Nación (AGN) y el SENA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar término archivístico (ej: Foliación, TRD, Procedencia...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200 rounded-xl space-y-1.5"
            >
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>{item.term}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-4">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Glosario
          </button>
        </div>
      </div>
    </div>
  );
};
