/**
 * Warrant Officer Package Template
 * Based on MCRC Enlisted to Warrant Officer Sample Application
 */
const WarrantOfficerPackage = {
  id: 'warrant_officer',
  name: 'Warrant Officer',
  shortName: 'WO',
  icon: '&#9733;', // star
  description: 'Regular & Reserve Programs',
  reference: 'MCO 1040.42B, Annual MARADMIN',

  // Default routing for WO package
  defaultRouting: [
    {
      level: 'Company Commander',
      required: true,
      description: 'Initial endorsement'
    },
    {
      level: 'Battalion Commander',
      required: true,
      description: 'Intermediate endorsement'
    },
    {
      level: 'First O-6 in Chain',
      required: true,
      description: 'Senior endorsement required'
    },
    {
      level: 'Submit to MCRC',
      required: true,
      description: 'warrantofficerboard@marines.usmc.mil via DoD SAFE'
    }
  ],

  // Waiver categories
  waiverCategories: [
    { id: 'afqt', name: 'AFQT Score (below 70)', description: 'Waiver required if GT below 110 or AFQT below 70' },
    { id: 'njp', name: 'NJP History', description: 'Non-judicial punishment on record' },
    { id: 'courtsmartial', name: 'Courts-Martial', description: 'Prior courts-martial conviction' },
    { id: 'civil', name: 'Civil Conviction', description: 'Non-felony civil conviction' },
    { id: 'preservice', name: 'Pre-Service Issues', description: 'Drug use, moral waivers, age waivers at enlistment' },
    { id: 'tattoo', name: 'Tattoo Policy Violations', description: 'Tattoos requiring waiver per current policy' },
    { id: 'medical', name: 'Medical Conditions', description: 'Medical conditions requiring waiver' },
    { id: 'tig_tis', name: 'Time in Grade/Service', description: 'Does not meet TIG/TIS requirements' }
  ],

  // Document checklist
  documents: [
    // Application Documents
    {
      id: 1,
      category: 'Application',
      name: 'Application Letter',
      description: 'NAVMC 10274 format stating intent to apply for WO program',
      required: true,
      reference: 'Sample Application Page 1'
    },
    {
      id: 2,
      category: 'Application',
      name: 'CO Interview/Recommendation',
      description: 'Commanding Officer interview certification and endorsement',
      required: true,
      reference: 'MCO 1040.42B'
    },
    {
      id: 3,
      category: 'Application',
      name: 'Command Screening Checklist',
      description: 'NAVMC 11580 or equivalent command screening form',
      required: true,
      reference: 'NAVMC 11580'
    },
    {
      id: 4,
      category: 'Application',
      name: 'First O-6 Endorsement',
      description: 'Required if not directly under O-6 command',
      required: false,
      reference: 'MCO 1040.42B'
    },

    // Personnel Records
    {
      id: 5,
      category: 'Records',
      name: 'BIR/BTR Screen',
      description: 'Basic Individual Record/Basic Training Record from MOL',
      required: true,
      reference: 'Print from MOL'
    },
    {
      id: 6,
      category: 'Records',
      name: 'Education Screen',
      description: 'Official education record from MCTFS',
      required: true,
      reference: 'Print from MCTFS'
    },
    {
      id: 7,
      category: 'Records',
      name: 'Awards Screen',
      description: 'Verify all awards are posted and current',
      required: true,
      reference: 'Print from MCTFS'
    },
    {
      id: 8,
      category: 'Records',
      name: 'Chronological Page',
      description: 'Service record chronology from MCTFS',
      required: true,
      reference: 'Print from MCTFS'
    },
    {
      id: 9,
      category: 'Records',
      name: 'Test Score Screen (ASVAB)',
      description: 'EL score required, official MCTFS print only',
      required: true,
      reference: 'Print from MCTFS'
    },

    // Administrative Documents
    {
      id: 10,
      category: 'Admin',
      name: 'NAVMC 941',
      description: 'Counseling checklist acknowledging program requirements',
      required: true,
      reference: 'NAVMC 941'
    },
    {
      id: 11,
      category: 'Admin',
      name: 'SAT/ACT Scores',
      description: 'Certified copy if applicable for education points',
      required: false,
      reference: 'Optional'
    },
    {
      id: 12,
      category: 'Admin',
      name: 'Security Clearance Evidence',
      description: 'JPAS screen or Page 11 entry showing clearance eligibility',
      required: true,
      reference: 'JPAS Print'
    },
    {
      id: 13,
      category: 'Admin',
      name: 'Body Marking Documentation',
      description: 'Photos of all tattoos and/or waiver documentation if required',
      required: true,
      reference: 'MCO 1020.34H'
    },

    // Medical Documents
    {
      id: 14,
      category: 'Medical',
      name: 'DD Form 2807-1',
      description: 'Medical history form - all blocks must be completed',
      required: true,
      reference: 'DD 2807-1'
    },
    {
      id: 15,
      category: 'Medical',
      name: 'DD Form 2808',
      description: 'Commissioning physical - must be completed by military doctor',
      required: true,
      reference: 'DD 2808'
    },
    {
      id: 16,
      category: 'Medical',
      name: 'IMR Screen',
      description: 'Individual Medical Readiness from MOL',
      required: true,
      reference: 'Print from MOL'
    },
    {
      id: 17,
      category: 'Medical',
      name: 'Audiogram',
      description: 'Hearing test results within 3 years, annotated on DD 2808',
      required: true,
      reference: 'Within 3 years'
    },
    {
      id: 18,
      category: 'Medical',
      name: 'PAP Results (Female)',
      description: 'PAP smear results within 3 years - females only',
      required: false,
      reference: 'Within 3 years'
    },
    {
      id: 19,
      category: 'Medical',
      name: 'Surgical Documentation',
      description: 'Pre/post-operative paperwork if applicable',
      required: false,
      reference: 'If applicable'
    }
  ],

  // Create a new package instance
  createPackage(applicantInfo = {}) {
    return {
      id: Storage.generatePackageId(),
      packageType: this.id,
      packageName: this.name,

      // Applicant info
      applicantName: applicantInfo.name || '',
      applicantRank: applicantInfo.rank || '',
      applicantEDIPI: applicantInfo.edipi || '',
      applicantMOS: applicantInfo.mos || '',
      applicantUnit: applicantInfo.unit || '',
      targetBoard: applicantInfo.targetBoard || '',
      targetMOS: applicantInfo.targetMOS || '',
      deadline: applicantInfo.deadline || '',

      // Documents - clone the template
      documents: this.documents.map(doc => ({
        ...doc,
        status: 'incomplete', // incomplete, complete, na, waiver_needed
        notes: '',
        dateCompleted: null
      })),

      // Waivers
      waivers: [],

      // Routing - clone the template
      routing: this.defaultRouting.map((step, index) => ({
        ...step,
        id: index + 1,
        name: '',
        status: 'pending', // pending, signed, returned
        date: null,
        recommends: null // true, false, null
      })),

      // Metadata
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: 'in_progress' // not_started, in_progress, submitted, selected, not_selected
    };
  }
};
