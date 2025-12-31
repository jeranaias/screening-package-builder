# SPEC: Screening Package Builder

## Tool Overview

| Field | Value |
|-------|-------|
| **Repo Name** | `screening-package-builder` |
| **Full Title** | Special Duty & Board Package Builder |
| **Description** | Checklist-driven package builder for special duty assignments and board packages. Tracks required documents, generates cover sheets, ensures completeness |
| **Complexity** | ⭐⭐⭐ (Medium) |
| **Estimated Build** | 5-7 days |
| **Priority** | 8 of 8 |

---

## Problem Statement

From Reddit user CheckFlop: *"Package builders for WO board, recruiting - mentioned Adobe Writer precedent"*

Marines applying for special duty assignments (SDA) and commissioning programs must assemble complex packages with:
- Dozens of required documents
- Specific formatting requirements
- Multiple endorsement levels
- Changing requirements (updated via MARADMIN)
- Tight deadlines

Current pain points:
- Requirements scattered across MCOs, MARADMINs, and unit SOPs
- Easy to miss one document and have package rejected
- No central checklist that stays current
- Cover sheet formatting inconsistent
- Routing sheets vary by command

---

## Core Features

### Must Have (MVP)
- [ ] Package type selector (multiple programs)
- [ ] Dynamic checklist based on program requirements
- [ ] Document tracker (have / need / N-A / waiver required)
- [ ] Progress indicator (% complete)
- [ ] Cover sheet generator
- [ ] Routing sheet generator
- [ ] Print package summary checklist
- [ ] Save progress locally

### Should Have
- [ ] Waiver tracking (what needs waiver, status)
- [ ] Deadline tracking
- [ ] Reference links to MARADMINs/MCOs
- [ ] Document description tooltips
- [ ] Export checklist to PDF

### Nice to Have
- [ ] Program eligibility calculator
- [ ] Auto-check some requirements (TIS, TIG based on dates)
- [ ] Previous package import
- [ ] Notification when MARADMINs update

---

## Supported Package Types

### Phase 1 (MVP)
| Program | Reference | Complexity |
|---------|-----------|------------|
| Warrant Officer (Regular) | MCO 1040.42B, Annual MARADMIN | High |
| Warrant Officer (Reserve) | Annual MARADMIN | High |
| Recruiting Duty | MCO 1326.6, MARADMIN | Medium |

### Phase 2 (Future)
| Program | Reference |
|---------|-----------|
| Drill Instructor | MCO 1326.6, MARADMIN |
| Marine Security Guard (MSG) | MCO 5510.18A |
| MECEP | MCO 1560.15M, MARADMIN |
| ECP | MCO 1560.15M, MARADMIN |
| OCS (from enlisted) | MCO 1040.43 |
| MARSOC A&S | Various |
| **AA&E Screening** | TBD - Requirements from k1dblast (Discord) |

### Note on AA&E (Arms, Ammunition & Explosives)
Community request from k1dblast. Package for personnel handling AA&E materials.
- Requires PII but acceptable since tool is offline/local
- Will add checklist when requirements received
- PDF output for printing with handwritten additions

---

## Warrant Officer Package Requirements

### Source: MCRC Enlisted to Warrant Officer Sample Application

#### Required Documents (In Order)
```
1.  Application Letter (NAVMC 10274 format)
2.  Commanding Officer's Interview/Recommendation
3.  Command Screening Checklist  
4.  First O-6 Endorsement (if required)
5.  BIR/BTR Print Screen (from MOL/MCTFS)
6.  Education Screen (MCTFS)
7.  Awards Screen (MCTFS)
8.  Chronological Page (MCTFS)
9.  Test Score Screen (MCTFS/ASVAB)
10. NAVMC 941 (Counseling Checklist)
11. Certified SAT/ACT Scores (if applicable)
12. Security Clearance Evidence (JPAS screen)
13. Body Marking Documentation (Tattoo photos/waiver)
14. DD Form 2807-1 (Medical History)
15. DD Form 2808 (Physical Examination)
16. IMR Screen (from MOL)
17. Audiogram Results (within 3 years)
18. PAP Results (females, within 3 years)
19. Pre/Post-Operative Documentation (if applicable)
```

#### Waiver Categories
- AFQT Score (if below 70)
- NJP history
- Courts-Martial history
- Civil conviction (non-felony)
- Pre-service issues (drugs, moral, age)
- Tattoo policy violations
- Medical conditions
- Time in grade/service

