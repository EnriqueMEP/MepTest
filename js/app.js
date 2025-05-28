// ===== MEP-PROJECTS MAIN APPLICATION =====

class MEPApplication {
    constructor() {
        this.currentModule = null;
        this.modules = {};
        this.isLoading = false;
        this.sidebarOpen = true;
        this.currentTheme = 'light';
        this.init();
    }

    async init() {
        try {
            this.showLoader();
            
            // Initialize theme
            this.initTheme();
            
            // Load saved preferences
            this.loadPreferences();
            
            // Initialize Lucide icons
            this.initIcons();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize modules
            await this.initModules();
            
            // Load default module
            const savedModule = MEP_Utils.storage.get(MEP_CONFIG.STORAGE.CURRENT_MODULE) || 'dashboard';
            await this.loadModule(savedModule);
            
            // Hide loader
            this.hideLoader();
            
        } catch (error) {
            console.error('Error initializing application:', error);
            this.showNotification('Error al inicializar la aplicación', 'error');
        }
    }

    initTheme() {
        const savedTheme = MEP_Utils.storage.get(MEP_CONFIG.STORAGE.THEME) || MEP_CONFIG.THEME.DEFAULT;
        this.setTheme(savedTheme);
    }

    loadPreferences() {
        const preferences = MEP_Utils.storage.get(MEP_CONFIG.STORAGE.USER_PREFERENCES) || {};
        
        // Apply preferences
        if (preferences.sidebarCollapsed) {
            this.toggleSidebar(false);
        }
    }

    initIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    setupEventListeners() {
        // Sidebar toggle
        MEP_Utils.$('#sidebarToggle')?.addEventListener('click', () => this.toggleSidebar());
        
        // Theme toggle
        MEP_Utils.$('#themeToggle')?.addEventListener('click', () => this.toggleTheme());
        
        // Global search
        MEP_Utils.$('.search-input')?.addEventListener('input', 
            MEP_Utils.debounce((e) => this.handleSearch(e.target.value), 300)
        );
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Window resize
        window.addEventListener('resize', MEP_Utils.throttle(() => this.handleResize(), 250));
        
        // Dropdown menus
        document.addEventListener('click', (e) => this.handleDocumentClick(e));
    }

    async initModules() {
        // Initialize module instances
        this.modules = {
            dashboard: new DashboardModule(),
            projects: new ProjectsModule(),
            tasks: new TasksModule(),
            chat: new ChatModule(),
            crm: new CRMModule(),
            erp: new ERPModule(),
            rrhh: new RRHHModule(),
            inventory: new InventoryModule(),
            settings: new SettingsModule()
        };
    }

    async loadModule(moduleId) {
        try {
            this.showLoader();
            
            // Update current module
            this.currentModule = moduleId;
            MEP_Utils.storage.set(MEP_CONFIG.STORAGE.CURRENT_MODULE, moduleId);
            
            // Update navigation
            this.updateNavigation(moduleId);
            
            // Get module config
            const moduleConfig = Object.values(MEP_CONFIG.MODULES).find(m => m.id === moduleId);
            if (!moduleConfig) {
                throw new Error(`Module ${moduleId} not found`);
            }
            
            // Update page title
            this.updatePageTitle(moduleConfig.title);
            
            // Clear content
            const pageContent = MEP_Utils.$('#pageContent');
            pageContent.innerHTML = '';
            
            // Load module content
            if (moduleConfig.hasHtmlContent) {
                // Load HTML content from file
                await this.loadModuleHTML(moduleId);
            } else if (this.modules[moduleId]) {
                // Use JavaScript module
                await this.modules[moduleId].render(pageContent);
            }
            
            // Re-initialize icons
            this.initIcons();
            
            // Module-specific initialization
            if (this.modules[moduleId] && this.modules[moduleId].afterRender) {
                await this.modules[moduleId].afterRender();
            }
            
            this.hideLoader();
            
        } catch (error) {
            console.error(`Error loading module ${moduleId}:`, error);
            this.showNotification(`Error al cargar ${moduleId}`, 'error');
            this.hideLoader();
        }
    }

