import React from 'react';
import { X, Check, AlertTriangle, ShieldCheck, FileText, Calendar, Building, Sparkles } from 'lucide-react';
import { ArchivalDocument, ArchivalMaterial } from '../types/archive';

interface DocumentInspectorModalProps {
  document: ArchivalDocument | null;
  onClose: () => void;
  onCleanMaterial?: (docId: string, material: ArchivalMaterial) => void;
}

const MATERIAL_LABELS: Record<ArchivalMaterial, { name: string; icon: string; desc: string }> = {
  grapa_oxidada: {
    name: 'Grapa Metálica Oxidada',
    icon: '📎',
    desc: 'Genera manchas de óxido que perforan químicamente la celulosa del papel.',
  },
  clip_metalico: {
    name: 'Clip Metálico',
    icon: '🖇️',
    desc: 'Produce deformación mecánica y riesgo de corrosión a largo plazo.',
  },
  post_it: {
    name: 'Nota Adhesiva (Post-It)',
    icon: '📑',
    desc: 'El adhesivo contiene componentes ácidos que amarillean y dañan el documento original.',
  },
  caucho_vencido: {
    name: 'Banda Elástica / Caucho',
    icon: '➰',
    desc: 'Se cristaliza con el tiempo y se funde con la tinta y el papel destruyendo el texto.',
  },
  cinta_adhesiva: {
    name: 'Cinta Pegante / Adhesiva',
    icon: '🏷️',
    desc: 'Adhesivo reactivo incompatible con la conservación permanente de documentos.',
  },
  gancho_legajador_plastico: {
    name: 'Gancho Legajador Plástico (Aprobado)',
    icon: '🛡️',
    desc: 'Material neutro reglamentario de conservación.',
  },
};

export const DocumentInspectorModal: React.FC<DocumentInspectorModalProps> = ({
  document,
  onClose,
  onCleanMaterial,
}) => {
  if (!document) return null;

  const remainingMaterials = (document.hasAbrasiveMaterial || []).filter(
    (m) => !(document.cleanedMaterials || []).includes(m)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 block">
                {document.code} · {document.documentType}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {document.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Abrasive Material Alert / Interactive Cleaning */}
          {remainingMaterials.length > 0 ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Material Abrasivo Detectado (Conservación Preventiva)</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                El Acuerdo 002/2014 del AGN exige la retirada de cualquier elemento metálico o adhesivo antes de archivar. Haz clic en el botón para retirarlo de manera segura:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {remainingMaterials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => onCleanMaterial?.(document.id, mat)}
                    className="flex items-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{MATERIAL_LABELS[mat].icon}</span>
                    <span>Retirar {MATERIAL_LABELS[mat].name}</span>
                    <Sparkles className="w-3.5 h-3.5 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (document.hasAbrasiveMaterial || []).length > 0 ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Documento completamente desmetalizado y limpio. Material no reactivo verificado conforme a la norma técnica AGN.
              </span>
            </div>
          ) : null}

          {/* Facsimile Metadata Table */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block font-medium">Unidad Productora</span>
              <span className="text-slate-800 font-semibold">{document.producerOffice}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Fecha de Producción / Emisión</span>
              <span className="text-slate-800 font-semibold font-mono-numbers">{document.date}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Remitente / Suscriptor</span>
              <span className="text-slate-800">{document.senderOrSigner}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Destinatario / Asunto</span>
              <span className="text-slate-800">{document.recipient}</span>
            </div>
          </div>

          {/* Document Content Facsimile Display */}
          <div className="border border-slate-300 rounded-xl bg-white shadow-inner p-6 relative font-serif text-slate-800">
            {/* Stamp simulation */}
            {document.hasOfficialStamp && (
              <div className="absolute top-4 right-4 border-2 border-red-700/60 rounded px-2 py-1 text-[10px] text-red-700/80 font-mono rotate-6 uppercase select-none pointer-events-none">
                RADICADO SENA
                <br />
                {document.date} - RECIBIDO
              </div>
            )}

            <div className="whitespace-pre-line text-sm leading-relaxed max-h-60 overflow-y-auto pr-2 font-mono text-slate-700 bg-slate-50/50 p-4 rounded border border-slate-100">
              {document.contentSnippet}
            </div>

            {document.hasSignature && (
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-sans text-slate-500">
                <span>Firma autógrafa / Digital verificada: Sí</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Valor administrativo y legal activo
                </span>
              </div>
            )}
          </div>

          {/* Pedagogical Note */}
          {document.notes && (
            <div className="text-xs p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-lg">
              <span className="font-bold">Observación del Instructor: </span>
              {document.notes}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Inspección
          </button>
        </div>
      </div>
    </div>
  );
};