---

## Data Model

```javascript
const packageData = {
  // Package info
  packageType: "warrant_officer_regular",
  applicantName: "",
  applicantRank: "",
  applicantEDIPI: "",
  targetBoard: "FY26",
  deadline: "2025-03-15",
  
  // Document checklist
  documents: [
    {
      id: 1,
      name: "Application Letter",
      description: "NAVMC 10274 format cover letter",
      required: true,
      status: "complete",  // complete, incomplete, na, waiver_needed
      notes: "",
      reference: "Sample Application Page 1"
    },
    {
      id: 2,
      name: "CO Interview/Recommendation",
      description: "Commanding Officer interview and endorsement",
      required: true,
      status: "incomplete",
      notes: "Scheduled for 20 Jan",
      reference: "MCO 1040.42B"
    },
    // ... etc
  ],
  
  // Waivers
  waivers: [
    {
      type: "njp",
      reason: "NJP Dec 2023 - UA",
      status: "approved",  // pending, approved, denied
      endorsedBy: "CO",
      date: "2025-01-10"
    }
  ],
  
  // Routing
  routing: [
    {
      level: "Company Commander",
      name: "Capt Smith",
      status: "signed",
      date: "2025-01-15"
    },
    {
      level: "Battalion Commander", 
      name: "LtCol Jones",
      status: "pending",
      date: null
    }
  ],
  
  // Metadata
  created: "2025-01-01",
  lastUpdated: "2025-01-18",
  status: "in_progress"  // not_started, in_progress, submitted, selected, not_selected
};
```

---

## UI Layout

