import { CaseStudy, TRDSerie } from '../types/archive';

export const OFFICIAL_TRD_SERIES: TRDSerie[] = [
  {
    code: '100.02',
    name: 'ACTAS',
    subseries: [
      {
        code: '100.02.01',
        name: 'Actas de Consejo Directivo Nacional',
        retentionGestionYears: 3,
        retentionCentralYears: 17,
        finalDisposition: 'CT',
        procedureNotes: 'Conservación total por su valor histórico y probatorio institucional.'
      },
      {
        code: '100.02.05',
        name: 'Actas de Comité Técnico de Centro',
        retentionGestionYears: 2,
        retentionCentralYears: 8,
        finalDisposition: 'CT',
        procedureNotes: 'Conservar en archivo de gestión 2 años luego de finalizada la vigencia.'
      }
    ]
  },
  {
    code: '120.18',
    name: 'CONTRATOS',
    subseries: [
      {
        code: '120.18.01',
        name: 'Contratos de Compraventa y Suministro',
        retentionGestionYears: 2,
        retentionCentralYears: 18,
        finalDisposition: 'CT',
        procedureNotes: 'Custodiar en gestión durante la vigencia contractual y liquidación.'
      },
      {
        code: '120.18.02',
        name: 'Contratos de Prestación de Servicios',
        retentionGestionYears: 2,
        retentionCentralYears: 18,
        finalDisposition: 'CT',
        procedureNotes: 'Expediente completo desde estudios previos hasta acta de liquidación.'
      }
    ]
  },
  {
    code: '120.24',
    name: 'HISTORIAS LABORALES',
    subseries: [
      {
        code: '120.24.01',
        name: 'Historias Laborales - Servidores Públicos de Carrera y Planta',
        retentionGestionYears: 5,
        retentionCentralYears: 75,
        finalDisposition: 'CT',
        procedureNotes: 'Orden cronológico riguroso por trámite. Conservación total (75 años central).'
      },
      {
        code: '120.24.02',
        name: 'Historias Laborales - Trabajadores Oficiales',
        retentionGestionYears: 5,
        retentionCentralYears: 75,
        finalDisposition: 'CT',
        procedureNotes: 'Organizar conforme a la Circular Conjunta AGN-DAFP 004 de 2003.'
      }
    ]
  },
  {
    code: '100.08',
    name: 'COMUNICACIONES OFICIALES',
    subseries: [
      {
        code: '100.08.01',
        name: 'Memorandos Internos de Coordinación',
        retentionGestionYears: 1,
        retentionCentralYears: 2,
        finalDisposition: 'E',
        procedureNotes: 'Eliminación transcurrido el tiempo precaucional si no derivan en acto administrativo.'
      }
    ]
  }
];

