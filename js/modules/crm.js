// ===== CRM MODULE =====

class CRMModule {
    constructor() {
        this.currentTab = 'dashboard';
        this.data = {
            leads: [],
            contacts: [],
            companies: [],
            deals: []
        };
    }

    async render(container) {
        // Since CRM has HTML content, we'll load it
        try {
            const response = await fetch('modules/crm.html');
            const html = await response.text();
            
            container.innerHTML = html;
            
            // Initialize CRM functionality
            this.initializeCRM();
            
        } catch (error) {
            console.error('Error loading CRM module:', error);
            container.innerHTML = this.renderFallbackCRM();
        }
    }

    renderFallbackCRM() {
        return `
            <div class="module-content" id="crm-module">
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-xs);">
                                CRM Enterprise Suite
                            </h2>
                            <p style="color: var(--text-secondary); font-size: var(--font-size-lg); font-weight: 500;">
                                Sistema completo de gestión de relaciones con clientes
                            </p>
                        </div>
                    </div>
                    
                    <div class="card" style="padding: var(--space-2xl); text-align: center;">
                        <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: var(--mep-warning); margin: 0 auto var(--space-lg);"></i>
                        <h3 style="font-size: var(--font-size-xl); font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-md);">
                            Error al cargar el módulo CRM
                        </h3>
                        <p style="color: var(--text-secondary);">
                            No se pudo cargar el contenido del CRM. Por favor, intenta recargar la página.
                        </p>
                        <button class="btn btn-primary" onclick="location.reload()" style="margin-top: var(--space-xl);">
                            Recargar Página
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    initializeCRM() {
        // Initialize CRM tabs
        this.setupTabNavigation();
        
        // Load initial data
        this.loadCRMData();
        
        // Setup event handlers
        this.setupEventHandlers();
        
        // Initialize charts
        this.initializeCharts();
        
        window.crmModule = this;
    }

    setupTabNavigation() {
        // Tab switching logic
        window.switchCRMTab = (tabName) => {
            this.currentTab = tabName;
            
            // Update tab buttons
            MEP_Utils.$$('.crm-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.tab === tabName);
            });
            
            // Update tab content
            MEP_Utils.$$('.crm-tab-content').forEach(content => {
                content.classList.toggle('hidden', content.id !== `crm-${tabName}`);
            });
            
            // Tab-specific initialization
            switch(tabName) {
                case 'dashboard':
                    this.refreshDashboard();
                    break;
                case 'leads':
                    this.refreshLeads();
                    break;
                case 'contacts':
                    this.refreshContacts();
                    break;
                case 'companies':
                    this.refreshCompanies();
                    break;
                case 'deals':
                    this.refreshDeals();
                    break;
            }
            
            window.app.initIcons();
        };
    }

    setupEventHandlers() {
        // Global CRM functions
        window.drillDownCRM = (metric) => this.drillDownCRM(metric);
        window.drillDownStage = (stage) => this.drillDownStage(stage);
        window.highlightStage = (element) => this.highlightStage(element);
        window.unhighlightStage = (element) => this.unhighlightStage(element);
        window.refreshDashboard = () => this.refreshDashboard();
        
        // Lead management
        window.importLeads = () => this.importLeads();
        window.showLeadFilters = () => this.showLeadFilters();
        window.showNewLeadModal = () => this.showNewLeadModal();
        window.switchLeadView = (view) => this.switchLeadView(view);
        window.viewLead = (leadId) => this.viewLead(leadId);
        window.editLead = (leadId) => this.editLead(leadId);
        window.convertLead = (leadId) => this.convertLead(leadId);
        
        // Contact management
        window.importContacts = () => this.importContacts();
        window.exportContacts = () => this.exportContacts();
        window.showNewContactModal = () => this.showNewContactModal();
        window.bulkActions = () => this.bulkActions();
        window.advancedFilters = () => this.advancedFilters();
        window.viewContact = (contactId) => this.viewContact(contactId);
        window.editContact = (contactId) => this.editContact(contactId);
        window.emailContact = (contactId) => this.emailContact(contactId);
        window.callContact = (contactId) => this.callContact(contactId);
        
        // Company management
        window.companyAnalytics = () => this.companyAnalytics();
        window.territoryManagement = () => this.territoryManagement();
        window.showNewCompanyModal = () => this.showNewCompanyModal();
        window.switchCompanyView = (view) => this.switchCompanyView(view);
        window.viewCompany = (companyId) => this.viewCompany(companyId);
        window.companyDashboard = (companyId) => this.companyDashboard(companyId);
        window.convertProspect = (companyId) => this.convertProspect(companyId);
        window.accountReview = () => this.accountReview();
        window.upsellAnalysis = () => this.upsellAnalysis();
        window.renewalForecast = () => this.renewalForecast();
        window.competitorAnalysis = () => this.competitorAnalysis();
        
        // Deal management
        window.forecastAnalysis = () => this.forecastAnalysis();
        window.pipelineSettings = () => this.pipelineSettings();
        window.showNewDealModal = () => this.showNewDealModal();
        window.drillDown = (metric) => this.drillDown(metric);
        window.refreshChart = (chartType) => this.refreshChart(chartType);
        window.refreshPipeline = () => this.refreshPipeline();
    }

    loadCRMData() {
        // Simulate loading CRM data
        this.data = {
            leads: this.generateMockLeads(),
            contacts: this.generateMockContacts(),
            companies: this.generateMockCompanies(),
            deals: this.generateMockDeals()
        };
    }

    generateMockLeads() {
        return [
            {
                id: 'LEAD-001',
                name: 'Digital Innovations S.L.',
                contact: 'María García',
                email: 'maria.garcia@digitalinnovations.com',
                phone: '+34 666 123 456',
                score: 89,
                status: 'hot',
                source: 'Website',
                value: 45000,
                assignedTo: 'Ana López',
                createdAt: new Date('2025-05-20')
            },
            {
                id: 'LEAD-002',
                name: 'MegaSoft Solutions',
                contact: 'Carlos Rodríguez',
                email: 'carlos.rodriguez@megasoft.com',
                phone: '+34 666 789 012',
                score: 72,
                status: 'warm',
                source: 'Referral',
                value: 78500,
                assignedTo: 'Carlos Gómez',
                createdAt: new Date('2025-05-22')
            }
        ];
    }

    generateMockContacts() {
        return [
            {
                id: 'CONT-001',
                name: 'María García López',
                email: 'maria.garcia@digitalinnovations.com',
                phone: '+34 666 123 456',
                company: 'Digital Innovations S.L.',
                role: 'Directora IT',
                lastInteraction: new Date('2025-05-27'),
                score: 89,
                status: 'active'
            }
        ];
    }

    generateMockCompanies() {
        return [
            {
                id: 'COMP-001',
                name: 'TechSolutions Inc.',
                industry: 'Tecnología',
                location: 'Madrid',
                employees: '450-500',
                revenue: 456000,
                healthScore: 9.2,
                status: 'active',
                type: 'enterprise'
            }
        ];
    }

    generateMockDeals() {
        return [
            {
                id: 'DEAL-001',
                title: 'Sistema ERP Enterprise',
                company: 'TechSolutions Inc.',
                value: 156000,
                stage: 'negotiation',
                probability: 90,
                closeDate: new Date('2025-06-15'),
                assignedTo: 'Ana López'
            }
        ];
    }

    // Dashboard methods
    refreshDashboard() {
        console.log('Refreshing CRM dashboard...');
        // Update dashboard metrics
        this.updateMetrics();
        this.updateFunnel();
        this.updateActivities();
    }

    updateMetrics() {
        // Update KPI cards with real data
        const metrics = {
            revenue: this.calculateRevenue(),
            leads: this.data.leads.length,
            conversion: this.calculateConversionRate(),
            satisfaction: this.calculateSatisfaction()
        };
        
        console.log('CRM Metrics:', metrics);
    }

    updateFunnel() {
        // Update sales funnel visualization
        const funnelData = {
            prospects: this.data.leads.length,
            qualified: this.data.leads.filter(l => l.score > 70).length,
            opportunities: this.data.deals.filter(d => d.stage !== 'closed').length,
            proposals: this.data.deals.filter(d => d.stage === 'proposal').length,
            closed: this.data.deals.filter(d => d.stage === 'closed_won').length
        };
        
        console.log('Funnel Data:', funnelData);
    }

    updateActivities() {
        // Update recent activities
        console.log('Updating CRM activities...');
    }

    drillDownCRM(metric) {
        console.log('Drilling down into metric:', metric);
        showNotification('CRM Analytics', `Analizando ${metric}...`, 'info');
    }

    drillDownStage(stage) {
        console.log('Drilling down into stage:', stage);
        showNotification('Pipeline', `Mostrando detalles de ${stage}`, 'info');
    }

    highlightStage(element) {
        element.style.transform = 'scale(1.05)';
        element.style.boxShadow = 'var(--shadow-xl)';
    }

    unhighlightStage(element) {
        element.style.transform = 'scale(1)';
        element.style.boxShadow = 'var(--shadow-lg)';
    }

    // Lead methods
    refreshLeads() {
        console.log('Refreshing leads...');
        // Update leads view
    }

    importLeads() {
        showNotification('Importar Leads', 'Abriendo importador de leads...', 'info');
    }

    showLeadFilters() {
        console.log('Showing lead filters...');
    }

    showNewLeadModal() {
        console.log('Showing new lead modal...');
    }

    switchLeadView(view) {
        console.log('Switching lead view to:', view);
        // Update view buttons
        MEP_Utils.$$('#crm-leads .btn-ghost').forEach(btn => {
            btn.classList.toggle('active', btn.id === `lead-${view}-btn`);
        });
        
        // Update view content
        MEP_Utils.$$('.lead-view').forEach(v => {
            v.classList.toggle('hidden', v.id !== `lead-${view}-view`);
        });
    }

    viewLead(leadId) {
        const lead = this.data.leads.find(l => l.id === leadId);
        console.log('Viewing lead:', lead);
    }

    editLead(leadId) {
        console.log('Editing lead:', leadId);
    }

    convertLead(leadId) {
        const lead = this.data.leads.find(l => l.id === leadId);
        if (lead) {
            showNotification('Conversión', `Convirtiendo ${lead.name} a cliente...`, 'success');
        }
    }

    // Other CRM methods
    calculateRevenue() {
        return this.data.deals
            .filter(d => d.stage === 'closed_won')
            .reduce((sum, d) => sum + d.value, 0);
    }

    calculateConversionRate() {
        const totalLeads = this.data.leads.length;
        const convertedLeads = this.data.leads.filter(l => l.status === 'converted').length;
        return totalLeads > 0 ? (convertedLeads / totalLeads * 100).toFixed(1) : 0;
    }

    calculateSatisfaction() {
        // Mock calculation
        return 4.8;
    }

    initializeCharts() {
        // Initialize any charts in the CRM
        console.log('Initializing CRM charts...');
    }

    async afterRender() {
        // Post-render initialization
        console.log('CRM module initialized');
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CRMModule;
}