    async loadModuleHTML(moduleId) {
        try {
            const response = await fetch(`modules/${moduleId}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load ${moduleId}.html`);
            }
            
            const html = await response.text();
            const pageContent = MEP_Utils.$('#pageContent');
            
            // Create module container
            const moduleContainer = MEP_Utils.createElement('div', {
                className: 'module-content',
                id: `${moduleId}-module`,
                innerHTML: html
            });
            
            pageContent.appendChild(moduleContainer);
            
            // Execute module scripts if any
            const scripts = moduleContainer.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.body.appendChild(newScript);
                document.body.removeChild(newScript);
            });
            
        } catch (error) {
            console.error(`Error loading HTML for ${moduleId}:`, error);
            throw error;
        }
    }

    updateNavigation(moduleId) {
        // Update sidebar active state
        MEP_Utils.$$('.sidebar-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('onclick')?.includes(moduleId)) {
                item.classList.add('active');
            }
        });
    }

    updatePageTitle(title) {
        const titleElement = MEP_Utils.$('#pageTitle');
        if (titleElement) {
            titleElement.textContent = title;
        }
        document.title = `${title} - ${MEP_CONFIG.APP_NAME}`;
    }

    toggleSidebar(state = null) {
        const sidebar = MEP_Utils.$('#sidebar');
        const mainContent = MEP_Utils.$('.main-content');
        
        if (state === null) {
            this.sidebarOpen = !this.sidebarOpen;
        } else {
            this.sidebarOpen = state;
        }
        
        sidebar.classList.toggle('hidden', !this.sidebarOpen);
        mainContent.classList.toggle('sidebar-hidden', !this.sidebarOpen);
        
        // Save preference
        MEP_Utils.storage.set(MEP_CONFIG.STORAGE.USER_PREFERENCES, {
            sidebarCollapsed: !this.sidebarOpen
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
    }

    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        MEP_Utils.storage.set(MEP_CONFIG.STORAGE.THEME, theme);
        
        // Update theme toggle icon
        const themeIcon = MEP_Utils.$('#theme-icon-menu');
        const themeText = MEP_Utils.$('#theme-text');
        
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.setAttribute('data-lucide', 'sun');
                themeText.textContent = 'Modo Claro';
            } else {
                themeIcon.setAttribute('data-lucide', 'moon');
                themeText.textContent = 'Modo Oscuro';
            }
            this.initIcons();
        }
    }

    handleSearch(query) {
        if (!query) return;
        
        // Implement global search functionality
        console.log('Searching for:', query);
        
        // Show search results
        // This would be implemented based on your search requirements
    }

    handleKeyboardShortcuts(e) {
        const key = e.key.toLowerCase();
        const ctrl = e.ctrlKey || e.metaKey;
        const shift = e.shiftKey;
        
        // Search
        if (ctrl && key === 'k') {
            e.preventDefault();
            MEP_Utils.$('.search-input')?.focus();
        }
        
        // Toggle sidebar
        if (ctrl && key === 'b') {
            e.preventDefault();
            this.toggleSidebar();
        }
        
        // Toggle theme
        if (ctrl && shift && key === 'd') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Close modal
        if (key === 'escape') {
            this.closeActiveModal();
        }
    }

    handleResize() {
        // Handle responsive behavior
        const width = window.innerWidth;
        
        if (width < 1024) {
            this.toggleSidebar(false);
        } else {
            this.toggleSidebar(true);
        }
    }

    handleDocumentClick(e) {
        // Close dropdowns when clicking outside
        if (!e.target.closest('.dropdown')) {
            MEP_Utils.$$('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    }

    showLoader() {
        this.isLoading = true;
        const loader = MEP_Utils.$('#loader');
        if (loader) {
            loader.style.display = 'flex';
        } else {
            // Create loader if it doesn't exist
            const loaderEl = MEP_Utils.createElement('div', {
                id: 'loader',
                className: 'loader',
                innerHTML: `
                    <div class="loader-content">
                        <div class="loader-spinner"></div>
                        <div class="loader-text">Cargando...</div>
                    </div>
                `
            });
            document.body.appendChild(loaderEl);
        }
    }

    hideLoader() {
        this.isLoading = false;
        const loader = MEP_Utils.$('#loader');
        if (loader) {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }

    showNotification(message, type = 'info') {
        const config = MEP_CONFIG.NOTIFICATIONS[type.toUpperCase()] || MEP_CONFIG.NOTIFICATIONS.INFO;
        
        const notification = MEP_Utils.createElement('div', {
            className: `notification notification-${config.color}`,
            innerHTML: `
                <i data-lucide="${config.icon}"></i>
                <span>${message}</span>
            `
        });
        
        // Add to notification container
        let container = MEP_Utils.$('#notification-container');
        if (!container) {
            container = MEP_Utils.createElement('div', {
                id: 'notification-container',
                className: 'notification-container'
            });
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        this.initIcons();
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, config.duration);
    }

    closeActiveModal() {
        const activeModal = MEP_Utils.$('.modal.show');
        if (activeModal) {
            activeModal.classList.remove('show');
        }
    }
}

// Global functions for onclick handlers
function showModule(moduleId) {
    window.app.loadModule(moduleId);
}

function toggleSidebar() {
    window.app.toggleSidebar();
}

function toggleTheme() {
    window.app.toggleTheme();
}

function toggleDropdown(dropdownId) {
    const menu = MEP_Utils.$(`#${dropdownId}-menu`);
    if (menu) {
        menu.classList.toggle('show');
    }
}

function showNotification(title, message, type = 'info') {
    window.app.showNotification(`${title}: ${message}`, type);
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MEPApplication();

    
});