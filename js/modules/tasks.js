// ===== TASKS MODULE =====
class TasksModule {
    constructor() {
        this.storageKey = 'mep-tasks';
        this.tasks = MEP_Utils.storage.get(this.storageKey, []);
        this.filters = { priority: 'all', search: '' };
        this.currentEditId = null;
    }

    async render(container) {
        const priorityOptions = Object.entries(MEP_CONFIG.TASK_PRIORITY)
            .map(([key, cfg]) => `<option value="${key}">${cfg.label}</option>`)
            .join('');
        const html = `
            <div class="module-content" id="tasks-module">
                <div class="flex items-center justify-between mb-6">
                    <h2>Gestión de Tareas</h2>
                    <button class="btn btn-primary" id="new-task-btn">
                        <i data-lucide="plus"></i> Nueva Tarea
                    </button>
                </div>
                <div class="flex items-center gap-4 mb-4">
                    <select id="filter-priority" class="form-select w-48">
                        <option value="all">Todas las prioridades</option>
                        ${priorityOptions}
                    </select>
                    <input type="text" id="search-task" class="form-input flex-1" placeholder="Buscar tarea…" />
                </div>
                <div id="tasks-list">
                    ${this.renderTasksList()}
                </div>
                ${this.renderTaskModal()}
            </div>
        `;
        container.innerHTML = html;
        window.tasksModule = this;
    }

    async afterRender() {
        // New task
        MEP_Utils.$('#new-task-btn').addEventListener('click', () => this.openModal());
        // Filtrar prioridad
        MEP_Utils.$('#filter-priority')
            .addEventListener('change', e => {
                this.filters.priority = e.target.value;
                this.updateList();
            });
        // Buscar
        MEP_Utils.$('#search-task')
            .addEventListener('input',
                MEP_Utils.debounce(e => {
                    this.filters.search = e.target.value;
                    this.updateList();
                }, MEP_CONFIG.UI.DEBOUNCE_DELAY)
            );
        // Delegate botones editar/eliminar
        MEP_Utils.delegate(MEP_Utils.$('#tasks-list'), '.btn-edit', 'click', e => {
            const id = MEP_Utils.getData(e.target.closest('.task-item'), 'id');
            this.openModal(id);
        });
        MEP_Utils.delegate(MEP_Utils.$('#tasks-list'), '.btn-delete', 'click', e => {
            const id = MEP_Utils.getData(e.target.closest('.task-item'), 'id');
            this.deleteTask(id);
        });
        // Formulario modal
        const modal = MEP_Utils.$('#task-modal');
        MEP_Utils.$('#task-form').addEventListener('submit', e => {
            e.preventDefault();
            this.saveTask();
        });
        MEP_Utils.$('#modal-cancel').addEventListener('click', () => this.closeModal());
    }

    renderTasksList() {
        const filtered = this.tasks.filter(t => {
            const okPriority = this.filters.priority === 'all' || t.priority === this.filters.priority;
            const okSearch   = t.title.toLowerCase().includes(this.filters.search.toLowerCase());
            return okPriority && okSearch;
        });
        if (!filtered.length) {
            return `<p class="text-center text-secondary">No hay tareas que mostrar</p>`;
        }
        return filtered.map(t => `
            <div class="task-item flex items-center justify-between p-4 mb-2 border rounded"
                 data-id="${t.id}">
                <div>
                    <h4 class="mb-1">${t.title}</h4>
                    <p class="text-sm text-tertiary mb-1">${t.dueDate}</p>
                    <span class="badge badge-${MEP_CONFIG.TASK_PRIORITY[t.priority].color}">
                        ${MEP_CONFIG.TASK_PRIORITY[t.priority].label}
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn btn-ghost btn-sm btn-edit">
                        <i data-lucide="edit-2"></i>
                    </button>
                    <button class="btn btn-ghost btn-sm btn-delete">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderTaskModal() {
        return `
            <div class="modal" id="task-modal">
                <div class="modal-content p-6">
                    <h3 id="modal-title">Nueva Tarea</h3>
                    <form id="task-form" class="space-y-4">
                        <div>
                            <label for="task-title">Título</label>
                            <input type="text" id="task-title" class="form-input" required />
                        </div>
                        <div>
                            <label for="task-due">Fecha Límite</label>
                            <input type="date" id="task-due" class="form-input" required />
                        </div>
                        <div>
                            <label for="task-priority">Prioridad</label>
                            <select id="task-priority" class="form-select" required>
                                ${Object.entries(MEP_CONFIG.TASK_PRIORITY)
                                  .map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}
                            </select>
                        </div>
                        <div class="flex justify-end gap-2">
                            <button type="button" id="modal-cancel" class="btn btn-secondary">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    updateList() {
        MEP_Utils.$('#tasks-list').innerHTML = this.renderTasksList();
    }

    openModal(id = null) {
        this.currentEditId = id;
        const m = MEP_Utils.$('#task-modal');
        const title = MEP_Utils.$('#modal-title');
        if (id) {
            const t = this.tasks.find(x => x.id === id);
            title.textContent = 'Editar Tarea';
            MEP_Utils.$('#task-title').value = t.title;
            MEP_Utils.$('#task-due').value   = t.dueDate;
            MEP_Utils.$('#task-priority').value = t.priority;
        } else {
            title.textContent = 'Nueva Tarea';
            MEP_Utils.$('#task-form').reset();
        }
        m.classList.add('show');
    }

    closeModal() {
        const m = MEP_Utils.$('#task-modal');
        if (m) m.classList.remove('show');
    }

    saveTask() {
        const title = MEP_Utils.$('#task-title').value.trim();
        const due   = MEP_Utils.$('#task-due').value;
        const prio  = MEP_Utils.$('#task-priority').value;
        if (!title || !due) return;
        if (this.currentEditId) {
            // Editar existente
            const idx = this.tasks.findIndex(t => t.id === this.currentEditId);
            this.tasks[idx] = { ...this.tasks[idx], title, dueDate: due, priority: prio };
            showNotification('Tarea actualizada', '', 'success');
        } else {
            // Nueva
            const newTask = {
                id: Date.now().toString(),
                title,
                dueDate: due,
                priority: prio
            };
            this.tasks.unshift(newTask);
            showNotification('Tarea creada', '', 'success');
        }
        MEP_Utils.storage.set(this.storageKey, this.tasks);
        this.closeModal();
        this.updateList();
    }

    deleteTask(id) {
        if (!confirm('¿Eliminar esta tarea?')) return;
        this.tasks = this.tasks.filter(t => t.id !== id);
        MEP_Utils.storage.set(this.storageKey, this.tasks);
        this.updateList();
        showNotification('Tarea eliminada', '', 'warning');
    }
}

// Instancia única
window.tasksModule = new TasksModule();