export const INITIAL_CASES: CaseStudy[] = [
  {
    id: 'caso-contratos-042',
    title: 'Contrato de Prestación de Servicios No. 042-2024',
    code: 'CPS-042-2024',
    targetOffice: 'Grupo de Apoyo Administrativo Mixto y Contratación',
    contextDescription: 'La oficina de Contratación del Centro de Servicios Administrativos SENA te hace entrega de una bandeja con documentos acumulados del proceso de contratación del contratista Lic. Carlos Andrés Mora. Hay documentos oficiales de trámite mezclados con borradores informales, ganchos metálicos oxidados, notas post-it y material abrasivo. Debes conformar el expediente único del contrato.',
    difficulty: 'Básico',
    estimatedMinutes: 15,
    expectedTRDSerie: '120.18',
    expectedTRDSubserie: '120.18.02',
    expectedFolderName: 'CONTRATO DE PRESTACIÓN DE SERVICIOS NO. 042-2024 - CARLOS ANDRÉS MORA',
    expectedRetention: 'Gestión: 2 años / Central: 18 años / Disposición: Conservación Total (CT)',
    documents: [
      {
        id: 'doc-1',
        code: 'EST-PREV-01',
        title: 'Estudios Previos de Necesidad y Conveniencia',
        date: '2024-01-15',
        documentType: 'Estudios Previos',
        producerOffice: 'Subdirección de Centro',
        senderOrSigner: 'Subdirector de Centro - Ing. Roberto Salcedo',
        recipient: 'Comité de Contratación',
        summary: 'Justificación técnica de la necesidad de contratar apoyo profesional en gestión documental y archivo.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 1,
        hasAbrasiveMaterial: ['grapa_oxidada'],
        cleanedMaterials: [],
        contentSnippet: 'REPÚBLICA DE COLOMBIA - SENA\nCENTRO DE SERVICIOS ADMINISTRATIVOS\nESTUDIO PREVIO DE CONVENIENCIA Y OPORTUNIDAD\n1. DESCRIPCIÓN DE LA NECESIDAD: Se requiere la contratación de servicios de apoyo profesional para la organización del archivo de gestión del Centro...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'doc-2',
        code: 'CDP-2024-118',
        title: 'Certificado de Disponibilidad Presupuestal (CDP) No. 118',
        date: '2024-01-18',
        documentType: 'Certificado Presupuestal',
        producerOffice: 'Grupo de Presupuesto',
        senderOrSigner: 'Coordinador Financiero - Lic. Álvaro Gómez',
        recipient: 'Grupo de Contratación',
        summary: 'Respaldo presupuestal por valor de $24.000.000 COP con cargo al rubro de servicios profesionales.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 2,
        hasAbrasiveMaterial: ['clip_metalico'],
        cleanedMaterials: [],
        contentSnippet: 'SENA - DIRECCIÓN REGIONAL\nCERTIFICADO DE DISPONIBILIDAD PRESUPUESTAL NO. 118\nEl suscrito Coordinador de Presupuesto certifica que existe apropiación disponible en el Rubro C-202-Servicios de Gestión...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'doc-3',
        code: 'PROP-TEC-HV',
        title: 'Propuesta Técnica y Hoja de Vida del Postulado',
        date: '2024-01-22',
        documentType: 'Propuesta Técnica',
        producerOffice: 'Contratista Proponente',
        senderOrSigner: 'Carlos Andrés Mora - C.C. 1.018.425.990',
        recipient: 'Subdirección de Centro',
        summary: 'Propuesta metodológica y soportes académicos de experiencia en administración documental.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 3,
        hasAbrasiveMaterial: ['clip_metalico', 'post_it'],
        cleanedMaterials: [],
        contentSnippet: 'BOGOTÁ D.C., 22 DE ENERO DE 2024\nSEÑORES SERVICIO NACIONAL DE APRENDIZAJE - SENA\nREF: PROPUESTA TÉCNICA Y ECONÓMICA CPS-042\nYo, Carlos Andrés Mora, presento formal propuesta para ejecutar las labores contratadas...',
        hasOfficialStamp: false,
        hasSignature: true
      },
      {
        id: 'doc-apoyo-1',
        code: 'BORR-CALC-00',
        title: 'Borrador de Cálculo de Horas y Apuntes en Papel Reciclado',
        date: '2024-01-24',
        documentType: 'Borrador de Trabajo',
        producerOffice: 'Oficina Auxiliar',
        senderOrSigner: 'Auxiliar sin firma',
        recipient: 'Uso interno temporal',
        summary: 'Anotaciones a mano de sumas de honorarios y tachones de teléfono de contacto.',
        isArchiveDocument: false, // DOCUMENTO DE APOYO
        correctSerieCode: '',
        correctSubserieCode: '',
        correctOrderIndex: -1,
        hasAbrasiveMaterial: ['post_it'],
        cleanedMaterials: [],
        contentSnippet: 'BORRADOR INFORMAL - NO VALIDO\n* Revisar con Anita la tabla de retención en la fuente.\n* 24M / 8 meses = 3M mensual menos estampillas.\n(Teléfono tachado: 310-555-0199)',
        hasOfficialStamp: false,
        hasSignature: false,
        isFolioExempt: true,
        notes: 'Es un borrador de cálculo interno sin valor administrativo ni probatorio. Debe descartarse en la depuración.'
      },
      {
        id: 'doc-4',
        code: 'MIN-CPS-042',
        title: 'Minuta de Contrato de Prestación de Servicios No. 042-2024',
        date: '2024-01-26',
        documentType: 'Contrato',
        producerOffice: 'Grupo de Contratación',
        senderOrSigner: 'Subdirector de Centro y Carlos Andrés Mora',
        recipient: 'Partes Contractuales',
        summary: 'Contrato perfeccionado con firmas de ordenador del gasto y contratista.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 4,
        hasAbrasiveMaterial: ['grapa_oxidada'],
        cleanedMaterials: [],
        contentSnippet: 'CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES NO. 042 DE 2024\nEntre los suscritos a saber: ROBERTO SALCEDO, en calidad de Subdirector de Centro, y CARLOS ANDRÉS MORA, se celebra el presente contrato regulado por la Ley 80 de 1993...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'doc-5',
        code: 'RP-2024-094',
        title: 'Registro Presupuestal de Compromiso (RP) No. 094',
        date: '2024-01-29',
        documentType: 'Registro Presupuestal',
        producerOffice: 'Grupo de Presupuesto',
        senderOrSigner: 'Coordinador Financiero',
        recipient: 'Grupo de Contratación',
        summary: 'Afectación definitiva de los recursos del contrato 042-2024.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 5,
        hasAbrasiveMaterial: ['clip_metalico'],
        cleanedMaterials: [],
        contentSnippet: 'SENA REGIONAL - REGISTRO PRESUPUESTAL NO. 094\nAmparando el Contrato 042-2024 a favor de Carlos Andrés Mora por la suma de $24.000.000 M/CTE...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'doc-6',
        code: 'POL-SEG-772',
        title: 'Póliza de Cumplimiento y Calidad No. 772091 y Acta de Aprobación',
        date: '2024-02-01',
        documentType: 'Garantía Contractual',
        producerOffice: 'Aseguradora Solidaria / Aprobado SENA',
        senderOrSigner: 'Aseguradora Solidaria y Asesor Jurídico SENA',
        recipient: 'SENA Regional',
        summary: 'Garantía única de cumplimiento del contrato y formal acto de aprobación de la póliza.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 6,
        hasAbrasiveMaterial: ['grapa_oxidada'],
        cleanedMaterials: [],
        contentSnippet: 'PÓLIZA DE SEGURO DE CUMPLIMIENTO A FAVOR DE ENTIDADES ESTATALES NO. 772091\nAsegurado: SERVICIO NACIONAL DE APRENDIZAJE - SENA. Tomador: Carlos Andrés Mora.\nAPROBADO MEDIANTE AUTO JURÍDICO DEL 01-FEB-2024...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'doc-apoyo-2',
        code: 'FOLLETO-COM-01',
        title: 'Folleto Publicitario de Paquetes de Archivo Móvil de Empresa Externa',
        date: '2024-02-02',
        documentType: 'Material Comercial',
        producerOffice: 'Empresa Privada de Estantería',
        senderOrSigner: 'Ventas Estanterías S.A.S.',
        recipient: 'Oficina SENA',
        summary: 'Catálogo publicitario con precios de estantería rodante.',
        isArchiveDocument: false, // DOCUMENTO DE APOYO
        correctSerieCode: '',
        correctSubserieCode: '',
        correctOrderIndex: -1,
        hasAbrasiveMaterial: ['clip_metalico'],
        cleanedMaterials: [],
        contentSnippet: 'CATÁLOGO PUBLICITARIO 2024: Las mejores soluciones de archivo rodante y cajas FUID para su empresa. ¡Descuentos del 15% este mes!',
        hasOfficialStamp: false,
        hasSignature: false,
        isFolioExempt: true,
        notes: 'Documento comercial ajeno a la relación contractual. No constituye documento de archivo del expediente.'
      },
      {
        id: 'doc-7',
        code: 'ACT-INI-042',
        title: 'Acta de Inicio de Actividades Contractuales',
        date: '2024-02-05',
        documentType: 'Acta de Inicio',
        producerOffice: 'Supervisión de Contrato',
        senderOrSigner: 'Supervisora - Ing. Sandra Milena Peña y Contratista',
        recipient: 'Expediente Contractual',
        summary: 'Formalización de fecha exacta de inicio de labores pactadas.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 7,
        hasAbrasiveMaterial: ['caucho_vencido'],
        cleanedMaterials: [],
        contentSnippet: 'ACTA DE INICIO DE LABORES\nEn Bogotá D.C., a los 05 días del mes de febrero de 2024, se reunieron la Supervisora designada y el Contratista para dar inicio formal al plazo contractual de 8 meses...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'doc-8',
        code: 'INF-SUP-01',
        title: 'Informe Mensual de Supervisión y Recibido a Satisfacción No. 01',
        date: '2024-03-05',
        documentType: 'Informe de Supervisión',
        producerOffice: 'Supervisión de Contrato',
        senderOrSigner: 'Supervisora Sandra Milena Peña',
        recipient: 'Ordenador del Gasto',
        summary: 'Certificación de cumplimiento del primer periodo contractual para trámite de pago.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 8,
        hasAbrasiveMaterial: ['grapa_oxidada', 'clip_metalico'],
        cleanedMaterials: [],
        contentSnippet: 'INFORME DE SUPERVISIÓN NO. 01 - PERIODO FEBRERO 2024\nCertifico que el contratista Carlos Andrés Mora cumplió a satisfacción con las obligaciones contractuales asignadas durante el periodo reportado...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'doc-apoyo-3',
        code: 'HOJA-BLANCO',
        title: 'Hoja en Blanco Insertada por Error de Fotocopiadora',
        date: '2024-03-06',
        documentType: 'Papel sin Contenido',
        producerOffice: 'Impresora Central',
        senderOrSigner: 'Ninguno',
        recipient: 'Ninguno',
        summary: 'Hoja en blanco que quedó en medio de los documentos.',
        isArchiveDocument: false, // DOCUMENTO DE APOYO
        correctSerieCode: '',
        correctSubserieCode: '',
        correctOrderIndex: -1,
        hasAbrasiveMaterial: [],
        cleanedMaterials: [],
        contentSnippet: '[HOJA TOTALMENTE EN BLANCO - SIN TEXTO NI SELLOS]',
        hasOfficialStamp: false,
        hasSignature: false,
        isFolioExempt: true,
        notes: 'Las hojas en blanco jamás se folian de acuerdo al instructivo de foliación del AGN. Deben retirarse en la fase de depuración.'
      },
      {
        id: 'doc-9',
        code: 'ACT-LIQ-042',
        title: 'Acta de Liquidación y Cierre de Mutuo Acuerdo',
        date: '2024-10-15',
        documentType: 'Acta de Liquidación',
        producerOffice: 'Subdirección de Centro',
        senderOrSigner: 'Subdirector, Supervisora y Contratista',
        recipient: 'Expediente Contractual',
        summary: 'Balance final económico y administrativo con paz y salvo recíproco.',
        isArchiveDocument: true,
        correctSerieCode: '120.18',
        correctSubserieCode: '120.18.02',
        correctOrderIndex: 9,
        hasAbrasiveMaterial: ['clip_metalico'],
        cleanedMaterials: [],
        contentSnippet: 'ACTA DE LIQUIDACIÓN BILATERAL DEL CONTRATO NO. 042 DE 2024\nCon fecha 15 de octubre de 2024, las partes declaran que el objeto contractual fue ejecutado en su totalidad y se encuentran a paz y salvo por todo concepto...',
        hasOfficialStamp: true,
        hasSignature: true
      }
    ]
  },
  {
    id: 'caso-historia-laboral',
    title: 'Historia Laboral - Servidora Pública Dra. Marcela Rincón',
    code: 'HL-120-24-01-MR',
    targetOffice: 'Grupo de Gestión del Talento Humano',
    contextDescription: 'El Grupo de Talento Humano debe integrar el expediente de la Historia Laboral de la instructora de carrera administrativa Dra. Marcela Rincón Velandia. Debes verificar el principio de orden original desde su posesión hasta su última calificación de servicios, retirando duplicados y elementos corrosivos.',
    difficulty: 'Intermedio',
    estimatedMinutes: 20,
    expectedTRDSerie: '120.24',
    expectedTRDSubserie: '120.24.01',
    expectedFolderName: 'HISTORIA LABORAL - RINCÓN VELANDIA MARCELA - C.C. 52.348.910',
    expectedRetention: 'Gestión: 5 años / Central: 75 años / Disposición: Conservación Total (CT)',
    documents: [
      {
        id: 'hl-1',
        code: 'HV-SIGEP',
        title: 'Hoja de Vida Formato Único Función Pública (SIGEP) con Soportes',
        date: '2019-03-01',
        documentType: 'Hoja de Vida',
        producerOffice: 'Talento Humano',
        senderOrSigner: 'Marcela Rincón Velandia',
        recipient: 'SENA Talento Humano',
        summary: 'Formato diligenciado con datos personales, títulos profesionales y antecedentes.',
        isArchiveDocument: true,
        correctSerieCode: '120.24',
        correctSubserieCode: '120.24.01',
        correctOrderIndex: 1,
        hasAbrasiveMaterial: ['clip_metalico', 'post_it'],
        cleanedMaterials: [],
        contentSnippet: 'DEPARTAMENTO ADMINISTRATIVO DE LA FUNCIÓN PÚBLICA\nFORMATO ÚNICO DE HOJA DE VIDA - PERSONA NATURAL\nNombres: MARCELA RINCÓN VELANDIA. C.C. 52.348.910 de Bogotá...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'hl-2',
        code: 'RES-NOM-089',
        title: 'Resolución de Nombramiento en Periodo de Prueba No. 089',
        date: '2019-03-12',
        documentType: 'Acto Administrativo',
        producerOffice: 'Dirección General SENA',
        senderOrSigner: 'Director General SENA',
        recipient: 'Marcela Rincón Velandia',
        summary: 'Acto administrativo de nombramiento en el cargo de Instructor G01.',
        isArchiveDocument: true,
        correctSerieCode: '120.24',
        correctSubserieCode: '120.24.01',
        correctOrderIndex: 2,
        hasAbrasiveMaterial: ['grapa_oxidada'],
        cleanedMaterials: [],
        contentSnippet: 'RESOLUCIÓN NO. 089 DE 2019 - SENA\nPor la cual se nombra en Periodo de Prueba a quien superó concurso de méritos de la CNSC: Marcela Rincón Velandia en el cargo Instructor...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'hl-3',
        code: 'ACT-POS-045',
        title: 'Acta de Posesión No. 045 de Servidor Público',
        date: '2019-03-15',
        documentType: 'Acta de Posesión',
        producerOffice: 'Secretaría General / Regional',
        senderOrSigner: 'Director Regional y Posesionada',
        recipient: 'Expediente Laboral',
        summary: 'Juramento y formal toma de posesión del cargo público.',
        isArchiveDocument: true,
        correctSerieCode: '120.24',
        correctSubserieCode: '120.24.01',
        correctOrderIndex: 3,
        hasAbrasiveMaterial: ['clip_metalico'],
        cleanedMaterials: [],
        contentSnippet: 'ACTA DE POSESIÓN NO. 045\nEn la ciudad de Bogotá D.C., a los 15 días del mes de marzo de 2019, tomó posesión del cargo de Instructor la ciudadana Marcela Rincón Velandia...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'hl-apoyo-1',
        code: 'RECETA-MED-EXT',
        title: 'Volante Informativo de Descuentos Farmacia Caja de Compensación',
        date: '2019-04-02',
        documentType: 'Publicidad Comercial',
        producerOffice: 'Entidad Externa',
        senderOrSigner: 'Caja de Compensación',
        recipient: 'Empleados',
        summary: 'Folleto de promociones en droguerías.',
        isArchiveDocument: false,
        correctSerieCode: '',
        correctSubserieCode: '',
        correctOrderIndex: -1,
        hasAbrasiveMaterial: ['post_it'],
        cleanedMaterials: [],
        contentSnippet: 'PROMOCIÓN VIGENTE: 20% de descuento en artículos de cuidado personal presentando su carné de afiliado.',
        hasOfficialStamp: false,
        hasSignature: false,
        isFolioExempt: true,
        notes: 'Documento informativo temporal sin relevancia para la historia laboral.'
      },
      {
        id: 'hl-4',
        code: 'CERT-EPS-AFP',
        title: 'Certificados de Afiliación a Seguridad Social (EPS, ARL, AFP, Cesantías)',
        date: '2019-03-20',
        documentType: 'Seguridad Social',
        producerOffice: 'Entidades Promotoras',
        senderOrSigner: 'EPS Sanitas / Positiva ARL / Colfondos',
        recipient: 'SENA Talento Humano',
        summary: 'Comprobantes de vinculación a seguridad social integral.',
        isArchiveDocument: true,
        correctSerieCode: '120.24',
        correctSubserieCode: '120.24.01',
        correctOrderIndex: 4,
        hasAbrasiveMaterial: ['grapa_oxidada'],
        cleanedMaterials: [],
        contentSnippet: 'SISTEMA GENERAL DE SEGURIDAD SOCIAL\nCertificado de afiliación activa como trabajadora dependiente de la entidad aportante SERVICIO NACIONAL DE APRENDIZAJE...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'hl-5',
        code: 'EVAL-DES-01',
        title: 'Evaluación del Desempeño Laboral - Periodo de Prueba (Sobresaliente)',
        date: '2019-09-20',
        documentType: 'Evaluación Laboral',
        producerOffice: 'Comisión Evaluadora',
        senderOrSigner: 'Evaluador Superior Jerárquico',
        recipient: 'Comisión Nacional del Servicio Civil',
        summary: 'Calificación definitiva del periodo de prueba con puntaje de 98/100.',
        isArchiveDocument: true,
        correctSerieCode: '120.24',
        correctSubserieCode: '120.24.01',
        correctOrderIndex: 5,
        hasAbrasiveMaterial: ['clip_metalico'],
        cleanedMaterials: [],
        contentSnippet: 'CNSC - EVALUACIÓN DEL DESEMPEÑO LABORAL EN PERIODO DE PRUEBA\nServidor: MARCELA RINCÓN VELANDIA. Calificación cuantitativa: 98.4 puntos. Nivel: Sobresaliente...',
        hasOfficialStamp: true,
        hasSignature: true
      },
      {
        id: 'hl-6',
        code: 'INS-CARR-112',
        title: 'Resolución de Inscripción en el Escalafón de Carrera Administrativa',
        date: '2019-11-10',
        documentType: 'Acto Administrativo CNSC',
        producerOffice: 'Comisión Nacional del Servicio Civil',
        senderOrSigner: 'Presidente CNSC',
        recipient: 'SENA Talento Humano',
        summary: 'Registro público de carrera administrativa tras superar periodo de prueba.',
        isArchiveDocument: true,
        correctSerieCode: '120.24',
        correctSubserieCode: '120.24.01',
        correctOrderIndex: 6,
        hasAbrasiveMaterial: ['grapa_oxidada'],
        cleanedMaterials: [],
        contentSnippet: 'CNSC - REGISTRO PÚBLICO DE CARRERA ADMINISTRATIVA\nInscripción en Carrera Administrativa de la servidora Marcela Rincón Velandia en la planta de personal del SENA...',
        hasOfficialStamp: true,
        hasSignature: true
      }
    ]
  }
];

