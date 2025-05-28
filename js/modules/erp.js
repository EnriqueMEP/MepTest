// ===== ERP MODULE =====
class ERPModule {
    constructor() {
        this.container = null;
        this.currentAnalyticsView = 'sales';
        this.storageKey = 'mep-erp-settings';
    }

    async afterRender() {
        this.container = MEP_Utils.$('#erp-module');
        window.erpModule = this;
        this.bindControls();
    }

    bindControls() {
        if (!this.container) return;
        // Filtro de periodo
        const periodSelect = this.container.querySelector('select');
        if (periodSelect) {
            periodSelect.addEventListener('change', e => this.onPeriodChange(e.target.value));
        }
        // Asignar handlers globales
        window.exportData        = this.exportData.bind(this);
        window.generateReport    = this.generateReport.bind(this);
        window.refreshChart      = this.refreshChart.bind(this);
        window.drillDown         = this.drillDown.bind(this);
        window.switchAnalyticsView = this.switchAnalyticsView.bind(this);
        window.showCreateRecordModal = this.showCreateRecordModal.bind(this);
        window.showFilters          = this.showFilters.bind(this);
        window.showInvoiceModal     = this.showInvoiceModal.bind(this);
        window.showOrderModal       = this.showOrderModal.bind(this);
    }

    onPeriodChange(period) {
        showNotification(`Filtrando periodo: ${period}`, '', 'info');
    }

    exportData() {
        showNotification('Exportando datos ERP', '', 'success');
    }

    generateReport() {
        showNotification('Generando reporte ERP', '', 'info');
    }

    refreshChart(type) {
        showNotification(`Actualizando gráfico: ${type}`, '', 'info');
    }

    drillDown(section) {
        showNotification(`Drilldown ERP: ${section}`, '', 'info');
    }

    switchAnalyticsView(view) {
        this.currentAnalyticsView = view;
        showNotification(`Vista analítica: ${view}`, '', 'info');
    }

    showCreateRecordModal() {
        const m = MEP_Utils.$('#create-record-modal');
        if (m) m.classList.add('show');
    }

    showFilters() {
        const f = MEP_Utils.$('#filters-panel');
        if (f) f.classList.toggle('show');
    }

    showInvoiceModal() {
        const m = MEP_Utils.$('#invoice-modal');
        if (m) m.classList.add('show');
    }

    showOrderModal() {
        const m = MEP_Utils.$('#order-modal');
        if (m) m.classList.add('show');
    }
}

// Instancia única
window.erpModule = new ERPModule();
