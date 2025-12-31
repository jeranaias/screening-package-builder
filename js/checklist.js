/**
 * Checklist Manager
 * Handles document checklist display and status updates
 */
const ChecklistManager = {
  currentPackage: null,
  filterStatus: 'all',
  sortBy: 'order',

  // Initialize checklist view
  init(pkg) {
    this.currentPackage = pkg;
    this.render();
    this.bindEvents();
  },

  // Render the checklist
  render() {
    const container = document.getElementById('checklist-container');
    if (!container || !this.currentPackage) return;

    const documents = this.getFilteredDocuments();
    const groupedDocs = this.groupByCategory(documents);

    let html = '';

    // Filter and sort controls
    html += `
      <div class="flex justify-between items-center mb-4 gap-4 flex-wrap">
        <div class="flex gap-2 items-center">
          <label class="text-sm text-secondary">Filter:</label>
          <select id="checklist-filter" class="input select" style="width: auto;">
            <option value="all" ${this.filterStatus === 'all' ? 'selected' : ''}>All</option>
            <option value="incomplete" ${this.filterStatus === 'incomplete' ? 'selected' : ''}>Incomplete</option>
            <option value="complete" ${this.filterStatus === 'complete' ? 'selected' : ''}>Complete</option>
            <option value="waiver_needed" ${this.filterStatus === 'waiver_needed' ? 'selected' : ''}>Waiver Needed</option>
          </select>
        </div>
        <div class="text-sm text-secondary">
          ${documents.length} document${documents.length !== 1 ? 's' : ''}
        </div>
      </div>
    `;

    // Render grouped documents
    for (const [category, docs] of Object.entries(groupedDocs)) {
      html += `
        <div class="checklist-category">
          <h3 class="checklist-category__title">${category}</h3>
        </div>
        <div class="checklist">
      `;

      docs.forEach(doc => {
        html += this.renderDocumentItem(doc);
      });

      html += '</div>';
    }

    if (documents.length === 0) {
      html = `
        <div class="empty-state">
          <div class="empty-state__icon">&#128196;</div>
          <h3 class="empty-state__title">No documents match filter</h3>
          <p class="empty-state__description">Try changing the filter to see more documents.</p>
        </div>
      `;
    }

    container.innerHTML = html;
    this.bindItemEvents();
  },

  // Render a single document item
  renderDocumentItem(doc) {
    const statusClass = `checklist-item--${doc.status === 'waiver_needed' ? 'waiver' : doc.status}`;
    const statusIcon = this.getStatusIcon(doc.status);
    const statusLabel = this.getStatusLabel(doc.status);

    return `
      <div class="checklist-item ${statusClass}" data-doc-id="${doc.id}">
        <div class="checklist-item__header">
          <div class="checklist-item__info">
            <span class="checklist-item__number">${doc.id}.</span>
            <div class="checklist-item__name">${doc.name}</div>
            <div class="checklist-item__description">
              ${doc.description}
              ${doc.required ? '' : '<span class="badge badge--secondary">Optional</span>'}
            </div>
          </div>
          <div class="checklist-item__status">
            <span class="checklist-item__icon">${statusIcon}</span>
            <button class="btn btn--sm btn--outline" data-action="edit" data-doc-id="${doc.id}">
              Edit
            </button>
          </div>
        </div>
        ${doc.notes ? `
          <div class="checklist-item__notes">
            <strong>Notes:</strong> ${doc.notes}
          </div>
        ` : ''}
        ${doc.dateCompleted ? `
          <div class="checklist-item__notes">
            Completed: ${DateUtils.formatMilitary(doc.dateCompleted)}
          </div>
        ` : ''}
      </div>
    `;
  },

  // Get filtered documents based on current filter
  getFilteredDocuments() {
    if (!this.currentPackage) return [];

    let docs = [...this.currentPackage.documents];

    if (this.filterStatus !== 'all') {
      docs = docs.filter(d => d.status === this.filterStatus);
    }

    return docs;
  },

  // Group documents by category
  groupByCategory(documents) {
    return documents.reduce((groups, doc) => {
      const category = doc.category || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(doc);
      return groups;
    }, {});
  },

  // Get status icon
  getStatusIcon(status) {
    const icons = {
      complete: '&#9989;',      // check mark
      incomplete: '&#11036;',   // empty square
      na: '&#10134;',           // dash
      waiver_needed: '&#9888;'  // warning
    };
    return icons[status] || icons.incomplete;
  },

  // Get status label
  getStatusLabel(status) {
    const labels = {
      complete: 'Complete',
      incomplete: 'Incomplete',
      na: 'N/A',
      waiver_needed: 'Waiver Needed'
    };
    return labels[status] || 'Unknown';
  },

  // Bind global events
  bindEvents() {
    const filterSelect = document.getElementById('checklist-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        this.filterStatus = e.target.value;
        this.render();
      });
    }
  },

  // Bind item-level events
  bindItemEvents() {
    document.querySelectorAll('[data-action="edit"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const docId = parseInt(e.target.dataset.docId);
        this.openEditModal(docId);
      });
    });
  },

  // Open edit modal for a document
  openEditModal(docId) {
    const doc = this.currentPackage.documents.find(d => d.id === docId);
    if (!doc) return;

    const modal = document.getElementById('document-modal');
    const overlay = document.getElementById('modal-overlay');

    // Populate modal
    document.getElementById('modal-doc-title').textContent = doc.name;
    document.getElementById('modal-doc-description').textContent = doc.description;
    document.getElementById('modal-doc-reference').textContent = doc.reference || 'N/A';
    document.getElementById('modal-doc-id').value = doc.id;

    // Set current status
    document.querySelectorAll('input[name="doc-status"]').forEach(radio => {
      radio.checked = radio.value === doc.status;
    });

    // Set notes and date
    document.getElementById('modal-doc-notes').value = doc.notes || '';
    document.getElementById('modal-doc-date').value = doc.dateCompleted
      ? DateUtils.formatISO(doc.dateCompleted)
      : '';

    // Show modal
    overlay.classList.add('modal-overlay--active');
  },

  // Save document changes
  saveDocument() {
    const docId = parseInt(document.getElementById('modal-doc-id').value);
    const status = document.querySelector('input[name="doc-status"]:checked')?.value;
    const notes = document.getElementById('modal-doc-notes').value;
    const date = document.getElementById('modal-doc-date').value;

    const docIndex = this.currentPackage.documents.findIndex(d => d.id === docId);
    if (docIndex === -1) return;

    this.currentPackage.documents[docIndex].status = status;
    this.currentPackage.documents[docIndex].notes = notes;
    this.currentPackage.documents[docIndex].dateCompleted = date || null;
    this.currentPackage.lastUpdated = new Date().toISOString();

    // Save to storage
    Storage.save(this.currentPackage.id, this.currentPackage);

    // Close modal and re-render
    this.closeModal();
    this.render();

    // Update dashboard stats if visible
    if (typeof App !== 'undefined' && App.updateDashboardStats) {
      App.updateDashboardStats();
    }
  },

  // Close modal
  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('modal-overlay--active');
  },

  // Quick toggle status (for simple complete/incomplete toggle)
  toggleStatus(docId) {
    const doc = this.currentPackage.documents.find(d => d.id === docId);
    if (!doc) return;

    if (doc.status === 'complete') {
      doc.status = 'incomplete';
      doc.dateCompleted = null;
    } else {
      doc.status = 'complete';
      doc.dateCompleted = new Date().toISOString();
    }

    this.currentPackage.lastUpdated = new Date().toISOString();
    Storage.save(this.currentPackage.id, this.currentPackage);
    this.render();
  }
};
