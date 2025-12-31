# Screening Package Builder

A checklist-driven package builder for USMC special duty assignments and board packages. Track required documents, generate cover sheets, and ensure package completeness.

## Features

- **Package Type Selection**: Support for Warrant Officer and Recruiting Duty packages (more coming soon)
- **Dynamic Checklists**: Automatically populated document checklists based on program requirements
- **Document Tracking**: Track status (complete, incomplete, N/A, waiver required) for each document
- **Progress Indicator**: Visual progress bar showing package completion percentage
- **Cover Sheet Generator**: Generate and print cover sheets with enclosure lists
- **Routing Tracker**: Track endorsement signatures through the chain of command
- **PDF Export**: Export checklists and cover sheets to PDF
- **Offline Support**: Works offline as a Progressive Web App (PWA)
- **Local Storage**: Save and resume package progress

## Supported Package Types

### Currently Available
- **Warrant Officer (Regular/Reserve)** - Based on MCO 1040.42B and annual MARADMIN
- **Recruiting Duty** - Based on MCO 1326.6 and MARADMIN

### Coming Soon
- Drill Instructor
- Marine Security Guard (MSG)
- MECEP
- And more...

## Usage

1. **Select Package Type**: Choose the type of package you need to build
2. **Enter Applicant Info**: Provide name, rank, and deadline
3. **Work Through Checklist**: Mark documents as complete, N/A, or needing waiver
4. **Update Cover Sheet**: Fill in applicant details for cover sheet generation
5. **Track Routing**: Monitor endorsement progress through the chain
6. **Export/Print**: Generate PDFs for your package

## Installation

This is a static web application. To use locally:

1. Clone the repository
2. Open `index.html` in a web browser
3. Or serve with any static file server

For PWA functionality, serve over HTTPS or localhost.

## Technology

- HTML5, CSS3, Vanilla JavaScript
- Progressive Web App (PWA) with Service Worker
- LocalStorage for data persistence
- jsPDF for PDF generation
- No backend required - runs entirely in the browser

## Privacy

All data is stored locally in your browser using LocalStorage. No information is transmitted to any server. Your screening package data never leaves your device.

## References

| Reference | Description |
|-----------|-------------|
| MCO 1040.42B | Warrant Officer Program |
| MCO 1326.6 | SDA/B-Billet Assignments |
| Annual MARADMIN | FY Selection Board Guidance |
| MCRC Sample Application | Document order and requirements |

## Community Attribution

This tool was inspired by feedback from the r/USMC community:

| Contributor | Platform | Contribution |
|-------------|----------|--------------|
| **CheckFlop** | r/USMC | Requested package builders for WO board and recruiting duty |
| **k1dblast** | Discord | Requested AA&E screening package (Phase 2) |

*This tool exists because Marines took the time to share their pain points. Thank you.*

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Part of USMC Tools Suite

This tool is part of the [USMC Tools](https://jeranaias.github.io/usmc-tools/) suite of free, open-source administrative tools for Marines.
