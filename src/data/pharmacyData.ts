import { Flashcard, MockTest, PharmacySubject, PharmacyUpdate, Question, StudyNote } from '../types/pharmacy';

export const HIGH_YIELD_QUESTIONS: Question[] = [
  {
    id: 'q-pharm-01',
    question: 'Specific antidote used for acute paracetamol (acetaminophen) toxicity to replenish hepatic glutathione stores is:',
    options: ['N-acetylcysteine', 'Flumazenil', 'Pralidoxime (2-PAM)', 'Deferoxamine'],
    correctOption: 0,
    explanation: 'N-acetylcysteine (NAC) acts as a precursor for glutathione synthesis and reacts directly with the toxic metabolite NAPQI (N-acetyl-p-benzoquinone imine), neutralizing it and preventing centrilobular hepatic necrosis. It is most effective when administered within 8-10 hours of ingestion.',
    subject: 'Pharmacology',
    topic: 'Toxicology & Antidotes',
    examSource: 'GPAT 2023',
    difficulty: 'Easy',
    highYieldTip: 'Remember: Paracetamol toxic metabolite is NAPQI, formed by CYP2E1.',
  },
  {
    id: 'q-pharm-02',
    question: 'Which of the following beta-adrenergic blockers possesses intrinsic sympathomimetic activity (ISA) and causes less resting bradycardia?',
    options: ['Propranolol', 'Atenolol', 'Pindolol', 'Metoprolol'],
    correctOption: 2,
    explanation: 'Pindolol and Acebutolol possess significant Intrinsic Sympathomimetic Activity (partial agonist activity at beta receptors). They cause less resting bradycardia and minimal lipid profile disturbances compared to pure beta-blockers like propranolol.',
    subject: 'Pharmacology',
    topic: 'Autonomic Nervous System',
    examSource: 'GPAT 2024',
    difficulty: 'Medium',
    highYieldTip: 'Mnemonic for Beta-blockers with ISA: "PIN-ACE" -> Pindolol, Acebutolol.',
  },
  {
    id: 'q-pceut-01',
    question: 'According to Stokes’ law, the rate of sedimentation of suspended particles is inversely proportional to:',
    options: [
      'Square of the particle diameter',
      'Viscosity of the continuous dispersion medium',
      'Difference in densities between the two phases',
      'Acceleration due to gravity',
    ],
    correctOption: 1,
    explanation: 'Stokes law is given by v = [2r²(ρ_s - ρ_l)g] / 9η. The sedimentation velocity (v) is inversely proportional to the viscosity of the dispersion medium (η), and directly proportional to the square of particle radius (r²) and density difference (ρ_s - ρ_l).',
    subject: 'Pharmaceutics',
    topic: 'Suspensions & Rheology',
    examSource: 'GPAT 2022',
    difficulty: 'Easy',
    referenceFormula: 'v = 2 r² (ρs - ρl) g / (9 η)',
    highYieldTip: 'Viscosity increases -> sedimentation rate decreases -> physical stability improves.',
  },
  {
    id: 'q-pceut-02',
    question: 'In tablet manufacturing, the defect termed "Capping" is characterized by:',
    options: [
      'Separation of tablet into two or more distinct horizontal layers',
      'Partial or complete removal of the top or bottom crown of a tablet from the main body',
      'Unequal distribution of color on the tablet surface',
      'Adhesion of tablet granulation material to the punch die surface',
    ],
    correctOption: 1,
    explanation: 'Capping is the partial or complete detachment of the top or bottom crown of a tablet from the main body, caused by air entrapment during compression, excessive fines, or improperly shaped punches. Separation into multiple horizontal layers is termed Lamination.',
    subject: 'Pharmaceutics',
    topic: 'Tablet Defects & Quality Control',
    examSource: 'NIPER JEE 2023',
    difficulty: 'Medium',
    highYieldTip: 'Air entrapment -> Capping; Unequal dye distribution -> Mottling; Sticking to punch face -> Picking.',
  },
  {
    id: 'q-pchem-01',
    question: 'Which heterocyclic ring system is present in the core chemical nucleus of Omeprazole and Pantoprazole?',
    options: ['Benzimidazole', 'Thiazole', 'Phenothiazine', 'Isoquinoline'],
    correctOption: 0,
    explanation: 'Proton Pump Inhibitors (PPIs) such as Omeprazole, Esomeprazole, Lansoprazole, and Pantoprazole contain a substituted Benzimidazole core linked via a sulfinyl methyl group to a substituted pyridine ring.',
    subject: 'Pharmaceutical Chemistry',
    topic: 'Medicinal Chemistry of GIT Drugs',
    examSource: 'GPAT 2024',
    difficulty: 'Medium',
    highYieldTip: 'Core scaffold: Substituted Benzimidazole + Pyridine linked by -SO-CH2- bridge.',
  },
  {
    id: 'q-pchem-02',
    question: 'In stereochemistry, two non-superimposable stereoisomers that are NOT mirror images of each other are defined as:',
    options: ['Enantiomers', 'Diastereomers', 'Meso compounds', 'Racemic congeners'],
    correctOption: 1,
    explanation: 'Diastereomers are stereoisomers that are not mirror images of one another and not superimposable. They have different physical and chemical properties (melting points, boiling points, solubility), unlike enantiomers which possess identical physical properties except optical rotation direction.',
    subject: 'Pharmaceutical Chemistry',
    topic: 'Organic Stereochemistry',
    examSource: 'NIPER JEE 2024',
    difficulty: 'Easy',
    highYieldTip: 'Enantiomers = non-superimposable mirror images; Diastereomers = non-mirror images.',
  },
  {
    id: 'q-pcog-01',
    question: 'Keller-Kiliani test is specific for the chemical identification of which sugar moiety in cardiac glycosides?',
    options: ['Digitoxose (2-deoxysugar)', 'D-glucose', 'L-rhamnose', 'Cymarose'],
    correctOption: 0,
    explanation: 'Keller-Kiliani test gives a reddish-brown ring at the interface and a bluish-green upper layer with glacial acetic acid containing FeCl3 and conc. H2SO4, which specifically detects 2-deoxysugars like Digitoxose present in Digitalis cardiac glycosides.',
    subject: 'Pharmacognosy',
    topic: 'Cardiac Glycosides',
    examSource: 'GPAT 2021',
    difficulty: 'Medium',
    highYieldTip: 'Legal test & Baljet test detect the unsaturated lactone ring, while Keller-Kiliani detects the 2-deoxysugar.',
  },
  {
    id: 'q-pcog-02',
    question: 'Vitali-Morin test is characteristic for the identification of which class of phytoconstituents?',
    options: ['Tropane alkaloids', 'Anthraquinone glycosides', 'Purine bases', 'Flavonoids'],
    correctOption: 0,
    explanation: 'Vitali-Morin reaction is specific for tropane alkaloids (atropine, scopolamine, hyoscyamine). Heating with fuming nitric acid followed by evaporation and treatment with acetone and methanolic KOH yields a bright violet-purple color due to quinonoid resonant structure.',
    subject: 'Pharmacognosy',
    topic: 'Alkaloid Chemical Tests',
    examSource: 'GPAT 2023',
    difficulty: 'Easy',
    highYieldTip: 'Tropane = Vitali-Morin (Violet); Purine = Murexide test (Purple); Ergot = Van-Urk (Blue).',
  },
  {
    id: 'q-panal-01',
    question: 'In High-Performance Liquid Chromatography (HPLC), the Theoretical Plate count (N) is calculated using the formula:',
    options: ['N = 16 * (t_R / W)²', 'N = 5.54 * (t_R / W)', 'N = (t_R / W)²', 'N = 16 * (W / t_R)'],
    correctOption: 0,
    explanation: 'Column efficiency in chromatography is expressed as theoretical plates N = 16 * (t_R / W)², where t_R is retention time and W is the peak width at base. Alternatively, N = 5.545 * (t_R / W_0.5)² using width at half height.',
    subject: 'Pharmaceutical Analysis',
    topic: 'Chromatographic Principles',
    examSource: 'NIPER JEE 2023',
    difficulty: 'Medium',
    referenceFormula: 'N = 16 (tR / W)² = 5.54 (tR / W₀.₅)²',
    highYieldTip: 'Higher plate count (N) means higher column efficiency and sharper peaks.',
  },
  {
    id: 'q-panal-02',
    question: 'In infrared (IR) spectroscopy, the characteristic stretching absorption band for an unconjugated ketone carbonyl (C=O) appears at approximately:',
    options: ['1715 cm⁻¹', '3300 cm⁻¹', '2250 cm⁻¹', '1600 cm⁻¹'],
    correctOption: 0,
    explanation: 'Saturated aliphatic ketone carbonyl (C=O) typically vibrates at 1715 cm⁻¹. Conjugation with a double bond or aromatic ring lowers the wavenumber by 20-40 cm⁻¹ (to ~1680 cm⁻¹) due to resonance reducing double-bond character.',
    subject: 'Pharmaceutical Analysis',
    topic: 'Spectroscopy',
    examSource: 'GPAT 2024',
    difficulty: 'Medium',
    highYieldTip: 'Acid chloride: ~1800 cm⁻¹ | Ester: ~1735 cm⁻¹ | Ketone: ~1715 cm⁻¹ | Amide: ~1680 cm⁻¹.',
  },
  {
    id: 'q-pjuri-01',
    question: 'Under the Drugs and Cosmetics Act 1940 and Rules 1945, "Good Manufacturing Practices (GMP)" and requirements of premises, plant, and equipment are specified in:',
    options: ['Schedule M', 'Schedule H', 'Schedule X', 'Schedule Y'],
    correctOption: 0,
    explanation: 'Schedule M prescribes Good Manufacturing Practices (GMP) for pharmaceutical manufacturing facilities, factory premises, equipment, sanitation, and validation standards. Schedule M was overhauled in 2023-2024 to align with WHO-GMP and PIC/S standards.',
    subject: 'Clinical Pharmacy & Jurisprudence',
    topic: 'D&C Act & Schedules',
    examSource: 'GPAT 2023',
    difficulty: 'Easy',
    highYieldTip: 'M = Manufacturing (GMP), H = Prescription only, X = Psychotropic/Narcotic records, Y = Clinical Trials.',
  },
  {
    id: 'q-pjuri-02',
    question: 'How long must a registered retail pharmacist preserve carbon copies of prescription slips and records for drugs dispensed under Schedule X?',
    options: ['2 years', '6 months', '1 year', '5 years'],
    correctOption: 0,
    explanation: 'As per Rule 65 of Drugs and Cosmetics Rules, all records, registers, and carbon copies of prescriptions for Schedule X drugs (psychotropic and habit-forming drugs) must be preserved for at least two years from the date of the last entry.',
    subject: 'Clinical Pharmacy & Jurisprudence',
    topic: 'Pharmacy Regulations',
    examSource: 'Drug Inspector 2023',
    difficulty: 'Medium',
    highYieldTip: 'Schedule X: Double-lock storage, duplicate prescription, preserve bills for 2 years.',
  },
  {
    id: 'q-biotech-01',
    question: 'Which enzyme is responsible for synthesizing cDNA from an mRNA template in recombinant DNA technology?',
    options: ['Reverse Transcriptase', 'DNA Ligase', 'Taq DNA Polymerase', 'Alkaline Phosphatase'],
    correctOption: 0,
    explanation: 'Reverse transcriptase (RNA-dependent DNA polymerase) transcribes single-stranded mRNA into complementary DNA (cDNA), lacking introns, which is essential for cloning eukaryotic genes in bacterial expression systems.',
    subject: 'Biotechnology & Microbiology',
    topic: 'Genetic Engineering',
    examSource: 'NIPER JEE 2024',
    difficulty: 'Medium',
    highYieldTip: 'Retroviral enzyme reverse transcriptase was discovered by Temin and Baltimore (Nobel Prize).',
  },
  {
    id: 'q-pharm-03',
    question: 'A non-selective alpha blocker that binds IRREVERSIBLY via covalent alkylation to alpha-1 and alpha-2 adrenoceptors is:',
    options: ['Phenoxybenzamine', 'Phentolamine', 'Prazosin', 'Yohimbine'],
    correctOption: 0,
    explanation: 'Phenoxybenzamine is a haloalkylamine that cyclizes in the body to an ethyleniminium ion, which forms a covalent bond with alpha receptors, creating a non-competitive, irreversible blockade. Phentolamine, by contrast, is a reversible competitive blocker.',
    subject: 'Pharmacology',
    topic: 'Adrenergic Antagonists',
    examSource: 'GPAT 2022',
    difficulty: 'Hard',
    highYieldTip: 'Irreversible alpha blocker used in pre-operative management of pheochromocytoma.',
  },
  {
    id: 'q-pceut-03',
    question: 'What is the required Griffin Hydrophilic-Lipophilic Balance (HLB) value range for an emulsifying agent to produce an Oil-in-Water (O/W) emulsion?',
    options: ['8 to 16', '3 to 6', '1 to 3', '7 to 9 (Wetting only)'],
    correctOption: 0,
    explanation: 'Griffin HLB Scale: 1-3 = Antifoaming agents; 3-6 = W/O emulsifiers; 7-9 = Wetting and spreading agents; 8-16 = O/W emulsifiers; 13-15 = Detergents; 15-18 = Solubilizing agents.',
    subject: 'Pharmaceutics',
    topic: 'Emulsions & Surfactants',
    examSource: 'GPAT 2024',
    difficulty: 'Easy',
    highYieldTip: 'Lower HLB (<9) = Lipophilic (W/O); Higher HLB (>9) = Hydrophilic (O/W).',
  },
  {
    id: 'q-pchem-03',
    question: 'The transformation of a ketoxime to an N-substituted amide in the presence of an acid catalyst is known as:',
    options: ['Beckmann rearrangement', 'Hoffmann degradation', 'Curtius rearrangement', 'Fries rearrangement'],
    correctOption: 0,
    explanation: 'Beckmann rearrangement is the acid-catalyzed isomerization of oximes to substituted amides. It is stereospecific: the group anti (trans) to the oxime hydroxyl group migrates to the nitrogen atom. Used commercially to synthesize Caprolactam for Nylon-6.',
    subject: 'Pharmaceutical Chemistry',
    topic: 'Name Reactions in Drug Synthesis',
    examSource: 'NIPER JEE 2023',
    difficulty: 'Hard',
    highYieldTip: 'Beckmann rearrangement: anti-migration to nitrogen; crucial in synthesizing antiepileptic & CNS drug scaffolds.',
  },
  {
    id: 'q-panal-03',
    question: 'Karl Fischer titration is extensively utilized in pharmaceutical quality control for the quantitative determination of:',
    options: ['Water content (Moisture)', 'Heavy metals (Lead, Arsenic)', 'Free amine content', 'Peroxide value in oils'],
    correctOption: 0,
    explanation: 'Karl Fischer titration relies on the oxidation of sulfur dioxide by iodine in the presence of water and a suitable buffer base (such as imidazole or pyridine) and alcohol (methanol): I2 + SO2 + H2O + 3Base + CH3OH -> 2Base-HI + Base-HSO4CH3.',
    subject: 'Pharmaceutical Analysis',
    topic: 'Titrimetric Analysis',
    examSource: 'GPAT 2023',
    difficulty: 'Easy',
    highYieldTip: 'Karl Fischer reagent contains: Iodine, Sulfur dioxide, Imidazole/Pyridine, and Methanol.',
  },
  {
    id: 'q-pcog-03',
    question: 'The therapeutic antimalarial compound Artemisinin is extracted from Artemisia annua and chemically represents a:',
    options: [
      'Sesquiterpene lactone containing an endoperoxide bridge',
      'Cinchona quinoline alkaloid',
      'Triterpenoid saponin',
      'Isoquinoline alkaloid',
    ],
    correctOption: 0,
    explanation: 'Artemisinin (Qinghaosu) is a sesquiterpene lactone containing an unusual 1,2,4-trioxane endoperoxide bridge. Cleavage of this peroxide bridge by intraparasitic iron generates free radicals that destroy Plasmodium falciparum proteins.',
    subject: 'Pharmacognosy',
    topic: 'Terpenoids & Antimalarials',
    examSource: 'NIPER JEE 2024',
    difficulty: 'Hard',
    highYieldTip: 'Endoperoxide bridge is essential for antimalarial activity. Discovered by Nobel Laureate Youyou Tu.',
  },
  {
    id: 'q-apt-01',
    question: 'In a clinical trial, if the half-life of drug X is 4 hours and follows first-order elimination kinetics, what percentage of the drug is eliminated after 16 hours?',
    options: ['93.75%', '75.0%', '87.5%', '99.9%'],
    correctOption: 0,
    explanation: '16 hours = 16 / 4 = 4 half-lives. Fraction remaining = (1/2)⁴ = 1/16 = 6.25%. Therefore, fraction eliminated = 100% - 6.25% = 93.75%.',
    subject: 'Aptitude & General Pharma',
    topic: 'Pharmacokinetics Calculations',
    examSource: 'NIPER JEE 2024',
    difficulty: 'Medium',
    referenceFormula: 'Fraction remaining = (1/2)^n; where n = time / t½',
    highYieldTip: '1 t½ = 50%, 2 t½ = 75%, 3 t½ = 87.5%, 4 t½ = 93.75%, 5 t½ = 96.875%.',
  },
  {
    id: 'q-pharm-04',
    question: 'Which antimicrobial agent is famously contraindicated in neonates due to low glucuronyl transferase activity causing "Grey Baby Syndrome"?',
    options: ['Chloramphenicol', 'Ceftriaxone', 'Gentamicin', 'Tetracycline'],
    correctOption: 0,
    explanation: 'Neonates have deficient UDP-glucuronosyltransferase (UGT2B7) and inadequate renal clearance, leading to accumulation of toxic levels of unconjugated chloramphenicol, causing vomiting, hypothermia, ashen-grey cyanosis, and cardiovascular collapse (Grey Baby Syndrome).',
    subject: 'Pharmacology',
    topic: 'Chemotherapy & Adverse Reactions',
    examSource: 'GPAT 2021',
    difficulty: 'Easy',
    highYieldTip: 'Chloramphenicol -> Bone marrow depression (aplastic anemia) + Grey baby syndrome.',
  },
];

