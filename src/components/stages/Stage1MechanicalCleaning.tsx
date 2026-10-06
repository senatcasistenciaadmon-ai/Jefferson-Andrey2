import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { ArchivalDocument, ArchivalMaterial } from '../../types/archive';
import { ArchivalWorkshopBox } from '../ArchivalWorkshopBox';

interface Stage1Props {
  documents: ArchivalDocument[];
  onCleanMaterial: (docId: string, material: ArchivalMaterial) => void;
  onCleanAllInDoc: (docId: string) => void;
  onCleanAllInBatch: () => void;
  onInspectDocument: (doc: ArchivalDocument) => void;
  onNextStage: () => void;
}

export const Stage1MechanicalCleaning: React.FC<Stage1Props> = ({
  documents,
  onCleanMaterial,
  onCleanAllInDoc,
  onCleanAllInBatch,
  onInspectDocument,
  onNextStage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'cleaned'>('all');

  // Count abrasive elements
  let totalAbrasiveMaterials = 0;
  let cleanedMaterialsCount = 0;

  documents.forEach((doc) => {
    const totalInDoc = doc.hasAbrasiveMaterial?.length || 0;
    const cleanedInDoc = doc.cleanedMaterials?.length || 0;
    totalAbrasiveMaterials += totalInDoc;
    cleanedMaterialsCount += cleanedInDoc;
  });

  const isAllCleaned = totalAbrasiveMaterials > 0 && cleanedMaterialsCount >= totalAbrasiveMaterials;

  const filteredDocs = documents.filter((doc) => {
    const hasAbrasive = (doc.hasAbrasiveMaterial?.length || 0) > 0;
    const isClean = hasAbrasive
      ? (doc.hasAbrasiveMaterial?.length || 0) === (doc.cleanedMaterials?.length || 0)
      : true;

    if (selectedFilter === 'pending') return hasAbrasive && !isClean;
    if (selectedFilter === 'cleaned') return isClean;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Pedagogical Directive Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Etapa 1 · Ciclo de Conservación Preventiva
              </span>
              <span className="text-xs text-slate-500">Acuerdo AGN 002 / 2014 & Art. 46 Ley 594</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Diagnóstico Físico & Desmetalizado de Documentos
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Como asistente administrativo en el archivo de gestión, debes examinar la acumulación documental y retirar todo material abrasivo (grapas oxidadas, clips metálicos, cauchos vulcanizados y notas adhesivas ácidas). Estos elementos reaccionan con la humedad ambiental generando herrumbre, perforaciones y pérdida irreparable de información.
            </p>
          </div>

          {/* Cuadro Superior Derecho con Imagen del Taller y Progreso */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <ArchivalWorkshopBox
              stageTitle="Etapa 1: Diagnóstico & Desmetalizado"
              badgeText="Taller de Archivo SENA"
              compact={true}
            />

            <div className="flex flex-col items-end justify-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 shrink-0">
              <span className="text-xs text-slate-500 font-medium">Progreso de Desmetalizado</span>
              <div className="text-2xl font-bold font-mono-numbers text-slate-900 mt-0.5">
                {cleanedMaterialsCount}{' '}
                <span className="text-sm font-normal text-slate-400">/ {totalAbrasiveMaterials} elementos</span>
              </div>
              <div className="w-32 bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isAllCleaned ? 'bg-emerald-600' : 'bg-amber-500'
                  }`}
                  style={{
                    width: `${totalAbrasiveMaterials ? (cleanedMaterialsCount / totalAbrasiveMaterials) * 100 : 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({documents.length})
            </button>
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'pending'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pendientes de Limpieza
            </button>
            <button
              onClick={() => setSelectedFilter('cleaned')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFilter === 'cleaned'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completamente Limpios
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!isAllCleaned && (
              <button
                onClick={onCleanAllInBatch}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                title="Aplicar desganchador y limpieza mecánica simultánea a toda la bandeja"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Desmetalizado Asistido Completo</span>
              </button>
            )}

            <button
              onClick={() => {
                if (!isAllCleaned) {
                  onCleanAllInBatch();
                }
                onNextStage();
              }}
              className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <span>Continuar a Etapa 2: Clasificación TRD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Documents to Clean */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const totalInDoc = doc.hasAbrasiveMaterial?.length || 0;
          const cleanedInDoc = doc.cleanedMaterials?.length || 0;
          const remainingInDoc = (doc.hasAbrasiveMaterial || []).filter(
            (m) => !(doc.cleanedMaterials || []).includes(m)
          );
          const isDocClean = totalInDoc === 0 || remainingInDoc.length === 0;

          return (
            <div
              key={doc.id}
              className={`flex flex-col justify-between p-4 rounded-xl border transition-all ${
                isDocClean
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-amber-50/40 border-amber-300 shadow-xs ring-1 ring-amber-400/20'
              }`}
            >
              <div>
                {/* Header of doc card */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {doc.code}
                  </span>
                  {isDocClean ? (
                    <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Limpio
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-amber-900 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-700" />
                      {remainingInDoc.length} elemento(s) corrosivo(s)
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-1">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {doc.summary}
                </p>

                {/* Detected abrasive tags */}
                {remainingInDoc.length > 0 && (
                  <div className="p-2.5 bg-amber-100/60 rounded-lg border border-amber-200/80 mb-3 space-y-1.5">
                    <span className="text-[11px] font-semibold text-amber-900 block">
                      Elementos que requieren intervención:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {remainingInDoc.map((mat) => (
                        <button
                          key={mat}
                          onClick={() => onCleanMaterial(doc.id, mat)}
                          className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Retirar {mat.replace('_', ' ')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isDocClean && (doc.hasAbrasiveMaterial?.length || 0) > 0 && (
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 mb-3 text-[11px] text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Elementos metálicos retirados correctamente</span>
                  </div>
                )}
              </div>

              {/* Action footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                <button
                  onClick={() => onInspectDocument(doc)}
                  className="flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-700 font-medium cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspeccionar facsímil</span>
                </button>

                {!isDocClean && (
                  <button
                    onClick={() => onCleanAllInDoc(doc.id)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                  >
                    Desmetalizar todo
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Footer Note */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Criterio Técnico del Instructor SENA (10 años de experiencia): </span>
          En las entidades colombianas no se permite archivar con grapas metálicas estándar. Se debe usar el desganchador tipo tenaza para no desgarrar el papel. Si el documento requiere agrupación física antes de encuadernar, se emplean ganchos legajadores plásticos o dobleces de papel propalcote neutro.
        </div>
      </div>
    </div>
  );
};
