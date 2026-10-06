import React from 'react';
import { X, BookCheck, ExternalLink, ShieldCheck } from 'lucide-react';
import { NORMATIVE_FRAMEWORK } from '../data/casesData';

interface NormativeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NormativeModal: React.FC<NormativeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <BookCheck className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Normatividad Archivística Colombiana (AGN)
              </h3>
              <span className="text-xs text-slate-500">
                Marco Legal Aplicado al Archivo de Gestión en Entidades Públicas y SENA
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {NORMATIVE_FRAMEWORK.map((norm, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs bg-slate-800 text-white px-2 py-0.5 rounded font-mono">
                    {norm.norma}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{norm.title}</h4>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {norm.article}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-100">
                "{norm.excerpt}"
              </p>
            </div>
          ))}

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong>Importancia en la función del Asistente Administrativo: </strong>
              El desconocimiento de la Ley 594 de 2000 no exime de responsabilidad disciplinaria ante la Procuraduría General de la Nación. Todo servidor o contratista público que entregue o reciba un puesto de trabajo debe entregar los archivos de gestión inventariados mediante FUID reglamentario.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Normatividad
          </button>
        </div>
      </div>
    </div>
  );
};
