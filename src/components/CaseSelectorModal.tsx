import React from 'react';
import { X, Folder, Clock, CheckCircle2, User, Hash, ChevronRight } from 'lucide-react';
import { CaseStudy } from '../types/archive';
import { INITIAL_CASES } from '../data/casesData';
import portadaImg from '../assets/images/portada_archivo_gestion_1791302482389.jpg';

interface CaseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
  apprenticeName: string;
  setApprenticeName: (name: string) => void;
  apprenticeFicha: string;
  setApprenticeFicha: (ficha: string) => void;
}

export const CaseSelectorModal: React.FC<CaseSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCaseId,
  onSelectCase,
  apprenticeName,
  setApprenticeName,
  apprenticeFicha,
  setApprenticeFicha,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Selección de Caso Práctico & Datos del Aprendiz
            </h3>
            <span className="text-xs text-slate-500">
              Expedientes reales de simulación para Asistencia Administrativa SENA
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Apprentice profile inputs */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Datos para el Certificado Oficial SENA
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Nombre Completo del Aprendiz
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={apprenticeName}
                    onChange={(e) => setApprenticeName(e.target.value)}
                    placeholder="Ej. Juan David Restrepo"
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">
                  Número de Ficha de Caracterización
                </label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={apprenticeFicha}
                    onChange={(e) => setApprenticeFicha(e.target.value)}
                    placeholder="Ej. 2849012"
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cases List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Casos Disponibles para la Simulación
            </span>

            {INITIAL_CASES.map((item) => {
              const isSelected = item.id === selectedCaseId;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectCase(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 border border-emerald-600/30 shadow-2xs bg-slate-900">
                      <img
                        src={portadaImg}
                        alt="Caso de Archivo"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />
                      <div className="absolute bottom-1 left-1 text-[9px] font-bold text-emerald-300">
                        SENA
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-xs text-slate-500 font-medium">
                          {item.code}
                        </span>
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                          Nivel {item.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {item.contextDescription}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 sm:self-center">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Activo
                      </span>
                    ) : (
                      <button className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                        <span>Iniciar</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Comenzar Práctica con este Caso
          </button>
        </div>
      </div>
    </div>
  );
};
