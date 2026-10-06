import React from 'react';
import { BookOpen, FolderCheck, GraduationCap, RotateCcw, ShieldCheck, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulation' | 'trd' | 'normative' | 'glossary';
  setActiveTab: (tab: 'simulation' | 'trd' | 'normative' | 'glossary') => void;
  onResetCase: () => void;
  onOpenInstructor: () => void;
  currentCaseTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onResetCase,
  onOpenInstructor,
  currentCaseTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (Actions) */}
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-xs">
              <FolderCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                Simulador Archivo de Gestión · SENA
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                Técnico en Asistencia Administrativa · Competencia Archivística
              </span>
            </div>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                activeTab === 'simulation'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Simulador Práctico
            </button>
            <button
              onClick={() => setActiveTab('trd')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                activeTab === 'trd'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Tabla de Retención (TRD)
            </button>
            <button
              onClick={() => setActiveTab('normative')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                activeTab === 'normative'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Normatividad AGN
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                activeTab === 'glossary'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                  : ''
              }`}
            >
              Glosario Técnico
            </button>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenInstructor}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer whitespace-nowrap"
              title="Consultar al Instructor SENA con 10 años de experiencia"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Instructor SENA</span>
            </button>
            <button
              onClick={onResetCase}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
              title="Reiniciar expediente actual"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
