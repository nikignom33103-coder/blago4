// ============================================
// Модуль управления электронной подписью
// Версия: 1.4.0
// г. Санкт-Петербург, 2026
// ============================================

const SignatureManager = {
    
    // Генерирует уникальный код подписи
    generateSignatureCode() {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substr(2, 9);
        return `SIG-${timestamp}-${random}`.toUpperCase();
    },

    // Получает текущее время в формате подписи
    getCurrentDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Moscow'
        };
        return now.toLocaleString('ru-RU', options);
    },

    // Создает объект подписи с полной информацией
    createSignature(userId, userName, userPosition = "Сотрудник") {
        return {
            signatureId: this.generateSignatureCode(),
            userId: userId,
            userName: userName,
            userPosition: userPosition,
            signatureDate: this.getCurrentDateTime(),
            timestamp: Date.now(),
            organization: appState.organization || "Благо дарить!",
            city: appState.city || "г. Санкт-Петербург",
            // Визуальная подпись (в реальном приложении могла бы быть настоящая подпись)
            visualSignature: this.generateVisualSignature(userName)
        };
    },

    // Генерирует визуальную подпись (инициалы + стиль)
    generateVisualSignature(name) {
        const parts = name.split(' ');
        const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
        
        // Цветовая схема подписей
        const colors = ['#2563eb', '#16a34a', '#ea580c', '#dc2626', '#7c3aed', '#0891b2'];
        const colorIndex = name.charCodeAt(0) % colors.length;
        
        return {
            initials: initials,
            color: colors[colorIndex],
            style: 'cursive'
        };
    },

    // Сохраняет подпись в базе данных
    async saveSignature(signature) {
        try {
            const signatureRef = database.ref(`signatures/${appState.currentUser.uid}/${signature.signatureId}`);
            await signatureRef.set(signature);
            
            // Сохраняем в историю подписей пользователя
            const historyRef = database.ref(`users/${appState.currentUser.uid}/signatureHistory`);
            const historySnapshot = await historyRef.once('value');
            let history = historySnapshot.val() || [];
            if (!Array.isArray(history)) history = [];
            
            history.push({
                signatureId: signature.signatureId,
                date: signature.signatureDate,
                document: "Неизвестный документ"
            });
            
            await historyRef.set(history);
            
            return signature;
        } catch (error) {
            console.error('❌ Ошибка при сохранении подписи:', error);
            throw error;
        }
    },

    // Получает все подписи пользователя
    async getUserSignatures() {
        try {
            const snapshot = await database.ref(`signatures/${appState.currentUser.uid}`).once('value');
            return snapshot.val() || {};
        } catch (error) {
            console.error('❌ Ошибка при загрузке подписей:', error);
            return {};
        }
    },

    // Создает HTML элемент подписи для печати
    createSignatureElement(signature) {
        return `
            <div class="signature-block" style="margin-top: 30px; padding: 15px; border: 2px solid ${signature.visualSignature.color}; border-radius: 8px; font-family: ${signature.visualSignature.style};">
                <div style="color: ${signature.visualSignature.color}; font-size: 24px; font-weight: bold; margin-bottom: 10px;">
                    ${signature.visualSignature.initials}
                </div>
                <div style="font-size: 12px; color: #333;">
                    <strong>${signature.userName}</strong><br>
                    ${signature.userPosition}<br>
                    ${signature.organization}<br>
                    <br>
                    📅 ${signature.signatureDate}<br>
                    🔐 ${signature.signatureId}
                </div>
            </div>
        `;
    },

    // Создает электронную подпись для документа
    createElectronicSignatureHTML(signature) {
        const bgColor = signature.visualSignature.color + '20'; // Прозрачность
        
        return `
            <div class="electronic-signature" style="
                background-color: ${bgColor};
                border: 2px dashed ${signature.visualSignature.color};
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                page-break-inside: avoid;
            ">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="
                        background-color: ${signature.visualSignature.color};
                        color: white;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28px;
                        font-weight: bold;
                        font-family: ${signature.visualSignature.style};
                    ">
                        ${signature.visualSignature.initials}
                    </div>
                    <div>
                        <div style="font-weight: bold; font-size: 14px;">✓ Электронная подпись</div>
                        <div style="font-size: 12px; color: #666;">
                            <strong>${signature.userName}</strong> — ${signature.userPosition}
                        </div>
                        <div style="font-size: 11px; color: #999; margin-top: 5px;">
                            Подписано: ${signature.signatureDate}<br>
                            Код: ${signature.signatureId}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Проверяет подпись (для верификации)
    async verifySignature(signatureId, userId) {
        try {
            const snapshot = await database.ref(`signatures/${userId}/${signatureId}`).once('value');
            return snapshot.exists();
        } catch (error) {
            console.error('❌ Ошибка при верификации подписи:', error);
            return false;
        }
    }
};

// Экспортируем модуль
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SignatureManager;
}
