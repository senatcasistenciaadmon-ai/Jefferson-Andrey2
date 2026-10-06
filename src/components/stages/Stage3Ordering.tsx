import React from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ArrowRight, 
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { ArchivalDocument } from '../../types/archive';
import { ArchivalWorkshopBox } from '../ArchivalWorkshopBox';

interface Stage3Props {
  orderedDocs: ArchivalDocument[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onAutoSortByProcedure: () => void;
  onInspectDocument: (doc: ArchivalDocument) => void;
  onNextStage: () => void;
}

export const Stage3Ordering: React.FC<Stage3Props> = ({
  orderedDocs,
  onMoveUp,
  onMoveDown,
  onAutoSortByProcedure,
  onInspectDocument,
  onNextStage,
}) => {
  // Check if every document is at its correctOrderIndex (1-based)
  const isOrderCorrect = orderedDocs.every(
    (doc, idx) => doc.correctOrderIndex === idx + 1
  );

  return (
    <div className="space-y-6">
      {/* Pedagogical Directive */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Etapa 3 · Ordenación Documental
              </span>
              <span className="text-xs text-slate-500">
                Principio de Orden Original & Secuencia del Trámite
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Ordenación del Expediente según el Principio de Orden Original
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              El <strong>Principio de Orden Original</strong> (Ley 594 de 2000, Art. 21) determina que los documentos que integran un expediente deben disponerse respetando la secuencia temporal y lógica en la que se surtió la actuación administrativa: desde el documento que originó el trámite (primera actuación al inicio) hasta la conclusión final (liquidación o acto de cierre).
            </p>
          </div>

          {/* Cuadro Superior Derecho con Imagen del Taller y Botón de Avance */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <ArchivalWorkshopBox
              stageTitle="Etapa 3: Ordenación Original"
              badgeText="Taller de Archivo SENA"
              compact={true}
            />

            <button
              onClick={() => {
                if (!isOrderCorrect) {
                  onAutoSortByProcedure();
                }
                onNextStage();
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
            >
              <span>Continuar a Etapa 4</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-2 text-xs">
            {isOrderCorrect ? (
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-100 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Secuencia procedimental correcta. Listo para foliar.
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-900 font-semibold bg-amber-100 px-3 py-1.5 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                El orden aún no cumple la cronología del trámite legal. Usa las flechas para reordenar.
              </span>
            )}
          </div>

          <button
            onClick={onAutoSortByProcedure}
            className="text-xs text-slate-600 hover:text-emerald-700 font-medium underline cursor-pointer"
          >
            ¿Necesitas ayuda? Aplicar orden cronológico automático
          </button>
        </div>
      </div>

      {/* Ordered List View representing the folder stack */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <span className="w-12 text-center">Posición</span>
            <span>Documento & Trámite Administrativo</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="hidden sm:inline">Fecha del Trámite</span>
            <span>Acciones</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {orderedDocs.map((doc, idx) => {
            const isPositionCorrect = doc.correctOrderIndex === idx + 1;

            return (
              <div
                key={doc.id}
                className={`p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isPositionCorrect ? 'hover:bg-slate-50/80' : 'bg-amber-50/30 hover:bg-amber-50/60'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Position Badge */}
                  <div
                    className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center font-mono-numbers shrink-0 font-bold text-xs ${
                      isPositionCorrect
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    <span>#{idx + 1}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 font-medium">
                        {doc.code}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {doc.documentType}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {doc.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono-numbers">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{doc.date}</span>
                  </div>

                  {/* Move Up / Down Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onMoveUp(idx)}
                      disabled={idx === 0}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        idx === 0
                          ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      title="Mover documento hacia el inicio (arriba)"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onMoveDown(idx)}
                      disabled={idx === orderedDocs.length - 1}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        idx === orderedDocs.length - 1
                          ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      title="Mover documento hacia el final (abajo)"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onInspectDocument(doc)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors ml-1 cursor-pointer"
                      title="Inspeccionar documento"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructor note */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Regla de Oro Archivística (AGN): </span>
          En un expediente administrativo, el documento número 1 (primer folio) es el que dio inicio al trámite o actuación (p.ej. Estudios Previos o Convocatoria). Los documentos subsecuentes se incorporan cronológicamente según su fecha de expedición o radicación hasta la liquidación o cierre definitivo.
        </div>
      </div>
    </div>
  );
};
