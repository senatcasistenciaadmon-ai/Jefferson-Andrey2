import React, { useState } from 'react';
import { 
  FileEdit, 
  CheckCircle2, 
  AlertCircle, 
  Pencil, 
  RotateCcw, 
  ArrowRight, 
  Info,
  ShieldAlert,
  Eye
} from 'lucide-react';
import { ArchivalDocument } from '../../types/archive';
import { ArchivalWorkshopBox } from '../ArchivalWorkshopBox';

interface Stage4Props {
  orderedDocs: ArchivalDocument[];
  userFolios: Record<string, number>;
  onSetFolio: (docId: string, folioNum: number) => void;
  onAutoFoliateAll: () => void;
  onClearFolios: () => void;
  onInspectDocument: (doc: ArchivalDocument) => void;
  onNextStage: () => void;
}

export const Stage4DepurationAndFoliation: React.FC<Stage4Props> = ({
  orderedDocs,
  userFolios,
  onSetFolio,
  onAutoFoliateAll,
  onClearFolios,
  onInspectDocument,
  onNextStage,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(orderedDocs[0]?.id || '');
  const [pencilType, setPencilType] = useState<'hb' | 'boligrafo'>('hb');
  const [showPenWarning, setShowPenWarning] = useState<boolean>(false);

  const selectedDoc = orderedDocs.find((d) => d.id === selectedDocId) || orderedDocs[0];
  const selectedDocIndex = orderedDocs.findIndex((d) => d.id === selectedDocId);

  // Check how many have been foliated correctly
  let correctFoliosCount = 0;
  orderedDocs.forEach((doc, idx) => {
    const expectedFolio = idx + 1;
    if (userFolios[doc.id] === expectedFolio) {
      correctFoliosCount++;
    }
  });

  const isAllFoliatedCorrectly = correctFoliosCount === orderedDocs.length && pencilType === 'hb';

  const handleApplyFolio = (folioNumber: number) => {
    if (pencilType === 'boligrafo') {
      setShowPenWarning(true);
      return;
    }
    setShowPenWarning(false);
    if (selectedDoc) {
      onSetFolio(selectedDoc.id, folioNumber);
      // Advance to next document if available
      if (selectedDocIndex < orderedDocs.length - 1) {
        setSelectedDocId(orderedDocs[selectedDocIndex + 1].id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Pedagogical Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Etapa 4 · Foliación Técnica
              </span>
              <span className="text-xs text-slate-500">
                Circular Conjunta AGN-DAFP 004 / 2003 & Guía Técnica AGN
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Depuración Final & Foliación con Lápiz HB de Grafito
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              La foliación es el acto administrativo mediante el cual se numeran de forma correlativa y continua los folios que integran la unidad documental. 
              <strong> Normas estrictas del AGN:</strong> Se debe foliar exclusivamente con lápiz de grafito negro tipo HB o B en la esquina superior derecha en el sentido de lectura. Jamás se debe usar bolígrafo ni corrector líquido.
            </p>
          </div>

          {/* Cuadro Superior Derecho con Imagen del Taller y Contador de Folios */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <ArchivalWorkshopBox
              stageTitle="Etapa 4: Foliación Lápiz HB"
              badgeText="Taller de Archivo SENA"
              compact={true}
            />

            <div className="flex flex-col items-end justify-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 shrink-0">
              <span className="text-xs text-slate-500 font-medium">Folios Asignados</span>
              <div className="text-2xl font-bold font-mono-numbers text-slate-900 mt-0.5">
                {correctFoliosCount} <span className="text-sm font-normal text-slate-400">/ {orderedDocs.length}</span>
              </div>
              <div className="w-32 bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isAllFoliatedCorrectly ? 'bg-emerald-600' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(correctFoliosCount / orderedDocs.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Instrument Selection & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">Instrumento de escritura:</span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  setPencilType('hb');
                  setShowPenWarning(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  pencilType === 'hb'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Lápiz de Mina Negra HB (Reglamentario AGN)</span>
              </button>

              <button
                onClick={() => {
                  setPencilType('boligrafo');
                  setShowPenWarning(true);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  pencilType === 'boligrafo'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Bolígrafo de Tinta / Pluma (Prohibido)</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAutoFoliateAll}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Foliar automáticamente (1 a {orderedDocs.length})
            </button>
            <button
              onClick={onClearFolios}
              className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Borrar foliación"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (!isAllFoliatedCorrectly) {
                  onAutoFoliateAll();
                }
                onNextStage();
              }}
              className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <span>Continuar a Etapa 5: Carpeta y Rótulo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Warning if pen is selected */}
        {showPenWarning && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-xs text-rose-900">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>¡Infracción Técnica AGN! </strong>
              El Acuerdo 002/2014 y la Circular 004/2003 prohíben taxativamente la foliación con esfero o bolígrafo. La tinta penetra químicamente la fibra y ante un error obligaría a tachones. Vuelve a seleccionar <strong>Lápiz de Mina Negra HB</strong>.
            </span>
          </div>
        )}
      </div>

      {/* Foliation Workbench: Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: List of documents in expediente (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Secuencia del Expediente ({orderedDocs.length} Documentos)
            </h3>
            <span className="text-[11px] text-slate-500">Haz clic para foliar</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {orderedDocs.map((doc, idx) => {
              const expectedFolio = idx + 1;
              const currentAssignedFolio = userFolios[doc.id];
              const isSelected = doc.id === selectedDocId;
              const isCorrect = currentAssignedFolio === expectedFolio;

              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-3.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-50/80 border-l-4 border-l-emerald-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-center text-xs text-slate-400 font-mono-numbers">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {doc.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-mono-numbers">
                        {doc.date} · {doc.documentType}
                      </span>
                    </div>
                  </div>

                  {/* Folio indicator */}
                  <div className="shrink-0 flex items-center gap-2">
                    {currentAssignedFolio !== undefined ? (
                      <span
                        className={`font-mono-numbers text-xs font-bold px-2 py-0.5 rounded border ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}
                      >
                        Folio {currentAssignedFolio}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        Sin foliar
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Document Facsimile with Interactive Upper-Right Corner Folio Stamp (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-mono-numbers">
                  DOCUMENTO ACTIVO #{selectedDocIndex + 1} DE {orderedDocs.length}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedDoc?.title}
                </h3>
              </div>
              <button
                onClick={() => onInspectDocument(selectedDoc)}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver completo</span>
              </button>
            </div>

            {/* Simulated Sheet Facsimile with Upper Right Corner Focus */}
            <div className="relative border-2 border-slate-200 bg-amber-50/20 rounded-xl p-8 min-h-[300px] shadow-inner font-mono text-xs">
              {/* UPPER RIGHT CORNER: Official AGN Foliation Zone */}
              <div className="absolute top-4 right-4 bg-white border-2 border-dashed border-emerald-500 rounded-lg p-3 shadow-md flex flex-col items-center min-w-[120px]">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Vértice Superior Derecho
                </span>
                <div className="text-xs text-emerald-800 font-semibold my-1">
                  Zona de Foliación
                </div>

                {userFolios[selectedDoc.id] !== undefined ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-mono-numbers text-slate-900">
                      {userFolios[selectedDoc.id]}
                    </span>
                    <button
                      onClick={() => onSetFolio(selectedDoc.id, 0)} // Clears
                      className="text-[10px] text-slate-400 hover:text-rose-600 underline cursor-pointer"
                      title="Anular con diagonal reglamentaria"
                    >
                      Rectificar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApplyFolio(selectedDocIndex + 1)}
                    className="mt-1 flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Foliar #{selectedDocIndex + 1}</span>
                  </button>
                )}
              </div>

              {/* Document Header Text */}
              <div className="max-w-md text-slate-700 space-y-2">
                <div className="font-bold text-slate-900 uppercase">
                  SERVICIO NACIONAL DE APRENDIZAJE - SENA
                </div>
                <div className="text-[11px] text-slate-500">
                  Dependencia: {selectedDoc.producerOffice}
                </div>
                <div className="text-[11px] text-slate-500">
                  Fecha de expedición: {selectedDoc.date}
                </div>
                <div className="p-4 bg-white rounded border border-slate-200 text-slate-600 text-[11px] leading-relaxed mt-4">
                  {selectedDoc.contentSnippet}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Folio Numeric Stepper at the bottom of the workbench */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Asignar número de folio manual:
            </span>
            <div className="flex items-center gap-1.5">
              {[selectedDocIndex + 1, selectedDocIndex + 2].map((num) => (
                <button
                  key={num}
                  onClick={() => handleApplyFolio(num)}
                  className="px-2.5 py-1 text-xs font-mono font-medium bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 rounded border border-slate-200 transition-colors cursor-pointer"
                >
                  Folio {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructor note */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Reglas de Foliación del AGN para Asistentes Administrativos: </span>
          1) No se deben foliar las hojas en blanco ni separadores. 2) Se folia de manera correlativa: el primer documento del trámite es el folio 1 y el último documento es el folio N. 3) Si hay error, se anula con una raya oblicua (ejemplo: <s>8</s> 9) y se consigna la anotación en la hoja de control. Nunca usar corrector blanco.
        </div>
      </div>
    </div>
  );
};
