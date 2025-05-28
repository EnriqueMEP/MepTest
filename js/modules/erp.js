// ===== ERP MODULE =====

class ERPModule {
    constructor() {
        this.currentView = 'dashboard';
        this.data = {
            revenue: [],
            expenses: [],
            invoices: [],
            orders: [],
            inventory: [],
            financials: {}
        };
    }

    async render(container) {
        // Since ERP has HTML content, we'll load it
        try {
            const response = await fetch('modules/erp.html');
            const html = await response.text();
            
            container.innerHTML = html;
            
            // Initialize ERP functionality
            this.initializeERP();
            
        } catch (error) {
            console.error('Error loading ERP module:', error);
            container.innerHTML = this.renderFallbackERP();
        }
    }

    renderFallbackERP() {
        return `
            <div class="module-content" id="erp-module">
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-xs);">
                                ERP - Planificación de Recursos
                            </h2>
                            <p style="color: var(--text-secondary); font-size: var(--font-size-lg); font-weight: 500;">
                                Sistema integral de gestión empresarial con analytics avanzados
                            </p>
                        </div>
                    </div>
                    
                    <div class="card" style="padding: var(--space-2xl); text-align: center;">
                        <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: var(--mep-warning); margin: 0 auto var(--space-lg);"></i>
                        <h3 style="font-size: var(--font-size-xl); font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-md);">
                            Error al cargar el módulo ERP
                        </h3>
                        <p style="color: var(--text-secondary);">
                            No se pudo cargar el contenido del ERP. Por favor, intenta recargar la página.
                        </p>
                        <button class="btn btn-primary" onclick="location.reload()" style="margin-top: var(--space-xl);">
                            Recargar Página
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    initializeERP() {
        // Setup event handlers
        this.setupEventHandlers();
        
        // Load initial data
        this.loadERPData();
        
        // Initialize components
        this.initializeCharts();
        this.startRealtimeUpdates();
        
        window.erpModule = this;
    }

    setupEventHandlers() {
        // Global ERP functions
        window.drillDown = (metric) => this.drillDown(metric);
        window.refreshChart = (chartType) => this.refreshChart(chartType);
        window.switchAnalyticsView = (view) => this.switchAnalyticsView(view);
        window.showInvoiceModal = () => this.showInvoiceModal();
        window.showOrderModal = () => this.showOrderModal();
        window.generateReport = () => this.generateReport();
        window.exportData = () => this.exportData();
        window.showFilters = () => this.showFilters();
        window.showCreateRecordModal = () => this.showCreateRecordModal();
        window.updateRealTimeKPIs = () => this.updateRealTimeKPIs();
    }

    loadERPData() {
        // Load mock data
        this.data = {
            revenue: this.generateRevenueData(),
            expenses: this.generateExpenseData(),
            invoices: this.generateInvoices(),
            orders: this.generateOrders(),
            inventory: this.loadInventoryData(),
            financials: this.calculateFinancials()
        };
        
        // Update UI with data
        this.updateDashboard();
    }

    generateRevenueData() {
        return [
            { month: 'Enero', amount: 485000, growth: 0.12 },
            { month: 'Febrero', amount: 592000, growth: 0.22 },
            { month: 'Marzo', amount: 445000, growth: -0.25 },
            { month: 'Abril', amount: 523000, growth: 0.17 },
            { month: 'Mayo', amount: 612000, growth: 0.17 },
            { month: 'Junio', amount: 590000, growth: -0.04 }
        ];
    }

    generateExpenseData() {
        return [
            { month: 'Enero', amount: 298000, category: 'operational' },
            { month: 'Febrero', amount: 356000, category: 'operational' },
            { month: 'Marzo', amount: 289000, category: 'operational' },
            { month: 'Abril', amount: 312000, category: 'operational' },
            { month: 'Mayo', amount: 378000, category: 'operational' },
            { month: 'Junio', amount: 345000, category: 'operational' }
        ];
    }

    generateInvoices() {
        return [
            {
                id: 'INV-2025-001',
                client: 'TechSolutions Inc.',
                amount: 156780,
                status: 'paid',
                dueDate: new Date('2025-05-15'),
                paidDate: new Date('2025-05-12')
            },
            {
                id: 'INV-2025-002',
                client: 'Digital Innovations S.L.',
                amount: 45000,
                status: 'pending',
                dueDate: new Date('2025-06-15'),
                paidDate: null
            },
            {
                id: 'INV-2025-003',
                client: 'Global Ventures',
                amount: 89500,
                status: 'overdue',
                dueDate: new Date('2025-05-01'),
                paidDate: null
            }
        ];
    }

    generateOrders() {
        return [
            {
                id: 'ORD-2025-001',
                client: 'Logistics Pro',
                items: 15,
                total: 23450,
                status: 'processing',
                createdAt: new Date('2025-05-27'),
                estimatedDelivery: new Date('2025-06-05')
            },
            {
                id: 'ORD-2025-002',
                client: 'Manufacturas del Sur',
                items: 8,
                total: 12890,
                status: 'shipped',
                createdAt: new Date('2025-05-25'),
                estimatedDelivery: new Date('2025-05-30')
            }
        ];
    }

    loadInventoryData() {
        return {
            totalItems: 2847,
            totalValue: 542890,
            lowStock: 23,
            movements: 127
        };
    }

    calculateFinancials() {
        const totalRevenue = this.data.revenue.reduce((sum, r) => sum + r.amount, 0);
        const totalExpenses = this.data.expenses.reduce((sum, e) => sum + e.amount, 0);
        const profitMargin = ((totalRevenue - totalExpenses) / totalRevenue * 100).toFixed(1);
        
        return {
            totalRevenue,
            totalExpenses,
            netProfit: totalRevenue - totalExpenses,
            profitMargin,
            cashFlow: 186780,
            accountsReceivable: 124500,
            accountsPayable: 89200
        };
    }

    updateDashboard() {
        // Update revenue display
        this.updateRevenueMetrics();
        
        // Update order metrics
        this.updateOrderMetrics();
        
        // Update financial metrics
        this.updateFinancialMetrics();
        
        // Update charts
        this.updateCharts();
    }

    updateRevenueMetrics() {
        const revenueEl = document.querySelector('[data-metric="revenue-total"]');
        if (revenueEl) {
            revenueEl.textContent = MEP_Utils.formatCurrency(this.data.financials.totalRevenue);
        }
        
        // Update growth percentage
        const currentMonth = this.data.revenue[this.data.revenue.length - 1];
        const previousMonth = this.data.revenue[this.data.revenue.length - 2];
        const growth = ((currentMonth.amount - previousMonth.amount) / previousMonth.amount * 100).toFixed(1);
        
        const growthEl = document.querySelector('[data-metric="revenue-growth"]');
        if (growthEl) {
            growthEl.textContent = `${growth > 0 ? '+' : ''}${growth}%`;
            growthEl.className = growth > 0 ? 'stat-trend stat-trend-positive' : 'stat-trend stat-trend-negative';
        }
    }

    updateOrderMetrics() {
        // Update active orders count
        const activeOrders = this.data.orders.filter(o => 
            o.status === 'processing' || o.status === 'pending'
        ).length;
        
        const ordersEl = document.querySelector('[data-metric="active-orders"]');
        if (ordersEl) {
            ordersEl.textContent = activeOrders;
        }
        
        // Update pending approvals
        const pendingOrders = this.data.orders.filter(o => o.status === 'pending').length;
        const pendingEl = document.querySelector('[data-metric="pending-orders"]');
        if (pendingEl) {
            pendingEl.textContent = pendingOrders;
        }
    }

    updateFinancialMetrics() {
        // Update profit margin
        const marginEl = document.querySelector('[data-metric="profit-margin"]');
        if (marginEl) {
            marginEl.textContent = `${this.data.financials.profitMargin}%`;
        }
        
        // Update cash flow
        const cashFlowEl = document.querySelector('[data-metric="cash-flow"]');
        if (cashFlowEl) {
            cashFlowEl.textContent = MEP_Utils.formatCurrency(this.data.financials.cashFlow);
        }
    }

    updateCharts() {
        // Update revenue vs expenses chart
        this.updateRevenueChart();
        
        // Update other analytics
        this.updateAnalytics();
    }

    updateRevenueChart() {
        // This would update the actual chart
        console.log('Updating revenue chart...');
    }

    updateAnalytics() {
        // Update operational analytics
        console.log('Updating ERP analytics...');
    }

    // Event handlers
    drillDown(metric) {
        console.log('Drilling down into:', metric);
        
        switch(metric) {
            case 'revenue':
                this.showRevenueDetails();
                break;
            case 'orders':
                this.showOrdersDetails();
                break;
            case 'inventory':
                this.showInventoryDetails();
                break;
            case 'efficiency':
                this.showEfficiencyDetails();
                break;
            default:
                showNotification('Analytics', `Analizando ${metric}...`, 'info');
        }
    }

    showRevenueDetails() {
        // Show detailed revenue breakdown
        showNotification('Revenue Analytics', 'Mostrando análisis detallado de ingresos', 'info');
    }

    showOrdersDetails() {
        // Navigate to orders view
        showNotification('Órdenes', 'Mostrando todas las órdenes activas', 'info');
    }

    showInventoryDetails() {
        // Navigate to inventory module
        showModule('inventory');
    }

    showEfficiencyDetails() {
        // Show efficiency metrics
        showNotification('Eficiencia', 'Mostrando métricas de eficiencia operativa', 'info');
    }

    refreshChart(chartType) {
        console.log('Refreshing chart:', chartType);
        showNotification('Actualización', `Actualizando gráfico de ${chartType}...`, 'info');
        
        // Simulate chart refresh
        setTimeout(() => {
            this.updateCharts();
            showNotification('Actualizado', 'Datos actualizados correctamente', 'success');
        }, 1000);
    }

    switchAnalyticsView(view) {
        console.log('Switching analytics view to:', view);
        
        // Update view based on selection
        switch(view) {
            case 'sales':
                this.showSalesAnalytics();
                break;
            case 'inventory':
                this.showInventoryAnalytics();
                break;
            case 'operations':
                this.showOperationsAnalytics();
                break;
        }
    }

    showSalesAnalytics() {
        showNotification('Analytics', 'Mostrando análisis de ventas', 'info');
    }

    showInventoryAnalytics() {
        showNotification('Analytics', 'Mostrando análisis de inventario', 'info');
    }

    showOperationsAnalytics() {
        showNotification('Analytics', 'Mostrando análisis operacional', 'info');
    }

    showInvoiceModal() {
        console.log('Opening invoice modal...');
        // Create and show invoice modal
        const modal = this.createInvoiceModal();
        document.body.appendChild(modal);
        modal.classList.add('show');
    }

    createInvoiceModal() {
        const modal = MEP_Utils.createElement('div', {
            className: 'modal',
            id: 'invoice-modal',
            innerHTML: `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">Nueva Factura</h2>
                        <button class="modal-close" onclick="erpModule.closeModal('invoice-modal')">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    
                    <form onsubmit="erpModule.createInvoice(event)">
                        <div class="form-group">
                            <label class="form-label">Cliente</label>
                            <select class="form-select" required>
                                <option value="">Seleccionar cliente...</option>
                                <option value="techsolutions">TechSolutions Inc.</option>
                                <option value="digital">Digital Innovations S.L.</option>
                                <option value="global">Global Ventures</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Número de Factura</label>
                            <input type="text" class="form-input" value="INV-2025-004" readonly>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg);">
                            <div class="form-group">
                                <label class="form-label">Fecha de Emisión</label>
                                <input type="date" class="form-input" value="${new Date().toISOString().split('T')[0]}" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Fecha de Vencimiento</label>
                                <input type="date" class="form-input" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Conceptos</label>
                            <div id="invoice-items">
                                <div class="invoice-item" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: var(--space-sm); margin-bottom: var(--space-sm);">
                                    <input type="text" class="form-input" placeholder="Descripción" required>
                                    <input type="number" class="form-input" placeholder="Cantidad" min="1" required>
                                    <input type="number" class="form-input" placeholder="Precio" step="0.01" required>
                                    <input type="number" class="form-input" placeholder="Total" readonly>
                                    <button type="button" class="btn btn-ghost" onclick="erpModule.removeInvoiceItem(this)">
                                        <i data-lucide="x"></i>
                                    </button>
                                </div>
                            </div>
                            <button type="button" class="btn btn-secondary" onclick="erpModule.addInvoiceItem()">
                                <i data-lucide="plus"></i>
                                Añadir línea
                            </button>
                        </div>
                        
