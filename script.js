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

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.width = (item.prospects / maxValue * 100) + '%';

        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.innerHTML = `<div style="font-weight: 600; margin-bottom: 4px;">Month #${item.month}</div>`
            + `<div>Prospects: ${item.prospects}</div>`
            + `<div>Leads: ${item.leads}</div>`
            + `<div>Customers: ${item.customers}</div>`;

        bar.appendChild(tooltip);
        container.appendChild(bar);
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
    initChart();
    updateMetrics();
});
