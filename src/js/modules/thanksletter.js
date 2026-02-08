// ============================================
// Модуль управления благодарственными письмами
// Версия: 1.4.0  
// г. Санкт-Петербург, 2026
// ============================================

const ThanksLetterModule = {
    
    init() {
        this.loadTemplates();
        this.render();
    },

    // Шаблоны благодарственных писем
    templates: {
        formal: {
            name: "Официальное благодарственное письмо",
            icon: "📜",
            placeholder: `Благодарственное письмо

{{ORGANIZATION}}
г. {{CITY}}

БЛАГОДАРСТВЕННОЕ ПИСЬМО

Нижеподписавшиеся благодарим {{DONOR_NAME}} за оказанную благотворительную помощь в виде {{HELP_DESCRIPTION}} в поддержку нашей организации.

Ваш вклад имеет огромное значение для нас и помогает нам продолжать нашу важную работу.

С искренней благодарностью,

{{ORGANIZATION}}
г. {{CITY}}

Дата: {{DATE}}`
        },
        short: {
            name: "Краткое спасибо",
            icon: "🙏",
            placeholder: `Спасибо!

{{DONOR_NAME}}, спасибо Вам за {{HELP_DESCRIPTION}}!

Ваша помощь очень важна для нас.

С благодарностью,
{{ORGANIZATION}}`
        },
        detailed: {
            name: "Подробное благодарство",
            icon: "💝",
            placeholder: `ПОДРОБНОЕ БЛАГОДАРСТВЕННОЕ ПИСЬМО

{{ORGANIZATION}}
г. {{CITY}}

Уважаемый(ая) {{DONOR_NAME}}!

Мы благодарим Вас за подарок в виде {{HELP_DESCRIPTION}}.

📊 Информация о помощи:
• Тип помощи: {{HELP_TYPE}}
• Стоимость: {{HELP_AMOUNT}}
• Дата: {{DATE}}
• Получатели: {{RECIPIENTS}}

Мы ценим Вашу поддержку и хотим сообщить, что {{HELP_DESCRIPTION}} будет использовано по назначению для помощи нуждающимся.

Благодарим за Ваше внимание!

С благодарностью,
{{ORGANIZATION}}
г. {{CITY}}`
        },
        corporate: {
            name: "Для юридических лиц",
            icon: "🏢",
            placeholder: `БЛАГОДАРСТВЕННОЕ ПИСЬМО

{{ORGANIZATION}}
г. {{CITY}}

Благодарим компанию {{DONOR_NAME}} за благотворительный вклад в виде {{HELP_DESCRIPTION}}.

Вклад Вашей компании поддерживает нашу миссию помощи нуждающимся и позволяет нам расширять масштабы деятельности.

Мы предлагаем стать партнером в наших будущих проектах.

С благодарностью,
{{ORGANIZATION}}`
        },
        volunteer: {
            name: "Волонтеру",
            icon: "👥",
            placeholder: `БЛАГОДАРСТВЕННОЕ ПИСЬМО ВОЛОНТЕРУ

{{ORGANIZATION}}
г. {{CITY}}

Уважаемый(ая) {{DONOR_NAME}}!

Спасибо Вам за {{HELP_DESCRIPTION}} в качестве волонтера нашей организации.

Ваше участие в нашей работе — это неоценимый вклад в помощь нуждающимся. Благодаря таким людям, как Вы, мы можем продолжать нашу благородную миссию.

Спасибо, что Вы с нами!

С благодарностью,
{{ORGANIZATION}}`
        },
        personal: {
            name: "Личное письмо",
            icon: "💌",
            placeholder: `Привет, {{DONOR_NAME}}!

Огромное спасибо за {{HELP_DESCRIPTION}}!

Ваша доброта и забота действительно меняют чьи-то жизни. Мы вам очень благодарны.

Спасибо! 🙏

{{ORGANIZATION}}`
        }
    },

    // Загружает шаблоны
    loadTemplates() {
        // Уже находятся в объекте выше
    },

    // Рендерит интерфейс модуля
    render() {
        const pageDiv = document.getElementById('page-content');
        if (!pageDiv) return;

        let templatesHTML = '<div class="templates-grid">';
        for (const [key, template] of Object.entries(this.templates)) {
            templatesHTML += `
                <button class="template-btn" data-template="${key}" style="
                    padding: 20px;
                    margin: 10px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-align: left;
                    min-width: 250px;
                " onclick="ThanksLetterModule.selectTemplate('${key}')">
                    <div style="font-size: 28px; margin-bottom: 10px;">${template.icon}</div>
                    <div style="font-weight: bold; color: #2563eb;">${template.name}</div>
                </button>
            `;
        }
        templatesHTML += '</div>';

        pageDiv.innerHTML = `
            <div class="thanks-letter-container" style="padding: 20px;">
                <h1 style="color: #2563eb; margin-bottom: 20px;">📜 Благодарственные письма</h1>
                
                <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                    <strong>ℹ️ Информация:</strong> Выберите шаблон письма ниже. Вы сможете изменить текст и добавить электронную подпись перед печатью.
                </div>

                <h2 style="font-size: 18px; margin-bottom: 15px;">Выберите шаблон:</h2>
                ${templatesHTML}

                <div id="letter-editor" style="margin-top: 30px; display: none;">
                    <h2 style="font-size: 18px; margin-bottom: 15px;">✏️ Редактор письма</h2>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
                            <label style="display: block; font-weight: bold; margin-bottom: 10px;">Имя благодарителя:</label>
                            <input type="text" id="donor-name" placeholder="ФИО" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
                            <label style="display: block; font-weight: bold; margin-bottom: 10px;">Вид помощи:</label>
                            <input type="text" id="help-description" placeholder="Например: финансовая помощь" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                    </div>

                    <div style="margin-top: 15px; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
                        <label style="display: block; font-weight: bold; margin-bottom: 10px;">Текст письма (редактируемое):</label>
                        <textarea id="letter-text" style="width: 100%; height: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: Arial, sans-serif;"></textarea>
                    </div>

                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <button onclick="ThanksLetterModule.print()" style="
                            padding: 10px 20px;
                            background: #16a34a;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                        ">🖨️ Печать (A4)</button>
                        <button onclick="ThanksLetterModule.preview()" style="
                            padding: 10px 20px;
                            background: #2563eb;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                        ">👁️ Предпросмотр</button>
                        <button onclick="ThanksLetterModule.copyToClipboard()" style="
                            padding: 10px 20px;
                            background: #ea580c;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                        ">📋 Копировать</button>
                        <button onclick="ThanksLetterModule.saveDraft()" style="
                            padding: 10px 20px;
                            background: #7c3aed;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                        ">💾 Сохранить черновик</button>
                    </div>

                    <div id="preview-container" style="margin-top: 20px; display: none;"></div>
                </div>
            </div>
        `;

        // Добавляем обработчики
        const templateButtons = document.querySelectorAll('.template-btn');
        templateButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.borderColor = '#2563eb';
                this.style.backgroundColor = '#f0f9ff';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.borderColor = '#e5e7eb';
                this.style.backgroundColor = 'white';
            });
        });
    },

    // Выбирает шаблон
    selectTemplate(templateKey) {
        const template = this.templates[templateKey];
        const letterTextarea = document.getElementById('letter-text');
        const editorDiv = document.getElementById('letter-editor');

        if (letterTextarea && editorDiv) {
            letterTextarea.value = template.placeholder;
            editorDiv.style.display = 'block';
            letterTextarea.focus();
        }
    },

    // Показывает предпросмотр
    preview() {
        const text = document.getElementById('letter-text').value;
        const donorName = document.getElementById('donor-name').value || 'Благодаритель';
        const helpDesc = document.getElementById('help-description').value || 'помощь';

        const processedText = text
            .replace(/{{DONOR_NAME}}/g, donorName)
            .replace(/{{HELP_DESCRIPTION}}/g, helpDesc)
            .replace(/{{ORGANIZATION}}/g, appState.organization || 'Благо дарить!')
            .replace(/{{CITY}}/g, appState.city || 'г. Санкт-Петербург')
            .replace(/{{DATE}}/g, new Date().toLocaleDateString('ru-RU'));

        const previewContainer = document.getElementById('preview-container');
        previewContainer.innerHTML = `
            <div style="
                background: white;
                border: 1px solid #e5e7eb;
                padding: 30px;
                border-radius: 8px;
                font-family: 'Times New Roman', serif;
                line-height: 1.6;
                white-space: pre-wrap;
                max-height: 600px;
                overflow-y: auto;
            ">${escapeHtml(processedText)}</div>
        `;
        previewContainer.style.display = 'block';
    },

    // Копирует в буфер обмена
    async copyToClipboard() {
        const text = document.getElementById('letter-text').value;
        const donorName = document.getElementById('donor-name').value || 'Благодаритель';
        const helpDesc = document.getElementById('help-description').value || 'помощь';

        const processedText = text
            .replace(/{{DONOR_NAME}}/g, donorName)
            .replace(/{{HELP_DESCRIPTION}}/g, helpDesc)
            .replace(/{{ORGANIZATION}}/g, appState.organization || 'Благо дарить!')
            .replace(/{{CITY}}/g, appState.city || 'г. Санкт-Петербург')
            .replace(/{{DATE}}/g, new Date().toLocaleDateString('ru-RU'));

        try {
            await navigator.clipboard.writeText(processedText);
            alert('✅ Письмо скопировано в буфер обмена!');
        } catch (error) {
            console.error('❌ Ошибка при копировании:', error);
        }
    },

    // Сохраняет черновик
    async saveDraft() {
        const text = document.getElementById('letter-text').value;
        const donorName = document.getElementById('donor-name').value;

        if (!donorName) {
            alert('⚠️ Укажите имя благодаржателя!');
            return;
        }

        try {
            const draft = {
                text: text,
                donorName: donorName,
                date: App.formatDate(new Date()),
                timestamp: Date.now()
            };

            const draftRef = database.ref(`thanksLetters/${appState.currentUser.uid}/${Date.now()}`);
            await draftRef.set(draft);
            
            alert('✅ Черновик сохранен!');
        } catch (error) {
            console.error('❌ Ошибка при сохранении:', error);
        }
    },

    // Печать письма
    print() {
        const text = document.getElementById('letter-text').value;
        const donorName = document.getElementById('donor-name').value || 'Благодаритель';
        const helpDesc = document.getElementById('help-description').value || 'помощь';

        const processedText = text
            .replace(/{{DONOR_NAME}}/g, donorName)
            .replace(/{{HELP_DESCRIPTION}}/g, helpDesc)
            .replace(/{{ORGANIZATION}}/g, appState.organization || 'Благо дарить!')
            .replace(/{{CITY}}/g, appState.city || 'г. Санкт-Петербург')
            .replace(/{{DATE}}/g, new Date().toLocaleDateString('ru-RU'));

        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Благодарственное письмо</title>
                <style>
                    body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.8; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .content { white-space: pre-wrap; text-align: justify; }
                    .signature { margin-top: 40px; }
                </style>
            </head>
            <body>
                <div class="content">${escapeHtml(processedText)}</div>
                <div class="signature">
                    <div style="margin-top: 60px;">__________________</div>
                    <div>${appState.organization || 'Благо дарить!'}</div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
};

// Вспомогательная функция
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