                        <div style="display: flex; gap: var(--space-md); justify-content: flex-end; margin-top: var(--space-xl);">
                            <button type="button" class="btn btn-secondary" onclick="erpModule.closeModal('invoice-modal')">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Crear Factura
                            </button>
                        </div>
                    </form>
                </div>
            `
        });
        
        return modal;
    }

    showOrderModal() {
        console.log('Opening order modal...');
        showNotification('Pedidos', 'Abriendo formulario de nuevo pedido...', 'info');
    }

    generateReport() {
        console.log('Generating ERP report...');
        showNotification('Reporte', 'Generando reporte personalizado...', 'info');
        
        // Simulate report generation
        setTimeout(() => {
            showNotification('Reporte Listo', 'El reporte ha sido generado exitosamente', 'success');
        }, 2000);
    }

    exportData() {
        console.log('Exporting ERP data...');
        
        // Create export options
        const exportTypes = ['Excel', 'CSV', 'PDF'];
        const selected = prompt(`Selecciona formato de exportación:\n${exportTypes.join('\n')}`);
        
        if (selected) {
            showNotification('Exportación', `Exportando datos en formato ${selected}...`, 'info');
            
            setTimeout(() => {
                showNotification('Exportación Completa', `Archivo ${selected} descargado`, 'success');
            }, 1500);
        }
    }

    showFilters() {
        console.log('Showing advanced filters...');
        showNotification('Filtros', 'Mostrando filtros avanzados...', 'info');
    }

    showCreateRecordModal() {
        console.log('Opening create record modal...');
        showNotification('Nuevo Registro', 'Abriendo formulario...', 'info');
    }

    updateRealTimeKPIs() {
        // Update real-time KPIs
        console.log('Updating real-time KPIs...');
        
        // Simulate real-time data update
        const salestoday = 12847 + Math.floor(Math.random() * 1000);
        const kpiEl = document.querySelector('[data-kpi="sales-today"]');
        if (kpiEl) {
            kpiEl.textContent = MEP_Utils.formatCurrency(salestoday);
        }
        
        // Update other KPIs
        this.updateOrderMetrics();
    }

    startRealtimeUpdates() {
        // Update real-time KPIs every 30 seconds
        setInterval(() => {
            this.updateRealTimeKPIs();
        }, 30000);
        
        console.log('Started real-time ERP updates');
    }

    initializeCharts() {
        // Initialize ERP charts
        console.log('Initializing ERP charts...');
        
        // Here you would initialize actual charting libraries
        setTimeout(() => {
            console.log('ERP charts initialized');
        }, 1000);
    }

    // Helper methods
    closeModal(modalId) {
        const modal = MEP_Utils.$(`#${modalId}`);
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    }

    createInvoice(event) {
        event.preventDefault();
        console.log('Creating invoice...');
        
        showNotification('Factura Creada', 'La factura ha sido creada exitosamente', 'success');
        this.closeModal('invoice-modal');
        
        // Refresh invoices list
        this.loadERPData();
    }

    addInvoiceItem() {
        const container = MEP_Utils.$('#invoice-items');
        const newItem = MEP_Utils.createElement('div', {
            className: 'invoice-item',
            style: 'display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: var(--space-sm); margin-bottom: var(--space-sm);',
            innerHTML: `
                <input type="text" class="form-input" placeholder="Descripción" required>
                <input type="number" class="form-input" placeholder="Cantidad" min="1" required>
                <input type="number" class="form-input" placeholder="Precio" step="0.01" required>
                <input type="number" class="form-input" placeholder="Total" readonly>
                <button type="button" class="btn btn-ghost" onclick="erpModule.removeInvoiceItem(this)">
                    <i data-lucide="x"></i>
                </button>
            `
        });
        
        container.appendChild(newItem);
        window.app.initIcons();
    }

    removeInvoiceItem(button) {
        button.closest('.invoice-item').remove();
    }

    async afterRender() {
        // Post-render initialization
        console.log('ERP module initialized');
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ERPModule;
}