// ===== SETTINGS MODULE =====
class SettingsModule {
    constructor() {
        this.key = MEP_CONFIG.STORAGE.NOTIFICATION_SETTINGS;
        // Cargar o inicializar ajustes
        this.settings = MEP_Utils.storage.get(this.key, {
            theme: MEP_CONFIG.THEME.DEFAULT,
            notifications: {}
        });
        // Asegurar defaults para cada tipo de notificación
        Object.keys(MEP_CONFIG.NOTIFICATIONS).forEach(type => {
            if (this.settings.notifications[type] === undefined) {
                this.settings.notifications[type] = true;
            }
        });
    }

    async render(container) {
        const notifItems = Object.entries(MEP_CONFIG.NOTIFICATIONS)
            .map(([type, cfg]) => `
                <div class="form-check mb-2">
                    <input type="checkbox" 
                           id="notif-${type}" 
                           data-notif-type="${type}" 
                           class="form-check-input" />
                    <label for="notif-${type}" class="form-check-label">
                        ${type.charAt(0)+type.slice(1).toLowerCase()}
                    </label>
                </div>
            `).join('');

        const html = `
            <div class="module-content" id="settings-module">
                <h2>Configuración</h2>
                <!-- Tema -->
                <div class="card mb-6 p-4">
                    <h3>Tema de la aplicación</h3>
                    <select id="settings-theme" class="form-select mt-2">
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                    </select>
                </div>
                <!-- Notificaciones -->
                <div class="card p-4">
                    <h3>Notificaciones</h3>
                    ${notifItems}
                </div>
            </div>
        `;
        container.innerHTML = html;
        window.settingsModule = this;
    }

    async afterRender() {
        // Elements
        const themeSelect = MEP_Utils.$('#settings-theme');
        themeSelect.value = this.settings.theme;
        themeSelect.addEventListener('change', e => {
            const t = e.target.value;
            this.settings.theme = t;
            window.app.setTheme(t);
            MEP_Utils.storage.set(MEP_CONFIG.STORAGE.THEME, t);
        });

        // Notificaciones
        MEP_Utils.$$('.form-check-input[data-notif-type]').forEach(cb => {
            const type = cb.dataset.notifType;
            cb.checked = this.settings.notifications[type];
            cb.addEventListener('change', e => {
                this.settings.notifications[type] = e.target.checked;
                MEP_Utils.storage.set(this.key, this.settings);
                showNotification('Configuración guardada', '', 'success');
            });
        });
    }
}

// Única instancia
window.settingsModule = new SettingsModule();
