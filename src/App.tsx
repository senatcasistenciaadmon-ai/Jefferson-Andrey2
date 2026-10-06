import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StageProgress } from './components/StageProgress';
import { DocumentInspectorModal } from './components/DocumentInspectorModal';
import { InstructorAdvisorModal } from './components/InstructorAdvisorModal';
import { TRDModal } from './components/TRDModal';
import { NormativeModal } from './components/NormativeModal';
import { GlossaryModal } from './components/GlossaryModal';
import { CaseSelectorModal } from './components/CaseSelectorModal';
import { PortadaHero } from './components/PortadaHero';

import { Stage1MechanicalCleaning } from './components/stages/Stage1MechanicalCleaning';
import { Stage2Classification } from './components/stages/Stage2Classification';
import { Stage3Ordering } from './components/stages/Stage3Ordering';
import { Stage4DepurationAndFoliation } from './components/stages/Stage4DepurationAndFoliation';
import { Stage5FolderAndLabel } from './components/stages/Stage5FolderAndLabel';
import { Stage6FUID } from './components/stages/Stage6FUID';
import { Stage7EvaluationRubric } from './components/stages/Stage7EvaluationRubric';

import { INITIAL_CASES, OFFICIAL_TRD_SERIES } from './data/casesData';
import { 
  ArchivalDocument, 
  ArchivalMaterial, 
  FolderLabel, 
  FUIDRow, 
  EvaluationResult, 
  CaseStudy 
} from './types/archive';
import { GraduationCap, FolderOpen, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation / Modal States
  const [activeNavTab, setActiveNavTab] = useState<'simulation' | 'trd' | 'normative' | 'glossary'>('simulation');
  const [isInstructorOpen, setIsInstructorOpen] = useState(false);
  const [isTrdOpen, setIsTrdOpen] = useState(false);
  const [isNormativeOpen, setIsNormativeOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isCaseSelectorOpen, setIsCaseSelectorOpen] = useState(false);
  const [inspectedDoc, setInspectedDoc] = useState<ArchivalDocument | null>(null);

  // Apprentice Profile
  const [apprenticeName, setApprenticeName] = useState('Laura Sofía Gómez Morales');
  const [apprenticeFicha, setApprenticeFicha] = useState('2849012');

  // Active Case
  const [currentCaseId, setCurrentCaseId] = useState<string>('caso-contratos-042');
  const currentCase = useMemo(
    () => INITIAL_CASES.find((c) => c.id === currentCaseId) || INITIAL_CASES[0],
    [currentCaseId]
  );

  // Simulation Stages State - All stages active and unlocked
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState<number>(7);

  // Stage 1 State: Mechanical Cleaning & De-stapling
  const [documentsState, setDocumentsState] = useState<ArchivalDocument[]>(() =>
    JSON.parse(JSON.stringify(currentCase.documents))
  );

  // Stage 2 State: Classification
  const [userClassification, setUserClassification] = useState<
    Record<string, { isArchive: boolean; serieCode?: string; subserieCode?: string }>
  >({});

  // Stage 3 State: Ordered Archival Documents
  const [orderedArchiveDocs, setOrderedArchiveDocs] = useState<ArchivalDocument[]>(() =>
    currentCase.documents
      .filter((d) => d.isArchiveDocument)
      .sort((a, b) => a.correctOrderIndex - b.correctOrderIndex)
  );

  // Stage 4 State: Foliation
  const [userFolios, setUserFolios] = useState<Record<string, number>>(() => {
    const folios: Record<string, number> = {};
    currentCase.documents
      .filter((d) => d.isArchiveDocument)
      .forEach((d, idx) => {
        folios[d.id] = idx + 1;
      });
    return folios;
  });

  // Stage 5 State: Folder & Label
  const [folderLabel, setFolderLabel] = useState<FolderLabel>(() => {
    const archiveDocs = currentCase.documents
      .filter((d) => d.isArchiveDocument)
      .sort((a, b) => a.correctOrderIndex - b.correctOrderIndex);
    return {
      entity: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
      fondo: 'DIRECCIÓN GENERAL / REGIONAL DISTRITO CAPITAL',
      seccion: '100 - SUBDIRECCIÓN DE CENTRO',
      subseccion: '120 - GRUPO DE CONTRATACIÓN Y APOYO MIXTO',
      serieCode: currentCase.expectedTRDSerie,
      serieName: currentCase.id.includes('contratos') ? 'CONTRATOS' : 'HISTORIAS LABORALES',
      subserieCode: currentCase.expectedTRDSubserie,
      subserieName: currentCase.id.includes('contratos')
        ? 'CONTRATOS DE PRESTACIÓN DE SERVICIOS'
        : 'HISTORIAS LABORALES SERVIDORES PÚBLICOS',
      expedienteTitle: currentCase.expectedFolderName,
      fechaInicial: archiveDocs[0]?.date || '2024-01-15',
      fechaFinal: archiveDocs[archiveDocs.length - 1]?.date || '2024-10-15',
      totalFolios: archiveDocs.length,
      noCarpeta: 1,
      totalCarpetas: 1,
      noCaja: 1,
    };
  });

  // Stage 6 State: FUID
  const [fuidRow, setFuidRow] = useState<FUIDRow>(() => {
    const archiveDocs = currentCase.documents.filter((d) => d.isArchiveDocument);
    return {
      numeroOrden: 1,
      codigo: currentCase.expectedTRDSubserie,
      nombreSerieSubserieAsunto: currentCase.expectedFolderName,
      fechaInicial: archiveDocs[0]?.date || '2024-01-15',
      fechaFinal: archiveDocs[archiveDocs.length - 1]?.date || '2024-10-15',
      caja: 1,
      carpeta: 1,
      tomo: 1,
      numeroFolios: archiveDocs.length,
      soporte: 'Papel',
      frecuenciaConsulta: 'Alta',
      notas: 'Expediente contractual completo debidamente foliado y depurado conforme al AGN.',
    };
  });

  // Reset simulator when changing case
  const handleSelectCase = (caseId: string) => {
    setCurrentCaseId(caseId);
    const selected = INITIAL_CASES.find((c) => c.id === caseId) || INITIAL_CASES[0];
    setDocumentsState(JSON.parse(JSON.stringify(selected.documents)));
    setCurrentStage(1);
    setMaxUnlockedStage(7);
    
    // Auto populate defaults for all stages
    const archiveDocs = selected.documents
      .filter((d) => d.isArchiveDocument)
      .sort((a, b) => a.correctOrderIndex - b.correctOrderIndex);
    setOrderedArchiveDocs(archiveDocs);

    const folios: Record<string, number> = {};
    archiveDocs.forEach((d, idx) => {
      folios[d.id] = idx + 1;
    });
    setUserFolios(folios);

    const newClasses: Record<string, { isArchive: boolean; serieCode?: string; subserieCode?: string }> = {};
    selected.documents.forEach((d) => {
      newClasses[d.id] = {
        isArchive: d.isArchiveDocument,
        serieCode: d.isArchiveDocument ? selected.expectedTRDSerie : undefined,
        subserieCode: d.isArchiveDocument ? selected.expectedTRDSubserie : undefined,
      };
    });
    setUserClassification(newClasses);

    setFolderLabel({
      entity: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
      fondo: 'DIRECCIÓN GENERAL / REGIONAL DISTRITO CAPITAL',
      seccion: '100 - SUBDIRECCIÓN DE CENTRO',
      subseccion: '120 - GRUPO DE APOYO ADMINISTRATIVO',
      serieCode: selected.expectedTRDSerie,
      serieName: selected.id.includes('contratos') ? 'CONTRATOS' : 'HISTORIAS LABORALES',
      subserieCode: selected.expectedTRDSubserie,
      subserieName: selected.id.includes('contratos')
        ? 'CONTRATOS DE PRESTACIÓN DE SERVICIOS'
        : 'HISTORIAS LABORALES SERVIDORES PÚBLICOS',
      expedienteTitle: selected.expectedFolderName,
      fechaInicial: archiveDocs[0]?.date || '',
      fechaFinal: archiveDocs[archiveDocs.length - 1]?.date || '',
      totalFolios: archiveDocs.length,
      noCarpeta: 1,
      totalCarpetas: 1,
      noCaja: 1,
    });

    setFuidRow({
      numeroOrden: 1,
      codigo: selected.expectedTRDSubserie,
      nombreSerieSubserieAsunto: selected.expectedFolderName,
      fechaInicial: archiveDocs[0]?.date || '',
      fechaFinal: archiveDocs[archiveDocs.length - 1]?.date || '',
      caja: 1,
      carpeta: 1,
      tomo: 1,
      numeroFolios: archiveDocs.length,
      soporte: 'Papel',
      frecuenciaConsulta: 'Alta',
      notas: 'Expediente depurado y transferido con normas AGN.',
    });
    setIsCaseSelectorOpen(false);
  };

  const handleResetCurrentCase = () => {
    handleSelectCase(currentCaseId);
  };

  // Helper to instantly auto-classify all documents according to the TRD
  const handleAutoClassifyAll = () => {
    const newClasses: Record<string, { isArchive: boolean; serieCode?: string; subserieCode?: string }> = {};
    documentsState.forEach((d) => {
      newClasses[d.id] = {
        isArchive: d.isArchiveDocument,
        serieCode: d.isArchiveDocument ? currentCase.expectedTRDSerie : undefined,
        subserieCode: d.isArchiveDocument ? currentCase.expectedTRDSubserie : undefined,
      };
    });
    setUserClassification(newClasses);
  };

  // Helper to auto-complete the entire archival cycle across all stages in 1 click
  const handleAutoResolveEntireCycle = () => {
    // 1. Clean all abrasive materials
    setDocumentsState((prev) =>
      prev.map((doc) => ({
        ...doc,
        cleanedMaterials: doc.hasAbrasiveMaterial ? [...doc.hasAbrasiveMaterial] : [],
      }))
    );

    // 2. Classify all
    handleAutoClassifyAll();

    // 3. Order all
    const archiveDocs = documentsState
      .filter((d) => d.isArchiveDocument)
      .sort((a, b) => a.correctOrderIndex - b.correctOrderIndex);
    setOrderedArchiveDocs(archiveDocs);

    // 4. Foliate all
    const folios: Record<string, number> = {};
    archiveDocs.forEach((d, idx) => {
      folios[d.id] = idx + 1;
    });
    setUserFolios(folios);

    // 5. Label
    setFolderLabel({
      entity: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
      fondo: 'DIRECCIÓN GENERAL / REGIONAL DISTRITO CAPITAL',
      seccion: '100 - SUBDIRECCIÓN DE CENTRO',
      subseccion: '120 - GRUPO DE CONTRATACIÓN Y APOYO ADMINISTRATIVO',
      serieCode: currentCase.expectedTRDSerie,
      serieName: currentCase.id.includes('contratos') ? 'CONTRATOS' : 'HISTORIAS LABORALES',
      subserieCode: currentCase.expectedTRDSubserie,
      subserieName: currentCase.id.includes('contratos')
        ? 'CONTRATOS DE PRESTACIÓN DE SERVICIOS'
        : 'HISTORIAS LABORALES SERVIDORES PÚBLICOS',
      expedienteTitle: currentCase.expectedFolderName,
      fechaInicial: archiveDocs[0]?.date || '2024-01-15',
      fechaFinal: archiveDocs[archiveDocs.length - 1]?.date || '2024-10-15',
      totalFolios: archiveDocs.length,
      noCarpeta: 1,
      totalCarpetas: 1,
      noCaja: 1,
    });

    // 6. FUID
    setFuidRow({
      numeroOrden: 1,
      codigo: currentCase.expectedTRDSubserie,
      nombreSerieSubserieAsunto: currentCase.expectedFolderName,
      fechaInicial: archiveDocs[0]?.date || '2024-01-15',
      fechaFinal: archiveDocs[archiveDocs.length - 1]?.date || '2024-10-15',
      caja: 1,
      carpeta: 1,
      tomo: 1,
      numeroFolios: archiveDocs.length,
      soporte: 'Papel',
      frecuenciaConsulta: 'Alta',
      notas: 'Expediente contractual completo debidamente foliado y depurado conforme al AGN.',
    });

    setMaxUnlockedStage(7);
  };

  // Stage 1 Handlers: Mechanical Cleaning
  const handleCleanMaterial = (docId: string, material: ArchivalMaterial) => {
    setDocumentsState((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const currentCleaned = doc.cleanedMaterials || [];
          if (!currentCleaned.includes(material)) {
            return {
              ...doc,
              cleanedMaterials: [...currentCleaned, material],
            };
          }
        }
        return doc;
      })
    );
  };

  const handleCleanAllInDoc = (docId: string) => {
    setDocumentsState((prev) =>
      prev.map((doc) => {
        if (doc.id === docId && doc.hasAbrasiveMaterial) {
          return {
            ...doc,
            cleanedMaterials: [...doc.hasAbrasiveMaterial],
          };
        }
        return doc;
      })
    );
  };

  const handleCleanAllInBatch = () => {
    setDocumentsState((prev) =>
      prev.map((doc) => ({
        ...doc,
        cleanedMaterials: doc.hasAbrasiveMaterial ? [...doc.hasAbrasiveMaterial] : [],
      }))
    );
  };

  // Stage 2 Handlers: Classification
  const handleSetClassification = (
    docId: string,
    isArchive: boolean,
    serieCode?: string,
    subserieCode?: string
  ) => {
    setUserClassification((prev) => ({
      ...prev,
      [docId]: { isArchive, serieCode, subserieCode },
    }));
  };

  const advanceToStage2 = () => {
    setCurrentStage(2);
    setMaxUnlockedStage((prev) => Math.max(prev, 2));
  };

  const advanceToStage3 = () => {
    // Filter only documents retained as Archive documents
    const archiveDocs = documentsState.filter((d) => d.isArchiveDocument);
    // Shuffle them slightly to challenge the apprentice with ordering
    const shuffled = [...archiveDocs].sort(() => Math.random() - 0.5);
    setOrderedArchiveDocs(shuffled);
    setCurrentStage(3);
    setMaxUnlockedStage((prev) => Math.max(prev, 3));
  };

  // Stage 3 Handlers: Ordering
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setOrderedArchiveDocs((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= orderedArchiveDocs.length - 1) return;
    setOrderedArchiveDocs((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  const handleAutoSortByProcedure = () => {
    setOrderedArchiveDocs((prev) =>
      [...prev].sort((a, b) => a.correctOrderIndex - b.correctOrderIndex)
    );
  };

  const advanceToStage4 = () => {
    setCurrentStage(4);
    setMaxUnlockedStage((prev) => Math.max(prev, 4));
  };

  // Stage 4 Handlers: Foliation
  const handleSetFolio = (docId: string, folioNum: number) => {
    setUserFolios((prev) => {
      if (folioNum <= 0) {
        const copy = { ...prev };
        delete copy[docId];
        return copy;
      }
      return { ...prev, [docId]: folioNum };
    });
  };

  const handleAutoFoliateAll = () => {
    const folios: Record<string, number> = {};
    orderedArchiveDocs.forEach((doc, idx) => {
      folios[doc.id] = idx + 1;
    });
    setUserFolios(folios);
  };

  const handleClearFolios = () => {
    setUserFolios({});
  };

  const advanceToStage5 = () => {
    // Populate label with initial extreme dates and folios
    const initialDate = orderedArchiveDocs[0]?.date || '';
    const finalDate = orderedArchiveDocs[orderedArchiveDocs.length - 1]?.date || '';
    setFolderLabel((prev) => ({
      ...prev,
      fechaInicial: initialDate,
      fechaFinal: finalDate,
      totalFolios: orderedArchiveDocs.length,
      expedienteTitle: currentCase.expectedFolderName,
      serieCode: currentCase.expectedTRDSerie,
      subserieCode: currentCase.expectedTRDSubserie,
      serieName: currentCase.id.includes('contratos') ? 'CONTRATOS' : 'HISTORIAS LABORALES',
      subserieName: currentCase.id.includes('contratos')
        ? 'CONTRATOS DE PRESTACIÓN DE SERVICIOS'
        : 'HISTORIAS LABORALES SERVIDORES PÚBLICOS',
    }));
    setCurrentStage(5);
    setMaxUnlockedStage((prev) => Math.max(prev, 5));
  };

  // Stage 5 Handlers: Folder & Label
  const handleUpdateLabel = (updated: Partial<FolderLabel>) => {
    setFolderLabel((prev) => ({ ...prev, ...updated }));
  };

  const handleAutoFillLabel = () => {
    const initialDate = orderedArchiveDocs[0]?.date || '';
    const finalDate = orderedArchiveDocs[orderedArchiveDocs.length - 1]?.date || '';
    setFolderLabel({
      entity: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
      fondo: 'DIRECCIÓN GENERAL / REGIONAL DISTRITO CAPITAL',
      seccion: '100 - SUBDIRECCIÓN DE CENTRO',
      subseccion: '120 - GRUPO DE CONTRATACIÓN Y APOYO ADMINISTRATIVO',
      serieCode: currentCase.expectedTRDSerie,
      serieName: currentCase.id.includes('contratos') ? 'CONTRATOS' : 'HISTORIAS LABORALES',
      subserieCode: currentCase.expectedTRDSubserie,
      subserieName: currentCase.id.includes('contratos')
        ? 'CONTRATOS DE PRESTACIÓN DE SERVICIOS'
        : 'HISTORIAS LABORALES SERVIDORES PÚBLICOS',
      expedienteTitle: currentCase.expectedFolderName,
      fechaInicial: initialDate,
      fechaFinal: finalDate,
      totalFolios: orderedArchiveDocs.length,
      noCarpeta: 1,
      totalCarpetas: 1,
      noCaja: 1,
    });
  };

  const advanceToStage6 = () => {
    // Sync FUID with folder label
    setFuidRow({
      numeroOrden: 1,
      codigo: currentCase.expectedTRDSubserie,
      nombreSerieSubserieAsunto: folderLabel.expedienteTitle || currentCase.expectedFolderName,
      fechaInicial: folderLabel.fechaInicial || orderedArchiveDocs[0]?.date || '',
      fechaFinal:
        folderLabel.fechaFinal || orderedArchiveDocs[orderedArchiveDocs.length - 1]?.date || '',
      caja: folderLabel.noCaja || 1,
      carpeta: folderLabel.noCarpeta || 1,
      tomo: 1,
      numeroFolios: folderLabel.totalFolios || orderedArchiveDocs.length,
      soporte: 'Papel',
      frecuenciaConsulta: 'Alta',
      notas: 'Expediente depurado y organizado según Acuerdo AGN 002 de 2014.',
    });
    setCurrentStage(6);
    setMaxUnlockedStage((prev) => Math.max(prev, 6));
  };

  // Stage 6 Handlers: FUID
  const handleUpdateFUID = (updated: Partial<FUIDRow>) => {
    setFuidRow((prev) => ({ ...prev, ...updated }));
  };

  const handleAutoFillFUID = () => {
    setFuidRow({
      numeroOrden: 1,
      codigo: currentCase.expectedTRDSubserie,
      nombreSerieSubserieAsunto: folderLabel.expedienteTitle || currentCase.expectedFolderName,
      fechaInicial: folderLabel.fechaInicial || orderedArchiveDocs[0]?.date || '',
      fechaFinal:
        folderLabel.fechaFinal || orderedArchiveDocs[orderedArchiveDocs.length - 1]?.date || '',
      caja: 1,
      carpeta: 1,
      tomo: 1,
      numeroFolios: orderedArchiveDocs.length,
      soporte: 'Papel',
      frecuenciaConsulta: 'Alta',
      notas: 'Conforme a TRD aprobada y Acuerdo AGN 042 de 2002.',
    });
  };

  const advanceToStage7 = () => {
    setCurrentStage(7);
    setMaxUnlockedStage((prev) => Math.max(prev, 7));
  };

  // Stage 7: Evaluation calculation
  const evaluationResult: EvaluationResult = useMemo(() => {
    // 1. Cleaning Score (15 pts)
    let totalAbrasive = 0;
    let totalCleaned = 0;
    documentsState.forEach((d) => {
      totalAbrasive += d.hasAbrasiveMaterial?.length || 0;
      totalCleaned += d.cleanedMaterials?.length || 0;
    });
    const stage1Score =
      totalAbrasive > 0 ? Math.round((totalCleaned / totalAbrasive) * 15) : 15;

    // 2. Classification Score (20 pts)
    let correctClasses = 0;
    documentsState.forEach((d) => {
      const u = userClassification[d.id];
      if (u) {
        if (d.isArchiveDocument && u.isArchive) correctClasses++;
        else if (!d.isArchiveDocument && !u.isArchive) correctClasses++;
      }
    });
    const stage2Score =
      documentsState.length > 0
        ? Math.round((correctClasses / documentsState.length) * 20)
        : 20;

    // 3. Ordering Score (20 pts)
    let correctOrder = 0;
    orderedArchiveDocs.forEach((d, idx) => {
      if (d.correctOrderIndex === idx + 1) correctOrder++;
    });
    const stage3Score =
      orderedArchiveDocs.length > 0
        ? Math.round((correctOrder / orderedArchiveDocs.length) * 20)
        : 20;

    // 4. Foliation Score (15 pts)
    let correctFolios = 0;
    orderedArchiveDocs.forEach((d, idx) => {
      if (userFolios[d.id] === idx + 1) correctFolios++;
    });
    const stage4Score =
      orderedArchiveDocs.length > 0
        ? Math.round((correctFolios / orderedArchiveDocs.length) * 15)
        : 15;

    // 5. Label Score (15 pts)
    let labelPts = 0;
    if (folderLabel.serieCode.trim() === currentCase.expectedTRDSerie) labelPts += 4;
    if (folderLabel.subserieCode.trim() === currentCase.expectedTRDSubserie) labelPts += 4;
    if (folderLabel.totalFolios === orderedArchiveDocs.length) labelPts += 4;
    if (folderLabel.expedienteTitle.trim().length > 5) labelPts += 3;
    const stage5Score = labelPts;

    // 6. FUID Score (15 pts)
    let fuidPts = 0;
    if (
      fuidRow.codigo.trim() === currentCase.expectedTRDSerie ||
      fuidRow.codigo.trim() === currentCase.expectedTRDSubserie
    )
      fuidPts += 5;
    if (fuidRow.numeroFolios === orderedArchiveDocs.length) fuidPts += 5;
    if (fuidRow.nombreSerieSubserieAsunto.trim().length > 5) fuidPts += 5;
    const stage6Score = fuidPts;

    const totalScore = Math.min(
      100,
      stage1Score + stage2Score + stage3Score + stage4Score + stage5Score + stage6Score
    );
    const isApproved = totalScore >= 70;

    return {
      stage1Score,
      stage2Score,
      stage3Score,
      stage4Score,
      stage5Score,
      stage6Score,
      totalScore,
      isApproved,
      feedbackNotes: [],
      strengths: [],
      improvementAreas: [],
    };
  }, [
    documentsState,
    userClassification,
    orderedArchiveDocs,
    userFolios,
    folderLabel,
    fuidRow,
    currentCase,
  ]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Strict Top Bar Contract Header */}
      <Header
        activeTab={activeNavTab}
        setActiveTab={(tab) => {
          if (tab === 'trd') setIsTrdOpen(true);
          else if (tab === 'normative') setIsNormativeOpen(true);
          else if (tab === 'glossary') setIsGlossaryOpen(true);
          else setActiveNavTab('simulation');
        }}
        onResetCase={handleResetCurrentCase}
        onOpenInstructor={() => setIsInstructorOpen(true)}
        currentCaseTitle={currentCase.title}
      />

      {/* Case Sub-header bar */}
      <div className="bg-emerald-950 text-white px-4 sm:px-6 py-2.5 border-b border-emerald-900 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-300">Expediente en Custodia:</span>
            <span className="font-bold text-white uppercase">{currentCase.title}</span>
            <span className="text-emerald-400 font-mono hidden md:inline">({currentCase.code})</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-emerald-200">
              Aprendiz: <strong className="text-white">{apprenticeName}</strong> (Ficha{' '}
              {apprenticeFicha})
            </span>
            <button
              onClick={handleAutoResolveEntireCycle}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md shadow-xs transition-colors cursor-pointer"
              title="Completar y activar automáticamente todas las etapas para demostración o evaluación directa"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resolver y Activar Todo</span>
            </button>
            <button
              onClick={() => setIsCaseSelectorOpen(true)}
              className="text-xs font-semibold text-emerald-300 hover:text-white underline cursor-pointer"
            >
              Cambiar Caso / Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Portada / Hero with Workshop Photo and Title */}
      <PortadaHero
        onStartOrContinue={() => setCurrentStage(1)}
        onSelectStage={(stageId) => setCurrentStage(stageId)}
        currentStage={currentStage}
      />

      {/* Sequential Archival Cycle Stepper (7 Stages) */}
      <StageProgress
        currentStage={currentStage}
        onSelectStage={(stageId) => setCurrentStage(stageId)}
        maxUnlockedStage={maxUnlockedStage}
      />

      {/* Main Sandbox Stage Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentStage === 1 && (
          <Stage1MechanicalCleaning
            documents={documentsState}
            onCleanMaterial={handleCleanMaterial}
            onCleanAllInDoc={handleCleanAllInDoc}
            onCleanAllInBatch={handleCleanAllInBatch}
            onInspectDocument={(doc) => setInspectedDoc(doc)}
            onNextStage={advanceToStage2}
          />
        )}

        {currentStage === 2 && (
          <Stage2Classification
            currentCase={currentCase}
            documents={documentsState}
            trdSeries={OFFICIAL_TRD_SERIES}
            userClassification={userClassification}
            onSetClassification={handleSetClassification}
            onAutoClassifyAll={handleAutoClassifyAll}
            onInspectDocument={(doc) => setInspectedDoc(doc)}
            onNextStage={advanceToStage3}
          />
        )}

        {currentStage === 3 && (
          <Stage3Ordering
            orderedDocs={orderedArchiveDocs}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onAutoSortByProcedure={handleAutoSortByProcedure}
            onInspectDocument={(doc) => setInspectedDoc(doc)}
            onNextStage={advanceToStage4}
          />
        )}

        {currentStage === 4 && (
          <Stage4DepurationAndFoliation
            orderedDocs={orderedArchiveDocs}
            userFolios={userFolios}
            onSetFolio={handleSetFolio}
            onAutoFoliateAll={handleAutoFoliateAll}
            onClearFolios={handleClearFolios}
            onInspectDocument={(doc) => setInspectedDoc(doc)}
            onNextStage={advanceToStage5}
          />
        )}

        {currentStage === 5 && (
          <Stage5FolderAndLabel
            currentCase={currentCase}
            orderedDocs={orderedArchiveDocs}
            labelData={folderLabel}
            onUpdateLabel={handleUpdateLabel}
            onAutoFillLabel={handleAutoFillLabel}
            onNextStage={advanceToStage6}
          />
        )}

        {currentStage === 6 && (
          <Stage6FUID
            currentCase={currentCase}
            orderedDocs={orderedArchiveDocs}
            labelData={folderLabel}
            fuidData={fuidRow}
            apprenticeName={apprenticeName}
            onUpdateFUID={handleUpdateFUID}
            onAutoFillFUID={handleAutoFillFUID}
            onNextStage={advanceToStage7}
          />
        )}

        {currentStage === 7 && (
          <Stage7EvaluationRubric
            currentCase={currentCase}
            evaluation={evaluationResult}
            apprenticeName={apprenticeName}
            apprenticeFicha={apprenticeFicha}
            onSelectNextCase={() => {
              const nextCase =
                INITIAL_CASES.find((c) => c.id !== currentCaseId) || INITIAL_CASES[0];
              handleSelectCase(nextCase.id);
            }}
            onResetCase={handleResetCurrentCase}
          />
        )}
      </main>

      {/* Floating Instructor Callout on mobile / desktop bottom */}
      <div className="fixed bottom-4 right-4 z-20 no-print">
        <button
          onClick={() => setIsInstructorOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-full shadow-lg border border-emerald-600 transition-all hover:scale-105 cursor-pointer"
        >
          <GraduationCap className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-bold">Consejo del Instructor SENA</span>
        </button>
      </div>

      {/* Modals */}
      <DocumentInspectorModal
        document={inspectedDoc}
        onClose={() => setInspectedDoc(null)}
        onCleanMaterial={(docId, mat) => handleCleanMaterial(docId, mat)}
      />

      <InstructorAdvisorModal
        isOpen={isInstructorOpen}
        onClose={() => setIsInstructorOpen(false)}
        currentStage={currentStage}
      />

      <TRDModal isOpen={isTrdOpen} onClose={() => setIsTrdOpen(false)} />

      <NormativeModal isOpen={isNormativeOpen} onClose={() => setIsNormativeOpen(false)} />

      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />

      <CaseSelectorModal
        isOpen={isCaseSelectorOpen}
        onClose={() => setIsCaseSelectorOpen(false)}
        selectedCaseId={currentCaseId}
        onSelectCase={handleSelectCase}
        apprenticeName={apprenticeName}
        setApprenticeName={setApprenticeName}
        apprenticeFicha={apprenticeFicha}
        setApprenticeFicha={setApprenticeFicha}
      />

      {/* Quiet Professional Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Simulador de Organización del Archivo de Gestión · Servicio Nacional de Aprendizaje SENA.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Ley 594 de 2000</span>
            <span>·</span>
            <span>Acuerdos AGN 060/2001, 042/2002, 002/2014</span>
            <span>·</span>
            <span>Circular 004/2003</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
