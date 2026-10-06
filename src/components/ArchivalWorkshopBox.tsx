import React, { useState } from 'react';
import { Building2, Maximize2, ShieldCheck } from 'lucide-react';
import portadaImg from '../assets/images/portada_archivo_gestion_1791302482389.jpg';

interface ArchivalWorkshopBoxProps {
  stageTitle?: string;
  badgeText?: string;
  compact?: boolean;
}

export const ArchivalWorkshopBox: React.FC<ArchivalWorkshopBoxProps> = ({
  stageTitle = 'Ciclo de la Organización Documental',
  badgeText = 'Taller SENA',
  compact = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div
        className={`relative group overflow-hidden rounded-xl border border-emerald-600/40 shadow-xs bg-slate-900 shrink-0 ${
          compact ? 'w-full sm:w-64 h-24 sm:h-28' : 'w-full sm:w-72 md:w-80 h-32 sm:h-36'
        }`}
      >
        {/* Archival Workshop Photo */}
        <img
          src={portadaImg}
          alt="Ciclo de la Organización Documental - Taller Archivístico SENA"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* High-Contrast Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/40 to-transparent pointer-events-none" />

        {/* Top Mini Badge */}
        <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white border border-white/20 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 shadow-xs">
          <Building2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{badgeText}</span>
        </div>

        {/* Zoom Lightbox Trigger */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-2 right-2 bg-black/60 hover:bg-black/90 text-white p-1 rounded transition-colors cursor-pointer"
          title="Ampliar imagen"
        >
          <Maximize2 className="w-3 h-3" />
        </button>

        {/* Title Overlay in bottom */}
        <div className="absolute bottom-2 left-2.5 right-2 text-white">
          <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-300 block leading-tight">
            Ciclo de la Organización Documental
          </span>
          <h4 className="text-[11px] sm:text-xs font-bold leading-tight truncate drop-shadow-xs text-white">
            {stageTitle}
          </h4>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 no-print">
          <div className="bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full border border-slate-700 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <div>
                <h4 className="font-bold text-sm">
                  Ciclo de la Organización Documental · Taller Práctico de Archivo SENA
                </h4>
                <span className="text-xs text-slate-400">
                  Aprendices e Instructor en el Depósito y Archivo de Gestión
                </span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
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
    </>
  );
};
