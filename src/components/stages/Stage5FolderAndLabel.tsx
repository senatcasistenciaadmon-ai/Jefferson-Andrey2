import React, { useState } from 'react';
import { 
  FolderLock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Printer, 
  Sparkles, 
  Info,
  Calendar,
  Layers,
  Box
} from 'lucide-react';
import { ArchivalDocument, CaseStudy, FolderLabel } from '../../types/archive';
import { ArchivalWorkshopBox } from '../ArchivalWorkshopBox';

interface Stage5Props {
  currentCase: CaseStudy;
  orderedDocs: ArchivalDocument[];
  labelData: FolderLabel;
  onUpdateLabel: (updated: Partial<FolderLabel>) => void;
  onAutoFillLabel: () => void;
  onNextStage: () => void;
}

export const Stage5FolderAndLabel: React.FC<Stage5Props> = ({
  currentCase,
  orderedDocs,
  labelData,
  onUpdateLabel,
  onAutoFillLabel,
  onNextStage,
}) => {
  const [folderFlapsOpen, setFolderFlapsOpen] = useState<boolean>(true);

  // Derived extreme dates
  const initialDate = orderedDocs[0]?.date || '';
  const finalDate = orderedDocs[orderedDocs.length - 1]?.date || '';
  const totalFoliosCount = orderedDocs.length;

  // Validation
  const isDatesValid =
    labelData.fechaInicial === initialDate && labelData.fechaFinal === finalDate;
  const isFoliosValid = labelData.totalFolios === totalFoliosCount;
  const isSerieValid =
    labelData.serieCode.trim() === currentCase.expectedTRDSerie &&
    labelData.subserieCode.trim() === currentCase.expectedTRDSubserie;
  const isTitleValid = labelData.expedienteTitle.trim().length > 5;

  const isLabelComplete = isDatesValid && isFoliosValid && isSerieValid && isTitleValid;

  return (
    <div className="space-y-6">
      {/* Pedagogical Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Etapa 5 · Unidad de Conservación & Rotulación
              </span>
              <span className="text-xs text-slate-500">
                Acuerdo AGN 002 / 2014 & Estándar SENA
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Conformación en Carpeta de Cuatro Aletas & Rótulo Oficial
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Los expedientes de archivo de gestión se resguardan en <strong>carpetas desacidificadas de cuatro (4) aletas</strong> de propalcote o yute, evitando perforaciones mecánicas perjudiciales y fijando un límite máximo de <strong>200 folios</strong> por carpeta. Toda carpeta debe llevar adherido su respectivo <strong>Rótulo de Identificación</strong> con los códigos TRD y las fechas extremas exactas.
            </p>
          </div>

          {/* Cuadro Superior Derecho con Imagen del Taller y Botón de Avance */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <ArchivalWorkshopBox
              stageTitle="Etapa 5: Carpeta 4 Aletas & Rótulo"
              badgeText="Taller de Archivo SENA"
              compact={true}
            />

            <button
              onClick={() => {
                if (!isLabelComplete) {
                  onAutoFillLabel();
                }
                onNextStage();
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
            >
              <span>Continuar a Etapa 6</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Validation Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-2 text-xs">
            {isLabelComplete ? (
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-100 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Rótulo reglamentario debidamente diligenciado y validado con la TRD.
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-900 font-semibold bg-amber-100 px-3 py-1.5 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                Diligencia o verifica los campos del rótulo (códigos TRD, fechas extremas y total de folios).
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAutoFillLabel}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Autocompletar datos desde el expediente</span>
            </button>

            <button
              onClick={() => setFolderFlapsOpen(!folderFlapsOpen)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {folderFlapsOpen ? 'Cerrar Aletas de Carpeta' : 'Abrir Aletas de Carpeta'}
            </button>
          </div>
        </div>
      </div>

      {/* Main interactive area: Label Form & Physical Folder Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Datos Técnicos del Rótulo de Identificación
            </h3>
            <p className="text-xs text-slate-500">
              Corresponden a los datos estructurados en la TRD y el levantamiento físico del expediente.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Institución & Dependencia */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Entidad</label>
                <input
                  type="text"
                  value={labelData.entity}
                  onChange={(e) => onUpdateLabel({ entity: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Fondo Documental</label>
                <input
                  type="text"
                  value={labelData.fondo}
                  onChange={(e) => onUpdateLabel({ fondo: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Sección (Dependencia Mayor)</label>
                <input
                  type="text"
                  value={labelData.seccion}
                  onChange={(e) => onUpdateLabel({ seccion: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Subsección (Oficina)</label>
                <input
                  type="text"
                  value={labelData.subseccion}
                  onChange={(e) => onUpdateLabel({ subseccion: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            {/* TRD Codes */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Código Serie TRD
                </label>
                <input
                  type="text"
                  value={labelData.serieCode}
                  placeholder={currentCase.expectedTRDSerie}
                  onChange={(e) => onUpdateLabel({ serieCode: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Nombre de Serie
                </label>
                <input
                  type="text"
                  value={labelData.serieName}
                  onChange={(e) => onUpdateLabel({ serieName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Código Subserie TRD
                </label>
                <input
                  type="text"
                  value={labelData.subserieCode}
                  placeholder={currentCase.expectedTRDSubserie}
                  onChange={(e) => onUpdateLabel({ subserieCode: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Nombre de Subserie
                </label>
                <input
                  type="text"
                  value={labelData.subserieName}
                  onChange={(e) => onUpdateLabel({ subserieName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg uppercase"
                />
              </div>
            </div>

            {/* Expediente Title */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block font-medium text-slate-700 mb-1">
                Título del Expediente / Asunto
              </label>
              <textarea
                rows={2}
                value={labelData.expedienteTitle}
                onChange={(e) => onUpdateLabel({ expedienteTitle: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 uppercase"
              />
            </div>

            {/* Extreme Dates & Folios */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Fecha Inicial (Folio 1)
                </label>
                <input
                  type="date"
                  value={labelData.fechaInicial}
                  onChange={(e) => onUpdateLabel({ fechaInicial: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Fecha Final (Folio {totalFoliosCount})
                </label>
                <input
                  type="date"
                  value={labelData.fechaFinal}
                  onChange={(e) => onUpdateLabel({ fechaFinal: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Total Folios
                </label>
                <input
                  type="number"
                  value={labelData.totalFolios}
                  onChange={(e) => onUpdateLabel({ totalFolios: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-center"
                />
              </div>
            </div>

            {/* Carpeta & Caja */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">No. Carpeta</label>
                <input
                  type="number"
                  value={labelData.noCarpeta}
                  onChange={(e) => onUpdateLabel({ noCarpeta: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-center"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Total Carpetas</label>
                <input
                  type="number"
                  value={labelData.totalCarpetas}
                  onChange={(e) => onUpdateLabel({ totalCarpetas: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-center"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">No. Caja Archivo</label>
                <input
                  type="number"
                  value={labelData.noCaja}
                  onChange={(e) => onUpdateLabel({ noCaja: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Physical Simulated 4-Flap Folder with Sticker Label (6 cols) */}
        <div className="lg:col-span-6 bg-slate-100 border border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Manila / Propalcote cardboard color styling */}
          <div className="w-full max-w-md bg-[#e8d5b5] border-2 border-[#cbb08b] rounded-lg p-6 shadow-xl relative min-h-[460px] flex flex-col justify-between">
            {/* Visual simulation of four flaps */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#dfc8a2] border-b border-[#cbb08b]/60 flex items-center justify-center text-[9px] uppercase tracking-wider text-[#796342] font-semibold">
              Aleta Superior Desacidificada
            </div>

            {/* Official Label Sticker glued to the cover */}
            <div className="my-auto bg-white border-2 border-slate-900 p-4 rounded shadow-sm text-slate-900 font-sans text-xs">
              {/* SENA / AGN Header */}
              <div className="text-center border-b-2 border-slate-900 pb-2 mb-2">
                <div className="font-extrabold text-sm uppercase tracking-wide">
                  SERVICIO NACIONAL DE APRENDIZAJE - SENA
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-600">
                  SISTEMA INTEGRADO DE GESTIÓN · ARCHIVO DE GESTIÓN
                </div>
                <div className="text-[9px] text-slate-500 font-semibold mt-0.5">
                  RÓTULO DE CARPETA REGLAMENTARIA (4 ALETAS)
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex border-b border-slate-200 pb-1">
                  <span className="font-bold w-24 shrink-0">FONDO:</span>
                  <span className="truncate uppercase">{labelData.fondo}</span>
                </div>
                <div className="flex border-b border-slate-200 pb-1">
                  <span className="font-bold w-24 shrink-0">SECCIÓN:</span>
                  <span className="truncate uppercase">{labelData.seccion}</span>
                </div>
                <div className="flex border-b border-slate-200 pb-1">
                  <span className="font-bold w-24 shrink-0">SUBSECCIÓN:</span>
                  <span className="truncate uppercase">{labelData.subseccion}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-1">
                  <div>
                    <span className="font-bold block text-[10px]">CÓD. SERIE:</span>
                    <span className="font-mono font-bold text-emerald-800">
                      {labelData.serieCode || '---'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block text-[10px]">CÓD. SUBSERIE:</span>
                    <span className="font-mono font-bold text-emerald-800">
                      {labelData.subserieCode || '---'}
                    </span>
                  </div>
                </div>
                <div className="border-b border-slate-200 pb-1">
                  <span className="font-bold block text-[10px]">SERIE / SUBSERIE:</span>
                  <span className="uppercase font-semibold text-[10px] block">
                    {labelData.serieName} / {labelData.subserieName}
                  </span>
                </div>
                <div className="border-b border-slate-200 pb-1">
                  <span className="font-bold block text-[10px]">EXPEDIENTE / ASUNTO:</span>
                  <span className="font-bold text-slate-900 block leading-tight">
                    {labelData.expedienteTitle || 'SIN TÍTULO'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 border-b border-slate-200 pb-1 text-center font-mono-numbers">
                  <div>
                    <span className="font-bold block text-[9px] font-sans">F. INICIAL:</span>
                    <span className="text-[10px] font-semibold">{labelData.fechaInicial}</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[9px] font-sans">F. FINAL:</span>
                    <span className="text-[10px] font-semibold">{labelData.fechaFinal}</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[9px] font-sans">NO. FOLIOS:</span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {labelData.totalFolios}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono-numbers text-[10px]">
                  <div>
                    <span className="font-bold">CARPETA: </span>
                    <span>
                      {labelData.noCarpeta} de {labelData.totalCarpetas}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">CAJA NO.: </span>
                    <span>{labelData.noCaja}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Flap flap indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#dfc8a2] border-t border-[#cbb08b]/60 flex items-center justify-center text-[9px] uppercase tracking-wider text-[#796342] font-semibold">
              Aleta Inferior Desacidificada (Sin gancho metálico)
            </div>
          </div>
        </div>
      </div>

      {/* Instructor advice */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Criterio Archivístico del Rótulo: </span>
          Las fechas extremas son indispensables para calcular con precisión matemática los tiempos de retención documental en el Archivo de Gestión (ejemplo: 2 años después del cierre de la vigencia) antes de realizar la Transferencia Primaria al Archivo Central.
        </div>
      </div>
    </div>
  );
};