export const ARCHIVAL_GLOSSARY = [
  {
    term: 'Archivo de Gestión',
    definition: 'Es aquel donde reposan los documentos en trámite o sometidos a continuo uso y consulta administrativa por las mismas oficinas productoras. Comprende el primer ciclo vital del documento (edad activa).'
  },
  {
    term: 'Principio de Procedencia',
    definition: 'Regla fundamental de la archivística que establece que los documentos producidos por una institución y por cada una de sus dependencias no deben mezclarse con los de otras entidades o unidades orgánicas.'
  },
  {
    term: 'Principio de Orden Original',
    definition: 'Garantiza que la disposición física de los documentos dentro de un expediente mantenga la secuencia y lógica temporal en la que se surtió el trámite administrativo.'
  },
  {
    term: 'Tabla de Retención Documental (TRD)',
    definition: 'Listado de series y sus correspondientes subseries con sus tipos documentales, a las cuales se les asigna el tiempo de permanencia en cada etapa del ciclo vital del documento (gestión y central), así como su disposición final.'
  },
  {
    term: 'Foliación',
    definition: 'Acto administrativo de enumerar consecutivamente cada una de las hojas de un expediente en la esquina superior derecha con lápiz de grafito negro blando (HB o B), asegurando la integridad del testimonio documental.'
  },
  {
    term: 'Documento de Apoyo',
    definition: 'Documento generado o recibido por una dependencia con fines de información o consulta temporal (fotocopias no autenticadas, borradores, catálogos, circulares informativas generales) que NO hace parte de las series documentales oficiales y debe eliminarse oportunamente.'
  },
  {
    term: 'FUID (Formato Único de Inventario Documental)',
    definition: 'Instrumento archivístico reglamentado por el Acuerdo AGN 042 de 2002 para la descripción de los fondos documentales, transferencias primarias, transferencias secundarias y entregas de inventario de archivo de gestión.'
  },
  {
    term: 'Desmetalizado / Limpieza Mecánica',
    definition: 'Proceso de conservación preventiva mediante el cual se retiran grapas oxidadas, clips metálicos, chinches, cauchos y adhesivos que generan manchas químicas y rasgaduras en el soporte papel, reemplazándolos por ganchos plásticos.'
  },
  {
    term: 'Carpeta de Cuatro Aletas',
    definition: 'Unidad de conservación reglamentaria elaborada en material desacidificado (yute o propalcote) que protege hasta un límite óptimo de 200 folios por tomo sin requerir perforación mecánica que mutile el texto.'
  }
];

