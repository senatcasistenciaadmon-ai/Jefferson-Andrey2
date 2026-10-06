import React, { useState } from 'react';
import { 
  Layers, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ArrowRight, 
  HelpCircle,
  FileCheck2,
  FileMinus2
} from 'lucide-react';
import { ArchivalDocument, CaseStudy, TRDSerie } from '../../types/archive';
import { ArchivalWorkshopBox } from '../ArchivalWorkshopBox';

interface Stage2Props {
  currentCase: CaseStudy;
  documents: ArchivalDocument[];
  trdSeries: TRDSerie[];
  userClassification: Record<string, { isArchive: boolean; serieCode?: string; subserieCode?: string }>;
  onSetClassification: (docId: string, isArchive: boolean, serieCode?: string, subserieCode?: string) => void;
  onAutoClassifyAll?: () => void;
  onInspectDocument: (doc: ArchivalDocument) => void;
  onNextStage: () => void;
}

export const Stage2Classification: React.FC<Stage2Props> = ({
  currentCase,
  documents,
  trdSeries,
  userClassification,
  onSetClassification,
  onAutoClassifyAll,
  onInspectDocument,
  onNextStage,
}) => {
  const [filter, setFilter] = useState<'all' | 'unclassified' | 'archive' | 'support'>('all');

  // Check how many have been classified
  const totalDocs = documents.length;
  const classifiedCount = Object.keys(userClassification).length;

  // Validate accuracy
  let correctClassifications = 0;
  documents.forEach((doc) => {
    const userClass = userClassification[doc.id];
    if (userClass) {
      if (doc.isArchiveDocument && userClass.isArchive) {
        if (!userClass.serieCode || userClass.serieCode === doc.correctSerieCode) {
          correctClassifications++;
        }
      } else if (!doc.isArchiveDocument && !userClass.isArchive) {
        correctClassifications++;
      }
    }
  });

  const isComplete = classifiedCount === totalDocs;
  const isAllAccurate = isComplete && correctClassifications === totalDocs;

  const handleContinue = () => {
    if (!isAllAccurate && onAutoClassifyAll) {
      onAutoClassifyAll();
    }
    onNextStage();
  };

  const filteredDocs = documents.filter((doc) => {
    const userClass = userClassification[doc.id];
    if (filter === 'unclassified') return !userClass;
    if (filter === 'archive') return userClass?.isArchive === true;
    if (filter === 'support') return userClass?.isArchive === false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Pedagogical Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Etapa 2 · Clasificación Archivística
              </span>
              <span className="text-xs text-slate-500">
                Principio de Procedencia & Tablas de Retención (TRD)
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Clasificación Documental & Separación de Documentos de Apoyo
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Aplica el Cuadro de Clasificación y la TRD oficial para agrupar los documentos producidos por la unidad. Separa rigurosamente los <strong>Documentos de Archivo</strong> (con valor legal, probatorio o administrativo que integran el expediente) de los <strong>Documentos de Apoyo</strong> (borradores, duplicados sin firma, catálogos comerciales o papeles en blanco).
            </p>
          </div>

          {/* Cuadro Superior Derecho con Imagen del Taller y Contador */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <ArchivalWorkshopBox
              stageTitle="Etapa 2: Clasificación TRD"
              badgeText="Taller de Archivo SENA"
              compact={true}
            />

            <div className="flex flex-col items-end justify-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 shrink-0">
              <span className="text-xs text-slate-500 font-medium">Documentos Clasificados</span>
              <div className="text-2xl font-bold font-mono-numbers text-slate-900 mt-0.5">
                {classifiedCount} <span className="text-sm font-normal text-slate-400">/ {totalDocs}</span>
              </div>
              <div className="w-32 bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isAllAccurate ? 'bg-emerald-600' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(classifiedCount / totalDocs) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Expected TRD Target Box */}
        <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Serie TRD esperada para este expediente: </strong>
              Código {currentCase.expectedTRDSerie} · Subserie {currentCase.expectedTRDSubserie} ({currentCase.title})
            </span>
          </div>
          <span className="text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
            Retención: {currentCase.expectedRetention}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({totalDocs})
            </button>
            <button
              onClick={() => setFilter('unclassified')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'unclassified' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sin Clasificar ({totalDocs - classifiedCount})
            </button>
            <button
              onClick={() => setFilter('archive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'archive' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doc. de Archivo
            </button>
            <button
              onClick={() => setFilter('support')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'support' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doc. de Apoyo (Descarte)
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onAutoClassifyAll && (
              <button
                onClick={onAutoClassifyAll}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                title="Clasificar automáticamente todos los documentos según la TRD institucional"
              >
                <span>Clasificar Todo (TRD Automática)</span>
              </button>
            )}

            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <span>Continuar a Etapa 3: Ordenación Original</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Classification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const userClass = userClassification[doc.id];
          const hasUserClass = !!userClass;
          const isUserCorrect =
            hasUserClass &&
            ((doc.isArchiveDocument && userClass.isArchive) ||
              (!doc.isArchiveDocument && !userClass.isArchive));

          return (
            <div
              key={doc.id}
              className={`flex flex-col justify-between p-4 rounded-xl border transition-all ${
                !hasUserClass
                  ? 'bg-white border-slate-200 shadow-xs'
                  : isUserCorrect
                  ? userClass.isArchive
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                    : 'bg-amber-50/40 border-amber-300 shadow-xs'
                  : 'bg-rose-50/50 border-rose-300 shadow-xs ring-1 ring-rose-400/20'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {doc.code} · {doc.date}
                  </span>
                  {hasUserClass && (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1 ${
                        isUserCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isUserCorrect ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {userClass.isArchive ? 'Doc. Archivo' : 'Doc. Apoyo'}
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-rose-600" />
                          Clasificación Errada
                        </>
                      )}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-1">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {doc.summary}
                </p>

                {/* Classification Decision Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-600 block">
                    ¿Cuál es la naturaleza archivística de este documento?
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        onSetClassification(
                          doc.id,
                          true,
                          currentCase.expectedTRDSerie,
                          currentCase.expectedTRDSubserie
                        )
                      }
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        userClass?.isArchive === true
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
                      }`}
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Documento de Archivo</span>
                    </button>

                    <button
                      onClick={() => onSetClassification(doc.id, false)}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        userClass?.isArchive === false
                          ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:text-amber-800'
                      }`}
                    >
                      <FileMinus2 className="w-3.5 h-3.5" />
                      <span>Documento de Apoyo</span>
                    </button>
                  </div>
                </div>

                {/* Error explanation if wrongly classified */}
                {hasUserClass && !isUserCorrect && (
                  <div className="mt-2 p-2 bg-rose-100/70 border border-rose-200 rounded text-[11px] text-rose-900">
                    {doc.isArchiveDocument
                      ? 'Error: Este documento sí es de archivo porque forma parte integral del trámite legal administrativo con firmas y efectos probatorios.'
                      : 'Error: Este documento es de apoyo (borrador, publicidad o papel en blanco). Jamás debe integrarse a la serie ni foliarse.'}
                  </div>
                )}
              </div>

              {/* Inspector trigger */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onInspectDocument(doc)}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-700 font-medium cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspeccionar contenido</span>
                </button>
                <span className="text-[11px] text-slate-400 font-mono-numbers">
                  {doc.producerOffice}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
