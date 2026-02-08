// Main Application Module
class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('App initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => this.handleSearch(e));
        }
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        console.log('Search query:', query);
        // Search will be implemented in individual modules
    }

    // Utility function to format date
    static formatDate(date) {
        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Utility function to format currency
    static formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(amount);
    }

    // Utility function to create elements
    static createElement(tag, className = '', innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    // Get date range for period
    static getDateRange(period) {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

        switch(period) {
            case 'day':
                return { start: new Date(today.setHours(0, 0, 0, 0)), end: new Date() };
            case 'week':
                return { start: startOfWeek, end: new Date() };
            case 'month':
                return { start: startOfMonth, end: new Date() };
            case 'year':
                return { start: startOfYear, end: new Date() };
            default:
                return { start: null, end: null };
        }
    }
}

// Initialize App when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
    });
} else {
    window.app = new App();
}