### View 1: Package Type Selection (Home)
```
┌─────────────────────────────────────────────────────┐
│ SCREENING PACKAGE BUILDER                            │
├─────────────────────────────────────────────────────┤
│ Select Package Type                                  │
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ ⭐ WARRANT OFFICER                              ││
│ │    Regular & Reserve Programs                   ││
│ │    [Start Package →]                            ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ 🎖️ RECRUITING DUTY                              ││
│ │    B-Billet SDA                                 ││
│ │    [Start Package →]                            ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ 🎩 DRILL INSTRUCTOR                             ││
│ │    Coming Soon                                  ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
├─────────────────────────────────────────────────────┤
│ YOUR SAVED PACKAGES                                  │
│ ┌─────────────────────────────────────────────────┐│
│ │ WO Package - FY26 Board      75% Complete      ││
│ │ Last updated: 18 Jan 2025                       ││
│ │ [Continue →]                                    ││
│ └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

### View 2: Package Dashboard
```
┌─────────────────────────────────────────────────────┐
│ ← Home          WARRANT OFFICER PACKAGE             │
├─────────────────────────────────────────────────────┤
│ SSgt SMITH, John A.          FY26 Board             │
│ Deadline: 15 Mar 2025 (56 days remaining)          │
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ ████████████████░░░░░░░░  75% Complete          ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ✅ 15 Documents Complete                            │
│ ⚠️  4 Documents Needed                              │
│ 📝 1 Waiver Required                                │
│ ✍️  2 Signatures Pending                            │
├─────────────────────────────────────────────────────┤
│ [📋 Checklist]  [📄 Cover Sheet]  [✍️ Routing]     │
│                                                      │
│ [📤 Export PDF]              [🗑️ Delete Package]   │
└─────────────────────────────────────────────────────┘
```

### View 3: Document Checklist
```
┌─────────────────────────────────────────────────────┐
│ ← Dashboard              DOCUMENT CHECKLIST         │
├─────────────────────────────────────────────────────┤
│ Filter: [All ▼]    Sort: [Order ▼]    🔍 Search    │
├─────────────────────────────────────────────────────┤
│ APPLICATION DOCUMENTS                                │
│ ┌─────────────────────────────────────────────────┐│
│ │ ✅ 1. Application Letter                        ││
│ │    NAVMC 10274 format                    [Edit] ││
│ └─────────────────────────────────────────────────┘│
│ ┌─────────────────────────────────────────────────┐│
│ │ ✅ 2. CO Interview/Recommendation               ││
│ │    Completed 15 Jan 2025                 [Edit] ││
│ └─────────────────────────────────────────────────┘│
│ ┌─────────────────────────────────────────────────┐│
│ │ ⬜ 3. Command Screening Checklist               ││
│ │    Required                              [Edit] ││
│ │    ℹ️ Use NAVMC 11580                           ││
│ └─────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│ MOL/MCTFS SCREENS                                    │
│ ┌─────────────────────────────────────────────────┐│
│ │ ✅ 4. BIR/BTR Screen                            ││
│ │    Print from MOL                        [Edit] ││
│ └─────────────────────────────────────────────────┘│
│ ┌─────────────────────────────────────────────────┐│
│ │ ✅ 5. Education Screen                          ││
│ │    Print from MCTFS                      [Edit] ││
│ └─────────────────────────────────────────────────┘│
│ ┌─────────────────────────────────────────────────┐│
│ │ ⬜ 6. Awards Screen                             ││
│ │    Verify awards are current             [Edit] ││
│ │    ⚠️ Note: Ensure all awards posted            ││
│ └─────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│ MEDICAL DOCUMENTS                                    │
│ ┌─────────────────────────────────────────────────┐│
│ │ ⬜ 7. DD 2807-1 (Medical History)               ││
│ │    Must be completed by military doctor  [Edit] ││
│ └─────────────────────────────────────────────────┘│
│ ...                                                 │
└─────────────────────────────────────────────────────┘
```

### View 4: Document Detail / Edit
```
┌─────────────────────────────────────────────────────┐
│ ← Checklist                     DOCUMENT DETAIL     │
├─────────────────────────────────────────────────────┤
│ DD Form 2808 (Physical Examination)                 │
│                                                      │
│ Description:                                         │
│ Commissioning physical completed by military        │
│ doctor. All blocks must be marked Normal or         │
│ Abnormal. "NE" for question 41 (males only).       │
│                                                      │
│ Reference: NAVMED P-117, MARADMIN                   │
│                                                      │
├─────────────────────────────────────────────────────┤
│ STATUS                                               │
│ ○ Not Started                                       │
│ ○ In Progress                                       │
│ ● Complete                                          │
│ ○ Not Applicable                                    │
│ ○ Waiver Required                                   │
│                                                      │
├─────────────────────────────────────────────────────┤
│ Date Completed: [2025-01-10____]                   │
│                                                      │
│ Notes:                                               │
│ [Physical completed at Branch Medical___]          │
│ [______________________________________]           │
│                                                      │
├─────────────────────────────────────────────────────┤
│                [Cancel]        [Save]               │
└─────────────────────────────────────────────────────┘
```

### View 5: Cover Sheet Generator
```
┌─────────────────────────────────────────────────────┐
│ ← Dashboard                    COVER SHEET          │
├─────────────────────────────────────────────────────┤
│ APPLICANT INFORMATION                                │
│ Rank:        [SSgt_______▼]                        │
│ Last Name:   [SMITH______________]                  │
│ First Name:  [John_______________]                  │
│ MI:          [A_]                                   │
│ EDIPI:       [1234567890_]                         │
│ MOS:         [0231__]                               │
│ Unit:        [1st Intel Bn, I MEF___]              │
│                                                      │
├─────────────────────────────────────────────────────┤
│ PACKAGE INFORMATION                                  │
│ Program:     Warrant Officer (Regular)              │
│ Target:      FY26 Selection Board                   │
│ MOS Applied: [0231 - Intelligence]                  │
│                                                      │
├─────────────────────────────────────────────────────┤
│ ENCLOSURE LIST                                       │
│ (1) Application Letter                              │
│ (2) Commanding Officer's Recommendation             │
│ (3) Command Screening Checklist                     │
│ (4) BIR/BTR Print Screen                           │
│ (5) Education Screen                                │
│ (6) Awards Screen                                   │
│ (7) Chronological Page                              │
│ ... (auto-generated from checklist)                 │
│                                                      │
├─────────────────────────────────────────────────────┤
│ WAIVERS REQUESTED                                    │
│ ☑️ NJP - December 2023 (UA)                         │
│                                                      │
├─────────────────────────────────────────────────────┤
│              [Preview]         [Export PDF]         │
└─────────────────────────────────────────────────────┘
```

### View 6: Routing Tracker
```
┌─────────────────────────────────────────────────────┐
│ ← Dashboard                    ROUTING STATUS       │
├─────────────────────────────────────────────────────┤
│ Track endorsement signatures                         │
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ 1. Company Commander                            ││
│ │    Capt M. Johnson                              ││
│ │    ✅ Signed: 15 Jan 2025                       ││
│ │    Recommends: YES                              ││
│ └─────────────────────────────────────────────────┘│
│        │                                            │
│        ▼                                            │
│ ┌─────────────────────────────────────────────────┐│
│ │ 2. Battalion Commander                          ││
│ │    LtCol R. Smith                               ││
│ │    ⏳ Pending                                    ││
│ │    Submitted: 16 Jan 2025                       ││
│ └─────────────────────────────────────────────────┘│
│        │                                            │
│        ▼                                            │
│ ┌─────────────────────────────────────────────────┐│
│ │ 3. First O-6 in Chain                           ││
│ │    Col T. Williams                              ││
│ │    ⬜ Not Started                                ││
│ └─────────────────────────────────────────────────┘│
│        │                                            │
│        ▼                                            │
│ ┌─────────────────────────────────────────────────┐│
│ │ 4. Submit to MCRC                               ││
│ │    warrantofficerboard@marines.usmc.mil         ││
│ │    Via DoD SAFE                                 ││
│ │    ⬜ Not Submitted                              ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ [Print Routing Sheet]                               │
└─────────────────────────────────────────────────────┘
```

---

## Package Templates

### Warrant Officer (Regular)
```javascript
const woRegularChecklist = [
  // Application Documents
  { id: 1, category: "Application", name: "Application Letter", required: true, 
    description: "NAVMC 10274 format stating intent to apply" },
  { id: 2, category: "Application", name: "CO Interview/Recommendation", required: true,
    description: "Commanding Officer interview certification" },
  { id: 3, category: "Application", name: "Command Screening Checklist", required: true,
    description: "NAVMC 11580 or equivalent" },
  { id: 4, category: "Application", name: "First O-6 Endorsement", required: false,
    description: "Required if not directly under O-6" },
  
  // Personnel Records
  { id: 5, category: "Records", name: "BIR/BTR Screen", required: true,
    description: "Print from MOL" },
  { id: 6, category: "Records", name: "Education Screen", required: true,
    description: "Print from MCTFS" },
  { id: 7, category: "Records", name: "Awards Screen", required: true,
    description: "Verify all awards posted" },
  { id: 8, category: "Records", name: "Chronological Page", required: true,
    description: "Print from MCTFS" },
  { id: 9, category: "Records", name: "Test Score Screen (ASVAB)", required: true,
    description: "EL score, MCTFS official only" },
  
  // Admin Documents  
  { id: 10, category: "Admin", name: "NAVMC 941", required: true,
    description: "Counseling checklist" },
  { id: 11, category: "Admin", name: "SAT/ACT Scores", required: false,
    description: "Certified copy if applicable" },
  { id: 12, category: "Admin", name: "Security Clearance Evidence", required: true,
    description: "JPAS screen or Page 11 entry" },
  { id: 13, category: "Admin", name: "Body Marking Documentation", required: true,
    description: "Photos and/or waiver documentation" },
  
  // Medical Documents
  { id: 14, category: "Medical", name: "DD 2807-1", required: true,
    description: "Medical history form" },
  { id: 15, category: "Medical", name: "DD 2808", required: true,
    description: "Physical examination - military doctor required" },
  { id: 16, category: "Medical", name: "IMR Screen", required: true,
    description: "Print from MOL" },
  { id: 17, category: "Medical", name: "Audiogram", required: true,
    description: "Within 3 years, results on DD 2808" },
  { id: 18, category: "Medical", name: "PAP Results (female)", required: false,
    description: "Within 3 years" },
  { id: 19, category: "Medical", name: "Surgical Documentation", required: false,
    description: "Pre/post-op paperwork if applicable" }
];
```

### Recruiting Duty
```javascript
const recruitingChecklist = [
  { id: 1, category: "Screening", name: "CO Screening/Interview Guide", required: true,
    description: "Completed screening interview" },
  { id: 2, category: "Screening", name: "HQMC Screening Certification", required: true,
    description: "MISSA screening results" },
  { id: 3, category: "Records", name: "BIR/BTR", required: true },
  { id: 4, category: "Records", name: "Awards Summary", required: true },
  { id: 5, category: "Records", name: "PFT/CFT Scores", required: true,
    description: "Current scores, 1st class required" },
  { id: 6, category: "Medical", name: "Physical (within 2 years)", required: true },
  { id: 7, category: "Admin", name: "Credit Check Authorization", required: true },
  { id: 8, category: "Admin", name: "Driver's License Copy", required: true },
  { id: 9, category: "Admin", name: "SGLI Form", required: true },
  { id: 10, category: "Admin", name: "Dependent Information", required: true },
  // ... etc
];
```

---

## Validation & Progress Calculation

```javascript
function calculateProgress(package) {
  const required = package.documents.filter(d => d.required);
  const complete = required.filter(d => 
    d.status === 'complete' || d.status === 'na'
  );
  
  return {
    percentage: Math.round((complete.length / required.length) * 100),
    complete: complete.length,
    required: required.length,
    missing: required.filter(d => d.status === 'incomplete'),
    waiverNeeded: package.documents.filter(d => d.status === 'waiver_needed')
  };
}
```

---

## Tech Stack

```
- HTML5/CSS3/Vanilla JS
- Design System: /specs/DESIGN_SYSTEM.md
- PWA + Service Worker (offline capable)
- LocalStorage for package data
- jsPDF for cover sheet/checklist export
- No backend required
```

---

## File Structure

```
screening-package-builder/
├── index.html
├── manifest.json
├── service-worker.js
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── packages/
│   │   ├── warrant-officer.js    # WO checklist template
│   │   ├── recruiting.js         # Recruiting checklist
│   │   └── index.js              # Package registry
│   ├── checklist.js              # Checklist logic
│   ├── cover-sheet.js            # Cover sheet generator
│   ├── routing.js                # Routing tracker
│   ├── export.js                 # PDF export
│   └── lib/
│       ├── theme.js
│       ├── storage.js
│       └── date-utils.js
├── data/
│   └── templates.json            # Package templates
├── assets/
│   ├── icon-192.png
│   └── icon-512.png
├── README.md
├── LICENSE
└── CHANGELOG.md
```

---

## References

| Reference | Description |
|-----------|-------------|
| MCO 1040.42B | Warrant Officer Program |
| MCO 1326.6 | SDA/B-Billet Assignments |
| Annual MARADMIN | FY Selection Board Guidance |
| MCRC Sample Application | Document order and requirements |
| NAVMC 10274 | Application letter format |
| NAVMC 11580 | Command screening checklist |

---

## Success Criteria

1. Select from multiple package types
2. Dynamic checklist based on program
3. Track document status with visual progress
4. Generate cover sheet with enclosure list
5. Track routing/endorsements
6. Export checklist and cover sheet to PDF
7. Save/resume package progress
8. Works offline (PWA)

---

## Notes for Claude Code

1. **Use the Design System** - Import all styles from `/specs/DESIGN_SYSTEM.md`
2. **Modular package templates** - Easy to add new package types later
3. **Progress persistence** - Critical to not lose work
4. **Reference links** - Link to MARADMINs where possible
5. **Print-friendly** - Checklist should print clean for physical package
6. **Category grouping** - Organize documents logically
7. **Waiver tracking** - Important for board consideration
8. **Deadline awareness** - Show days remaining prominently

---

## Community Attribution

This tool was inspired by feedback from the r/USMC community:

| Contributor | Platform | Contribution |
|-------------|----------|--------------|
| **CheckFlop** | r/USMC | Requested package builders for WO board and recruiting duty, mentioned Adobe Writer precedent |
| **k1dblast** | Discord | Requested AA&E screening package (Phase 2), will provide requirements |

*This tool exists because Marines took the time to share their pain points. Thank you.*

---

## Future Enhancements

1. **Eligibility calculator** - Input TIS/TIG/etc., check basic eligibility
2. **MARADMIN parser** - Auto-update requirements when new MARADMIN published
3. **Document upload** - Store PDFs locally for reference (privacy concern)
4. **Share package** - Export/import for passing to admin

---

## Git Commit Guidelines

**IMPORTANT:** Do NOT include any Claude, Anthropic, or AI attribution in commit messages. Keep commits professional and human-authored in tone:

```
# GOOD commit messages:
git commit -m "Add WO package checklist from MCRC requirements"
git commit -m "Implement routing status tracker"
git commit -m "Add cover sheet PDF generator"

# BAD commit messages (do not use):
git commit -m "Generated by Claude..."
git commit -m "AI-assisted implementation of..."
```

---

*Spec created December 2025*
*Part of USMC Admin Tools Suite*