export const MOCK_TESTS: MockTest[] = [
  {
    id: 'mock-gpat-full-01',
    title: 'NTA GPAT 2025 All-India Grand Mock Test - 01',
    examType: 'GPAT',
    durationMinutes: 180,
    totalMarks: 500,
    positiveMarks: 4,
    negativeMarks: 1,
    description: 'Strict NTA GPAT computer-based test simulation with high-yield questions spanning Pharmacology, Pharmaceutics, Chemistry, Pharmacognosy, and Jurisprudence with standard +4 / -1 marking scheme.',
    questions: HIGH_YIELD_QUESTIONS.slice(0, 15),
    sections: [
      { name: 'Pharmacology', questionCount: 4 },
      { name: 'Pharmaceutics', questionCount: 3 },
      { name: 'Pharmaceutical Chemistry', questionCount: 3 },
      { name: 'Pharmacognosy', questionCount: 3 },
      { name: 'Pharmaceutical Analysis', questionCount: 2 },
    ],
  },
  {
    id: 'mock-niper-full-01',
    title: 'NIPER JEE 2025 Master Mock Simulation - 01',
    examType: 'NIPER_JEE',
    durationMinutes: 120,
    totalMarks: 100,
    positiveMarks: 0.5,
    negativeMarks: 0.125,
    description: 'High-speed NIPER JEE exam pattern emphasizing stereochemistry, synthetic mechanisms, natural products, bioanalytical tools, and pharmaceutical aptitude calculations.',
    questions: HIGH_YIELD_QUESTIONS.slice(2, 18),
    sections: [
      { name: 'Pharmaceutical Chemistry', questionCount: 4 },
      { name: 'Pharmacognosy', questionCount: 3 },
      { name: 'Pharmaceutical Analysis', questionCount: 3 },
      { name: 'Biotechnology & Microbiology', questionCount: 2 },
      { name: 'Aptitude & General Pharma', questionCount: 4 },
    ],
  },
  {
    id: 'mock-pyq-gpat-2024',
    title: 'GPAT 2024 Official Previous Year Question Paper',
    examType: 'GPAT',
    durationMinutes: 180,
    totalMarks: 500,
    positiveMarks: 4,
    negativeMarks: 1,
    isPYQ: true,
    year: 2024,
    description: 'Actual solved paper from GPAT 2024 conducted by NBEMS / NTA, verified with official final answer keys and detailed step-by-step explanations.',
    questions: HIGH_YIELD_QUESTIONS.filter(q => q.examSource?.includes('GPAT 2024') || q.examSource?.includes('GPAT 2023')),
  },
  {
    id: 'mock-pyq-niper-2024',
    title: 'NIPER JEE 2024 Memory-Based Exam Paper',
    examType: 'NIPER_JEE',
    durationMinutes: 120,
    totalMarks: 100,
    positiveMarks: 0.5,
    negativeMarks: 0.125,
    isPYQ: true,
    year: 2024,
    description: 'Reconstructed exam paper from NIPER JEE 2024 with detailed structural analysis and organic reaction mechanisms.',
    questions: HIGH_YIELD_QUESTIONS.filter(q => q.examSource?.includes('NIPER') || q.difficulty === 'Hard'),
  },
  {
    id: 'mock-di-special-01',
    title: 'Drug Inspector (UPSC / State PSC) Special Mock',
    examType: 'DRUG_INSPECTOR',
    durationMinutes: 120,
    totalMarks: 200,
    positiveMarks: 2,
    negativeMarks: 0.66,
    description: 'Specialized for State & Central Drug Inspector exams focusing heavily on D&C Act 1940, Schedule M revised GMP, sampling, and analytical chemistry.',
    questions: HIGH_YIELD_QUESTIONS.filter(q => q.subject === 'Clinical Pharmacy & Jurisprudence' || q.subject === 'Pharmaceutical Analysis' || q.subject === 'Pharmaceutics'),
  },
  {
    id: 'mock-subject-pharmacology',
    title: 'Subject Drill: Pharmacology & Toxicology High-Yield',
    examType: 'GPAT',
    durationMinutes: 45,
    totalMarks: 80,
    positiveMarks: 4,
    negativeMarks: 1,
    description: 'Targeted focus on ANS, CVS, Autacoids, Chemotherapy, and Toxicology.',
    questions: HIGH_YIELD_QUESTIONS.filter(q => q.subject === 'Pharmacology'),
  },
];

