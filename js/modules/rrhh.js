// ===== RRHH (Human Resources) MODULE =====

class RRHHModule {
    constructor() {
        this.employees = [];
        this.departments = [];
        this.requests = [];
        this.currentView = 'directory';
    }

    async render(container) {
        // Since RRHH has HTML content, we'll load it
        try {
            const response = await fetch('modules/rrhh.html');
            const html = await response.text();
            
            container.innerHTML = html;
            
            // Initialize RRHH functionality
            this.initializeRRHH();
            
        } catch (error) {
            console.error('Error loading RRHH module:', error);
            container.innerHTML = this.renderFallbackRRHH();
        }
    }

    renderFallbackRRHH() {
        return `
            <div class="module-content" id="rrhh-module">
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 style="font-size: var(--font-size-3xl); font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-xs);">
                                Recursos Humanos
                            </h2>
                            <p style="color: var(--text-secondary); font-size: var(--font-size-lg); font-weight: 500;">
                                Gestión integral del capital humano
                            </p>
                        </div>
                    </div>
                    
                    <div class="card" style="padding: var(--space-2xl); text-align: center;">
                        <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: var(--mep-warning); margin: 0 auto var(--space-lg);"></i>
                        <h3 style="font-size: var(--font-size-xl); font-weight: 700; color: var(--text-primary); margin-bottom: var(--space-md);">
                            Error al cargar el módulo RRHH
                        </h3>
                        <p style="color: var(--text-secondary);">
                            No se pudo cargar el contenido de Recursos Humanos. Por favor, intenta recargar la página.
                        </p>
                        <button class="btn btn-primary" onclick="location.reload()" style="margin-top: var(--space-xl);">
                            Recargar Página
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    initializeRRHH() {
        // Setup event handlers
        this.setupEventHandlers();
        
        // Load initial data
        this.loadEmployeeData();
        
        // Initialize components
        this.updateDashboard();
        
        window.rrhhModule = this;
    }

    setupEventHandlers() {
        // Employee management
        window.showAddEmployeeModal = () => this.showAddEmployeeModal();
        window.hideAddEmployeeModal = () => this.hideAddEmployeeModal();
        window.showEmployeeDetails = (employeeId) => this.showEmployeeDetails(employeeId);
        window.editEmployee = (employeeId) => this.editEmployee(employeeId);
        window.sendMessage = (employeeId) => this.sendMessage(employeeId);
        
        // Request management
        window.approveRequest = (requestId) => this.approveRequest(requestId);
        window.rejectRequest = (requestId) => this.rejectRequest(requestId);
        
        // Quick actions
        window.generatePayroll = () => this.generatePayroll();
        window.scheduleInterview = () => this.scheduleInterview();
        window.generateReport = () => this.generateHRReport();
    }

    loadEmployeeData() {
        // Load mock employee data
        this.employees = [
            {
                id: 'EMP-001',
                name: 'Ana López García',
                email: 'ana.lopez@mep.com',
                phone: '+34 666 123 456',
                position: 'Desarrolladora Frontend Senior',
                department: 'Desarrollo',
                startDate: new Date('2022-03-15'),
                status: 'active',
                performance: 'excellent',
                skills: ['React', 'TypeScript', 'UX/UI']
            },
            {
                id: 'EMP-002',
                name: 'Carlos Gómez Ruiz',
                email: 'carlos.gomez@mep.com',
                phone: '+34 666 789 012',
                position: 'DevOps Engineer',
                department: 'Infraestructura',
                startDate: new Date('2023-01-10'),
                status: 'active',
                performance: 'excellent',
                skills: ['Docker', 'Kubernetes', 'AWS']
            },
            {
                id: 'EMP-003',
                name: 'María Rodríguez Torres',
                email: 'maria.rodriguez@mep.com',
                phone: '+34 666 345 678',
                position: 'Project Manager',
                department: 'Gestión',
                startDate: new Date('2020-06-01'),
                status: 'active',
                performance: 'excellent',
                skills: ['Scrum', 'Agile', 'Jira']
            }
        ];
        
        this.departments = [
            { name: 'Desarrollo', count: 45 },
            { name: 'Diseño', count: 18 },
            { name: 'Marketing', count: 23 },
            { name: 'Ventas', count: 29 },
            { name: 'Administración', count: 12 }
        ];
        
        this.requests = [
            {
                id: 'REQ-001',
                type: 'vacation',
                employee: 'Ana López',
                description: 'Solicitud de vacaciones',
                details: '5 días • 15-19 Junio 2025',
                status: 'pending',
                createdAt: new Date('2025-05-20')
            },
            {
                id: 'REQ-002',
                type: 'permission',
                employee: 'Carlos Gómez',
                description: 'Solicitud de permiso',
                details: 'Cita médica • 30 Mayo 10:00',
                status: 'pending',
                createdAt: new Date('2025-05-25')
            },
            {
                id: 'REQ-003',
                type: 'remote',
                employee: 'Pedro Sánchez',
                description: 'Solicitud de teletrabajo',
                details: '2 días semanales • Lunes y Viernes',
                status: 'pending',
                createdAt: new Date('2025-05-26')
            }
        ];
    }

    updateDashboard() {
        // Update employee statistics
        this.updateEmployeeStats();
        
        // Update department distribution
        this.updateDepartmentStats();
        
        // Update pending requests
        this.updatePendingRequests();
        
        // Update recent activities
        this.updateRecentActivities();
    }

    updateEmployeeStats() {
        // Total employees
        const totalEl = document.querySelector('[data-stat="total-employees"]');
        if (totalEl) {
            totalEl.textContent = this.employees.length;
        }
        
        // New hires this quarter
        const quarterStart = new Date();
        quarterStart.setMonth(quarterStart.getMonth() - 3);
        const newHires = this.employees.filter(emp => emp.startDate > quarterStart).length;
        
        const newHiresEl = document.querySelector('[data-stat="new-hires"]');
        if (newHiresEl) {
            newHiresEl.textContent = newHires;
        }
        
        // Pending requests
        const pendingCount = this.requests.filter(req => req.status === 'pending').length;
        const pendingEl = document.querySelector('[data-stat="pending-requests"]');
        if (pendingEl) {
            pendingEl.textContent = pendingCount;
        }
        
        // Retention rate
        const retentionEl = document.querySelector('[data-stat="retention-rate"]');
        if (retentionEl) {
            retentionEl.textContent = '94.2%';
        }
    }

    updateDepartmentStats() {
        // This would update the department distribution chart
        console.log('Updating department statistics...');
    }

    updatePendingRequests() {
        // This would update the pending requests list
        console.log('Updating pending requests...');
    }

    updateRecentActivities() {
        // This would update the recent activities section
        console.log('Updating recent activities...');
    }

    // Employee management methods
    showAddEmployeeModal() {
        const modal = MEP_Utils.$('#add-employee-modal');
        if (modal) {
            modal.style.display = 'flex';
        } else {
            // Create modal if it doesn't exist
            const newModal = this.createAddEmployeeModal();
            document.body.appendChild(newModal);
            window.app.initIcons();
        }
    }
    hideAddEmployeeModal() {
       const modal = MEP_Utils.$('#add-employee-modal');
       if (modal) {
           modal.style.display = 'none';
       }
   }

   createAddEmployeeModal() {
       const modal = MEP_Utils.createElement('div', {
           id: 'add-employee-modal',
           style: 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;',
           innerHTML: `
               <div style="background: var(--bg-surface); border-radius: var(--radius-2xl); padding: var(--space-2xl); max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto;">
                   <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl);">
                       <h3 style="font-size: var(--font-size-2xl); font-weight: 800; color: var(--text-primary);">Nuevo Empleado</h3>
                       <button onclick="hideAddEmployeeModal()" style="background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: var(--space-sm);">
                           <i data-lucide="x" style="width: 24px; height: 24px;"></i>
                       </button>
                   </div>
                   <form onsubmit="rrhhModule.createEmployee(event)">
                       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                           <div>
                               <label style="display: block; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-sm);">Nombre</label>
                               <input type="text" style="width: 100%; padding: var(--space-md); border: 2px solid var(--border-primary); border-radius: var(--radius-lg); background: var(--bg-surface); color: var(--text-primary);" required>
                           </div>
                           <div>
                               <label style="display: block; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-sm);">Apellidos</label>
                               <input type="text" style="width: 100%; padding: var(--space-md); border: 2px solid var(--border-primary); border-radius: var(--radius-lg); background: var(--bg-surface); color: var(--text-primary);" required>
                           </div>
                       </div>
                       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                           <div>
                               <label style="display: block; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-sm);">Email</label>
                               <input type="email" style="width: 100%; padding: var(--space-md); border: 2px solid var(--border-primary); border-radius: var(--radius-lg); background: var(--bg-surface); color: var(--text-primary);" required>
                           </div>
                           <div>
                               <label style="display: block; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-sm);">Teléfono</label>
                               <input type="tel" style="width: 100%; padding: var(--space-md); border: 2px solid var(--border-primary); border-radius: var(--radius-lg); background: var(--bg-surface); color: var(--text-primary);" required>
                           </div>
                       </div>
                       <div style="display: flex; gap: var(--space-md); justify-content: flex-end; margin-top: var(--space-xl);">
                           <button type="button" class="btn btn-secondary" onclick="hideAddEmployeeModal()">Cancelar</button>
                           <button type="submit" class="btn btn-primary">Crear Empleado</button>
                       </div>
                   </form>
               </div>
           `
       });
       
       return modal;
   }

   createEmployee(event) {
       event.preventDefault();
       console.log('Creating new employee...');
       
       showNotification('Empleado Creado', 'El nuevo empleado ha sido añadido exitosamente', 'success');
       this.hideAddEmployeeModal();
       
       // Refresh employee list
       this.loadEmployeeData();
       this.updateDashboard();
   }

   showEmployeeDetails(employeeId) {
       const employee = this.employees.find(emp => emp.id === employeeId);
       console.log('Showing details for employee:', employee);
       
       // Here you would show a detailed view of the employee
       showNotification('Empleado', `Mostrando detalles de ${employee.name}`, 'info');
   }

   editEmployee(employeeId) {
       const employee = this.employees.find(emp => emp.id === employeeId);
       console.log('Editing employee:', employee);
       
       // Here you would show an edit form
       showNotification('Editar', `Editando información de ${employee.name}`, 'info');
   }

   sendMessage(employeeId) {
       const employee = this.employees.find(emp => emp.id === employeeId);
       console.log('Sending message to:', employee);
       
       // Switch to chat module with this employee selected
       showModule('chat');
   }

   // Request management methods
   approveRequest(requestId) {
       const request = this.requests.find(req => req.id === requestId);
       if (request) {
           request.status = 'approved';
           showNotification('Solicitud Aprobada', `${request.description} ha sido aprobada`, 'success');
           this.updateDashboard();
       }
   }

   rejectRequest(requestId) {
       const request = this.requests.find(req => req.id === requestId);
       if (request) {
           request.status = 'rejected';
           showNotification('Solicitud Rechazada', `${request.description} ha sido rechazada`, 'error');
           this.updateDashboard();
       }
   }

   // Quick actions
   generatePayroll() {
       console.log('Generating payroll...');
       showNotification('Nómina', 'Generando nómina mensual...', 'info');
       
       // Simulate payroll generation
       setTimeout(() => {
           showNotification('Nómina Lista', 'La nómina ha sido generada exitosamente', 'success');
       }, 2000);
   }

   scheduleInterview() {
       console.log('Scheduling interview...');
       showNotification('Entrevista', 'Programando nueva entrevista...', 'info');
       
       // Here you would show an interview scheduling form
   }

   generateHRReport() {
       console.log('Generating HR report...');
       showNotification('Informe', 'Generando informe de rendimiento...', 'info');
       
       // Simulate report generation
       setTimeout(() => {
           showNotification('Informe Listo', 'El informe de RRHH ha sido generado', 'success');
       }, 1500);
   }

   async afterRender() {
       // Post-render initialization
       console.log('RRHH module initialized');
       
       // Auto-refresh pending requests
       setInterval(() => {
           this.checkNewRequests();
       }, 60000); // Check every minute
   }

   checkNewRequests() {
       // Simulate checking for new requests
       const pendingCount = this.requests.filter(req => req.status === 'pending').length;
       if (pendingCount > 0) {
           console.log(`${pendingCount} pending requests need attention`);
       }
   }
}

// Export module
if (typeof module !== 'undefined' && module.exports) {
   module.exports = RRHHModule;
}