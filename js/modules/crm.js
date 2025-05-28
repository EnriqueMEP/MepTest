// ===== CRM MODULE =====
class CRMModule {
    constructor() {
        this.tabs = MEP_CONFIG.MODULES.CRM.tabs || [];
        this.currentTab = this.tabs[0] || null;
        this.container = null;
    }

    // Después de cargar crm.html
    async afterRender() {
        this.container = MEP_Utils.$('#crm-module');
        window.crmModule = this;
        this.initTabs();
    }

    initTabs() {
        if (!this.container || !this.tabs.length) return;
        // Se asume que cada botón de pestaña tiene atributo data-crm-tab
        this.tabs.forEach(tab => {
            const btn = this.container.querySelector(`[data-crm-tab="${tab}"]`);
            if (btn) {
                btn.addEventListener('click', () => this.switchTab(tab));
            }
        });
        // Mostrar primera pestaña
        if (this.currentTab) this.switchTab(this.currentTab);
    }

    switchTab(tab) {
        this.currentTab = tab;
        // Actualizar estado activo de botones
        this.container.querySelectorAll('[data-crm-tab]').forEach(btn =>
            btn.classList.toggle('active', btn.getAttribute('data-crm-tab') === tab)
        );
        // Mostrar/ocultar contenido
        this.container.querySelectorAll('.crm-tab-content').forEach(panel =>
            panel.classList.add('hidden')
        );
        const activePanel = this.container.querySelector(`#crm-${tab}-content`);
        if (activePanel) activePanel.classList.remove('hidden');
    }
}

// Instancia principal
window.crmModule = new CRMModule();


// —— Handlers globales de CRM (stubs) ——

function upsellAnalysis() {
    showNotification('Análisis de Upsell iniciado', '', 'info');
}

function renewalForecast() {
    showNotification('Pronóstico de renovaciones iniciado', '', 'info');
}

function pipelineSettings() {
    showNotification('Configuración de pipeline abierta', '', 'info');
}

function showNewDealModal() {
    const modal = MEP_Utils.$('#new-deal-modal');
    if (modal) modal.classList.add('show');
}

function syncCRMData() {
    showNotification('Sincronización de datos CRM iniciada', '', 'info');
}

function accountReview() {
    showNotification('Revisión de cuenta iniciada', '', 'info');
}

function advancedFilters() {
    showNotification('Filtros avanzados abiertos', '', 'info');
}

function bulkActions() {
    showNotification('Acciones en lote activadas', '', 'info');
}

function competitorAnalysis() {
    showNotification('Análisis de competencia iniciado', '', 'info');
}

function companyAnalytics() {
    showNotification('Analítica de compañía mostrada', '', 'info');
}

function territoryManagement() {
    showNotification('Administración de territorios abierta', '', 'info');
}

function drillDownCRM(section) {
    showNotification(`Drilldown CRM: ${section}`, '', 'info');
}

function drillDownStage(stage) {
    showNotification(`Drilldown etapa: ${stage}`, '', 'info');
}

function convertLead(leadId) {
    showNotification(`Lead ${leadId} convertido`, '', 'success');
}

function convertProspect(prospectId) {
    showNotification(`Prospecto ${prospectId} convertido`, '', 'success');
}

function callContact(contactId) {
    showNotification(`Llamando a ${contactId}`, '', 'info');
}

function viewLead(leadId) {
    showNotification(`Mostrando lead: ${leadId}`, '', 'info');
}

function viewContact(contactId) {
    showNotification(`Mostrando contacto: ${contactId}`, '', 'info');
}

function viewCompany(companyId) {
    showNotification(`Mostrando compañía: ${companyId}`, '', 'info');
}

function companyDashboard(companyId) {
    showNotification(`Dashboard de compañía: ${companyId}`, '', 'info');
}

function switchCRMTab(tab) {
    crmModule.switchTab(tab);
}

function switchLeadView(view) {
    showNotification(`Vista leads: ${view}`, '', 'info');
}

function switchCompanyView(view) {
    showNotification(`Vista compañías: ${view}`, '', 'info');
}
