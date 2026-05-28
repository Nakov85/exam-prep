// Translations
const translations = {
    en: {
        title: 'LeadPredictor',
        language: 'Language',
        currency: 'Currency',
        campaignStart: 'Campaign Start',
        campaignEnd: 'Campaign End',
        totalRevenue: 'Total Revenue',
        avgOrderValue: 'Avg Order Value',
        projects: 'Projects',
        leads: 'Leads',
        customers: 'Customers',
        distribution: 'Distribution',
        prospects: 'Prospects',
        leadResponseRate: 'Lead Response Rate',
        prospectResponseRate: 'Prospect Response Rate',
        month: 'Month'
    },
    es: {
        title: 'PredicadorDeClientes',
        language: 'Idioma',
        currency: 'Moneda',
        campaignStart: 'Inicio de Campaña',
        campaignEnd: 'Fin de Campaña',
        totalRevenue: 'Ingresos Totales',
        avgOrderValue: 'Valor Promedio de Pedido',
        projects: 'Proyectos',
        leads: 'Clientes Potenciales',
        customers: 'Clientes',
        distribution: 'Distribución',
        prospects: 'Prospectos',
        leadResponseRate: 'Tasa de Respuesta de Clientes Potenciales',
        prospectResponseRate: 'Tasa de Respuesta de Prospectos',
        month: 'Mes'
    },
    fr: {
        title: 'PrédicteurDeClients',
        language: 'Langue',
        currency: 'Devise',
        campaignStart: 'Début de Campagne',
        campaignEnd: 'Fin de Campagne',
        totalRevenue: 'Revenu Total',
        avgOrderValue: 'Valeur Moyenne de Commande',
        projects: 'Projets',
        leads: 'Prospects',
        customers: 'Clients',
        distribution: 'Distribution',
        prospects: 'Prospects',
        leadResponseRate: 'Taux de Réponse des Prospects',
        prospectResponseRate: 'Taux de Réponse des Prospects',
        month: 'Mois'
    },
    de: {
        title: 'LeadVorhersage',
        language: 'Sprache',
        currency: 'Währung',
        campaignStart: 'Kampagnenbeginn',
        campaignEnd: 'Kampagnenende',
        totalRevenue: 'Gesamtumsatz',
        avgOrderValue: 'Durchschnittlicher Bestellwert',
        projects: 'Projekte',
        leads: 'Leads',
        customers: 'Kunden',
        distribution: 'Verteilung',
        prospects: 'Interessenten',
        leadResponseRate: 'Lead-Reaktionsquote',
        prospectResponseRate: 'Interessenten-Reaktionsquote',
        month: 'Monat'
    },
    hi: {
        title: 'लीड प्रिडिक्टर',
        language: 'भाषा',
        currency: 'मुद्रा',
        campaignStart: 'अभियान शुरुआत',
        campaignEnd: 'अभियान अंत',
        totalRevenue: 'कुल राजस्व',
        avgOrderValue: 'औसत ऑर्डर मूल्य',
        projects: 'परियोजनाएं',
        leads: 'लीड्स',
        customers: 'ग्राहक',
        distribution: 'वितरण',
        prospects: 'संभावनाएं',
        leadResponseRate: 'लीड प्रतिक्रिया दर',
        prospectResponseRate: 'संभावना प्रतिक्रिया दर',
        month: 'महीना'
    }
};

let currentLanguage = 'en';

function updateLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];

    // Update header
    document.querySelector('.header h1').textContent = t.title;

    // Update sidebar labels
    document.querySelectorAll('.sidebar-label')[0].textContent = t.language;
    document.querySelectorAll('.sidebar-label')[1].textContent = t.currency;
    document.querySelectorAll('.sidebar-label')[2].textContent = t.campaignStart;
    document.querySelectorAll('.sidebar-label')[3].textContent = t.campaignEnd;
    document.querySelectorAll('.sidebar-label')[4].textContent = t.totalRevenue;
    document.querySelectorAll('.sidebar-label')[5].textContent = t.avgOrderValue;

    // Update metric labels
    document.querySelectorAll('.metric-label')[0].textContent = t.projects;
    document.querySelectorAll('.metric-label')[1].textContent = t.leads;
    document.querySelectorAll('.metric-label')[2].textContent = t.customers;

    // Update chart title
    document.querySelector('.chart-title').textContent = t.distribution;

    // Update slider labels
    document.querySelectorAll('.slider-label-text')[0].textContent = t.leadResponseRate;
    document.querySelectorAll('.slider-label-text')[1].textContent = t.prospectResponseRate;

    // Update legend
    const legendItems = document.querySelectorAll('.chart-legend-item span');
    legendItems[0].textContent = t.prospects;
    legendItems[1].textContent = t.leads;
    legendItems[2].textContent = t.customers;

    // Update chart month labels
    const monthLabels = document.querySelectorAll('.chart-month-label');
    monthLabels.forEach((label, index) => {
        label.textContent = `${t.month} ${index + 1}`;
    });

    // Re-initialize chart to update tooltips
    initChart();
}

