import React, { useState } from 'react';
import { 
  ClipboardList, 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  FileSpreadsheet, 
  Info,
  Calendar,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';
import { ArchivalDocument, CaseStudy, FolderLabel, FUIDRow } from '../../types/archive';
import { ArchivalWorkshopBox } from '../ArchivalWorkshopBox';

interface Stage6Props {
  currentCase: CaseStudy;
  orderedDocs: ArchivalDocument[];
  labelData: FolderLabel;
  fuidData: FUIDRow;
  apprenticeName: string;
  onUpdateFUID: (updated: Partial<FUIDRow>) => void;
  onAutoFillFUID: () => void;
  onNextStage: () => void;
}

export const Stage6FUID: React.FC<Stage6Props> = ({
  currentCase,
  orderedDocs,
  labelData,
  fuidData,
  apprenticeName,
  onUpdateFUID,
  onAutoFillFUID,
  onNextStage,
}) => {
  const [activeTab, setActiveTab] = useState<'fuid' | 'hoja_control'>('fuid');

  const totalFolios = orderedDocs.length;
  const initialDate = orderedDocs[0]?.date || '';
  const finalDate = orderedDocs[orderedDocs.length - 1]?.date || '';

  // Validation
  const isFuidValid =
    fuidData.codigo.trim() === currentCase.expectedTRDSerie ||
    fuidData.codigo.trim() === currentCase.expectedTRDSubserie;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Pedagogical Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Etapa 6 · Control & Registro Archivístico
              </span>
              <span className="text-xs text-slate-500">
                Acuerdo AGN 042 / 2002 & Acuerdo AGN 002 / 2014
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Hoja de Control del Expediente & Formato Único de Inventario Documental (FUID)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Toda unidad documental debe contar con su <strong>Hoja de Control</strong> interna para registrar la foliación de cada documento, y ser registrada obligatoriamente en el <strong>FUID</strong> del Archivo de Gestión, el instrumento público oficial establecido por el Archivo General de la Nación para asegurar el control, inventario y futuras transferencias documentales.
            </p>
          </div>

          {/* Cuadro Superior Derecho con Imagen del Taller y Botones */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <ArchivalWorkshopBox
              stageTitle="Etapa 6: FUID & Hoja de Control"
              badgeText="Taller de Archivo SENA"
              compact={true}
            />

            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir FUID</span>
              </button>

              <button
                onClick={onNextStage}
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <span>Evaluación Final</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('fuid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'fuid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Formato Único de Inventario Documental (FUID AGN)</span>
            </button>
            <button
              onClick={() => setActiveTab('hoja_control')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'hoja_control'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hoja de Control del Expediente (Acuerdo 002/2014)</span>
            </button>
          </div>

          <button
            onClick={onAutoFillFUID}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sincronizar FUID con datos del expediente</span>
          </button>
        </div>
      </div>

      {/* Tab 1: FUID Display */}
      {activeTab === 'fuid' && (
        <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm overflow-x-auto">
          {/* Institutional Header compliant with AGN FUID */}
          <div className="border border-slate-900 mb-6">
            <div className="grid grid-cols-12 border-b border-slate-900">
              <div className="col-span-3 p-3 flex flex-col items-center justify-center border-r border-slate-900 text-center">
                <div className="w-8 h-8 rounded bg-emerald-700 text-white font-bold flex items-center justify-center text-xs mb-1">
                  SENA
                </div>
                <span className="text-[10px] font-bold uppercase">Regional Distrito Capital</span>
              </div>
              <div className="col-span-6 p-3 flex flex-col items-center justify-center text-center border-r border-slate-900">
                <h3 className="font-extrabold text-sm uppercase text-slate-900">
                  FORMATO ÚNICO DE INVENTARIO DOCUMENTAL - FUID
                </h3>
                <span className="text-[10px] text-slate-600 font-medium">
                  ARCHIVO GENERAL DE LA NACIÓN - ACUERDO 042 DE 2002
                </span>
              </div>
              <div className="col-span-3 p-3 text-[10px] space-y-1">
                <div>
                  <span className="font-bold">FECHA: </span>
                  <span className="font-mono-numbers">
                    {new Date().toISOString().split('T')[0]}
                  </span>
                </div>
                <div>
                  <span className="font-bold">HOJA: </span>
                  <span className="font-mono-numbers">1 de 1</span>
                </div>
                <div>
                  <span className="font-bold">TIPO: </span>
                  <span>Archivo de Gestión</span>
                </div>
              </div>
            </div>

            {/* General Metadata */}
            <div className="grid grid-cols-2 text-xs divide-x divide-slate-900 bg-slate-50">
              <div className="p-2.5 space-y-1">
                <div>
                  <span className="font-bold text-slate-700">ENTIDAD REMITENTE: </span>
                  <span className="font-semibold text-slate-900">
                    SERVICIO NACIONAL DE APRENDIZAJE - SENA
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">UNIDAD ADMINISTRATIVA: </span>
                  <span>{labelData.seccion || 'Subdirección de Centro'}</span>
                </div>
              </div>
              <div className="p-2.5 space-y-1">
                <div>
                  <span className="font-bold text-slate-700">OFICINA PRODUCTORA: </span>
                  <span>{labelData.subseccion || 'Grupo de Contratación / Talento Humano'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">OBJETO: </span>
                  <span>Organización y Foliación del Expediente de Gestión</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Columns of FUID */}
          <table className="w-full text-xs border-collapse border border-slate-900">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold text-center border-b border-slate-900 text-[11px]">
                <th className="border border-slate-900 p-2 w-10">No. Orden</th>
                <th className="border border-slate-900 p-2 w-24">Código TRD</th>
                <th className="border border-slate-900 p-2 text-left">
                  Nombre de la Serie, Subserie o Asunto
                </th>
                <th className="border border-slate-900 p-2 w-24">Fecha Inicial</th>
                <th className="border border-slate-900 p-2 w-24">Fecha Final</th>
                <th className="border border-slate-900 p-2 w-14">Caja</th>
                <th className="border border-slate-900 p-2 w-14">Carpeta</th>
                <th className="border border-slate-900 p-2 w-14">Tomo</th>
                <th className="border border-slate-900 p-2 w-16">No. Folios</th>
                <th className="border border-slate-900 p-2 w-20">Soporte</th>
                <th className="border border-slate-900 p-2 w-24">Frec. Consulta</th>
                <th className="border border-slate-900 p-2 text-left w-36">Notas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-900 text-center font-mono-numbers text-xs hover:bg-slate-50">
                <td className="border border-slate-900 p-2 font-bold">{fuidData.numeroOrden}</td>
                <td className="border border-slate-900 p-2 font-bold text-emerald-800">
                  {fuidData.codigo}
                </td>
                <td className="border border-slate-900 p-2 text-left font-sans font-semibold">
                  {fuidData.nombreSerieSubserieAsunto}
                </td>
                <td className="border border-slate-900 p-2">{fuidData.fechaInicial}</td>
                <td className="border border-slate-900 p-2">{fuidData.fechaFinal}</td>
                <td className="border border-slate-900 p-2">{fuidData.caja}</td>
                <td className="border border-slate-900 p-2">{fuidData.carpeta}</td>
                <td className="border border-slate-900 p-2">{fuidData.tomo}</td>
                <td className="border border-slate-900 p-2 font-bold text-emerald-700">
                  {fuidData.numeroFolios}
                </td>
                <td className="border border-slate-900 p-2 font-sans">{fuidData.soporte}</td>
                <td className="border border-slate-900 p-2 font-sans">
                  <span className="px-1.5 py-0.5 rounded text-[11px] bg-slate-100">
                    {fuidData.frecuenciaConsulta}
                  </span>
                </td>
                <td className="border border-slate-900 p-2 text-left font-sans text-[11px]">
                  {fuidData.notas}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Signatures / Approval Box */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-4 border-t border-slate-300 text-xs">
            <div className="border-t border-slate-900 pt-2 text-center">
              <span className="font-bold block text-slate-800">ELABORADO POR:</span>
              <span className="text-slate-600 block mt-1">
                {apprenticeName || 'Aprendiz SENA Asistencia Administrativa'}
              </span>
              <span className="text-[10px] text-slate-400">Rol: Asistente de Archivo de Gestión</span>
            </div>
            <div className="border-t border-slate-900 pt-2 text-center">
              <span className="font-bold block text-slate-800">ENTREGADO POR:</span>
              <span className="text-slate-600 block mt-1">Responsable Unidad Productora</span>
              <span className="text-[10px] text-slate-400">Firma & Cédula</span>
            </div>
            <div className="border-t border-slate-900 pt-2 text-center">
              <span className="font-bold block text-slate-800">RECIBIDO POR:</span>
              <span className="text-slate-600 block mt-1">Instructor Técnico / Archivo Central</span>
              <span className="text-[10px] text-slate-400">Verificación y Control AGN</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hoja de Control del Expediente */}
      {activeTab === 'hoja_control' && (
        <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm overflow-x-auto">
          <div className="border border-slate-900 mb-6 p-4 bg-slate-50 text-center">
            <h3 className="font-extrabold text-sm uppercase text-slate-900">
              HOJA DE CONTROL DE EXPEDIENTE
            </h3>
            <span className="text-xs text-slate-600 font-medium">
              Conforme al Acuerdo AGN 002 de 2014 (Artículo 5 - Integración de Expedientes)
            </span>
            <div className="grid grid-cols-3 gap-4 mt-3 text-left text-xs border-t border-slate-200 pt-2">
              <div>
                <span className="font-bold">Serie / Subserie: </span>
                <span>{labelData.serieName} / {labelData.subserieName}</span>
              </div>
              <div>
                <span className="font-bold">Expediente: </span>
                <span className="truncate">{labelData.expedienteTitle}</span>
              </div>
              <div>
                <span className="font-bold">Total Folios: </span>
                <span className="font-mono-numbers font-bold text-emerald-800">{totalFolios}</span>
              </div>
            </div>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-900">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold text-center border-b border-slate-900 text-[11px]">
                <th className="border border-slate-900 p-2 w-12">Folio</th>
                <th className="border border-slate-900 p-2 text-left">Tipo Documental</th>
                <th className="border border-slate-900 p-2 w-28">Fecha del Documento</th>
                <th className="border border-slate-900 p-2 text-left">Unidad Productora / Suscriptor</th>
                <th className="border border-slate-900 p-2 text-left w-48">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orderedDocs.map((doc, idx) => (
                <tr key={doc.id} className="hover:bg-slate-50 font-mono-numbers">
                  <td className="border border-slate-900 p-2 text-center font-bold text-emerald-800">
                    {idx + 1}
                  </td>
                  <td className="border border-slate-900 p-2 text-left font-sans font-semibold text-slate-900">
                    {doc.documentType} - {doc.title}
                  </td>
                  <td className="border border-slate-900 p-2 text-center">{doc.date}</td>
                  <td className="border border-slate-900 p-2 text-left font-sans text-slate-600">
                    {doc.producerOffice} ({doc.senderOrSigner})
                  </td>
                  <td className="border border-slate-900 p-2 text-left font-sans text-[11px] text-slate-500">
                    {doc.hasOfficialStamp ? 'Radicado oficial verificado. ' : ''}
                    Documento original íntegro.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Instructor note */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900 no-print">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Norma AGN sobre el FUID: </span>
          El FUID no es opcional en la administración pública colombiana. De acuerdo con el Acuerdo 042 de 2002, es la herramienta de control legal indispensable para toda entrega de archivo de gestión, transferencias primarias al Archivo Central y para procesos de entrega de cargo de servidores públicos.
        </div>
      </div>
    </div>
  );
};