export const NORMATIVE_FRAMEWORK = [
  {
    norma: 'Ley 594 de 2000',
    title: 'Ley General de Archivos',
    article: 'Título V: Gestión de Documentos. Artículos 21 al 26',
    excerpt: 'Las entidades públicas deberán elaborar programas de gestión documental y adoptar las tablas de retención documental como instrumentos archivísticos de obligatorio cumplimiento.'
  },
  {
    norma: 'Acuerdo AGN 002 de 2014',
    title: 'Criterios Básicos para la Creación y Organización de Expedientes',
    article: 'Artículos 4, 5 y 8',
    excerpt: 'Establece que cada expediente debe reflejar el orden original de las actuaciones administrativas y contar con su respectiva hoja de control al inicio de la unidad de conservación.'
  },
  {
    norma: 'Acuerdo AGN 042 de 2002',
    title: 'Criterios para la Organización de Archivos de Gestión y el FUID',
    article: 'Artículos 1, 2 y 3',
    excerpt: 'Reglamenta el Formato Único de Inventario Documental - FUID para registrar las unidades documentales en archivo de gestión y controlar transferencias primarias.'
  },
  {
    norma: 'Circular AGN 004 de 2003',
    title: 'Organización de Historias Laborales y Foliación Técnica',
    article: 'Instrucciones Técnicas Generales',
    excerpt: 'Prohíbe la foliación con bolígrafo o tinta. Exige el uso exclusivo de lápiz negro blando en el ángulo superior derecho en el sentido del texto.'
  }
];