export const STUDY_NOTES: StudyNote[] = [
  {
    id: 'note-ans-receptors',
    title: 'Autonomic Nervous System: Receptor Subtypes, Second Messengers & Actions',
    subject: 'Pharmacology',
    topic: 'Autonomic Nervous System',
    readTimeMinutes: 8,
    isHighYield: true,
    lastUpdated: 'March 2025',
    keyHighlights: [
      'Alpha-1 coupled to Gq -> activates PLC -> IP3 / DAG -> raises intracellular Ca²⁺',
      'Alpha-2 coupled to Gi -> inhibits Adenylyl Cyclase -> lowers cAMP',
      'Beta-1, Beta-2, Beta-3 coupled to Gs -> stimulates Adenylyl Cyclase -> raises cAMP',
      'Muscarinic: M1, M3, M5 are Gq coupled; M2, M4 are Gi coupled',
    ],
    summary: 'A definitive high-yield table of adrenergic and cholinergic receptors, G-protein coupling mechanisms, physiological tissue locations, and key pharmacological agonists and antagonists.',
    contentMarkdown: `### 1. Adrenergic Receptor Classification
Adrenergic receptors are G-protein coupled receptors (GPCRs) stimulated by endogenous catecholamines (Epinephrine, Norepinephrine, Dopamine).

* **Alpha-1 (Gq protein):**
  - **Mechanism:** PLC -> IP3 + DAG -> Ca²⁺ mobilization.
  - **Location & Effects:** Vascular smooth muscle contraction (vasoconstriction), pupillary dilator muscle (mydriasis), prostate sphincter contraction.
  - **Selective Agonist:** Phenylephrine, Oxymetazoline.
  - **Selective Antagonist:** Prazosin, Doxazosin, Tamsulosin (Alpha-1A selective for BPH).

* **Alpha-2 (Gi protein):**
  - **Mechanism:** Inactivation of Adenylyl Cyclase -> ↓ cAMP -> inhibition of Ca²⁺ channels, activation of K⁺ channels.
  - **Location:** Presynaptic nerve terminals (auto-inhibition of NE release), pancreatic beta cells (↓ insulin release), ciliary epithelium (↓ aqueous humor).
  - **Selective Agonist:** Clonidine, Apraclonidine, Dexmedetomidine.
  - **Selective Antagonist:** Yohimbine, Idazoxan.

* **Beta-1 (Gs protein):**
  - **Location:** Heart (SA node, AV node, myocardium) -> positive inotropic, chronotropic, and dromotropic effects. Juxtaglomerular apparatus -> Renin secretion.
  - **Selective Antagonist:** Atenolol, Metoprolol, Bisoprolol, Esmolol (ultra-short acting).

* **Beta-2 (Gs protein):**
  - **Location:** Bronchial smooth muscle (bronchodilation), vascular smooth muscle of skeletal muscle (vasodilation), uterus (relaxation - tocolysis), liver (glycogenolysis).
  - **Selective Agonist:** Salbutamol, Terbutaline, Salmeterol, Formoterol.`,
    tables: [
      {
        title: 'Summary of Autonomic G-Protein Couplings',
        headers: ['Receptor Type', 'G-Protein Class', 'Effector Enzyme', 'Second Messenger', 'Key Tissue Action'],
        rows: [
          ['Alpha-1', 'Gq', 'Phospholipase C (PLC)', '↑ IP3, ↑ DAG, ↑ Ca²⁺', 'Vasoconstriction, Mydriasis'],
          ['Alpha-2', 'Gi', 'Adenylyl Cyclase (Inhibitory)', '↓ cAMP', 'Autoreceptor inhibition of NE'],
          ['Beta-1', 'Gs', 'Adenylyl Cyclase (Stimulatory)', '↑ cAMP, ↑ PKA', '↑ Heart rate & contractility, ↑ Renin'],
          ['Beta-2', 'Gs', 'Adenylyl Cyclase (Stimulatory)', '↑ cAMP, ↑ PKA', 'Bronchodilation, Uterine relaxation'],
          ['M1', 'Gq', 'Phospholipase C', '↑ IP3, ↑ DAG', 'Gastric acid secretion, CNS cognition'],
          ['M2', 'Gi', 'Adenylyl Cyclase & K⁺ channel', '↓ cAMP, ↑ K⁺ efflux', 'Bradycardia, ↓ AV conduction velocity'],
          ['M3', 'Gq', 'Phospholipase C', '↑ IP3, ↑ DAG', 'Bronchoconstriction, Salivation, Miosis'],
        ],
      },
    ],
    mnemonics: [
      {
        mnemonic: 'HAVe 1 M&M (Q)',
        expansion: 'H1, Alpha-1, Vasopressin V1, M1, M3',
        explanation: 'All these receptors are Gq coupled (activate Phospholipase C).',
      },
      {
        mnemonic: 'MAD 2s (I)',
        expansion: 'M2, Alpha-2, Dopamine D2',
        explanation: 'These receptors are Gi coupled (Inhibitory to Adenylyl Cyclase).',
      },
    ],
  },
  {
    id: 'note-tablet-defects',
    title: 'Pharmaceutics: Comprehensive Guide to Tablet Defects & Manufacturing Solutions',
    subject: 'Pharmaceutics',
    topic: 'Solid Dosage Forms',
    readTimeMinutes: 10,
    isHighYield: true,
    lastUpdated: 'February 2025',
    keyHighlights: [
      'Capping: Air entrapment or excessive fines -> use tapered dies or pre-compression.',
      'Lamination: Entrapped air separating into multiple layers -> reduce turret speed.',
      'Mottling: Uneven distribution of color -> change binder or use colloidal dyes.',
      'Picking & Sticking: Moisture or excessive lubricant deficiency -> add talc/magnesium stearate.',
    ],
    summary: 'A visual diagnostic guide for common industrial tablet compression faults encountered in GPAT, NIPER, and Drug Inspector exams.',
    contentMarkdown: `### 1. Tablet Formulation Faults
During the tablet compression process on high-speed rotary presses, mechanical forces and formula inadequacies induce critical defects.

* **Capping:**
  - **Definition:** The top or bottom crown separates partially or completely from the main body of the tablet.
  - **Causes:** Entrapment of air in the granule bed during high compression velocity, excessive fine powder (<100 mesh), granules too dry (loss of moisture below critical equilibrium), improperly worn punches.
  - **Remedies:** Pre-compression roller station, slow down press speed, use tapered die bores (top of die wider by 0.001 to 0.003 inch), humidify granulation.

* **Lamination:**
  - **Definition:** Separation of a tablet into two or more distinct horizontal layers.
  - **Cause:** Air relaxation after decompression, oily substances in formula, rapid decompression.
  - **Remedies:** Modify upper punch ejection angle, reduce compression speed.

* **Picking & Sticking:**
  - **Picking:** Small surface fragment adheres to punch face embossing/lettering.
  - **Sticking:** Granulation adheres to the die wall or punch face generally.
  - **Causes:** Inadequately dried granules, excess binder, insufficient lubricant (Magnesium stearate).
  - **Remedies:** Increase lubricant conc (0.5 - 1%), dry granules to correct LOD (Loss on Drying), polish punch surfaces with chromium plating.

* **Mottling:**
  - **Definition:** An unequal distribution of color on a tablet surface with light or dark patches.
  - **Causes:** Migration of soluble dye during tray drying of wet granules, improper mixing of colorants.
  - **Remedies:** Use lake dyes (adsorbed on alumina) instead of water-soluble dyes, dry granules by fluid-bed drying (FBD).`,
    tables: [
      {
        title: 'Diagnostic Table: Tablet Defects vs Corrective Actions',
        headers: ['Defect Name', 'Primary Etiology', 'Equipment Cause', 'Formulation Fix'],
        rows: [
          ['Capping', 'Air entrapment, ultra-fine dust', 'Deep concave punches, worn dies', 'Add hygroscopic binder (PVP/PEG), reduce fines'],
          ['Lamination', 'Trapped air under shear stress', 'Rapid turret speed', 'Add lubricating waxes or modify binder'],
          ['Picking', 'Granule moisture, soft punches', 'Intricate logo engraving on punch', 'Redesign punch letters, polish face, add colloidal silica'],
          ['Sticking', 'Damp granules, low melting point actives', 'Scratched die bore', 'Replace die, add 1% Magnesium stearate, dry granules'],
          ['Mottling', 'Dye migration during oven drying', 'Slow oven tray drying', 'Use spray fluid-bed drying and aluminum lakes'],
        ],
      },
    ],
  },
  {
    id: 'note-pharma-schedules',
    title: 'Pharmacy Law: Drug & Cosmetics Rules Schedules A to Z Master Reference',
    subject: 'Clinical Pharmacy & Jurisprudence',
    topic: 'Pharmaceutical Jurisprudence',
    readTimeMinutes: 12,
    isHighYield: true,
    lastUpdated: 'January 2025',
    keyHighlights: [
      'Schedule M: GMP guidelines (updated with revised 2024 compliance norms).',
      'Schedule H & H1: Prescription only drugs; H1 requires 3-year record retention.',
      'Schedule X: Narcotic and psychotropic substances (2-year prescription record).',
      'Schedule Y: Requirements and guidelines for clinical trials.',
      'Schedule P: Life period (expiry date) of drugs.',
      'Schedule P1: Pack sizes of drugs.',
    ],
    summary: 'The most commonly tested jurisprudence subject in GPAT and Drug Inspector tests. Memorize letter designations and regulatory enforcement terms.',
    contentMarkdown: `### 1. Essential Schedules under D&C Rules 1945
* **Schedule A:** Application forms and licenses for import, manufacturing, sale, and loan licenses.
* **Schedule B:** Fees for testing or analysis by Central Drugs Laboratory (CDL) or Government Analysts.
* **Schedule C & C1:** Biological and special products (sera, vaccines, toxins, antigens, insulin, antibiotics).
* **Schedule D:** Classes of drugs exempted from import provisions.
* **Schedule E1:** List of poisonous substances under Ayurvedic, Siddha, and Unani systems.
* **Schedule F & F1:** Special provisions for biological products, blood banks (F, Part XII-B), and veterinary vaccines (F1).
* **Schedule G:** Substances to be taken only under medical supervision (Caution label required: "CAUTION: It is dangerous to take this preparation except under medical supervision" - e.g., Metformin, Bleomycin, Hydroxyurea).
* **Schedule H:** Prescription drugs (Must bear Rx symbol and warning).
* **Schedule H1:** Introduced in 2013 to curb antimicrobial resistance (third-generation cephalosporins, carbapenems, fluoroquinolones, antitubercular drugs). Requires red border on label with warning and separate register preserved for 3 years.
* **Schedule M:** Good Manufacturing Practices (GMP) and requirements of premises, plant, and equipment.
* **Schedule N:** Minimum equipment required for efficient running of a pharmacy.
* **Schedule P:** Life period (shelf-life / expiry period) of antibiotics, vitamins, and vaccines.
* **Schedule P1:** Permissible pack sizes of pharmaceutical dosage forms.
* **Schedule U & U1:** Particulars to be shown in manufacturing and analytical records.
* **Schedule V:** Standards for patent or proprietary medicines containing vitamins.
* **Schedule X:** Psychotropic drugs (Alprazolam, Diazepam, Ketamine, Amphetamine). Requires double-locked storage and preservation of prescription copies for 2 years.
* **Schedule Y:** Requirements and guidelines on clinical trials for import and manufacture of new drugs.`,
    tables: [
      {
        title: 'Quick Revision Guide: Schedules & Symbols',
        headers: ['Schedule', 'Regulatory Scope', 'Mandatory Label Warning / Symbol', 'Record Retention'],
        rows: [
          ['Schedule G', 'Hormonal/Cytotoxic drugs', 'CAUTION: Dangerous except under medical supervision', 'Normal bill records'],
          ['Schedule H', 'General Prescription drugs', 'Symbol "Rx" on top left corner', 'Normal sales records'],
          ['Schedule H1', 'Restricted Antibiotics & Anti-TB', 'Symbol "Rx" in RED + Boxed Warning', '3 Years in separate register'],
          ['Schedule X', 'Habit-forming & Psychotropic', 'Symbol "XRx" in RED', '2 Years carbon copies'],
          ['Schedule M', 'GMP Standards', 'Factory premises compliance', 'Batch manufacturing records (5 yrs)'],
          ['Schedule Y', 'Clinical Trials Phase I - IV', 'Informed consent & DCGI approval', 'Trial archives'],
        ],
      },
    ],
  },
  {
    id: 'note-phytochem-tests',
    title: 'Pharmacognosy: Universal Phytochemical Identification Chemical Tests Table',
    subject: 'Pharmacognosy',
    topic: 'Phytochemistry & Quality Evaluation',
    readTimeMinutes: 7,
    isHighYield: true,
    lastUpdated: 'March 2025',
    keyHighlights: [
      'Alkaloids: Dragendorff (orange-red), Mayer (cream), Wagner (reddish-brown), Hager (yellow).',
      'Flavonoids: Shinoda test (magnesium ribbon + HCl -> pink/red).',
      'Cardiac Glycosides: Keller-Kiliani (digitoxose), Legal, Baljet, Raymond.',
      'Anthraquinones: Borntrager (pink/rose red in ammoniacal layer).',
    ],
    summary: 'A high-yield tabular sheet of colorimetric reagents, reactions, and key positive test outcomes for all major plant constituent classes.',
    contentMarkdown: `### Universal Chemical Tests for Plant Constituents
In pharmacognostic analysis, specific qualitative color reactions differentiate chemical groups of secondary metabolites.

* **Alkaloids Reagents:**
  - Mayer's reagent: Potassium mercuric iodide -> Cream / pale yellow precipitate.
  - Dragendorff's reagent: Potassium bismuth iodide -> Orange-red precipitate.
  - Wagner's reagent: Iodine in potassium iodide -> Reddish-brown precipitate.
  - Hager's reagent: Saturated solution of picric acid -> Yellow crystalline precipitate.

* **Anthraquinone Glycosides:**
  - Borntrager's Test: Extract boiled with dilute H2SO4, filtered, extracted with benzene or ether. Separated organic layer + dilute ammonia -> Pink, red, or violet color in ammoniacal layer.
  - Modified Borntrager's Test: For C-glycosides (Aloin). Uses FeCl3 + dilute HCl before ether extraction to cleave carbon-carbon glycosidic bond.

* **Cardiac Glycosides:**
  - Baljet Test: Sodium picrate solution -> Orange to yellow color.
  - Legal Test: Sodium nitroprusside in alkaline medium -> Pink to deep red color (tests for alpha, beta-unsaturated lactone).
  - Keller-Kiliani Test: Glacial acetic acid with 1 drop FeCl3 + conc H2SO4 along side of test tube -> Reddish-brown ring at interface, acetic acid layer turns bluish-green (tests 2-deoxysugars like Digitoxose).`,
    tables: [
      {
        title: 'Phytochemical Test Color Matrix',
        headers: ['Constituent Class', 'Test Name', 'Key Reagents', 'Characteristic Observation'],
        rows: [
          ['Alkaloids', "Mayer's Test", 'Potassium mercuric iodide', 'Cream precipitate'],
          ['Alkaloids', "Dragendorff's Test", 'Potassium bismuth iodide', 'Orange-red precipitate'],
          ['Alkaloids', "Wagner's Test", 'Iodine in KI', 'Reddish-brown precipitate'],
          ['Cardiac Glycosides', 'Keller-Kiliani', 'FeCl3 + Glacial Acetic acid + H2SO4', 'Brown ring at interface, bluish-green layer'],
          ['Cardiac Glycosides', "Legal's Test", 'Sodium nitroprusside + pyridine + NaOH', 'Deep red to pink color'],
          ['Anthraquinones', "Borntrager's Test", 'Benzene/Ether + dilute Ammonia', 'Rose pink ammoniacal layer'],
          ['Flavonoids', 'Shinoda Test', 'Magnesium ribbon + conc. HCl', 'Crimson red / pink color'],
          ['Tannins', 'Goldbeater Skin Test', 'Ox intestine membrane + FeSO4', 'Deep brown to black skin stain'],
        ],
      },
    ],
  },
  {
    id: 'note-spectroscopy-rules',
    title: 'Pharmaceutical Analysis: Woodward-Fieser Rules & NMR Chemical Shift Increments',
    subject: 'Pharmaceutical Analysis',
    topic: 'Spectroscopy',
    readTimeMinutes: 11,
    isHighYield: true,
    lastUpdated: 'February 2025',
    keyHighlights: [
      'Homoannular diene base value: 253 nm',
      'Heteroannular diene base value: 214 nm',
      'Double bond extending conjugation: +30 nm',
      'Exocyclic double bond: +5 nm',
      'Alkyl substituent or ring residue: +5 nm',
    ],
    summary: 'Master calculations for UV-Vis absorption maximum (lambda max) and proton NMR shielding/deshielding rules for GPAT and NIPER.',
    contentMarkdown: `### 1. Woodward-Fieser Rules for Conjugated Dienes
Woodward and Fieser established empirical rules to calculate the wavelength of maximum UV absorption (λ_max) for dienes and polyenes in ethanol:

* **Base Values:**
  - Acyclic or Heteroannular diene (double bonds in two separate rings): **214 nm**
  - Homoannular diene (both conjugated double bonds in same ring): **253 nm**
  - Acyclic alpha,beta-unsaturated ketone: **215 nm**
  - Six-membered cyclic alpha,beta-unsaturated ketone: **215 nm**
  - Five-membered cyclic alpha,beta-unsaturated ketone: **202 nm**

* **Increments:**
  - Extended conjugation (additional double bond in resonance): **+30 nm**
  - Each alkyl substituent or ring residue attached to diene carbon: **+5 nm**
  - Exocyclic double bond: **+5 nm**
  - Polar Auxochrome groups:
    - -OAc (acetate): **0 nm**
    - -O-alkyl (alkoxy): **+6 nm**
    - -S-alkyl: **+30 nm**
    - -Cl, -Br: **+5 nm**
    - -NR2 (dialkylamino): **+60 nm**`,
    tables: [
      {
        title: 'Woodward-Fieser Calculation Reference',
        headers: ['Structural Feature', 'Heteroannular / Acyclic', 'Homoannular Diene'],
        rows: [
          ['Parent Base Value', '214 nm', '253 nm'],
          ['Each double bond extending conjugation', '+30 nm', '+30 nm'],
          ['Each ring residue or alkyl substituent', '+5 nm', '+5 nm'],
          ['Exocyclic double bond', '+5 nm', '+5 nm'],
          ['Solvent correction for water', '+8 nm', '+8 nm'],
        ],
      },
    ],
  },
];

