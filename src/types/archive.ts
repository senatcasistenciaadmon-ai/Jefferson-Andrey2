export type ArchivalMaterial = 'grapa_oxidada' | 'clip_metalico' | 'post_it' | 'caucho_vencido' | 'cinta_adhesiva' | 'gancho_legajador_plastico';

export type DocumentClassificationType = 'archivo' | 'apoyo'; // Documento de archivo vs Documento de apoyo

export interface ArchivalDocument {
  id: string;
  code: string;
  title: string;
  date: string; // YYYY-MM-DD
  documentType: string; // ej: 'Minuta de Contrato', 'Estudios Previos', 'Acta de Inicio'
  producerOffice: string; // Unidad Productora (ej: Subdirección Administrativa)
  senderOrSigner: string;
  recipient: string;
  summary: string;
  isArchiveDocument: boolean; // false si es de apoyo (borrador, publicidad, etc.)
  correctSerieCode: string; // ej: '120.18'
  correctSubserieCode: string; // ej: '120.18.02'
  correctOrderIndex: number; // 1-based chronological/procedural sequence
  hasAbrasiveMaterial?: ArchivalMaterial[];
  cleanedMaterials: ArchivalMaterial[];
  currentFolio?: number;
  correctFolio?: number;
  isFolioExempt?: boolean; // Para documentos de apoyo que no se folian
  notes?: string;
  contentSnippet: string;
  hasOfficialStamp?: boolean;
  hasSignature?: boolean;
}

export interface TRDSerie {
  code: string;
  name: string;
  subseries: {
    code: string;
    name: string;
    retentionGestionYears: number;
    retentionCentralYears: number;
    finalDisposition: 'CT' | 'E' | 'M' | 'S'; // Conservación Total, Eliminación, Microfilmación, Selección
    procedureNotes: string;
  }[];
}

export interface FolderLabel {
  entity: string;
  fondo: string;
  seccion: string;
  subseccion: string;
  serieCode: string;
  serieName: string;
  subserieCode: string;
  subserieName: string;
  expedienteTitle: string;
  fechaInicial: string; // YYYY-MM-DD
  fechaFinal: string; // YYYY-MM-DD
  totalFolios: number;
  noCarpeta: number;
  totalCarpetas: number;
  noCaja: number;
}

export interface FUIDRow {
  numeroOrden: number;
  codigo: string;
  nombreSerieSubserieAsunto: string;
  fechaInicial: string;
  fechaFinal: string;
  caja: number;
  carpeta: number;
  tomo: number;
  numeroFolios: number;
  soporte: string;
  frecuenciaConsulta: 'Alta' | 'Media' | 'Baja';
  notas: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  code: string;
  targetOffice: string;
  contextDescription: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  estimatedMinutes: number;
  documents: ArchivalDocument[];
  expectedTRDSerie: string;
  expectedTRDSubserie: string;
  expectedFolderName: string;
  expectedRetention: string;
}

export interface EvaluationResult {
  stage1Score: number; // Desmetalizado y limpieza
  stage2Score: number; // Clasificación TRD y descarte
  stage3Score: number; // Ordenación por orden original
  stage4Score: number; // Foliación técnica AGN
  stage5Score: number; // Rótulo de carpeta 4 aletas
  stage6Score: number; // FUID y Hoja de control
  totalScore: number;
  isApproved: boolean; // >= 70%
  feedbackNotes: string[];
  strengths: string[];
  improvementAreas: string[];
  completedAt?: string;
}
