    renderSalesKPIs() {
        const kpis = [
            { title: 'Ventas del Mes', value: '€1.2M', change: '+18.5%', icon: 'trending-up' },
            { title: 'Órdenes Activas', value: '89', change: '+12', icon: 'shopping-bag' },
            { title: 'Clientes Nuevos', value: '24', change: '+6', icon: 'user-plus' },
            { title: 'Tasa Conversión', value: '12.3%', change: '+2.1%', icon: 'target' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 20px; height: 20px; color: var(--mep-primary-500);"></i>
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${kpi.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">${kpi.title}</div>
                <div style="font-size: var(--font-size-sm); color: var(--mep-success);">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }

    renderSalesTrendsChart() {
        return `
            <div class="chart-container">
                <canvas id="sales-trends-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="trending-up" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Tendencias de Ventas</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Histórico mensual</div>
                </div>
            </div>
        `;
    }

    renderCustomerSegmentsChart() {
        return `
            <div class="chart-container">
                <canvas id="customer-segments-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="users" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Segmentación de Clientes</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Por valor y frecuencia</div>
                </div>
            </div>
        `;
    }

    renderSalesOrdersTable() {
        const orders = [
            { so: 'SO-2025-001', customer: 'Acme Corporation', amount: '€25,420', status: 'Confirmado', date: '2025-05-30', delivery: '2025-06-05' },
            { so: 'SO-2025-002', customer: 'Global Tech Ltd', amount: '€18,750', status: 'Cotización', date: '2025-05-29', delivery: '2025-06-10' },
            { so: 'SO-2025-003', customer: 'StartUp Innovation', amount: '€33,100', status: 'En proceso', date: '2025-05-28', delivery: '2025-06-03' },
            { so: 'SO-2025-004', customer: 'Enterprise Solutions', amount: '€42,340', status: 'Enviado', date: '2025-05-27', delivery: '2025-05-31' }
        ];

        return `
            <table class="erp-table">
                <thead>
                    <tr>
                        <th>N° Orden</th>
                        <th>Cliente</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Entrega</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td style="font-weight: 600; color: var(--mep-primary-600);">${order.so}</td>
                            <td>${order.customer}</td>
                            <td style="font-weight: 600; text-align: right;">${order.amount}</td>
                            <td>
                                <span class="status-indicator status-${order.status === 'Enviado' ? 'active' : order.status === 'Cotización' ? 'warning' : 'info'}"></span>
                                ${order.status}
                            </td>
                            <td style="color: var(--text-secondary);">${new Date(order.date).toLocaleDateString()}</td>
                            <td style="color: var(--text-secondary);">${new Date(order.delivery).toLocaleDateString()}</td>
                            <td>
                                <div style="display: flex; gap: 0.25rem;">
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.viewSO('${order.so}')">
                                        <i data-lucide="eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.editSO('${order.so}')">
                                        <i data-lucide="edit"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderProductionKPIs() {
        const kpis = [
            { title: 'Eficiencia', value: '94.2%', change: '+1.8%', icon: 'gauge' },
            { title: 'Órdenes Activas', value: '18', change: '+3', icon: 'cog' },
            { title: 'Output Diario', value: '847 uds', change: '+5.2%', icon: 'package-2' },
            { title: 'Tiempo Ciclo', value: '2.3h', change: '-0.2h', icon: 'clock' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 20px; height: 20px; color: var(--mep-primary-500);"></i>
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${kpi.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">${kpi.title}</div>
                <div style="font-size: var(--font-size-sm); color: ${kpi.change.startsWith('+') || kpi.change.startsWith('-') && kpi.title.includes('Tiempo') ? 'var(--mep-success)' : 'var(--mep-error)'};">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }

    renderProductionOutputChart() {
        return `
            <div class="chart-container">
                <canvas id="production-output-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="bar-chart" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Producción Diaria</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Unidades producidas</div>
                </div>
            </div>
        `;
    }

    renderResourceUtilizationChart() {
        return `
            <div class="chart-container">
                <canvas id="resource-utilization-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="cpu" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Utilización de Recursos</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Máquinas y personal</div>
                </div>
            </div>
        `;
    }

    renderProductionOrdersTable() {
        const orders = [
            { po: 'MO-2025-001', product: 'Laptop Dell XPS', quantity: 50, status: 'En proceso', start: '2025-05-29', end: '2025-06-02', progress: 75 },
            { po: 'MO-2025-002', product: 'Monitor Samsung', quantity: 25, status: 'Planificada', start: '2025-06-01', end: '2025-06-03', progress: 0 },
            { po: 'MO-2025-003', product: 'Silla Ergonómica', quantity: 100, status: 'Completada', start: '2025-05-25', end: '2025-05-29', progress: 100 },
            { po: 'MO-2025-004', product: 'Mesa Oficina', quantity: 30, status: 'Pausada', start: '2025-05-28', end: '2025-06-01', progress: 40 }
        ];

        return `
            <table class="erp-table">
                <thead>
                    <tr>
                        <th>N° Orden</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Inicio</th>
                        <th>Fin Previsto</th>
                        <th>Progreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td style="font-weight: 600; color: var(--mep-primary-600);">${order.po}</td>
                            <td>${order.product}</td>
                            <td style="text-align: center; font-weight: 600;">${order.quantity}</td>
                            <td>
                                <span class="status-indicator status-${order.status === 'Completada' ? 'active' : order.status === 'Pausada' ? 'error' : order.status === 'Planificada' ? 'warning' : 'info'}"></span>
                                ${order.status}
                            </td>
                            <td style="color: var(--text-secondary);">${new Date(order.start).toLocaleDateString()}</td>
                            <td style="color: var(--text-secondary);">${new Date(order.end).toLocaleDateString()}</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <div style="flex: 1; height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: var(--mep-${order.progress === 100 ? 'success' : order.progress > 50 ? 'info' : 'warning'}); width: ${order.progress}%; transition: width 0.3s;"></div>
                                    </div>
                                    <span style="font-size: var(--font-size-sm); font-weight: 600; min-width: 40px;">${order.progress}%</span>
                                </div>
                            </td>
                            <td>
                                <div style="display: flex; gap: 0.25rem;">
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.viewProductionOrder('${order.po}')">
                                        <i data-lucide="eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.editProductionOrder('${order.po}')">
                                        <i data-lucide="edit"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderHRKPIs() {
        const kpis = [
            { title: 'Total Empleados', value: '187', change: '+5', icon: 'users' },
            { title: 'Asistencia', value: '96.8%', change: '+1.2%', icon: 'clock' },
            { title: 'Rotación', value: '8.3%', change: '-2.1%', icon: 'user-x' },
            { title: 'Satisfacción', value: '4.2/5', change: '+0.3', icon: 'star' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 20px; height: 20px; color: var(--mep-primary-500);"></i>
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${kpi.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">${kpi.title}</div>
                <div style="font-size: var(--font-size-sm); color: ${kpi.change.startsWith('+') && !kpi.title.includes('Rotación') || kpi.change.startsWith('-') && kpi.title.includes('Rotación') ? 'var(--mep-success)' : 'var(--mep-error)'};">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }

    renderHeadcountChart() {
        return `
            <div class="chart-container">
                <canvas id="headcount-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="pie-chart" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Distribución de Personal</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Por departamentos</div>
                </div>
            </div>
        `;
    }

    renderAttendanceChart() {
        return `
            <div class="chart-container">
                <canvas id="attendance-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="calendar" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Tendencia de Asistencia</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Últimos 30 días</div>
                </div>
            </div>
        `;
    }

    renderEmployeeTable() {
        const employees = [
            { id: 'EMP-001', name: 'Ana García López', department: 'Administración', position: 'Gerente', email: 'ana.garcia@mep.com', status: 'Activo' },
            { id: 'EMP-002', name: 'Carlos Ruiz Martín', department: 'Ventas', position: 'Ejecutivo', email: 'carlos.ruiz@mep.com', status: 'Activo' },
            { id: 'EMP-003', name: 'María Fernández', department: 'Producción', position: 'Operario', email: 'maria.fernandez@mep.com', status: 'Vacaciones' },
            { id: 'EMP-004', name: 'José Luis Pérez', department: 'IT', position: 'Desarrollador', email: 'jose.perez@mep.com', status: 'Activo' },
            { id: 'EMP-005', name: 'Laura Moreno', department: 'RRHH', position: 'Especialista', email: 'laura.moreno@mep.com', status: 'Activo' }
        ];

        return `
            <table class="erp-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Departamento</th>
                        <th>Posición</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${employees.map(emp => `
                        <tr>
                            <td style="font-weight: 600; color: var(--mep-primary-600);">${emp.id}</td>
                            <td style="font-weight: 600;">${emp.name}</td>
                            <td>
                                <span class="badge badge-secondary">${emp.department}</span>
                            </td>
                            <td>${emp.position}</td>
                            <td style="color: var(--text-secondary);">${emp.email}</td>
                            <td>
                                <span class="status-indicator status-${emp.status === 'Activo' ? 'active' : 'warning'}"></span>
                                ${emp.status}
                            </td>
                            <td>
                                <div style="display: flex; gap: 0.25rem;">
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.viewEmployee('${emp.id}')">
                                        <i data-lucide="eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.editEmployee('${emp.id}')">
                                        <i data-lucide="edit"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderAnalyticsKPIs() {
        const kpis = [
            { title: 'Revenue Growth', value: '+12.5%', change: 'vs last quarter', icon: 'trending-up' },
            { title: 'Customer Retention', value: '94.2%', change: '+2.1% vs LY', icon: 'heart' },
            { title: 'Operational Efficiency', value: '87.6%', change: '+5.3% vs LQ', icon: 'zap' },
            { title: 'Market Share', value: '15.8%', change: '+1.2% vs LY', icon: 'pie-chart' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 20px; height: 20px; color: var(--mep-primary-500);"></i>
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${kpi.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">${kpi.title}</div>
                <div style="font-size: var(--font-size-sm); color: var(--mep-success);">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }

    renderExecutiveDashboard() {
        return `
            <div class="chart-container">
                <canvas id="executive-dashboard-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="layout-dashboard" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Executive KPI Dashboard</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Métricas clave del negocio</div>
                </div>
            </div>
        `;
    }

    renderProfitabilityChart() {
        return `
            <div class="chart-container">
                <canvas id="profitability-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="dollar-sign" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Análisis de Rentabilidad</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Por línea de productos</div>
                </div>
            </div>
        `;
    }

    renderEfficiencyChart() {
        return `
            <div class="chart-container">
                <canvas id="efficiency-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="zap" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Eficiencia Operacional</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Indicadores de performance</div>
                </div>
            </div>
        `;
    }

    renderPredictiveChart() {
        return `
            <div class="chart-container">
                <canvas id="predictive-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="crystal-ball" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Análisis Predictivo</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Proyecciones y tendencias</div>
                </div>
            </div>
        `;
    }

    renderModals() {
        return `
            <!-- New Transaction Modal -->
            <div class="modal" id="newTransactionModal">
                <div class="modal-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 700;">Nueva Transacción</h3>
                        <button class="btn btn-ghost" onclick="erpModule.closeModal('newTransactionModal')">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <form id="transactionForm" onsubmit="erpModule.submitTransaction(event)">
                        <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
                            <div>
                                <label class="form-label">Tipo de Transacción</label>
                                <select class="form-select" name="type" required>
                                    <option value="">Seleccionar tipo</option>
                                    <option value="income">Ingreso</option>
                                    <option value="expense">Gasto</option>
                                    <option value="transfer">Transferencia</option>
                                </select>
                            </div>
                            <div>
                                <label class="form-label">Cuenta</label>
                                <select class="form-select" name="account" required>
                                    <option value="">Seleccionar cuenta</option>
                                    <option value="1100">Efectivo en Banco</option>
                                    <option value="1200">Cuentas por Cobrar</option>
                                    <option value="2100">Cuentas por Pagar</option>
                                </select>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">Monto</label>
                                    <input type="number" class="form-input" name="amount" step="0.01" required>
                                </div>
                                <div>
                                    <label class="form-label">Fecha</label>
                                    <input type="date" class="form-input" name="date" required>
                                </div>
                            </div>
                            <div>
                                <label class="form-label">Descripción</label>
                                <textarea class="form-input" name="description" rows="3" required></textarea>
                            </div>
                            <div>
                                <label class="form-label">Referencia</label>
                                <input type="text" class="form-input" name="reference">
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                            <button type="button" class="btn btn-secondary" onclick="erpModule.closeModal('newTransactionModal')">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i data-lucide="save"></i>
                                Guardar Transacción
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- New Product Modal -->
            <div class="modal" id="newProductModal">
                <div class="modal-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 700;">Nuevo Producto</h3>
                        <button class="btn btn-ghost" onclick="erpModule.closeModal('newProductModal')">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <form id="productForm" onsubmit="erpModule.submitProduct(event)">
                        <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">SKU</label>
                                    <input type="text" class="form-input" name="sku" required>
                                </div>
                                <div>
                                    <label class="form-label">Categoría</label>
                                    <select class="form-select" name="category" required>
                                        <option value="">Seleccionar categoría</option>
                                        <option value="electronics">Electrónicos</option>
                                        <option value="office">Oficina</option>
                                        <option value="cleaning">Limpieza</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="form-label">Nombre del Producto</label>
                                <input type="text" class="form-input" name="name" required>
                            </div>
                            <div>
                                <label class="form-label">Descripción</label>
                                <textarea class="form-input" name="description" rows="3"></textarea>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">Stock Inicial</label>
                                    <input type="number" class="form-input" name="stock" min="0" required>
                                </div>
                                <div>
                                    <label class="form-label">Stock Mínimo</label>
                                    <input type="number" class="form-input" name="minStock" min="0" required>
                                </div>
                                <div>
                                    <label class="form-label">Stock Máximo</label>
                                    <input type="number" class="form-input" name="maxStock" min="0" required>
                                </div>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">Precio Costo</label>
                                    <input type="number" class="form-input" name="costPrice" step="0.01" required>
                                </div>
                                <div>
                                    <label class="form-label">Precio Venta</label>
                                    <input type="number" class="form-input" name="salePrice" step="0.01" required>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                            <button type="button" class="btn btn-secondary" onclick="erpModule.closeModal('newProductModal')">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i data-lucide="save"></i>
                                Guardar Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Additional modals for other forms would go here -->
        `;
    }

    // Data Generation Methods
    generateFinancialData() {
        return {
            revenue: Array.from({length: 12}, (_, i) => ({
                month: i + 1,
                amount: Math.random() * 100000 + 500000,
                budget: Math.random() * 80000 + 520000
            })),
            expenses: Array.from({length: 12}, (_, i) => ({
                month: i + 1,
                amount: Math.random() * 80000 + 300000
            })),
            cashFlow: Array.from({length: 30}, (_, i) => ({
                date: new Date(2025, 4, i + 1),
                inflow: Math.random() * 50000 + 10000,
                outflow: Math.random() * 40000 + 8000
            }))
        };
    }

    generateInventoryData() {
        return {
            products: Array.from({length: 50}, (_, i) => ({
                id: `PRD-${String(i + 1).padStart(3, '0')}`,
                name: `Product ${i + 1}`,
                category: ['Electronics', 'Office', 'Cleaning'][Math.floor(Math.random() * 3)],
                stock: Math.floor(Math.random() * 200),
                minStock: Math.floor(Math.random() * 20) + 5,
                value: Math.random() * 10000 + 1000
            })),
            movements: Array.from({length: 100}, (_, i) => ({
                date: new Date(2025, 4, Math.floor(Math.random() * 30) + 1),
                type: ['IN', 'OUT'][Math.floor(Math.random() * 2)],
                quantity: Math.floor(Math.random() * 50) + 1,
                productId: `PRD-${String(Math.floor(Math.random() * 50) + 1).padStart(3, '0')}`
            }))
        };
    }

    generatePurchaseData() {
        return {
            orders: Array.from({length: 30}, (_, i) => ({
                id: `PO-2025-${String(i + 1).padStart(3, '0')}`,
                vendor: `Vendor ${i + 1}`,
                amount: Math.random() * 50000 + 5000,
                status: ['Pending', 'Approved', 'Sent', 'Received'][Math.floor(Math.random() * 4)],
                date: new Date(2025, 4, Math.floor(Math.random() * 30) + 1)
            }))
        };
    }

    generateSalesData() {
        return {
            orders: Array.from({length: 40}, (_, i) => ({
                id: `SO-2025-${String(i + 1).padStart(3, '0')}`,
                customer: `Customer ${i + 1}`,
                amount: Math.random() * 75000 + 10000,
                status: ['Quote', 'Confirmed', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 5)],
                date: new Date(2025, 4, Math.floor(Math.random() * 30) + 1)
            }))
        };
    }

    generateHRData() {
        return {
            employees: Array.from({length: 187}, (_, i) => ({
                id: `EMP-${String(i + 1).padStart(3, '0')}`,
                name: `Employee ${i + 1}`,
                department: ['Administration', 'Sales', 'Production', 'IT', 'HR'][Math.floor(Math.random() * 5)],
                position: ['Manager', 'Executive', 'Specialist', 'Operator'][Math.floor(Math.random() * 4)],
                status: ['Active', 'Vacation', 'Leave'][Math.floor(Math.random() * 3)]
            }))
        };
    }

    generateProductionData() {
        return {
            orders: Array.from({length: 20}, (_, i) => ({
                id: `MO-2025-${String(i + 1).padStart(3, '0')}`,
                product: `Product ${i + 1}`,
                quantity: Math.floor(Math.random() * 100) + 10,
                status: ['Planned', 'In Progress', 'Completed', 'Paused'][Math.floor(Math.random() * 4)],
                progress: Math.floor(Math.random() * 100)
            }))
        };
    }

    generateOperationsData() {
        return {
            processes: Array.from({length: 10}, (_, i) => ({
                name: `Process ${i + 1}`,
                efficiency: Math.random() * 20 + 80,
                status: ['Active', 'Warning', 'Error'][Math.floor(Math.random() * 3)]
            }))
        };
    }

    generateAnalyticsData() {
        return {
            kpis: {
                revenue: { value: 8400000, growth: 12.5 },
                profit: { value: 1680000, margin: 20.0 },
                efficiency: { value: 87.6, trend: 'up' },
                customers: { total: 1247, retention: 94.2 }
            },
            trends: Array.from({length: 12}, (_, i) => ({
                month: i + 1,
                revenue: Math.random() * 200000 + 600000,
                profit: Math.random() * 100000 + 100000,
                efficiency: Math.random() * 10 + 85
            }))
        };
    }

    getUserPermissions() {
        return {
            financials: { read: true, write: true, delete: false },
            inventory: { read: true, write: true, delete: true },
            procurement: { read: true, write: true, delete: false },
            sales: { read: true, write: true, delete: false },
            production: { read: true, write: false, delete: false },
            hr: { read: true, write: false, delete: false },
            analytics: { read: true, write: false, delete: false }
        };
    }

    // Core ERP Methods
    initializeERP() {
        this.bindEvents();
        this.startDataRefresh();
        this.initializeCharts();
        this.showNotifications();
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    bindEvents() {
        // Global event listeners for the ERP module
        document.addEventListener('click', (e) => {
            if (e.target.closest('.erp-tab')) {
                const tab = e.target.closest('.erp-tab').dataset.tab;
                if (tab) this.switchTab(tab);
            }
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        this.showQuickCreateModal();
                        break;
                    case 'e':
                        e.preventDefault();
                        this.exportCurrentView();
                        break;
                }
            }
        });
    }

    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.erp-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active content
        document.querySelectorAll('.erp-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`erp-${tabName}`).classList.add('active');

        // Update current tab
        this.currentTab = tabName;

        // Refresh data for the new tab
        this.refreshTabData(tabName);

        // Re-initialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    switchView(module, view) {
        this.currentView = view;
        // Update active view buttons
        const viewButtons = document.querySelectorAll(`#erp-${module} .btn-ghost`);
        viewButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Refresh chart with new view
        this.refreshChart(module, view);
    }

    updateFilter(filterType, value) {
        this.filters[filterType] = value;
        this.refreshCurrentTab();
        this.showToast(`Filtro ${filterType} actualizado a: ${value}`, 'info');
    }

    refreshCurrentTab() {
        this.refreshTabData(this.currentTab);
    }

    refreshTabData(tabName) {
        // Simulate data refresh
        console.log(`Refreshing data for ${tabName} tab`);
        
        // Show loading indicator
        this.showLoadingIndicator(tabName);
        
        // Simulate API call
        setTimeout(() => {
            this.hideLoadingIndicator(tabName);
            this.updateTabData(tabName);
        }, 1000);
    }

    updateTabData(tabName) {
        // Update data based on current filters
        const filteredData = this.filterData(this.data[tabName], this.filters);
        
        // Update UI components
        this.updateMetrics(tabName, filteredData);
        this.updateCharts(tabName, filteredData);
        this.updateTables(tabName, filteredData);
    }

    filterData(data, filters) {
        // Apply filters to data
        if (!data) return data;
        
        // Date range filter
        if (filters.dateRange && filters.dateRange !== 'all') {
            // Apply date filtering logic
        }
        
        // Department filter
        if (filters.department && filters.department !== 'all') {
            // Apply department filtering logic
        }
        
        return data;
    }

    // Chart Methods
    initializeCharts() {
        // Initialize charts for current tab
        if (this.currentTab === 'dashboard') {
            this.initFinancialChart();
        }
    }

    initFinancialChart() {
        const canvas = document.getElementById('financial-chart');
        if (!canvas) return;

        // Simulate chart initialization
        console.log('Financial chart initialized');
    }

    refreshChart(module, view) {
        console.log(`Refreshing ${module} chart with ${view} view`);
    }

    updateMetrics(tabName, data) {
        // Update KPI metrics for the tab
        console.log(`Updating metrics for ${tabName}`, data);
    }

    updateCharts(tabName, data) {
        // Update charts for the tab
        console.log(`Updating charts for ${tabName}`, data);
    }

    updateTables(tabName, data) {
        // Update tables for the tab
        console.log(`Updating tables for ${tabName}`, data);
    }

    // Modal Methods
    showNewTransactionModal() {
        this.showModal('newTransactionModal');
    }

    showNewProductModal() {
        this.showModal('newProductModal');
    }

    showNewPurchaseOrderModal() {
        this.showQuickCreateModal('purchase_order');
    }

    showNewSalesOrderModal() {
        this.showQuickCreateModal('sales_order');
    }

    showNewProductionOrderModal() {
        this.showQuickCreateModal('production_order');
    }

    showNewEmployeeModal() {
        this.showQuickCreateModal('employee');
    }

    showQuickCreateModal(type = null) {
        if (type) {
            // Show specific create modal
            this.showModal(`new${type.charAt(0).toUpperCase() + type.slice(1)}Modal`);
        } else {
            // Show general quick create modal
            this.showToast('Ctrl+N: Crear nuevo elemento', 'info');
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Form Submission Methods
    submitTransaction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const transaction = Object.fromEntries(formData.entries());
        
        console.log('New transaction:', transaction);
        this.closeModal('newTransactionModal');
        this.showToast('Transacción creada exitosamente', 'success');
        this.refreshCurrentTab();
    }

    submitProduct(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const product = Object.fromEntries(formData.entries());
        
        console.log('New product:', product);
        this.closeModal('newProductModal');
        this.showToast('Producto creado exitosamente', 'success');
        this.refreshCurrentTab();
    }

    // Action Methods
    reconcileAccounts() {
        this.showToast('Iniciando conciliación de cuentas...', 'info');
        // Simulate reconciliation process
        setTimeout(() => {
            this.showToast('Conciliación completada exitosamente', 'success');
        }, 2000);
    }

    generateReport() {
        this.showToast('Generando reporte financiero...', 'info');
        // Simulate report generation
        setTimeout(() => {
            this.downloadFile('financial-report.pdf');
            this.showToast('Reporte generado y descargado', 'success');
        }, 3000);
    }

    exportDashboard() {
        this.showToast('Exportando dashboard...', 'info');
        setTimeout(() => {
            this.downloadFile('erp-dashboard.xlsx');
            this.showToast('Dashboard exportado exitosamente', 'success');
        }, 2000);
    }

    exportBalances() {
        this.downloadFile('account-balances.csv');
        this.showToast('Balances exportados', 'success');
    }

    refreshBalances() {
        this.showToast('Actualizando balances...', 'info');
        setTimeout(() => {
            this.refreshCurrentTab();
            this.showToast('Balances actualizados', 'success');
        }, 1500);
    }

    stockTake() {
        this.showToast('Iniciando inventario físico...', 'info');
    }

    generateStockReport() {
        this.downloadFile('stock-report.xlsx');
        this.showToast('Reporte de stock generado', 'success');
    }

    vendorManagement() {
        this.showToast('Abriendo gestión de proveedores...', 'info');
    }

    approvalWorkflow() {
        this.showToast('Abriendo flujo de aprobación...', 'info');
    }

    viewApprovalQueue() {
        this.showToast('Mostrando cola de aprobación...', 'info');
    }

    priceManagement() {
        this.showToast('Abriendo gestión de precios...', 'info');
    }

    customerAnalysis() {
        this.showToast('Abriendo análisis de clientes...', 'info');
    }

    capacityPlanning() {
        this.showToast('Abriendo planificación de capacidad...', 'info');
    }

    qualityControl() {
        this.showToast('Abriendo control de calidad...', 'info');
    }

    payrollManagement() {
        this.showToast('Abriendo gestión de nóminas...', 'info');
    }

    performanceReview() {
        this.showToast('Abriendo evaluaciones de desempeño...', 'info');
    }

    customReports() {
        this.showToast('Abriendo constructor de reportes...', 'info');
    }

    dataExport() {
        this.showToast('Iniciando exportación de datos...', 'info');
    }

    showAnalyticsBuilder() {
        this.showToast('Abriendo constructor de dashboard...', 'info');
    }

    // View Methods
    viewAllTransactions() {
        this.switchTab('financials');
        this.showToast('Mostrando todas las transacciones', 'info');
    }

    viewTransaction(txId) {
        this.showToast(`Abriendo transacción ${txId}`, 'info');
    }

    viewAccountDetails(accountCode) {
        this.showToast(`Mostrando detalles de cuenta ${accountCode}`, 'info');
    }

    viewAlerts() {
        this.showToast('Mostrando alertas de inventario', 'info');
    }

    editProduct(sku) {
        this.showToast(`Editando producto ${sku}`, 'info');
    }

    adjustStock(sku) {
        this.showToast(`Ajustando stock para ${sku}`, 'info');
    }

    viewPO(poId) {
        this.showToast(`Abriendo orden de compra ${poId}`, 'info');
    }

    trackPO(poId) {
        this.showToast(`Rastreando orden ${poId}`, 'info');
    }

    viewSO(soId) {
        this.showToast(`Abriendo orden de venta ${soId}`, 'info');
    }

    editSO(soId) {
        this.showToast(`Editando orden ${soId}`, 'info');
    }

    viewProductionOrder(moId) {
        this.showToast(`Abriendo orden de producción ${moId}`, 'info');
    }

    editProductionOrder(moId) {
        this.showToast(`Editando orden ${moId}`, 'info');
    }

    viewEmployee(empId) {
        this.showToast(`Abriendo perfil del empleado ${empId}`, 'info');
    }

    editEmployee(empId) {
        this.showToast(`Editando empleado ${empId}`, 'info');
    }

    viewProcessDetails(processName) {
        this.showToast(`Mostrando detalles del proceso: ${processName}`, 'info');
    }

    viewHRAlerts() {
        this.showToast('Mostrando alertas de RRHH', 'info');
    }

    // Utility Methods
    showLoadingIndicator(tabName) {
        const content = document.getElementById(`erp-${tabName}`);
        if (content) {
            content.style.opacity = '0.5';
            content.style.pointerEvents = 'none';
        }
    }

    hideLoadingIndicator(tabName) {
        const content = document.getElementById(`erp-${tabName}`);
        if (content) {
            content.style.opacity = '1';
            content.style.pointerEvents = 'auto';
        }
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--mep-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'});
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;
        
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}" style="width: 16px; height: 16px;"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);
        
        // Initialize icon
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    downloadFile(filename) {
        // Simulate file download
        const link = document.createElement('a');
        link.href = '#';
        link.download = filename;
        link.click();
    }

    startDataRefresh() {
        // Refresh data every 30 seconds
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                this.refreshCurrentTab();
            }
        }, 30000);
    }

    showNotifications() {
        // Show initial notifications
        setTimeout(() => {
            this.showToast('ERP Sistema inicializado correctamente', 'success');
        }, 1000);
    }

    exportCurrentView() {
        const filename = `erp-${this.currentTab}-${new Date().toISOString().split('T')[0]}.xlsx`;
        this.downloadFile(filename);
        this.showToast(`Vista actual exportada: ${filename}`, 'success');
    }

    // Cleanup method
    destroy() {
        // Clean up event listeners and intervals
        document.removeEventListener('click', this.bindEvents);
        document.removeEventListener('keydown', this.bindEvents);
    }
}

// Global instance
let erpModule;

// Initialize ERP module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window !== 'undefined') {
        window.ERPModule = ERPModule;
        
        // Auto-initialize if container exists
        const container = document.getElementById('erp-container');
        if (container) {
            erpModule = new ERPModule();
            erpModule.render(container);
        }
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ERPModule;
}// ===== ERP ENTERPRISE SUITE - MÓDULO COMPLETO =====

class ERPModule {
    constructor() {
        this.currentTab = 'dashboard';
        this.currentView = 'overview';
        this.filters = {
            dateRange: '30d',
            department: 'all',
            status: 'all',
            priority: 'all'
        }

    renderFinancialChart() {
        return `
            <div class="chart-container">
                <canvas id="financial-chart" style="max-height: 350px;"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="bar-chart-3" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Gráfico de Tendencias Financieras</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Datos actualizados cada hora</div>
                </div>
            </div>
        `;
    }

    renderOperationalStatus() {
        const statuses = [
            { module: 'Finanzas', status: 'active', progress: 98, alert: false },
            { module: 'Inventario', status: 'warning', progress: 76, alert: true },
            { module: 'Producción', status: 'active', progress: 94, alert: false },
            { module: 'Ventas', status: 'active', progress: 87, alert: false },
            { module: 'RRHH', status: 'pending', progress: 65, alert: true },
            { module: 'Compras', status: 'active', progress: 91, alert: false }
        ];

        return statuses.map(item => `
            <div style="padding: 1rem; border-bottom: 1px solid var(--border-secondary); last:border-bottom: none;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span class="status-indicator status-${item.status}"></span>
                        <span style="font-weight: 600;">${item.module}</span>
                        ${item.alert ? '<i data-lucide="alert-triangle" style="width: 16px; height: 16px; color: var(--mep-warning);"></i>' : ''}
                    </div>
                    <span style="font-size: var(--font-size-sm); color: var(--text-secondary);">${item.progress}%</span>
                </div>
                <div style="width: 100%; height: 4px; background: var(--bg-secondary); border-radius: 2px; overflow: hidden;">
                    <div style="height: 100%; background: var(--mep-${item.status === 'active' ? 'success' : item.status === 'warning' ? 'warning' : 'info'}); width: ${item.progress}%; transition: width 0.3s;"></div>
                </div>
            </div>
        `).join('');
    }

    renderDepartmentWidgets() {
        const departments = [
            {
                name: 'Finanzas',
                icon: 'dollar-sign',
                metrics: { active: 23, pending: 5, completed: 156 },
                trend: '+8.2%'
            },
            {
                name: 'Operaciones',
                icon: 'cog',
                metrics: { active: 45, pending: 12, completed: 234 },
                trend: '+15.3%'
            },
            {
                name: 'Ventas',
                icon: 'trending-up',
                metrics: { active: 34, pending: 8, completed: 189 },
                trend: '+22.1%'
            },
            {
                name: 'Recursos Humanos',
                icon: 'users',
                metrics: { active: 18, pending: 3, completed: 87 },
                trend: '+5.7%'
            }
        ];

        return departments.map(dept => `
            <div class="department-widget">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 48px; height: 48px; background: var(--mep-primary-100); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="${dept.icon}" style="width: 24px; height: 24px; color: var(--mep-primary-600);"></i>
                    </div>
                    <div>
                        <h4 style="font-weight: 700; margin-bottom: 0.25rem;">${dept.name}</h4>
                        <p style="font-size: var(--font-size-sm); color: var(--text-secondary);">Tendencia: ${dept.trend}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--mep-info);">${dept.metrics.active}</div>
                        <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Activos</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--mep-warning);">${dept.metrics.pending}</div>
                        <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Pendientes</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--mep-success);">${dept.metrics.completed}</div>
                        <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">Completados</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderProcessFlow() {
        const processes = [
            { name: 'Cotización', status: 'active', count: 23 },
            { name: 'Orden Venta', status: 'active', count: 45 },
            { name: 'Producción', status: 'pending', count: 12 },
            { name: 'Envío', status: 'active', count: 34 },
            { name: 'Facturación', status: 'warning', count: 8 },
            { name: 'Cobro', status: 'active', count: 67 }
        ];

        return `
            <div class="process-flow">
                ${processes.map(process => `
                    <div class="process-step" onclick="erpModule.viewProcessDetails('${process.name.toLowerCase()}')">
                        <span class="status-indicator status-${process.status}"></span>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${process.name}</div>
                            <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">${process.count} elementos</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderRecentTransactions() {
        const transactions = [
            { id: 'TXN-2025-001', type: 'Venta', client: 'Acme Corp', amount: '€15,420', status: 'Completada', date: '2025-05-30' },
            { id: 'TXN-2025-002', type: 'Compra', client: 'Tech Solutions', amount: '€8,750', status: 'Pendiente', date: '2025-05-30' },
            { id: 'TXN-2025-003', type: 'Venta', client: 'Global Industries', amount: '€23,100', status: 'Procesando', date: '2025-05-29' },
            { id: 'TXN-2025-004', type: 'Compra', client: 'Supplier XYZ', amount: '€12,340', status: 'Completada', date: '2025-05-29' },
            { id: 'TXN-2025-005', type: 'Venta', client: 'StartUp Ltd', amount: '€5,670', status: 'Completada', date: '2025-05-28' }
        ];

        return `
            <table class="erp-table">
                <thead>
                    <tr>
                        <th>ID Transacción</th>
                        <th>Tipo</th>
                        <th>Cliente/Proveedor</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${transactions.map(tx => `
                        <tr>
                            <td style="font-weight: 600; color: var(--mep-primary-600);">${tx.id}</td>
                            <td>
                                <span class="badge ${tx.type === 'Venta' ? 'badge-success' : 'badge-info'}">${tx.type}</span>
                            </td>
                            <td>${tx.client}</td>
                            <td style="font-weight: 600;">${tx.amount}</td>
                            <td>
                                <span class="status-indicator status-${tx.status === 'Completada' ? 'active' : tx.status === 'Pendiente' ? 'warning' : 'pending'}"></span>
                                ${tx.status}
                            </td>
                            <td style="color: var(--text-secondary);">${new Date(tx.date).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-sm btn-ghost" onclick="erpModule.viewTransaction('${tx.id}')">
                                    <i data-lucide="eye"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderFinancialKPIs() {
        const kpis = [
            { title: 'Ingresos', value: '€2.4M', change: '+8.5%', icon: 'dollar-sign' },
            { title: 'Gastos', value: '€1.8M', change: '+3.2%', icon: 'credit-card' },
            { title: 'Beneficio Neto', value: '€600K', change: '+15.7%', icon: 'trending-up' },
            { title: 'EBITDA', value: '€780K', change: '+12.3%', icon: 'bar-chart' },
            { title: 'Ratios Liquidez', value: '2.4', change: '-0.1', icon: 'droplets' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 20px; height: 20px; color: var(--mep-primary-500);"></i>
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${kpi.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">${kpi.title}</div>
                <div style="font-size: var(--font-size-sm); color: ${kpi.change.startsWith('+') ? 'var(--mep-success)' : 'var(--mep-error)'};">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }

    renderCashFlowChart() {
        return `
            <div class="chart-container">
                <canvas id="cashflow-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="trending-up" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Flujo de Caja Mensual</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Entrada vs Salida</div>
                </div>
            </div>
        `;
    }

    renderPLChart() {
        return `
            <div class="chart-container">
                <canvas id="pl-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="pie-chart" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Estado de Resultados</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Ingresos vs Gastos</div>
                </div>
            </div>
        `;
    }

    renderAccountBalances() {
        const accounts = [
            { code: '1100', name: 'Efectivo en Banco', balance: '€458,230', type: 'Activo' },
            { code: '1200', name: 'Cuentas por Cobrar', balance: '€234,567', type: 'Activo' },
            { code: '1300', name: 'Inventario', balance: '€567,890', type: 'Activo' },
            { code: '2100', name: 'Cuentas por Pagar', balance: '€123,456', type: 'Pasivo' },
            { code: '2200', name: 'Préstamos Bancarios', balance: '€345,678', type: 'Pasivo' },
            { code: '3100', name: 'Capital Social', balance: '€500,000', type: 'Capital' }
        ];

        return `
            <table class="erp-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre de Cuenta</th>
                        <th>Tipo</th>
                        <th>Balance</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${accounts.map(account => `
                        <tr>
                            <td style="font-weight: 600;">${account.code}</td>
                            <td>${account.name}</td>
                            <td>
                                <span class="badge ${account.type === 'Activo' ? 'badge-success' : account.type === 'Pasivo' ? 'badge-warning' : 'badge-info'}">
                                    ${account.type}
                                </span>
                            </td>
                            <td style="font-weight: 600; text-align: right;">${account.balance}</td>
                            <td>
                                <span class="status-indicator status-active"></span>
                                Activa
                            </td>
                            <td>
                                <button class="btn btn-sm btn-ghost" onclick="erpModule.viewAccountDetails('${account.code}')">
                                    <i data-lucide="eye"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderBudgetChart() {
        return `
            <div class="chart-container">
                <canvas id="budget-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="target" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Análisis Presupuestario</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Presupuesto vs Ejecución Real</div>
                </div>
            </div>
        `;
    }

    renderInventoryKPIs() {
        const kpis = [
            { title: 'Valor Total Stock', value: '€1.2M', change: '+5.2%', icon: 'package' },
            { title: 'Productos Activos', value: '1,247', change: '+23', icon: 'box' },
            { title: 'Rotación Stock', value: '4.8x', change: '+0.3', icon: 'repeat' },
            { title: 'Stock Crítico', value: '23', change: '-5', icon: 'alert-triangle' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 20px; height: 20px; color: var(--mep-primary-500);"></i>
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${kpi.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">${kpi.title}</div>
                <div style="font-size: var(--font-size-sm); color: ${kpi.change.startsWith('+') ? 'var(--mep-success)' : kpi.change.startsWith('-') ? 'var(--mep-error)' : 'var(--mep-info)'};">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }

    renderStockLevelsChart() {
        return `
            <div class="chart-container">
                <canvas id="stock-levels-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="bar-chart-3" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Distribución de Stock</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Por categorías de productos</div>
                </div>
            </div>
        `;
    }

    renderMovementChart() {
        return `
            <div class="chart-container">
                <canvas id="movement-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="activity" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Movimientos de Inventario</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Entradas vs Salidas</div>
                </div>
            </div>
        `;
    }

    renderInventoryTable() {
        const products = [
            { sku: 'PRD-001', name: 'Laptop Dell XPS 13', category: 'Electrónicos', stock: 45, min: 10, max: 100, value: '€67,500', status: 'normal' },
            { sku: 'PRD-002', name: 'Monitor Samsung 27"', category: 'Electrónicos', stock: 8, min: 15, max: 50, value: '€2,400', status: 'low' },
            { sku: 'PRD-003', name: 'Silla Ergonómica', category: 'Oficina', stock: 23, min: 5, max: 30, value: '€6,900', status: 'normal' },
            { sku: 'PRD-004', name: 'Papel A4 500 hojas', category: 'Oficina', stock: 156, min: 50, max: 200, value: '€780', status: 'normal' },
            { sku: 'PRD-005', name: 'Detergente Industrial', category: 'Limpieza', stock: 3, min: 10, max: 40, value: '€150', status: 'critical' }
        ];

        return `
            <table class="erp-table">
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Stock Actual</th>
                        <th>Min/Max</th>
                        <th>Valor Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                        <tr>
                            <td style="font-weight: 600; color: var(--mep-primary-600);">${product.sku}</td>
                            <td>${product.name}</td>
                            <td>
                                <span class="badge badge-secondary">${product.category}</span>
                            </td>
                            <td style="font-weight: 600; text-align: center;">${product.stock}</td>
                            <td style="text-align: center; color: var(--text-secondary);">${product.min}/${product.max}</td>
                            <td style="font-weight: 600; text-align: right;">${product.value}</td>
                            <td>
                                <span class="status-indicator status-${product.status === 'normal' ? 'active' : product.status === 'low' ? 'warning' : 'error'}"></span>
                                ${product.status === 'normal' ? 'Normal' : product.status === 'low' ? 'Bajo' : 'Crítico'}
                            </td>
                            <td>
                                <div style="display: flex; gap: 0.25rem;">
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.editProduct('${product.sku}')">
                                        <i data-lucide="edit"></i>
                                    </button>
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.adjustStock('${product.sku}')">
                                        <i data-lucide="plus-minus"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    renderProcurementKPIs() {
        const kpis = [
            { title: 'Gasto Total', value: '€890K', change: '+12.1%', icon: 'shopping-cart' },
            { title: 'Órdenes Activas', value: '67', change: '+8', icon: 'file-text' },
            { title: 'Proveedores', value: '145', change: '+3', icon: 'building' },
            { title: 'Tiempo Promedio', value: '5.2 días', change: '-0.8', icon: 'clock' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 20px; height: 20px; color: var(--mep-primary-500);"></i>
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem;">${kpi.value}</div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">${kpi.title}</div>
                <div style="font-size: var(--font-size-sm); color: ${kpi.change.startsWith('+') ? 'var(--mep-success)' : kpi.change.startsWith('-') && kpi.title.includes('Tiempo') ? 'var(--mep-success)' : 'var(--mep-error)'};">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }

    renderSpendingChart() {
        return `
            <div class="chart-container">
                <canvas id="spending-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="pie-chart" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Distribución del Gasto</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Por categorías</div>
                </div>
            </div>
        `;
    }

    renderVendorPerformance() {
        return `
            <div class="chart-container">
                <canvas id="vendor-performance-chart"></canvas>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i data-lucide="users" style="width: 48px; height: 48px; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <div>Evaluación de Proveedores</div>
                    <div style="font-size: var(--font-size-xs); margin-top: 0.5rem;">Calidad, Tiempo, Precio</div>
                </div>
            </div>
        `;
    }

    renderPurchaseOrdersTable() {
        const orders = [
            { po: 'PO-2025-001', vendor: 'Tech Supplies Inc', amount: '€15,420', status: 'Aprobado', date: '2025-05-30', delivery: '2025-06-05' },
            { po: 'PO-2025-002', vendor: 'Office Solutions', amount: '€8,750', status: 'Pendiente', date: '2025-05-29', delivery: '2025-06-03' },
            { po: 'PO-2025-003', vendor: 'Industrial Parts', amount: '€23,100', status: 'Enviado', date: '2025-05-28', delivery: '2025-06-01' },
            { po: 'PO-2025-004', vendor: 'Material Express', amount: '€12,340', status: 'Recibido', date: '2025-05-27', delivery: '2025-05-30' }
        ];

        return `
            <table class="erp-table">
                <thead>
                    <tr>
                        <th>N° Orden</th>
                        <th>Proveedor</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Fecha Orden</th>
                        <th>Entrega Esperada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td style="font-weight: 600; color: var(--mep-primary-600);">${order.po}</td>
                            <td>${order.vendor}</td>
                            <td style="font-weight: 600; text-align: right;">${order.amount}</td>
                            <td>
                                <span class="status-indicator status-${order.status === 'Recibido' ? 'active' : order.status === 'Pendiente' ? 'warning' : 'info'}"></span>
                                ${order.status}
                            </td>
                            <td style="color: var(--text-secondary);">${new Date(order.date).toLocaleDateString()}</td>
                            <td style="color: var(--text-secondary);">${new Date(order.delivery).toLocaleDateString()}</td>
                            <td>
                                <div style="display: flex; gap: 0.25rem;">
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.viewPO('${order.po}')">
                                        <i data-lucide="eye"></i>
                                    </button>
                                    <button class="btn btn-sm btn-ghost" onclick="erpModule.trackPO('${order.po}')">
                                        <i data-lucide="truck"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Continue with remaining render methods...;
        this.data = {
            financials: this.generateFinancialData(),
            inventory: this.generateInventoryData(),
            purchases: this.generatePurchaseData(),
            sales: this.generateSalesData(),
            hr: this.generateHRData(),
            production: this.generateProductionData(),
            operations: this.generateOperationsData(),
            analytics: this.generateAnalyticsData()
        };
        this.charts = {};
        this.notifications = [];
        this.userPermissions = this.getUserPermissions();
    }

    async render(container) {
        container.innerHTML = this.renderMainStructure();
        this.initializeERP();
    }

    renderMainStructure() {
        return `
            <div class="module-content" id="erp-module">
                <!-- ERP Header -->
                <div class="erp-header" style="background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); 
                                                padding: var(--space-2xl); border-radius: var(--radius-lg); 
                                                color: white; margin-bottom: var(--space-2xl);">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: var(--space-sm);">
                                ERP Enterprise Suite
                            </h1>
                            <p style="font-size: var(--font-size-lg); opacity: 0.9;">
                                Sistema integral de planificación de recursos empresariales
                            </p>
                        </div>
                        <div style="display: flex; gap: 2rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; font-weight: 800;">€8.4M</div>
                                <div style="opacity: 0.8;">Revenue Anual</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; font-weight: 800;">1,247</div>
                                <div style="opacity: 0.8;">Productos</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; font-weight: 800;">97%</div>
                                <div style="opacity: 0.8;">Eficiencia</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="erp-nav" style="display: flex; gap: var(--space-md); margin-bottom: var(--space-2xl); 
                                           border-bottom: 2px solid var(--border-primary); overflow-x: auto;">
                    <button class="erp-tab active" data-tab="dashboard" onclick="erpModule.switchTab('dashboard')">
                        <i data-lucide="layout-dashboard"></i>
                        Dashboard
                    </button>
                    <button class="erp-tab" data-tab="financials" onclick="erpModule.switchTab('financials')">
                        <i data-lucide="dollar-sign"></i>
                        Financials
                    </button>
                    <button class="erp-tab" data-tab="inventory" onclick="erpModule.switchTab('inventory')">
                        <i data-lucide="package"></i>
                        Inventario
                    </button>
                    <button class="erp-tab" data-tab="procurement" onclick="erpModule.switchTab('procurement')">
                        <i data-lucide="shopping-cart"></i>
                        Compras
                    </button>
                    <button class="erp-tab" data-tab="sales" onclick="erpModule.switchTab('sales')">
                        <i data-lucide="trending-up"></i>
                        Ventas
                    </button>
                    <button class="erp-tab" data-tab="production" onclick="erpModule.switchTab('production')">
                        <i data-lucide="cog"></i>
                        Producción
                    </button>
                    <button class="erp-tab" data-tab="hr" onclick="erpModule.switchTab('hr')">
                        <i data-lucide="users"></i>
                        RRHH
                    </button>
                    <button class="erp-tab" data-tab="analytics" onclick="erpModule.switchTab('analytics')">
                        <i data-lucide="bar-chart-3"></i>
                        Analytics
                    </button>
                </div>

                <!-- Tab Contents -->
                <div class="erp-content">
                    ${this.renderDashboardTab()}
                    ${this.renderFinancialsTab()}
                    ${this.renderInventoryTab()}
                    ${this.renderProcurementTab()}
                    ${this.renderSalesTab()}
                    ${this.renderProductionTab()}
                    ${this.renderHRTab()}
                    ${this.renderAnalyticsTab()}
                </div>
            </div>

            <!-- Modals -->
            ${this.renderModals()}

            <style>
                .erp-tab {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    padding: var(--space-lg) var(--space-xl);
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    font-weight: 600;
                    cursor: pointer;
                    border-bottom: 3px solid transparent;
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .erp-tab:hover {
                    color: var(--text-primary);
                    background: var(--bg-secondary);
                }

                .erp-tab.active {
                    color: var(--mep-primary-600);
                    border-bottom-color: var(--mep-primary-500);
                    background: var(--mep-primary-50);
                }

                .erp-tab-content {
                    display: none;
                }

                .erp-tab-content.active {
                    display: block;
                    animation: fadeIn 0.3s ease-in-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .erp-card {
                    background: white;
                    border-radius: var(--radius-lg);
                    padding: var(--space-xl);
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--border-secondary);
                    transition: all 0.2s;
                }

                .erp-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-xl);
                }

                .erp-metric {
                    background: white;
                    border-radius: var(--radius-lg);
                    padding: var(--space-lg);
                    box-shadow: var(--shadow-md);
                    border: 1px solid var(--border-secondary);
                    text-align: center;
                    transition: all 0.2s;
                }

                .erp-metric:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lg);
                }

                .process-flow {
                    display: flex;
                    align-items: center;
                    gap: var(--space-lg);
                    padding: var(--space-lg);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    margin-bottom: var(--space-md);
                    overflow-x: auto;
                }

                .process-step {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                    padding: var(--space-md);
                    background: white;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-sm);
                    min-width: 200px;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }

                .process-step:hover {
                    transform: scale(1.02);
                    box-shadow: var(--shadow-md);
                }

                .process-step::after {
                    content: '→';
                    position: absolute;
                    right: -20px;
                    font-size: 1.5rem;
                    color: var(--text-secondary);
                }

                .process-step:last-child::after {
                    display: none;
                }

                .status-indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: var(--space-xs);
                }

                .status-active { background: var(--mep-success); }
                .status-pending { background: var(--mep-warning); }
                .status-error { background: var(--mep-error); }
                .status-info { background: var(--mep-info); }

                .department-widget {
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    border-radius: var(--radius-lg);
                    padding: var(--space-lg);
                    margin-bottom: var(--space-md);
                    border-left: 4px solid var(--mep-primary-500);
                    transition: all 0.2s;
                }

                .department-widget:hover {
                    transform: translateX(5px);
                    box-shadow: var(--shadow-lg);
                }

                .erp-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                }

                .erp-table th, .erp-table td {
                    padding: var(--space-md);
                    text-align: left;
                    border-bottom: 1px solid var(--border-secondary);
                }

                .erp-table th {
                    background: var(--bg-secondary);
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .erp-table tr:hover {
                    background: var(--mep-primary-50);
                }

                .chart-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-md);
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }

                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                }

                .modal.active {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal-content {
                    background: white;
                    border-radius: var(--radius-lg);
                    padding: var(--space-2xl);
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                @media (max-width: 768px) {
                    .erp-nav {
                        overflow-x: auto;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    
                    .erp-nav::-webkit-scrollbar {
                        display: none;
                    }
                    
                    .erp-header div[style*="display: flex"] {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
            </style>
        `;
    }

    renderDashboardTab() {
        return `
            <div class="erp-tab-content active" id="erp-dashboard">
                <!-- Quick Filters -->
                <div style="background: var(--bg-secondary); padding: var(--space-lg); border-radius: var(--radius-lg); 
                           margin-bottom: var(--space-xl); display: flex; gap: var(--space-lg); align-items: center; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                        <label style="font-weight: 600;">Período:</label>
                        <select class="form-select" onchange="erpModule.updateFilter('dateRange', this.value)">
                            <option value="7d">Últimos 7 días</option>
                            <option value="30d" selected>Últimos 30 días</option>
                            <option value="90d">Últimos 90 días</option>
                            <option value="1y">Último año</option>
                        </select>
                        <select class="form-select" onchange="erpModule.updateFilter('department', this.value)">
                            <option value="all">Todos los departamentos</option>
                            <option value="finance">Finanzas</option>
                            <option value="operations">Operaciones</option>
                            <option value="hr">RRHH</option>
                            <option value="production">Producción</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" onclick="erpModule.exportDashboard()">
                        <i data-lucide="download"></i>
                        Exportar Dashboard
                    </button>
                </div>

                <!-- Executive KPIs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    ${this.renderExecutiveKPIs()}
                </div>

                <!-- Main Dashboard Grid -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <!-- Financial Overview -->
                    <div class="erp-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                                Overview Financiero
                            </h3>
                            <div style="display: flex; gap: 0.5rem;">
                                <button class="btn btn-sm btn-ghost active" onclick="erpModule.switchView('financial', 'monthly')">Mensual</button>
                                <button class="btn btn-sm btn-ghost" onclick="erpModule.switchView('financial', 'quarterly')">Trimestral</button>
                                <button class="btn btn-sm btn-ghost" onclick="erpModule.switchView('financial', 'yearly')">Anual</button>
                            </div>
                        </div>
                        <div style="height: 350px;">${this.renderFinancialChart()}</div>
                    </div>

                    <!-- Operational Status -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Estado Operacional
                        </h3>
                        <div style="height: 350px; overflow-y: auto;">${this.renderOperationalStatus()}</div>
                    </div>
                </div>

                <!-- Department Status Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    ${this.renderDepartmentWidgets()}
                </div>

                <!-- Process Flow -->
                <div class="erp-card" style="margin-bottom: 2rem;">
                    <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                        Flujo de Procesos en Tiempo Real
                    </h3>
                    ${this.renderProcessFlow()}
                </div>

                <!-- Recent Transactions -->
                <div class="erp-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                            Transacciones Recientes
                        </h3>
                        <button class="btn btn-ghost" onclick="erpModule.viewAllTransactions()">
                            Ver todas
                            <i data-lucide="arrow-right"></i>
                        </button>
                    </div>
                    <div style="overflow-x: auto;">
                        ${this.renderRecentTransactions()}
                    </div>
                </div>
            </div>
        `;
    }

    renderFinancialsTab() {
        return `
            <div class="erp-tab-content" id="erp-financials">
                <!-- Financials Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">Centro Financiero</h2>
                        <p style="color: var(--text-secondary);">Gestión integral de finanzas y contabilidad</p>
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="erpModule.reconcileAccounts()">
                            <i data-lucide="check-square"></i>
                            Conciliar Cuentas
                        </button>
                        <button class="btn btn-secondary" onclick="erpModule.generateReport()">
                            <i data-lucide="file-text"></i>
                            Generar Reporte
                        </button>
                        <button class="btn btn-primary" onclick="erpModule.showNewTransactionModal()">
                            <i data-lucide="plus"></i>
                            Nueva Transacción
                        </button>
                    </div>
                </div>

                <!-- Financial KPIs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.renderFinancialKPIs()}
                </div>

                <!-- Financial Charts Grid -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Cash Flow -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Flujo de Caja
                        </h3>
                        <div style="height: 300px;">${this.renderCashFlowChart()}</div>
                    </div>

                    <!-- P&L Summary -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Pérdidas y Ganancias
                        </h3>
                        <div style="height: 300px;">${this.renderPLChart()}</div>
                    </div>
                </div>

                <!-- Account Balances -->
                <div class="erp-card" style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                            Balances de Cuentas
                        </h3>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-sm btn-ghost" onclick="erpModule.exportBalances()">
                                <i data-lucide="download"></i>
                                Exportar
                            </button>
                            <button class="btn btn-sm btn-ghost" onclick="erpModule.refreshBalances()">
                                <i data-lucide="refresh-cw"></i>
                                Actualizar
                            </button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        ${this.renderAccountBalances()}
                    </div>
                </div>

                <!-- Budget vs Actual -->
                <div class="erp-card">
                    <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                        Presupuesto vs Real
                    </h3>
                    <div style="height: 400px;">${this.renderBudgetChart()}</div>
                </div>
            </div>
        `;
    }

    renderInventoryTab() {
        return `
            <div class="erp-tab-content" id="erp-inventory">
                <!-- Inventory Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">Gestión de Inventario</h2>
                        <p style="color: var(--text-secondary);">Control y optimización de stock</p>
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="erpModule.stockTake()">
                            <i data-lucide="clipboard-check"></i>
                            Inventario Físico
                        </button>
                        <button class="btn btn-secondary" onclick="erpModule.generateStockReport()">
                            <i data-lucide="bar-chart"></i>
                            Reporte Stock
                        </button>
                        <button class="btn btn-primary" onclick="erpModule.showNewProductModal()">
                            <i data-lucide="plus"></i>
                            Nuevo Producto
                        </button>
                    </div>
                </div>

                <!-- Inventory Alerts -->
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%); padding: var(--space-lg); 
                           border-radius: var(--radius-lg); margin-bottom: 1.5rem; border-left: 4px solid #f59e0b;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                        <i data-lucide="alert-triangle" style="width: 24px; height: 24px; color: #f59e0b;"></i>
                        <div style="flex: 1;">
                            <h4 style="font-weight: 700; color: #92400e; margin-bottom: 0.25rem;">Alertas de Inventario</h4>
                            <p style="color: #92400e; font-size: var(--font-size-sm);">
                                23 productos por debajo del stock mínimo • 8 productos sin movimiento en 90 días
                            </p>
                        </div>
                        <button class="btn btn-sm" style="background: #f59e0b; color: white;" onclick="erpModule.viewAlerts()">
                            Ver Alertas
                        </button>
                    </div>
                </div>

                <!-- Inventory KPIs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.renderInventoryKPIs()}
                </div>

                <!-- Inventory Charts -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Stock Levels -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Niveles de Stock por Categoría
                        </h3>
                        <div style="height: 300px;">${this.renderStockLevelsChart()}</div>
                    </div>

                    <!-- Movement Analysis -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Análisis de Movimientos
                        </h3>
                        <div style="height: 300px;">${this.renderMovementChart()}</div>
                    </div>
                </div>

                <!-- Product Table -->
                <div class="erp-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                            Productos en Inventario
                        </h3>
                        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                            <input type="text" placeholder="Buscar productos..." class="form-input" style="min-width: 200px;">
                            <select class="form-select">
                                <option>Todas las categorías</option>
                                <option>Electrónicos</option>
                                <option>Oficina</option>
                                <option>Limpieza</option>
                            </select>
                            <button class="btn btn-sm btn-ghost">
                                <i data-lucide="filter"></i>
                                Filtros
                            </button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        ${this.renderInventoryTable()}
                    </div>
                </div>
            </div>
        `;
    }

    renderProcurementTab() {
        return `
            <div class="erp-tab-content" id="erp-procurement">
                <!-- Procurement Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">Gestión de Compras</h2>
                        <p style="color: var(--text-secondary);">Procurement y gestión de proveedores</p>
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="erpModule.vendorManagement()">
                            <i data-lucide="building"></i>
                            Gestión Proveedores
                        </button>
                        <button class="btn btn-secondary" onclick="erpModule.approvalWorkflow()">
                            <i data-lucide="check-circle"></i>
                            Flujo Aprobación
                        </button>
                        <button class="btn btn-primary" onclick="erpModule.showNewPurchaseOrderModal()">
                            <i data-lucide="plus"></i>
                            Nueva Orden
                        </button>
                    </div>
                </div>

                <!-- Approval Queue -->
                <div style="background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%); padding: var(--space-lg); 
                           border-radius: var(--radius-lg); margin-bottom: 1.5rem; color: white;">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <i data-lucide="clock" style="width: 24px; height: 24px;"></i>
                            <div>
                                <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Pendientes de Aprobación</h4>
                                <p style="opacity: 0.9; font-size: var(--font-size-sm);">
                                    12 órdenes pendientes por valor de €45,230
                                </p>
                            </div>
                        </div>
                        <button class="btn btn-sm" style="background: white; color: #3b82f6;" onclick="erpModule.viewApprovalQueue()">
                            Revisar Pendientes
                        </button>
                    </div>
                </div>

                <!-- Procurement KPIs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.renderProcurementKPIs()}
                </div>

                <!-- Procurement Analytics -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Spending Analysis -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Análisis de Gastos
                        </h3>
                        <div style="height: 300px;">${this.renderSpendingChart()}</div>
                    </div>

                    <!-- Vendor Performance -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Performance Proveedores
                        </h3>
                        <div style="height: 300px;">${this.renderVendorPerformance()}</div>
                    </div>
                </div>

                <!-- Purchase Orders -->
                <div class="erp-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                            Órdenes de Compra
                        </h3>
                        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                            <select class="form-select">
                                <option>Todos los estados</option>
                                <option>Pendiente</option>
                                <option>Aprobado</option>
                                <option>Enviado</option>
                                <option>Recibido</option>
                            </select>
                            <button class="btn btn-sm btn-ghost">
                                <i data-lucide="download"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        ${this.renderPurchaseOrdersTable()}
                    </div>
                </div>
            </div>
        `;
    }

    renderSalesTab() {
        return `
            <div class="erp-tab-content" id="erp-sales">
                <!-- Sales Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">Gestión de Ventas</h2>
                        <p style="color: var(--text-secondary);">Sales Operations y análisis comercial</p>
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="erpModule.priceManagement()">
                            <i data-lucide="tag"></i>
                            Gestión Precios
                        </button>
                        <button class="btn btn-secondary" onclick="erpModule.customerAnalysis()">
                            <i data-lucide="users"></i>
                            Análisis Clientes
                        </button>
                        <button class="btn btn-primary" onclick="erpModule.showNewSalesOrderModal()">
                            <i data-lucide="plus"></i>
                            Nueva Venta
                        </button>
                    </div>
                </div>

                <!-- Sales Goals -->
                <div style="background: linear-gradient(135deg, #dcfce7 0%, #10b981 100%); padding: var(--space-lg); 
                           border-radius: var(--radius-lg); margin-bottom: 1.5rem; color: white;">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <i data-lucide="target" style="width: 24px; height: 24px;"></i>
                            <div>
                                <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Objetivos de Venta</h4>
                                <p style="opacity: 0.9; font-size: var(--font-size-sm);">
                                    €1.2M de €1.5M objetivo mensual (80% completado)
                                </p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">€300K</div>
                                <div style="opacity: 0.8;">Falta</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">9 días</div>
                                <div style="opacity: 0.8;">Restantes</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sales KPIs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.renderSalesKPIs()}
                </div>

                <!-- Sales Charts -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Sales Trends -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Tendencias de Ventas
                        </h3>
                        <div style="height: 300px;">${this.renderSalesTrendsChart()}</div>
                    </div>

                    <!-- Customer Segments -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Segmentos de Clientes
                        </h3>
                        <div style="height: 300px;">${this.renderCustomerSegmentsChart()}</div>
                    </div>
                </div>

                <!-- Sales Orders -->
                <div class="erp-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                            Órdenes de Venta
                        </h3>
                        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                            <select class="form-select">
                                <option>Todos los estados</option>
                                <option>Cotización</option>
                                <option>Confirmado</option>
                                <option>En proceso</option>
                                <option>Enviado</option>
                                <option>Entregado</option>
                            </select>
                            <button class="btn btn-sm btn-ghost">
                                <i data-lucide="download"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        ${this.renderSalesOrdersTable()}
                    </div>
                </div>
            </div>
        `;
    }

    renderProductionTab() {
        return `
            <div class="erp-tab-content" id="erp-production">
                <!-- Production Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">Gestión de Producción</h2>
                        <p style="color: var(--text-secondary);">Planning y control de manufactura</p>
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="erpModule.capacityPlanning()">
                            <i data-lucide="calendar"></i>
                            Planificación
                        </button>
                        <button class="btn btn-secondary" onclick="erpModule.qualityControl()">
                            <i data-lucide="shield-check"></i>
                            Control Calidad
                        </button>
                        <button class="btn btn-primary" onclick="erpModule.showNewProductionOrderModal()">
                            <i data-lucide="plus"></i>
                            Nueva Orden
                        </button>
                    </div>
                </div>

                <!-- Production Status -->
                <div style="background: linear-gradient(135deg, #f3e8ff 0%, #8b5cf6 100%); padding: var(--space-lg); 
                           border-radius: var(--radius-lg); margin-bottom: 1.5rem; color: white;">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <i data-lucide="cog" style="width: 24px; height: 24px;"></i>
                            <div>
                                <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Estado de Producción</h4>
                                <p style="opacity: 0.9; font-size: var(--font-size-sm);">
                                    18 órdenes activas • 94% eficiencia operacional
                                </p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">847</div>
                                <div style="opacity: 0.8;">Unidades/día</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: 700;">2.3h</div>
                                <div style="opacity: 0.8;">Tiempo ciclo</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Production KPIs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.renderProductionKPIs()}
                </div>

                <!-- Production Charts -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Production Output -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Output de Producción
                        </h3>
                        <div style="height: 300px;">${this.renderProductionOutputChart()}</div>
                    </div>

                    <!-- Resource Utilization -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Utilización de Recursos
                        </h3>
                        <div style="height: 300px;">${this.renderResourceUtilizationChart()}</div>
                    </div>
                </div>

                <!-- Production Orders -->
                <div class="erp-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                            Órdenes de Producción
                        </h3>
                        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                            <select class="form-select">
                                <option>Todos los estados</option>
                                <option>Planificada</option>
                                <option>En proceso</option>
                                <option>Completada</option>
                                <option>Pausada</option>
                            </select>
                            <button class="btn btn-sm btn-ghost">
                                <i data-lucide="download"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        ${this.renderProductionOrdersTable()}
                    </div>
                </div>
            </div>
        `;
    }

    renderHRTab() {
        return `
            <div class="erp-tab-content" id="erp-hr">
                <!-- HR Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">Recursos Humanos</h2>
                        <p style="color: var(--text-secondary);">Gestión de personal y nóminas</p>
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="erpModule.payrollManagement()">
                            <i data-lucide="calculator"></i>
                            Nóminas
                        </button>
                        <button class="btn btn-secondary" onclick="erpModule.performanceReview()">
                            <i data-lucide="star"></i>
                            Evaluaciones
                        </button>
                        <button class="btn btn-primary" onclick="erpModule.showNewEmployeeModal()">
                            <i data-lucide="plus"></i>
                            Nuevo Empleado
                        </button>
                    </div>
                </div>

                <!-- HR Alerts -->
                <div style="background: linear-gradient(135deg, #fef2f2 0%, #ef4444 100%); padding: var(--space-lg); 
                           border-radius: var(--radius-lg); margin-bottom: 1.5rem; color: white;">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <i data-lucide="alert-circle" style="width: 24px; height: 24px;"></i>
                            <div>
                                <h4 style="font-weight: 700; margin-bottom: 0.25rem;">Alertas de RRHH</h4>
                                <p style="opacity: 0.9; font-size: var(--font-size-sm);">
                                    5 contratos por vencer • 3 evaluaciones pendientes
                                </p>
                            </div>
                        </div>
                        <button class="btn btn-sm" style="background: white; color: #ef4444;" onclick="erpModule.viewHRAlerts()">
                            Ver Alertas
                        </button>
                    </div>
                </div>

                <!-- HR KPIs -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.renderHRKPIs()}
                </div>

                <!-- HR Charts -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Headcount Analysis -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Análisis de Personal
                        </h3>
                        <div style="height: 300px;">${this.renderHeadcountChart()}</div>
                    </div>

                    <!-- Attendance Tracking -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Control de Asistencia
                        </h3>
                        <div style="height: 300px;">${this.renderAttendanceChart()}</div>
                    </div>
                </div>

                <!-- Employee Table -->
                <div class="erp-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary);">
                            Directorio de Empleados
                        </h3>
                        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                            <input type="text" placeholder="Buscar empleados..." class="form-input" style="min-width: 200px;">
                            <select class="form-select">
                                <option>Todos los departamentos</option>
                                <option>Administración</option>
                                <option>Ventas</option>
                                <option>Producción</option>
                                <option>IT</option>
                            </select>
                            <button class="btn btn-sm btn-ghost">
                                <i data-lucide="download"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                    <div style="overflow-x: auto;">
                        ${this.renderEmployeeTable()}
                    </div>
                </div>
            </div>
        `;
    }

    renderAnalyticsTab() {
        return `
            <div class="erp-tab-content" id="erp-analytics">
                <!-- Analytics Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">Business Analytics</h2>
                        <p style="color: var(--text-secondary);">Análisis avanzado y Business Intelligence</p>
                    </div>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="erpModule.customReports()">
                            <i data-lucide="file-bar-chart"></i>
                            Reportes Personalizados
                        </button>
                        <button class="btn btn-secondary" onclick="erpModule.dataExport()">
                            <i data-lucide="database"></i>
                            Exportar Datos
                        </button>
                        <button class="btn btn-primary" onclick="erpModule.showAnalyticsBuilder()">
                            <i data-lucide="plus"></i>
                            Nuevo Dashboard
                        </button>
                    </div>
                </div>

                <!-- Analytics Overview -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    ${this.renderAnalyticsKPIs()}
                </div>

                <!-- Advanced Charts -->
                <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Executive Dashboard -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Executive Dashboard
                        </h3>
                        <div style="height: 400px;">${this.renderExecutiveDashboard()}</div>
                    </div>
                </div>

                <!-- Performance Metrics -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <!-- Profitability Analysis -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Análisis de Rentabilidad
                        </h3>
                        <div style="height: 300px;">${this.renderProfitabilityChart()}</div>
                    </div>

                    <!-- Operational Efficiency -->
                    <div class="erp-card">
                        <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                            Eficiencia Operacional
                        </h3>
                        <div style="height: 300px;">${this.renderEfficiencyChart()}</div>
                    </div>
                </div>

                <!-- Predictive Analytics -->
                <div class="erp-card">
                    <h3 style="font-size: var(--font-size-xl); font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
                        Análisis Predictivo
                    </h3>
                    <div style="height: 400px;">${this.renderPredictiveChart()}</div>
                </div>
            </div>
        `;
    }

    // Render Methods for Components
    renderExecutiveKPIs() {
        const kpis = [
            { title: 'Revenue Total', value: '€8.4M', change: '+12.5%', color: 'success', icon: 'dollar-sign' },
            { title: 'Margen Bruto', value: '34.2%', change: '+2.1%', color: 'success', icon: 'trending-up' },
            { title: 'Flujo de Caja', value: '€1.2M', change: '-5.3%', color: 'warning', icon: 'repeat' },
            { title: 'ROI', value: '18.7%', change: '+3.2%', color: 'success', icon: 'target' }
        ];

        return kpis.map(kpi => `
            <div class="erp-metric">
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                    <i data-lucide="${kpi.icon}" style="width: 24px; height: 24px; color: var(--mep-${kpi.color});"></i>
                </div>
                <div style="font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem;">
                    ${kpi.value}
                </div>
                <div style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: 0.25rem;">
                    ${kpi.title}
                </div>
                <div style="font-size: var(--font-size-sm); color: var(--mep-${kpi.color}); font-weight: 600;">
                    ${kpi.change}
                </div>
            </div>
        `).join('');
    }
