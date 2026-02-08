// Navigation Module
class NavigationManager {
    constructor() {
        this.setupNavigation();
        this.setupMenuToggle();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    }

    setupMenuToggle() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.sidebar');
        
        menuToggle?.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    navigateTo(page) {
        appState.currentPage = page;
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

        // Update page title
        const pageName = {
            'dashboard': 'Дашборд',
            'finance': 'Управление финансами',
            'trips': 'Учет рейсов',
            'collections': 'Сборы & Заказы',
            'warehouse': 'Управление складом',
            'presscenter': 'Пресс-центр',
            'thanksletter': 'Благодарственные письма',
            'crm': 'CRM - Благотворители',
            'settings': 'Справочники и настройки'
        };

        document.getElementById('pageTitle').textContent = pageName[page] || page;

        // Load page content
        this.loadPageContent(page);
    }

    loadPageContent(page) {
        const contentElement = document.getElementById('pageContent');
        
        switch(page) {
            case 'dashboard':
                if (typeof Dashboard !== 'undefined') Dashboard.init();
                break;
            case 'finance':
                if (typeof FinanceModule !== 'undefined') FinanceModule.init();
                break;
            case 'trips':
                if (typeof TripsModule !== 'undefined') TripsModule.init();
                break;
            case 'collections':
                if (typeof CollectionsModule !== 'undefined') CollectionsModule.init();
                break;
            case 'warehouse':
                if (typeof WarehouseModule !== 'undefined') WarehouseModule.init();
                break;
            case 'presscenter':
                if (typeof PressCenterModule !== 'undefined') PressCenterModule.init();
                break;
            case 'thanksletter':
                if (typeof ThanksLetterModule !== 'undefined') ThanksLetterModule.init();
                break;
            case 'crm':
                if (typeof CRMModule !== 'undefined') CRMModule.init();
                break;
            case 'settings':
                if (typeof SettingsModule !== 'undefined') SettingsModule.init();
                break;
        }
    }
}

// Initialize Navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.navigationManager = new NavigationManager();
    });
} else {
    window.navigationManager = new NavigationManager();
}
