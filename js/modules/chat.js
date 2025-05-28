// ===== CHAT MODULE =====
class ChatModule {
    constructor() {
        // Lista de chats (puedes cargar dinámicamente desde API en el futuro)
        this.chats = [
            { id: 'pedro-sanchez', name: 'Pedro Sánchez', avatar: 'P', unread: 2, lastMessage: 'La documentación está lista', lastActive: '2025-05-27T14:30:00' },
            { id: 'maria-garcia',  name: 'María García',  avatar: 'M', unread: 0, lastMessage: 'Nos vemos mañana',       lastActive: '2025-05-26T09:15:00' }
        ];
        // Historial de mensajes por chat guardado en localStorage
        this.storageKeyHistory = 'mep-chat-history';
        this.messages = MEP_Utils.storage.get(this.storageKeyHistory, {});
        // Borradores de texto
        this.drafts = MEP_Utils.storage.get(MEP_CONFIG.STORAGE.CHAT_DRAFTS, {});
        this.currentChat = null;
    }

    async render(container) {
        const chatHTML = `
            <div class="module-content" id="chat-module" style="display:flex; gap: var(--space-lg);">
                <!-- Sidebar de Chats -->
                <div class="chat-sidebar" style="width: 280px;">
                    <input type="text" id="chat-search" class="form-input mb-4" placeholder="Buscar chats…" />
                    <div id="chat-list">
                        ${this.chats.map(c => this.renderChatListItem(c)).join('')}
                    </div>
                </div>
                <!-- Ventana de Chat -->
                <div class="chat-window flex-1 flex flex-col border rounded-lg overflow-hidden">
                    ${this.currentChat 
                        ? this.renderChatWindow()
                        : '<div class="flex-1 flex items-center justify-center text-secondary">Selecciona un chat para empezar</div>'}
                </div>
            </div>
        `;
        container.innerHTML = chatHTML;
        // Exponer para handlers inline:
        window.chatModule = this;
    }

    async afterRender() {
        // Filtrar lista de chats
        MEP_Utils.$('#chat-search')
            .addEventListener('input',
                MEP_Utils.debounce(e => this.filterChats(e.target.value), MEP_CONFIG.UI.DEBOUNCE_DELAY)
            );

        if (this.currentChat) {
            // Rellenar borrador y bind de envío
            const input = MEP_Utils.$('#chat-input');
            const btn   = MEP_Utils.$('#chat-send');
            input.value = this.drafts[this.currentChat] || '';
            input.addEventListener('input', () => this.saveDraft());
            btn.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            // Scroll final
            this.scrollToBottom();
        }
    }

    renderChatListItem(chat) {
        const badge = chat.unread
            ? `<div class="badge badge-primary">${chat.unread}</div>`
            : '';
        return `
            <div class="chat-item flex items-center justify-between p-2 mb-2 cursor-pointer"
                 onclick="chatModule.selectChat('${chat.id}')">
                <div class="flex items-center gap-2">
                    <div class="avatar">${chat.avatar}</div>
                    <div>
                        <h4 class="mb-1">${chat.name}</h4>
                        <p class="text-sm text-secondary truncate">${chat.lastMessage}</p>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <span class="text-xs text-tertiary">${MEP_Utils.timeAgo(chat.lastActive)}</span>
                    ${badge}
                </div>
            </div>
        `;
    }

    renderChatWindow() {
        const chat = this.getChat(this.currentChat);
        const msgs = this.messages[this.currentChat] || [];
        return `
            <!-- Cabecera -->
            <div class="chat-header p-4 border-b flex items-center justify-between">
                <h3>${chat.name}</h3>
                <button class="btn btn-ghost" onclick="chatModule.closeConversation()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <!-- Mensajes -->
            <div id="chat-messages" class="chat-messages flex-1 overflow-y-auto p-4">
                ${msgs.map(m => `
                    <div class="chat-message ${m.sender==='me'?'sent':'received'} mb-2">
                        <p>${m.text}</p>
                        <span class="text-xs text-tertiary">${MEP_Utils.formatDate(m.timestamp,'HH:mm')}</span>
                    </div>
                `).join('')}
            </div>
            <!-- Input -->
            <div class="chat-input p-4 border-t flex items-center gap-2">
                <textarea id="chat-input" class="form-input flex-1" rows="2" placeholder="Escribe un mensaje…"></textarea>
                <button id="chat-send" class="btn btn-primary">Enviar</button>
            </div>
        `;
    }

    // —— Métodos de interacción ——

    filterChats(query) {
        const q = query.trim().toLowerCase();
        const filtered = this.chats.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.lastMessage.toLowerCase().includes(q)
        );
        MEP_Utils.$('#chat-list').innerHTML =
            filtered.map(c => this.renderChatListItem(c)).join('');
    }

    selectChat(chatId) {
        this.currentChat = chatId;
        const container = MEP_Utils.$('#pageContent');
        this.render(container).then(() => this.afterRender());
    }

    closeConversation() {
        this.currentChat = null;
        const container = MEP_Utils.$('#pageContent');
        this.render(container).then(() => this.afterRender());
    }

    sendMessage() {
        const input = MEP_Utils.$('#chat-input');
        const text  = input.value.trim();
        if (!text) return;
        const ts = new Date().toISOString();
        this.messages[this.currentChat] = this.messages[this.currentChat] || [];
        this.messages[this.currentChat].push({ sender: 'me', text, timestamp: ts });
        MEP_Utils.storage.set(this.storageKeyHistory, this.messages);
        // Limpiar borrador
        delete this.drafts[this.currentChat];
        MEP_Utils.storage.set(MEP_CONFIG.STORAGE.CHAT_DRAFTS, this.drafts);
        // Re-render mensajes
        this.selectChat(this.currentChat);
    }

    saveDraft() {
        const input = MEP_Utils.$('#chat-input');
        this.drafts[this.currentChat] = input.value;
        MEP_Utils.storage.set(MEP_CONFIG.STORAGE.CHAT_DRAFTS, this.drafts);
    }

    scrollToBottom() {
        const msgs = MEP_Utils.$('#chat-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }

    getChat(id) {
        return this.chats.find(c => c.id === id) || {};
    }
}

// Exponer módulo y sus handlers
window.chatModule = new ChatModule();
