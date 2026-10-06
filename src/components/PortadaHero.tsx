import React, { useState } from 'react';
import { 
  FolderSync, 
  Layers, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import portadaImg from '../assets/images/portada_archivo_gestion_1791302482389.jpg';

interface PortadaHeroProps {
  onStartOrContinue: () => void;
  onSelectStage: (stageId: number) => void;
  currentStage: number;
}

export const PortadaHero: React.FC<PortadaHeroProps> = ({
  onStartOrContinue,
  onSelectStage,
  currentStage,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);

  // Phase matching
  const isPhase1Active = currentStage === 1 || currentStage === 2;
  const isPhase2Active = currentStage === 3;
  const isPhase3Active = currentStage >= 4;

  return (
    <div className="w-full bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        {/* Toggleable Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Servicio Nacional de Aprendizaje SENA · Centro de Servicios Administrativos
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Ocultar Portada' : 'Ver Portada Institucional'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-bold text-white bg-emerald-700 px-2.5 py-0.5 rounded-full">
                    Gestión Documental
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Técnico en Asistencia Administrativa
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-medium">
                    Ley 594 de 2000 & Acuerdo AGN 002/2014
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Ciclo de la Organización Documental
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
                  Simulador de formación práctica interactiva para el archivo de gestión. Aprende haciendo el tratamiento metódico de documentos acumulados: desde el desmetalizado y la clasificación por TRD, hasta la ordenación original, foliación con lápiz HB, rotulación de carpetas de 4 aletas e inventario en FUID oficial.
                </p>
              </div>

              {/* 3 Key Pillar Highlights - Fully Active Buttons for each Phase and Stage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {/* Botón Fase 1 */}
                <div
                  className={`relative group overflow-hidden rounded-xl border p-3 shadow-xs bg-slate-900 text-white min-h-[120px] flex flex-col justify-between transition-all cursor-pointer ${
                    isPhase1Active
                      ? 'border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-900/20'
                      : 'border-emerald-600/30 hover:border-emerald-400'
                  }`}
                  onClick={() => onSelectStage(1)}
                  title="Activar Fase 1: Desmetalizado y Clasificación TRD"
                >
                  <img
                    src={portadaImg}
                    alt="Fase 1"
                    className="absolute inset-0 w-full h-full object-cover object-left opacity-30 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-300">
                      Fase 1 · Diagnóstico
                    </span>
                    {isPhase1Active && (
                      <span className="text-[9px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full">
                        Activa
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 my-1">
                    <span className="text-xs font-bold text-white block truncate leading-tight">
                      Limpieza & Clasificación
                    </span>
                    <span className="text-[10px] text-slate-300 block truncate">
                      Desmetalizado y TRD
                    </span>
                  </div>

                  {/* Botones de acción directa de Etapa */}
                  <div className="relative z-10 flex items-center gap-1.5 pt-1 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectStage(1)}
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
                        currentStage === 1
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      Etapa 1
                    </button>
                    <button
                      onClick={() => onSelectStage(2)}
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors cursor-pointer ${
                        currentStage === 2
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      Etapa 2
                    </button>
                  </div>
                </div>

                {/* Botón Fase 2 */}
                <div
                  className={`relative group overflow-hidden rounded-xl border p-3 shadow-xs bg-slate-900 text-white min-h-[120px] flex flex-col justify-between transition-all cursor-pointer ${
                    isPhase2Active
                      ? 'border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-900/20'
                      : 'border-emerald-600/30 hover:border-emerald-400'
                  }`}
                  onClick={() => onSelectStage(3)}
                  title="Activar Fase 2: Ordenación y Principio de Orden Original"
                >
                  <img
                    src={portadaImg}
                    alt="Fase 2"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-30 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-300">
                      Fase 2 · Procedencia
                    </span>
                    {isPhase2Active && (
                      <span className="text-[9px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full">
                        Activa
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 my-1">
                    <span className="text-xs font-bold text-white block truncate leading-tight">
                      Ordenación Original
                    </span>
                    <span className="text-[10px] text-slate-300 block truncate">
                      Secuencia procedimental
                    </span>
                  </div>

                  {/* Botón de acción directa de Etapa */}
                  <div className="relative z-10 flex items-center gap-1.5 pt-1 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectStage(3)}
                      className={`w-full px-2 py-0.5 text-[10px] font-semibold rounded transition-colors text-center cursor-pointer ${
                        currentStage === 3
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      Etapa 3: Ordenar
                    </button>
                  </div>
                </div>

                {/* Botón Fase 3 */}
                <div
                  className={`relative group overflow-hidden rounded-xl border p-3 shadow-xs bg-slate-900 text-white min-h-[120px] flex flex-col justify-between transition-all cursor-pointer ${
                    isPhase3Active
                      ? 'border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-900/20'
                      : 'border-emerald-600/30 hover:border-emerald-400'
                  }`}
                  onClick={() => onSelectStage(4)}
                  title="Activar Fase 3: Foliación, Carpeta de 4 Aletas, FUID y Evaluación"
                >
                  <img
                    src={portadaImg}
                    alt="Fase 3"
                    className="absolute inset-0 w-full h-full object-cover object-right opacity-30 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-300">
                      Fase 3 · Custodia
                    </span>
                    {isPhase3Active && (
                      <span className="text-[9px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full">
                        Activa
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 my-1">
                    <span className="text-xs font-bold text-white block truncate leading-tight">
                      Foliación & FUID
                    </span>
                    <span className="text-[10px] text-slate-300 block truncate">
                      Carpeta 4 aletas & Evaluación
                    </span>
                  </div>

                  {/* Botones de acción directa de Etapa */}
                  <div className="relative z-10 flex items-center gap-1 pt-1 border-t border-white/10 flex-wrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectStage(4)}
                      className={`px-1.5 py-0.5 text-[9px] font-semibold rounded transition-colors cursor-pointer ${
                        currentStage === 4
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      E4: Foliar
                    </button>
                    <button
                      onClick={() => onSelectStage(5)}
                      className={`px-1.5 py-0.5 text-[9px] font-semibold rounded transition-colors cursor-pointer ${
                        currentStage === 5
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      E5: Rótulo
                    </button>
                    <button
                      onClick={() => onSelectStage(6)}
                      className={`px-1.5 py-0.5 text-[9px] font-semibold rounded transition-colors cursor-pointer ${
                        currentStage === 6
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      E6: FUID
                    </button>
                    <button
                      onClick={() => onSelectStage(7)}
                      className={`px-1.5 py-0.5 text-[9px] font-semibold rounded transition-colors cursor-pointer ${
                        currentStage === 7
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      E7: Nota
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 text-xs">
                <span className="flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Ambiente de Simulación Práctica SENA
                </span>
                <span className="text-slate-500 hidden sm:inline">
                  Etapa actual activa: <strong>Etapa {currentStage} de 7</strong>
                </span>
              </div>
            </div>

            {/* Right Picture Column: Cuadro Superior Derecho con la Imagen y el Título del Ciclo (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full relative group overflow-hidden rounded-2xl border-2 border-emerald-600/30 shadow-md bg-slate-900">
                {/* Photo Image */}
                <img
                  src={portadaImg}
                  alt="Ciclo de la Organización Documental - Aprendices e Instructor SENA en Depósito de Archivo"
                  className="w-full h-48 sm:h-56 lg:h-52 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white border border-white/20 px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                  <Building2 className="w-3 h-3 text-emerald-400" />
                  <span>Taller de Práctica Archivística SENA</span>
                </div>

                {/* Zoom Affordance Button */}
                <button
                  onClick={() => setIsImageZoomed(true)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-md transition-colors cursor-pointer"
                  title="Ampliar fotografía del taller"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Bottom Title on the image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block">
                    Ambiente Real de Formación
                  </span>
                  <h3 className="text-sm font-bold leading-tight drop-shadow-sm">
                    Ciclo de la Organización Documental
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    Depósito de Archivo · Expedientes Activos y Fondos Acumulados
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for zooming the image */}
      {isImageZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full border border-slate-700 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <div>
                <h4 className="font-bold text-sm">
                  Ciclo de la Organización Documental · Taller SENA
                </h4>
                <span className="text-xs text-slate-400">
                  Aprendices e Instructor en el Depósito y Archivo de Gestión
                </span>
              </div>
              <button
                onClick={() => setIsImageZoomed(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
            <div className="p-2 bg-black flex items-center justify-center">
              <img
                src={portadaImg}
                alt="Ciclo de la Organización Documental SENA"
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
