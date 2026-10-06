import React from 'react';
import { 
  CheckCircle2, 
  Wrench, 
  Layers, 
  ArrowUpDown, 
  FileEdit, 
  FolderLock, 
  ClipboardList, 
  Award 
} from 'lucide-react';

export interface StageInfo {
  id: number;
  title: string;
  shortName: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const STAGES: StageInfo[] = [
  {
    id: 1,
    title: 'Diagnóstico & Desmetalizado',
    shortName: '1. Desmetalizado',
    description: 'Retiro de material abrasivo (grapas oxidadas, clips, cauchos)',
    icon: Wrench,
  },
  {
    id: 2,
    title: 'Clasificación TRD',
    shortName: '2. Clasificación',
    description: 'Identificar Serie/Subserie y separar documentos de apoyo',
    icon: Layers,
  },
  {
    id: 3,
    title: 'Ordenación Original',
    shortName: '3. Ordenación',
    description: 'Organizar la secuencia lógica del trámite administrativo',
    icon: ArrowUpDown,
  },
  {
    id: 4,
    title: 'Depuración & Foliación',
    shortName: '4. Foliación',
    description: 'Foliar con lápiz HB en la esquina superior derecha',
    icon: FileEdit,
  },
  {
    id: 5,
    title: 'Carpeta 4 Aletas & Rótulo',
    shortName: '5. Rotulación',
    description: 'Almacenar y confeccionar el rótulo técnico reglamentario',
    icon: FolderLock,
  },
  {
    id: 6,
    title: 'Hoja Control & FUID',
    shortName: '6. FUID y Control',
    description: 'Diligenciar la hoja de control y registro oficial FUID AGN',
    icon: ClipboardList,
  },
  {
    id: 7,
    title: 'Evaluación & Rúbrica SENA',
    shortName: '7. Evaluación',
    description: 'Dictamen de competencia laboral y certificación práctica',
    icon: Award,
  },
];

interface StageProgressProps {
  currentStage: number;
  onSelectStage: (stageId: number) => void;
  maxUnlockedStage?: number;
}

export const StageProgress: React.FC<StageProgressProps> = ({
  currentStage,
  onSelectStage,
  maxUnlockedStage = 7,
}) => {
  return (
    <div className="w-full bg-white border-b border-slate-200 py-3 px-4 sm:px-6 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              ETAPA {currentStage} DE 7
            </span>
            <span className="text-sm font-bold text-slate-800">
              {STAGES[currentStage - 1]?.title || 'Etapa'}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Todas las botoneras activas (Navegación libre 1-7)
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            {STAGES[currentStage - 1]?.description || ''}
          </span>
        </div>

        {/* Desktop and Tablet Stepper Bar */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {STAGES.map((stage) => {
            const isCompleted = stage.id < currentStage;
            const isCurrent = stage.id === currentStage;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500/20'
                    : isCompleted
                    ? 'bg-emerald-50/80 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900'
                }`}
                title={`Ir a ${stage.title}`}
              >
                <div className="flex items-center gap-1.5 w-full justify-center sm:justify-start">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-slate-500'}`} />
                  )}
                  <span className="text-xs font-medium truncate hidden md:inline">
                    {stage.shortName}
                  </span>
                  <span className="text-xs font-bold md:hidden">
                    {stage.id}
                  </span>
                </div>
                {/* Progress bar line within item */}
                <div className="w-full mt-1.5 bg-black/10 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      isCompleted ? 'bg-emerald-500 w-full' : isCurrent ? 'bg-emerald-300 w-full' : 'w-1/4 bg-slate-300'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
