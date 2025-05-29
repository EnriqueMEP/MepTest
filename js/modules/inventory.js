// ===== INVENTORY MODULE =====

class InventoryModule {
    constructor() {
        this.products = [];
        this.movements = [];
        this.currentView = 'products';
        this.filters = {
            category: 'all',
            status: 'all',
            search: ''
        };
    }

    async render(container) {
        // Since Inventory has HTML content, we'll load it
        try {
            const response = await fetch('modules/inventory.html');
            const html = await response.text();
            
            container.innerHTML = html;
            
            // Initialize Inventory functionality
            this.initializeInventory();
            
        } catch (error) {
            console.error('Error loading Inventory module:', error);
            container.innerHTML = this.renderFallbackInventory();
        }
    }

    renderFallbackInventory() {
        return `
            <div class="module-content" id="inventory-module">
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-xs);">
                                Gestión de Inventario
                            </h2>
                            <p style="color: var(--text-secondary); font-size: var(--font-size-lg); font-weight: 500;">
                                Control y administración de stock y productos
                            </p>
                        </div>
                    </div>
                    
                    <div class="card" style="padding: var(--space-2xl); text-align: center;">
                        <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: var(--mep-warning); margin: 0 auto var(--space-lg);"></i>
                        <h3 style="font-size: var(--font-size-xl); font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-md);">
                            Error al cargar el módulo de Inventario
                        </h3>
                        <p style="color: var(--text-secondary);">
                            No se pudo cargar el contenido del inventario. Por favor, intenta recargar la página.
                        </p>
                        <button class="btn btn-primary" onclick="location.reload()" style="margin-top: var(--space-xl);">
                            Recargar Página
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    initializeInventory() {
        // Setup event handlers
        this.setupEventHandlers();
        
        // Load initial data
        this.loadInventoryData();
        
        // Initialize components
        this.updateDashboard();
        
        // Start monitoring stock levels
        this.startStockMonitoring();
        
        window.inventoryModule = this;
    }

    setupEventHandlers() {
        // Product management
        window.showAddProductModal = () => this.showAddProductModal();
        window.hideAddProductModal = () => this.hideAddProductModal();
        window.showProductDetails = (productId) => this.showProductDetails(productId);
        window.editProduct = (productId) => this.editProduct(productId);
        window.showMovementHistory = (productId) => this.showMovementHistory(productId);
        
        // Stock movements
        window.showStockMovementModal = (type) => this.showStockMovementModal(type);
        window.hideStockMovementModal = () => this.hideStockMovementModal();
        
        // Reports
        window.generateInventoryReport = () => this.generateInventoryReport();
    }

    loadInventoryData() {
        // Load mock inventory data
        this.products = [
            {
                id: 'LAP-DELL-5520',
                name: 'Dell Latitude 5520',
                category: 'Hardware',
                stock: 45,
                minStock: 10,
                price: 1249,
                location: 'Almacén A',
                supplier: 'Dell Technologies',
                status: 'in_stock'
            },
            {
                id: 'MON-SAM-27-4K',
                name: 'Samsung Monitor 27" 4K',
                category: 'Hardware',
                stock: 18,
                minStock: 5,
                price: 449,
                location: 'Almacén A',
                supplier: 'Samsung Electronics',
                status: 'in_stock'
            },
            {
                id: 'MOU-LOG-MX3',
                name: 'Logitech MX Master 3',
                category: 'Hardware',
                stock: 3,
                minStock: 5,
                price: 99,
                location: 'Almacén B',
                supplier: 'Logitech',
                status: 'low_stock'
            },
            {
                id: 'SIL-HM-ERG',
                name: 'Silla Ergonómica Herman Miller',
                category: 'Oficina',
                stock: 0,
                minStock: 2,
                price: 1299,
                location: 'Almacén B',
                supplier: 'Herman Miller',
                status: 'out_of_stock'
            }
        ];
        
        this.movements = [
            {
                id: 'MOV-001',
                type: 'in',
                product: 'Dell Latitude 5520',
                quantity: 25,
                date: new Date('2025-05-27T10:30:00'),
                user: 'Ana López',
                notes: 'Entrada de inventario'
            },
            {
                id: 'MOV-002',
                type: 'out',
                product: 'Samsung Monitor 27" 4K',
                quantity: 2,
                date: new Date('2025-05-27T09:15:00'),
                user: 'Carlos Gómez',
                notes: 'Asignación de equipo'
            },
            {
                id: 'MOV-003',
                type: 'transfer',
                product: 'Logitech MX Master 3',
                quantity: 5,
                date: new Date('2025-05-26'),
                user: 'Sistema',
                notes: 'Transferencia interna',
                fromLocation: 'Almacén A',
                toLocation: 'Almacén B'
            }
        ];
    }

    updateDashboard() {
        // Update inventory statistics
        this.updateInventoryStats();
        
        // Update stock alerts
        this.updateStockAlerts();
        
        // Update recent movements
        this.updateRecentMovements();
        
        // Update category overview
        this.updateCategoryOverview();
    }

    updateInventoryStats() {
        // Total products
        const totalProducts = this.products.length;
        const totalEl = document.querySelector('[data-stat="total-products"]');
        if (totalEl) {
            totalEl.textContent = totalProducts;
        }
        
        // Total value
        const totalValue = this.products.reduce((sum, p) => sum + (p.stock * p.price), 0);
        const valueEl = document.querySelector('[data-stat="total-value"]');
        if (valueEl) {
            valueEl.textContent = MEP_Utils.formatCurrency(totalValue);
        }
        
        // Low stock items
        const lowStock = this.products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
        const lowStockEl = document.querySelector('[data-stat="low-stock"]');
        if (lowStockEl) {
            lowStockEl.textContent = lowStock;
        }
        
        // Today's movements
        const today = new Date();
        const todayMovements = this.movements.filter(m => 
            this.isSameDay(m.date, today)
        ).length;
        const movementsEl = document.querySelector('[data-stat="movements-today"]');
        if (movementsEl) {
            movementsEl.textContent = todayMovements;
        }
    }

    updateStockAlerts() {
        // Get products with stock issues
        const criticalStock = this.products.filter(p => p.stock <= p.minStock && p.stock > 0);
        const outOfStock = this.products.filter(p => p.stock === 0);
        
        console.log('Stock alerts:', {
            critical: criticalStock.length,
            outOfStock: outOfStock.length
        });
    }

    updateRecentMovements() {
        // Update recent movements display
        const recentMovements = this.movements
            .sort((a, b) => b.date - a.date)
            .slice(0, 5);
        
        console.log('Recent movements:', recentMovements);
    }

    updateCategoryOverview() {
        // Calculate category statistics
        const categories = {};
        
        this.products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = {
                    count: 0,
                    value: 0
                };
            }
            categories[product.category].count++;
            categories[product.category].value += product.stock * product.price;
        });
        
        console.log('Category overview:', categories);
    }

    showAddProductModal() {
        const modal = MEP_Utils.$('#add-product-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideAddProductModal() {
        const modal = MEP_Utils.$('#add-product-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        console.log('Showing details for product:', product);
        
        // Here you would show a detailed view of the product
        showNotification('Producto', `Mostrando detalles de ${product.name}`, 'info');
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        console.log('Editing product:', product);
        
        // Here you would show an edit form
        showNotification('Editar', `Editando ${product.name}`, 'info');
    }

    showMovementHistory(productId) {
        const product = this.products.find(p => p.id === productId);
        const productMovements = this.movements.filter(m => m.product === product.name);
        
        console.log('Movement history for', product.name, ':', productMovements);
        showNotification('Historial', `Mostrando historial de movimientos de ${product.name}`, 'info');
    }

    showStockMovementModal(type) {
        const modal = MEP_Utils.$('#stock-movement-modal');
        if (modal) {
            modal.style.display = 'flex';
            
            // Update modal title based on type
            const title = type === 'in' ? 'Entrada de Stock' : 'Salida de Stock';
            const titleEl = modal.querySelector('#movement-modal-title');
            if (titleEl) {
                titleEl.textContent = title;
            }
            
            // Update submit button
            const submitBtn = modal.querySelector('#movement-submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = type === 'in' 
                    ? '<i data-lucide="arrow-down"></i> Registrar Entrada'
                    : '<i data-lucide="arrow-up"></i> Registrar Salida';
            }
            
            window.app.initIcons();
        }
    }

    hideStockMovementModal() {
        const modal = MEP_Utils.$('#stock-movement-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    generateInventoryReport() {
        console.log('Generating inventory report...');
        showNotification('Reporte', 'Generando reporte de inventario...', 'info');
        
        // Simulate report generation
        setTimeout(() => {
            const report = {
                totalProducts: this.products.length,
                totalValue: this.products.reduce((sum, p) => sum + (p.stock * p.price), 0),
                lowStockItems: this.products.filter(p => p.stock <= p.minStock).length,
                categories: [...new Set(this.products.map(p => p.category))].length
            };
            
            console.log('Inventory report:', report);
            showNotification('Reporte Listo', 'El reporte de inventario ha sido generado', 'success');
        }, 1500);
    }

    startStockMonitoring() {
        // Check stock levels every 30 seconds
        setInterval(() => {
            this.checkStockAlerts();
        }, 30000);
    }

    checkStockAlerts() {
        // Check for products that need reordering
        const needsReorder = this.products.filter(p => p.stock <= p.minStock);
        
        if (needsReorder.length > 0) {
            console.log('Products need reordering:', needsReorder);
            
            // Show notification for critical items
            const critical = needsReorder.filter(p => p.stock === 0);
            if (critical.length > 0) {
                showNotification(
                    'Stock Crítico', 
                    `${critical.length} productos sin stock disponible`, 
                    'error'
                );
            }
        }
    }

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    async afterRender() {
        // Post-render initialization
        console.log('Inventory module initialized');
    }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InventoryModule;
}