export const PHARMACY_UPDATES: PharmacyUpdate[] = [
  {
    id: 'upd-01',
    title: 'Revised Schedule M (GMP) Mandatory Compliance Deadline 2024-2025',
    category: 'Regulatory',
    date: 'February 2025',
    tag: 'Schedule M / CDSCO',
    summary: 'CDSCO and Ministry of Health notified stringent upgraded GMP standards under Revised Schedule M aligned with WHO-GMP norms.',
    detailedNotes: 'The revised Schedule M introduces strict Pharmaceutical Quality System (PQS), Quality Risk Management (QRM), product quality review, computerized system validation, and upgraded clean room air classification (Grade A, B, C, D replacing Class 100/10,000/100,000). Essential for GPAT & Drug Inspector exams.',
    impactOnExams: 'High probability of questions on Grade A laminar airflow velocity (0.36 - 0.54 m/s), computerized data integrity (ALCOA+), and CAPA methodology.',
  },
  {
    id: 'upd-02',
    title: 'NBEMS / NTA GPAT Exam Pattern & New Scoring Guidelines',
    category: 'Exam Notification',
    date: 'January 2025',
    tag: 'GPAT Official',
    summary: 'Computer-based test consists of 125 MCQs, 500 maximum marks, 180-minute duration with standard +4 marks for correct and -1 mark penalty.',
    detailedNotes: 'NBEMS emphasizes clinical pharmacology case scenarios, analytical chromatographic problem solving, and drug regulatory jurisprudence. Time management strategy requires spending an average of 1.44 minutes per question.',
    impactOnExams: 'Candidates must practice negative marking mitigation strategies; unattempted questions incur 0 marks.',
  },
  {
    id: 'upd-03',
    title: 'Indian Pharmacopoeia (IP 2024 Addendum) Updates',
    category: 'Pharmacopoeia',
    date: 'December 2024',
    tag: 'IP Monographs',
    summary: 'Release of IP 2024 Addendum featuring updated dissolution standards, elemental impurity limits (ICH Q3D), and nitrosamine impurity testing.',
    detailedNotes: 'Incorporated new monographs for monoclonal antibodies, mRNA therapeutics, and GLP-1 receptor agonists like Semaglutide and Tirzepatide, with updated HPLC assay and biological potency testing procedures.',
    impactOnExams: 'Expect questions on Nitrosamine acceptable intake (e.g. NDMA, NDEA limits in sartans and ranitidine) and dissolution apparatus types.',
  },
  {
    id: 'upd-04',
    title: 'USFDA & CDSCO Approvals: GLP-1 & GIP Dual Agonists Mechanism',
    category: 'New Drug Approval',
    date: 'March 2025',
    tag: 'Pharmacology Trend',
    summary: 'Tirzepatide and Retatrutide clinical milestones for Type 2 Diabetes and Obesity management.',
    detailedNotes: 'Tirzepatide is a synthetic 39-amino-acid peptide with glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist activity. Retatrutide adds glucagon receptor agonism (triple agonist).',
    impactOnExams: 'Hot topic in GPAT & NIPER JEE Pharmacology for peptide synthesis, fatty acid acylation for half-life extension, and incretin mimetic pathways.',
  },
];

