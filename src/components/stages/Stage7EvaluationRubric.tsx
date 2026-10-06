import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  GraduationCap,
  Calendar,
  Building,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CaseStudy, EvaluationResult } from '../../types/archive';
import { ArchivalWorkshopBox } from '../ArchivalWorkshopBox';

interface Stage7Props {
  currentCase: CaseStudy;
  evaluation: EvaluationResult;
  apprenticeName: string;
  apprenticeFicha: string;
  onSelectNextCase: () => void;
  onResetCase: () => void;
}

export const Stage7EvaluationRubric: React.FC<Stage7Props> = ({
  currentCase,
  evaluation,
  apprenticeName,
  apprenticeFicha,
  onSelectNextCase,
  onResetCase,
}) => {
  useEffect(() => {
    if (evaluation.isApproved) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10B981', '#34D399', '#3B82F6'],
      });
    }
  }, [evaluation.isApproved]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Judgment Summary Banner */}
      <div
        className={`border rounded-2xl p-6 shadow-sm ${
          evaluation.isApproved
            ? 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50/50 border-emerald-300'
            : 'bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border-amber-300'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xs shrink-0 ${
                evaluation.isApproved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {evaluation.isApproved ? <Award className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Dictamen de Evaluación SENA · Formación Profesional Integral
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Juicio de Evaluación:{' '}
                <span
                  className={
                    evaluation.isApproved ? 'text-emerald-700' : 'text-amber-700'
                  }
                >
                  {evaluation.isApproved ? 'APROBADO' : 'POR MEJORAR'}
                </span>
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {evaluation.isApproved
                  ? 'Has demostrado dominio práctico riguroso en las etapas del ciclo de organización del archivo de gestión, cumpliendo cabalmente los lineamientos del Archivo General de la Nación (AGN).'
                  : 'Se identificaron discrepancias en algunas etapas archivísticas. Revisa el plan de mejora del instructor y reintenta las etapas señaladas para alcanzar la competencia.'}
              </p>
            </div>
          </div>

          {/* Cuadro Superior Derecho con Imagen del Taller y Calificación Obtenida */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <ArchivalWorkshopBox
              stageTitle="Dictamen & Certificación SENA"
              badgeText="Taller de Archivo SENA"
              compact={true}
            />

            <div className="flex flex-col items-end bg-white p-4 rounded-xl border border-slate-200 shadow-xs shrink-0">
              <span className="text-xs text-slate-500 font-semibold uppercase">Calificación Obtenida</span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono-numbers text-slate-900 mt-0.5">
                {evaluation.totalScore}{' '}
                <span className="text-base sm:text-lg font-normal text-slate-400">/ 100 pts</span>
              </div>
              <span
                className={`text-xs font-bold mt-1 px-2.5 py-0.5 rounded-full ${
                  evaluation.isApproved
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {evaluation.isApproved ? 'Competencia Lograda' : 'Aún no Competente'}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-200/80 no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Certificado de Competencia</span>
            </button>
            <button
              onClick={onResetCase}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reintentar este Caso</span>
            </button>
          </div>

          <button
            onClick={onSelectNextCase}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <span>Explorar Siguiente Caso Práctico</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rubric Criteria Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
          <span>Desglose Analítico por Etapas del Ciclo Archivístico</span>
          <span className="text-xs font-normal text-slate-500">Rúbrica Técnica Oficial SENA</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Stage 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">1. Desmetalizado & Limpieza</span>
              <span className="font-mono-numbers font-bold text-emerald-700">
                {evaluation.stage1Score} / 15 pts
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Retiro de grapas oxidadas, clips metálicos, cauchos vulcanizados y notas autoadhesivas ácidas.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${(evaluation.stage1Score / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">2. Clasificación TRD</span>
              <span className="font-mono-numbers font-bold text-emerald-700">
                {evaluation.stage2Score} / 20 pts
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Asignación a la Serie/Subserie reglamentaria y separación certera de Documentos de Apoyo.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${(evaluation.stage2Score / 20) * 100}%` }}
              />
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">3. Ordenación Original</span>
              <span className="font-mono-numbers font-bold text-emerald-700">
                {evaluation.stage3Score} / 20 pts
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Respeto riguroso de la cronología del trámite desde el documento de apertura hasta el cierre.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${(evaluation.stage3Score / 20) * 100}%` }}
              />
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">4. Foliación Técnica</span>
              <span className="font-mono-numbers font-bold text-emerald-700">
                {evaluation.stage4Score} / 15 pts
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Foliación con lápiz negro de grafito HB en el ángulo superior derecho, correlativa y sin tachones.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${(evaluation.stage4Score / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Stage 5 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">5. Carpeta 4 Aletas & Rótulo</span>
              <span className="font-mono-numbers font-bold text-emerald-700">
                {evaluation.stage5Score} / 15 pts
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Acomodo en carpeta desacidificada sin ganchos metálicos y confección del rótulo reglamentario.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${(evaluation.stage5Score / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Stage 6 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">6. Hoja Control & FUID</span>
              <span className="font-mono-numbers font-bold text-emerald-700">
                {evaluation.stage6Score} / 15 pts
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Diligenciamiento del Formato Único de Inventario Documental conforme al Acuerdo 042 de 2002.
            </p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${(evaluation.stage6Score / 15) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Instructor's Pedagogical Feedback (Voice of 10-year experienced instructor) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Concepto Pedagógico del Instructor SENA (Gestión Documental)
            </h3>
            <span className="text-xs text-slate-500">
              Evaluación formativa basada en la Norma Sectorial de Competencia Laboral
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-700">
          <p className="p-4 bg-slate-50 rounded-xl border border-slate-200 italic">
            "{evaluation.isApproved
              ? 'Estimado aprendiz: Como instructor con una década formando técnicos en el área archivística, quiero felicitarte por el rigor con el que aplicaste el ciclo integral de organización. En el sector productivo, la mala manipulación física (grapas oxidadas) y la foliación errada con bolígrafo representan los errores más costosos y de mayor riesgo jurídico para las organizaciones. Has demostrado que sabes proteger el patrimonio documental y aplicar las TRD con destreza.'
              : 'Estimado aprendiz: En la gestión documental no hay espacio para la ambigüedad. Cada documento archivístico es un testimonio legal y probatorio. Revisa con detenimiento el descarte de documentos de apoyo y asegúrate de que el folio 1 corresponda estrictamente al documento que abrió la actuación administrativa. Puedes reiniciar este caso las veces necesarias hasta interiorizar la secuencia técnica.'}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Fortalezas Técnicas Demostradas:
              </span>
              <ul className="list-disc list-inside space-y-1 text-emerald-800 pl-1">
                <li>Aplicación exacta del Principio de Procedencia y Principio de Orden Original.</li>
                <li>Uso correcto de la foliación con lápiz de mina negra sin enmendaduras.</li>
                <li>Identificación oportuna de elementos abrasivos antes del encarpete.</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
              <span className="font-bold text-blue-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                Recomendaciones para el Centro de Prácticas:
              </span>
              <ul className="list-disc list-inside space-y-1 text-blue-800 pl-1">
                <li>Mantener siempre actualizado el FUID al ingreso de cada nuevo documento.</li>
                <li>Vigilar que ninguna carpeta exceda los 200 folios para evitar roturas de lomo.</li>
                <li>Conservar las condiciones ambientales recomendadas por el AGN (temperatura y humedad relativa).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Box (Printable & Downloadable) */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-8 shadow-md relative overflow-hidden print-only">
        {/* Institutional Watermark / Border */}
        <div className="border border-emerald-700 p-6 rounded-xl space-y-6 text-center">
          <div className="flex items-center justify-between border-b border-slate-300 pb-4">
            <div className="text-left">
              <span className="text-xs font-bold text-emerald-800 block">SENA · REGIONAL DISTRITO CAPITAL</span>
              <span className="text-[10px] text-slate-500">CENTRO DE SERVICIOS ADMINISTRATIVOS</span>
            </div>
            <div className="w-12 h-12 bg-emerald-700 rounded-xl text-white font-bold flex items-center justify-center text-sm">
              SENA
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-700 block">REG-ARCH-2024</span>
              <span className="text-[10px] text-slate-500">CÓDIGO VERIFICACIÓN AGN</span>
            </div>
          </div>

          <div className="space-y-2 py-4">
            <h1 className="text-xl sm:text-2xl font-extrabold uppercase text-slate-900 tracking-wide">
              CONSTANCIA DE DESEMPEÑO PRÁCTICO EN ARCHIVO DE GESTIÓN
            </h1>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              El Servicio Nacional de Aprendizaje (SENA) certifica que el aprendiz completó satisfactoriamente la simulación técnico-operativa de organización documental de acuerdo con la Ley 594 de 2000 y el Acuerdo AGN 002 de 2014.
            </p>
          </div>

          {/* Apprentice Identification */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-lg mx-auto text-xs space-y-1">
            <div className="font-extrabold text-sm text-slate-900 uppercase">
              {apprenticeName || 'APRENDIZ EN ASISTENCIA ADMINISTRATIVA'}
            </div>
            <div className="text-slate-600">
              Programa: <strong>Técnico en Asistencia Administrativa</strong>
            </div>
            <div className="text-slate-500">
              Ficha de Formación: <strong>{apprenticeFicha || '2849012'}</strong> · Expediente:{' '}
              <strong>{currentCase.title}</strong>
            </div>
          </div>

          {/* Competency Standard Claim */}
          <div className="text-xs text-slate-700 max-w-xl mx-auto pt-2">
            <strong>Norma Sectorial de Competencia Laboral Aplicada: </strong>
            <span className="block mt-1">
              Código 210602011: <em>"Organizar archivos de gestión de acuerdo con la normatividad técnica institucional y nacional vigente."</em>
            </span>
          </div>

          {/* Signatures block */}
          <div className="grid grid-cols-2 gap-12 max-w-md mx-auto pt-8 border-t border-slate-200 text-xs">
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 pb-1">
                Lic. Carlos A. Restrepo V.
              </div>
              <div className="border-t border-slate-800 pt-1 font-bold text-slate-900">
                Instructor de Gestión Documental
              </div>
              <div className="text-[10px] text-slate-500">10 Años de Experiencia Archivística · SENA</div>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 pb-1">
                {apprenticeName || 'Firma del Aprendiz'}
              </div>
              <div className="border-t border-slate-800 pt-1 font-bold text-slate-900">
                Aprendiz Evaluado
              </div>
              <div className="text-[10px] text-slate-500">Juicio: APROBADO (100% Competente)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
