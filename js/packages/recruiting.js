/**
 * Recruiting Duty Package Template
 * B-Billet SDA screening package
 */
const RecruitingPackage = {
  id: 'recruiting',
  name: 'Recruiting Duty',
  shortName: 'REC',
  icon: '&#127894;', // medal
  description: 'B-Billet SDA',
  reference: 'MCO 1326.6, MARADMIN',

  // Default routing for Recruiting package
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
      level: 'Submit to Recruiting District',
      required: true,
      description: 'Via official channels'
    }
  ],

  // Waiver categories
  waiverCategories: [
    { id: 'pft', name: 'PFT Score', description: 'Below 1st class PFT requirement' },
    { id: 'cft', name: 'CFT Score', description: 'Below 1st class CFT requirement' },
    { id: 'height_weight', name: 'Height/Weight', description: 'Outside standards' },
    { id: 'driving', name: 'Driving Record', description: 'DUI or serious violations' },
    { id: 'financial', name: 'Financial Issues', description: 'Credit problems or bankruptcy' },
    { id: 'njp', name: 'NJP History', description: 'Non-judicial punishment on record' },
    { id: 'tig_tis', name: 'Time in Grade/Service', description: 'Does not meet requirements' }
  ],

  // Document checklist
  documents: [
    // Screening Documents
    {
      id: 1,
      category: 'Screening',
      name: 'CO Screening/Interview Guide',
      description: 'Completed screening interview documentation',
      required: true,
      reference: 'MCO 1326.6'
    },
    {
      id: 2,
      category: 'Screening',
      name: 'HQMC Screening Certification',
      description: 'MISSA screening results from HQMC',
      required: true,
      reference: 'Via S-1'
    },
    {
      id: 3,
      category: 'Screening',
      name: 'Volunteer Statement',
      description: 'Written statement volunteering for recruiting duty',
      required: true,
      reference: 'Signed statement'
    },

    // Personnel Records
    {
      id: 4,
      category: 'Records',
      name: 'BIR/BTR Screen',
      description: 'Basic Individual Record from MOL',
      required: true,
      reference: 'Print from MOL'
    },
    {
      id: 5,
      category: 'Records',
      name: 'Awards Summary',
      description: 'Official awards record',
      required: true,
      reference: 'Print from MCTFS'
    },
    {
      id: 6,
      category: 'Records',
      name: 'PFT/CFT Scores',
      description: 'Current scores - 1st class required for both',
      required: true,
      reference: 'Print from MCTFS'
    },
    {
      id: 7,
      category: 'Records',
      name: 'Height/Weight Record',
      description: 'Most recent BCP status if applicable',
      required: true,
      reference: 'From medical/S-3'
    },

    // Medical Documents
    {
      id: 8,
      category: 'Medical',
      name: 'Physical (within 2 years)',
      description: 'Current physical examination',
      required: true,
      reference: 'DD 2808 or equivalent'
    },
    {
      id: 9,
      category: 'Medical',
      name: 'Dental Readiness',
      description: 'Class 1 or 2 dental readiness required',
      required: true,
      reference: 'From dental'
    },

    // Administrative Documents
    {
      id: 10,
      category: 'Admin',
      name: 'Credit Check Authorization',
      description: 'Signed authorization for credit check',
      required: true,
      reference: 'Signed form'
    },
    {
      id: 11,
      category: 'Admin',
      name: 'Credit Report',
      description: 'Current credit report (within 30 days)',
      required: true,
      reference: 'From authorized source'
    },
    {
      id: 12,
      category: 'Admin',
      name: "Driver's License Copy",
      description: 'Valid state driver\'s license - front and back',
      required: true,
      reference: 'Clear copy'
    },
    {
      id: 13,
      category: 'Admin',
      name: 'Driving Record (MVR)',
      description: 'Motor vehicle record from state DMV',
      required: true,
      reference: 'Within 30 days'
    },
    {
      id: 14,
      category: 'Admin',
      name: 'SGLI Form',
      description: 'Current SGLI election form',
      required: true,
      reference: 'SGLV 8286'
    },
    {
      id: 15,
      category: 'Admin',
      name: 'Dependent Information',
      description: 'Page 2 or DEERS printout with dependent info',
      required: true,
      reference: 'Current DEERS'
    },
    {
      id: 16,
      category: 'Admin',
      name: 'Emergency Contact Info',
      description: 'Current emergency contact information',
      required: true,
      reference: 'DD Form 93'
    },

    // Personal Documents
    {
      id: 17,
      category: 'Personal',
      name: 'Photo (Official)',
      description: 'Recent official photo in service uniform',
      required: true,
      reference: 'Within 6 months'
    },
    {
      id: 18,
      category: 'Personal',
      name: 'Biography/Resume',
      description: 'Personal biography or resume',
      required: false,
      reference: 'Optional'
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
      preferredDistrict: applicantInfo.preferredDistrict || '',
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