export const FLASHCARDS_DECK: Flashcard[] = [
  {
    id: 'fc-01',
    front: 'What is the antidote for Heparin overdose, and what is its mechanism of neutralization?',
    back: 'Protamine sulfate. It is a strongly basic polycationic protein that forms an inactive, stable ion-pair complex (salt) with the strongly acidic polyanionic heparin.',
    subject: 'Pharmacology',
    topic: 'Anticoagulants',
    tag: 'Antidotes',
    difficulty: 'Easy',
  },
  {
    id: 'fc-02',
    front: 'Which test identifies Cardiac glycoside unsaturated 5-membered lactone ring vs 6-membered lactone ring?',
    back: 'Legal test and Baljet test identify the 5-membered alpha,beta-unsaturated lactone ring in Cardenolides (e.g., Digitoxin). 6-membered lactone ring with 2 double bonds is found in Bufadienolides (e.g., Scillaren A).',
    subject: 'Pharmacognosy',
    topic: 'Cardiac Glycosides',
    tag: 'Chemical Tests',
    difficulty: 'Medium',
  },
  {
    id: 'fc-03',
    front: 'State the Noyes-Whitney Equation for tablet dissolution rate.',
    back: 'dM/dt = (D * A / h) * (Cs - Cb)\nWhere:\n• D = Diffusion coefficient\n• A = Surface area of dissolving solid\n• h = Diffusion layer thickness\n• Cs = Saturation solubility\n• Cb = Bulk solution concentration',
    subject: 'Pharmaceutics',
    topic: 'Dissolution Kinetics',
    tag: 'Formulas',
    difficulty: 'Medium',
  },
  {
    id: 'fc-04',
    front: 'Which Schedule of the D&C Act governs Clinical Trials in India?',
    back: 'Schedule Y (along with the New Drugs and Clinical Trials Rules, 2019). Regulates Phases I, II, III, and IV, Institutional Ethics Committees (IEC), and compensation guidelines.',
    subject: 'Clinical Pharmacy & Jurisprudence',
    topic: 'Jurisprudence',
    tag: 'Regulations',
    difficulty: 'Easy',
  },
  {
    id: 'fc-05',
    front: 'In NMR spectroscopy, what is the chemical shift (ppm) reference standard, and why?',
    back: 'Tetramethylsilane (TMS, (CH3)4Si). Reason: Highly shielded protons (assigned 0.0 ppm), single sharp singlet, inert, non-toxic, and low boiling point (27°C) making it easily removable.',
    subject: 'Pharmaceutical Analysis',
    topic: 'NMR Spectroscopy',
    tag: 'Spectroscopy',
    difficulty: 'Easy',
  },
  {
    id: 'fc-06',
    front: 'What heterocyclic nucleus is present in the antifungal drug Fluconazole?',
    back: '1,2,4-Triazole ring. Fluconazole possesses two 1,2,4-triazole rings attached to a central difluorophenyl propane skeleton.',
    subject: 'Pharmaceutical Chemistry',
    topic: 'Antifungal Medicinal Chemistry',
    tag: 'Heterocycles',
    difficulty: 'Medium',
  },
  {
    id: 'fc-07',
    front: 'What is the characteristic red blood cell morphology seen in Vitamin B12 / Folate deficiency?',
    back: 'Megaloblastic anemia (macrocytic, hypersegmented neutrophils, Mean Corpuscular Volume MCV > 100 fL).',
    subject: 'Pharmacology',
    topic: 'Hematology',
    tag: 'Pathology',
    difficulty: 'Easy',
  },
  {
    id: 'fc-08',
    front: 'Name the 4 USP Dissolution Apparatus types (Apparatus 1 to 4).',
    back: 'Apparatus 1: Rotating Basket\nApparatus 2: Paddle\nApparatus 3: Reciprocating Cylinder\nApparatus 4: Flow-Through Cell',
    subject: 'Pharmaceutics',
    topic: 'Dissolution Testing',
    tag: 'USP Apparatus',
    difficulty: 'Medium',
  },
];
