import React, { useState } from 'react';
import { X, Layers, Search, Clock, Archive, Info } from 'lucide-react';
import { OFFICIAL_TRD_SERIES } from '../data/casesData';

interface TRDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TRDModal: React.FC<TRDModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredSeries = OFFICIAL_TRD_SERIES.filter(
    (serie) =>
      serie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serie.code.includes(searchTerm) ||
      serie.subseries.some((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.code.includes(searchTerm)
      )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Tabla de Retención Documental (TRD) Oficial · SENA
              </h3>
              <span className="text-xs text-slate-500">
                Instrumento Técnico de Valoración Archivística (Ley 594 de 2000)
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
              placeholder="Buscar por código de serie, subserie o nombre de trámite..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {filteredSeries.map((serie) => (
            <div
              key={serie.code}
              className="border border-slate-200 rounded-xl overflow-hidden shadow-xs"
            >
              <div className="bg-emerald-50/60 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-emerald-700 text-white px-2 py-0.5 rounded">
                    SERIE {serie.code}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 uppercase">{serie.name}</h4>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {serie.subseries.map((sub) => (
                  <div key={sub.code} className="p-4 bg-white hover:bg-slate-50 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {sub.code}
                        </span>
                        <span className="font-bold text-slate-800 text-sm">{sub.name}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono-numbers">
                        <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-semibold border border-blue-200">
                          Gestión: {sub.retentionGestionYears} años
                        </span>
                        <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold border border-amber-200">
                          Central: {sub.retentionCentralYears} años
                        </span>
                        <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-200">
                          Disp: {sub.finalDisposition}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px] bg-slate-50 p-2.5 rounded">
                      <strong>Procedimiento & Disposición: </strong>
                      {sub.procedureNotes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Convenciones de Disposición Final (AGN):</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono-numbers">
              <div><strong>CT:</strong> Conservación Total</div>
              <div><strong>E:</strong> Eliminación</div>
              <div><strong>M:</strong> Microfilmación / Digitalización</div>
              <div><strong>S:</strong> Selección o Muestreo</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar TRD
          </button>
        </div>
      </div>
    </div>
  );
};
