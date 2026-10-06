import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Lightbulb, 
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

interface InstructorAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStage: number;
}

const FAQ_ITEMS = [
  {
    q: '¿Por qué está estrictamente prohibido usar bolígrafo o esfero para foliar?',
    a: 'La Circular Conjunta AGN-DAFP 004 de 2003 y las guías del AGN exigen lápiz de mina negra blanda (HB o B) porque la tinta contiene solventes químicos que deterioran la celulosa del papel y, ante un error involuntario de conteo, obligaría a tachones o enmendaduras que invalidan el valor probatorio del documento. Con lápiz se anula reglamentariamente con una línea diagonal y se escribe el número correcto al lado.',
  },
  {
    q: '¿Cuál es la diferencia legal entre un Documento de Archivo y un Documento de Apoyo?',
    a: 'El Documento de Archivo es producido o recibido en desarrollo de una función legal, tiene valor probatorio y administrativo activo, y conforma las series de la TRD. El Documento de Apoyo (borradores, fotocopias no autenticadas, notas personales, publicidad) tiene valor puramente informativo temporal, no integra el expediente y debe destruirse oportunamente sin transferirse al Archivo Central.',
  },
  {
    q: '¿Por qué no se debe exceder el límite de 200 folios por carpeta?',
    a: 'El AGN recomienda que las carpetas de cuatro aletas contengan un máximo de 200 folios para prevenir la deformación física de las aletas, el rasgado del lomo y el vencimiento de los hilos de costura o prensas. Si un expediente tiene más de 200 folios, se apertura la Carpeta Tomo 2 continuando la foliación correlativa (ej: Tomo 1: folios 1 al 200; Tomo 2: folios 201 al 340).',
  },
  {
    q: '¿Cómo se garantiza el Principio de Orden Original en los contratos estatales?',
    a: 'Siguiendo rigurosamente el procedimiento de contratación: 1) Estudios Previos -> 2) Certificado de Disponibilidad Presupuestal (CDP) -> 3) Propuesta técnica -> 4) Minuta del Contrato -> 5) Registro Presupuestal (RP) -> 6) Aprobación de Garantías/Pólizas -> 7) Acta de Inicio -> 8) Informes de supervisión -> 9) Acta de Liquidación final. Alterar este orden quiebra la trazabilidad jurídica del gasto público.',
  },
  {
    q: '¿Por qué es indispensable el desmetalizado antes del encarpete?',
    a: 'Los metales férreos se oxidan con la humedad relativa del ambiente en Colombia (especialmente en climas cálidos y templados). El óxido de hierro destruye químicamente las fibras del papel en pocos años, dejando agujeros que eliminan firmas y fechas vitales. Se debe sustituir por ganchos plásticos neutros.',
  },
];

export const InstructorAdvisorModal: React.FC<InstructorAdvisorModalProps> = ({
  isOpen,
  onClose,
  currentStage,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                Asesoría Técnica del Instructor SENA
              </h3>
              <span className="text-xs text-emerald-100">
                10 Años de Experiencia en Gestión Documental & Normatividad AGN
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Welcome note */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 leading-relaxed">
            <span className="font-bold text-sm block mb-1">
              ¡Bienvenido, aprendiz de Asistencia Administrativa!
            </span>
            Soy tu instructor de Gestión Documental. Esta herramienta reproduce exactamente las condiciones reales con las que te enfrentarás en una oficina pública o privada en Colombia: documentos en desorden, materiales corrosivos, falta de foliación y carpetas mal rotuladas. Aquí aprenderás a resolverlo con precisión técnica paso a paso.
          </div>

          {/* Current Stage Tip */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Instrucción Clave para la Etapa Actual (Etapa {currentStage})</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {currentStage === 1 &&
                'En esta primera etapa, inspecciona meticulosamente cada folio. No dejes ninguna grapa oxidada ni clip. Utiliza el desganchador con suavidad para no romper los bordes del papel.'}
              {currentStage === 2 &&
                'Revisa la Tabla de Retención Documental (TRD). Recuerda que las hojas en blanco, borradores informales y volantes comerciales NO son documentos de archivo. Márcalos como documentos de apoyo para su descarte.'}
              {currentStage === 3 &&
                'Aplica el Principio de Orden Original. Piensa en el procedimiento administrativo: ¿Qué documento se redactó primero? Los estudios previos van antes del CDP, y el acta de inicio va antes de los informes mensuales.'}
              {currentStage === 4 &&
                'Toma el lápiz HB virtual. La foliación se ubica estrictamente en el ángulo superior derecho, en el mismo sentido del texto, de manera consecutiva (1, 2, 3...). ¡Jamás utilices bolígrafo!'}
              {currentStage === 5 &&
                'La carpeta de 4 aletas es de propalcote neutro. Verifica que las fechas extremas coincidan exactamente con la fecha del primer documento (folio 1) y del último documento (folio final).'}
              {currentStage === 6 &&
                'El FUID es el inventario legal del archivo de gestión reglamentado por el Acuerdo 042 de 2002. Revisa que el código TRD, las fechas y los folios coincidan exactamente con lo que tienes en la carpeta.'}
              {currentStage === 7 &&
                '¡Excelente recorrido! Revisa tu calificación y tu dictamen de competencia. Podrás imprimir tu certificado de desempeño práctico para tu portafolio de evidencias de aprendizaje SENA.'}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>Preguntas Frecuentes y Fundamento Normativo AGN</span>
            </h4>

            <div className="space-y-2">
              {FAQ_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 font-semibold text-slate-800 cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="text-emerald-700 font-bold shrink-0">
                      {activeFaq === idx ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 bg-white border-t border-slate-200 text-slate-600 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Entendido, continuar práctica
          </button>
        </div>
      </div>
    </div>
  );
};