// Initialize chart
function initChart() {
    const chartContent = document.getElementById('chartContent');
    chartContent.innerHTML = '';

    const data = [
        { month: 1, prospects: 15, leads: 3, customers: 1 },
        { month: 2, prospects: 28, leads: 6, customers: 2 },
        { month: 3, prospects: 35, leads: 7, customers: 3 },
        { month: 4, prospects: 42, leads: 8, customers: 3 },
        { month: 5, prospects: 38, leads: 8, customers: 3 },
        { month: 6, prospects: 45, leads: 9, customers: 4 }
    ];
    const maxValue = Math.max(...data.map(d => d.prospects));

    data.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'chart-row';

        const label = document.createElement('div');
        label.className = 'chart-month-label';
        label.textContent = `Month ${item.month}`;

        const container = document.createElement('div');
        container.className = 'chart-bar-container';

        const total = item.prospects + item.leads + item.customers;
        const prospectPercent = (item.prospects / total) * 100;
        const leadPercent = (item.leads / total) * 100;
        const customerPercent = (item.customers / total) * 100;

        // Prospects segment (light gray)
        const prospectSegment = document.createElement('div');
        prospectSegment.className = 'chart-bar-segment prospects';
        prospectSegment.style.width = prospectPercent + '%';
        prospectSegment.setAttribute('data-label', `Prospects: ${item.prospects}`);

        // Leads segment (medium gray)
        const leadSegment = document.createElement('div');
        leadSegment.className = 'chart-bar-segment leads';
        leadSegment.style.width = leadPercent + '%';
        leadSegment.setAttribute('data-label', `Leads: ${item.leads}`);

        // Customers segment (dark gray)
        const customerSegment = document.createElement('div');
        customerSegment.className = 'chart-bar-segment customers';
        customerSegment.style.width = customerPercent + '%';
        customerSegment.setAttribute('data-label', `Customers: ${item.customers}`);

        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        const t = translations[currentLanguage];
        tooltip.innerHTML = `<div style="font-weight: 600; margin-bottom: 4px;">${t.month} #${item.month}</div>`
            + `<div>${t.prospects}: ${item.prospects}</div>`
            + `<div>${t.leads}: ${item.leads}</div>`
            + `<div>${t.customers}: ${item.customers}</div>`;

        prospectSegment.appendChild(tooltip);
        container.appendChild(prospectSegment);
        container.appendChild(leadSegment);
        container.appendChild(customerSegment);
        row.appendChild(label);
        row.appendChild(container);
        chartContent.appendChild(row);
    });
}

// Slider updates
document.getElementById('leadResponseRate').addEventListener('input', (e) => {
    document.getElementById('leadRateValue').textContent = parseFloat(e.target.value).toFixed(2) + '%';
});

document.getElementById('prospectResponseRate').addEventListener('input', (e) => {
    document.getElementById('prospectRateValue').textContent = parseFloat(e.target.value).toFixed(2) + '%';
});

// Update metrics based on inputs
document.getElementById('totalRevenue').addEventListener('change', updateMetrics);
document.getElementById('avgOrderValue').addEventListener('change', updateMetrics);

function updateMetrics() {
    const totalRevenue = parseInt(document.getElementById('totalRevenue').value) || 0;
    const avgOrderValue = parseInt(document.getElementById('avgOrderValue').value) || 1;

    const projects = Math.ceil(totalRevenue / avgOrderValue);
    const leads = Math.ceil(projects * 0.2);
    const customers = Math.ceil(leads * 0.4);

    document.getElementById('projectsValue').textContent = projects;
    document.getElementById('leadsValue').textContent = leads;
    document.getElementById('customersValue').textContent = customers;
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    updateLanguage('en');
    initChart();
    updateMetrics();
});

// Language selector
document.getElementById('language').addEventListener('change', (e) => {
    const langCode = {
        '🇺🇸 English': 'en',
        '🇪🇸 Español': 'es',
        '🇫🇷 Français': 'fr',
        '🇩🇪 Deutsch': 'de',
        '🇮🇳 हिंदी': 'hi'
    }[e.target.value];
    
    if (langCode) {
        updateLanguage(langCode);
    }
});
