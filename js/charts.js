/**
 * AlignED Chart Rendering Module
 *
 * Loads benchmark data from JSON files and renders Chart.js charts
 * across the index and results pages. No hardcoded data — everything
 * comes from data/composite_scores.json and data/acara_scores.json.
 */

/* ── Provider color mapping ── */
const PROVIDER_COLORS = {
  'Anthropic': '#D97757',
  'OpenAI':    '#10A37F',
  'Google':    '#4285F4',
  'Meta':      '#0668E1',
  'DeepSeek':  '#536DFE',
  'Mistral':   '#F97316'
};

/**
 * Returns the brand color for a given provider name.
 * Falls back to grey if the provider is unknown.
 *
 * @param {string} provider - Provider name (e.g. "Anthropic")
 * @returns {string} Hex color code
 */
function getProviderColor(provider) {
  return PROVIDER_COLORS[provider] || '#6B7280';
}

/**
 * Fetches and parses the composite scores JSON file.
 *
 * @returns {Promise<Array>} Array of model result objects
 */
async function loadCompositeData() {
  const response = await fetch('data/composite_scores.json');
  const json = await response.json();
  return json.results;
}

/**
 * Fetches and parses the ACARA scores JSON file.
 *
 * @returns {Promise<Array>} Array of ACARA result objects
 */
async function loadAcaraData() {
  const response = await fetch('data/acara_scores.json');
  const json = await response.json();
  return json.results;
}

/**
 * Renders a horizontal bar chart showing the top N models for a given metric.
 * Used on the index/home page for the highlights section.
 *
 * @param {string} canvasId - The id of the <canvas> element
 * @param {Array} data - Array of model objects from composite data
 * @param {string} metric - The field name to chart (e.g. "composite")
 * @param {string} label - Human-readable axis label
 * @param {number} count - How many top models to show (default 10)
 */
function renderTopChart(canvasId, data, metric, label, count = 10) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  /* Sort by the chosen metric descending, take top N */
  const sorted = [...data]
    .filter(m => m[metric] != null)
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, count);

  /* Add rank numbers to labels */
  const labels = sorted.map((m, i) => `${i + 1}. ${m.model}`);
  const values = sorted.map(m => m[metric]);
  const colors = sorted.map(m => getProviderColor(m.provider));

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderRadius: 4,
        barThickness: 28
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(ctx) { return ctx.raw.toFixed(1) + '%'; }
          }
        }
      },
      scales: {
        x: {
          min: 50,
          max: 100,
          grid: { color: '#E2E6EA' },
          ticks: {
            callback: function(v) { return v + '%'; },
            font: { size: 11 }
          }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

/**
 * Renders a vertical bar chart showing all models for a given metric.
 * Used on the results page for detailed breakdowns.
 *
 * @param {string} canvasId - The id of the <canvas> element
 * @param {Array} data - Array of model objects from composite data
 * @param {string} metric - The field name to chart (e.g. "composite")
 * @param {string} label - Human-readable axis label
 */
function renderAllModelsChart(canvasId, data, metric, label) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  /* Sort by the chosen metric descending */
  const sorted = [...data]
    .filter(m => m[metric] != null)
    .sort((a, b) => b[metric] - a[metric]);

  const labels = sorted.map(m => m.model);
  const values = sorted.map(m => m[metric]);
  const colors = sorted.map(m => getProviderColor(m.provider));

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderRadius: 4,
        barPercentage: 0.85
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(ctx) { return ctx.raw.toFixed(1) + '%'; }
          }
        }
      },
      scales: {
        y: {
          min: 50,
          max: 100,
          grid: { color: '#E2E6EA' },
          ticks: {
            callback: function(v) { return v + '%'; },
            font: { size: 11 }
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 9 },
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

/**
 * Renders a grouped bar chart for ACARA results showing accuracy
 * and consistency side by side for each model.
 *
 * @param {string} canvasId - The id of the <canvas> element
 * @param {Array} data - Array of ACARA result objects
 */
function renderAcaraChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  /* Sort by accuracy descending */
  const sorted = [...data].sort((a, b) => b.accuracy - a.accuracy);

  const labels = sorted.map(m => m.model);
  const accuracyValues = sorted.map(m => m.accuracy);
  const consistencyValues = sorted.map(m => m.consistency);
  const barColors = sorted.map(m => getProviderColor(m.provider));

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Accuracy',
          data: accuracyValues,
          backgroundColor: barColors,
          borderRadius: 4,
          barPercentage: 0.8
        },
        {
          label: 'Consistency',
          data: consistencyValues,
          backgroundColor: barColors.map(c => c + '80'),  /* 50% opacity */
          borderRadius: 4,
          barPercentage: 0.8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { font: { size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              return ctx.dataset.label + ': ' + ctx.raw.toFixed(1) + '%';
            }
          }
        }
      },
      scales: {
        y: {
          min: 50,
          max: 100,
          grid: { color: '#E2E6EA' },
          ticks: {
            callback: function(v) { return v + '%'; },
            font: { size: 11 }
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 9 },
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

/* ── Auto-detect which page we're on and render the right charts ── */
document.addEventListener('DOMContentLoaded', async function() {
  try {
    /* Index page: has eaiChart, neuromythsChart, pedagogyChart as top-10 horizontal bars */
    if (document.getElementById('eaiChart') && !document.getElementById('scenariosChart')) {
      const data = await loadCompositeData();
      renderTopChart('eaiChart', data, 'composite', 'Educational Alignment Index');
      renderTopChart('neuromythsChart', data, 'neuromyths_pct', 'Neuromyth Rejection');
      renderTopChart('pedagogyChart', data, 'pedagogy_pct', 'Pedagogical Knowledge');
    }

    /* Results page: has scenariosChart (index page does not) */
    if (document.getElementById('scenariosChart')) {
      const data = await loadCompositeData();
      renderAllModelsChart('eaiChart', data, 'composite', 'Educational Alignment Index');
      renderAllModelsChart('neuromythsChart', data, 'neuromyths_pct', 'Neuromyth Rejection');
      renderAllModelsChart('scenariosChart', data, 'scenarios_pct', 'Implementation Scenarios');
      renderAllModelsChart('cdpkChart', data, 'pedagogy_cdpk', 'Cross-Domain Pedagogical Knowledge');
      renderAllModelsChart('sendChart', data, 'pedagogy_send', 'Special Education Needs & Disability');

      /* ACARA chart — only on results page */
      if (document.getElementById('acaraChart')) {
        const acaraData = await loadAcaraData();
        renderAcaraChart('acaraChart', acaraData);
      }
    }
  } catch (error) {
    console.error('Failed to load chart data:', error);
  }
});
