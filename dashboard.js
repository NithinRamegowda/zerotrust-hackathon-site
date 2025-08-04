document.addEventListener('DOMContentLoaded', () => {
  // Fetch registration data (sample JSON)
  // Use a relative path to ensure the file loads correctly from the same directory
  fetch('./registrations.json')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load registrations data');
      return response.json();
    })
    .then((data) => {
      populateTable(data);
      renderChart(data);
      updateSummary(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

function populateTable(data) {
  const tbody = document.querySelector('#registrantsTable tbody');
  tbody.innerHTML = '';
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.phone}</td>
      <td>${item.organization}</td>
      <td>${item.track}</td>`;
    tbody.appendChild(row);
  });
}

function renderChart(data) {
  // Compute counts per track
  const trackCounts = {};
  data.forEach((item) => {
    const track = item.track || 'Other';
    trackCounts[track] = (trackCounts[track] || 0) + 1;
  });
  const labels = Object.keys(trackCounts);
  const counts = Object.values(trackCounts);
  const colors = ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6f42c1', '#20c997'];
  const ctx = document.getElementById('trackChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Registrations per Track',
          data: counts,
          backgroundColor: colors.slice(0, labels.length),
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Registrants',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Track',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Registrations by Track',
        },
      },
    },
  });
}

function updateSummary(data) {
  const total = data.length;
  const totalElem = document.getElementById('totalCount');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = Math.min((total / 25000) * 100, 100);
  totalElem.textContent = total;
  progressBar.style.width = progressPercent + '%';
  progressBar.setAttribute('aria-valuenow', total);
  progressBar.textContent = progressPercent.toFixed(2) + '%';
}