/**
 * AlignED Chart Rendering Module
 *
 * Loads benchmark data from JSON files and renders Chart.js charts
 * across the index and results pages. Supports single-tier composite
 * scoring (EAI) for 21 models.
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
 * Fetches and parses the model metadata JSON file (release dates, costs, tokens).
 *
 * @returns {Promise<Array>} Array of model metadata objects
 */
async function loadModelMetadata() {
  const response = await fetch('data/model_metadata.json');
  const json = await response.json();
  return json.models;
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

/**
 * Renders a scatter/timeline chart showing model release dates on the X axis
 * and composite scores on the Y axis. Each point is colored by provider.
 *
 * @param {string} canvasId - The id of the <canvas> element
 * @param {Array} compositeData - Array of model objects with composite scores
 * @param {Array} metadataArr - Array of model metadata objects with release_date
 */
function renderTimelineChart(canvasId, compositeData, metadataArr) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  /* Build a lookup from model name to metadata */
  const metaMap = {};
  metadataArr.forEach(m => { metaMap[m.model] = m; });

  /* Build scatter data points: x = release date as timestamp, y = composite */
  const points = [];
  compositeData.forEach(m => {
    const meta = metaMap[m.model];
    if (!meta || !meta.release_date || m.composite == null) return;

    /* Parse YYYY-MM to a date (use 15th of month as midpoint) */
    const parts = meta.release_date.split('-');
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 15);

    points.push({
      x: dateObj.getTime(),
      y: m.composite,
      model: m.model,
      provider: m.provider,
      color: getProviderColor(m.provider)
    });
  });

  /* Sort by date for readability */
  points.sort((a, b) => a.x - b.x);

  new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [{
        data: points.map(p => ({ x: p.x, y: p.y })),
        backgroundColor: points.map(p => p.color),
        borderColor: points.map(p => p.color),
        pointRadius: 7,
        pointHoverRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: function(items) {
              const idx = items[0].dataIndex;
              return points[idx].model;
            },
            label: function(ctx) {
              const idx = ctx.dataIndex;
              const d = new Date(points[idx].x);
              const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              return [
                points[idx].provider,
                monthNames[d.getMonth()] + ' ' + d.getFullYear(),
                'Score: ' + points[idx].y.toFixed(1) + '%'
              ];
            }
          }
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'quarter',
            displayFormats: { quarter: 'MMM yyyy' }
          },
          title: { display: true, text: 'Release Date', font: { size: 12 } },
          grid: { color: '#E2E6EA' }
        },
        y: {
          min: 55,
          max: 95,
          title: { display: true, text: 'Educational Alignment Index (%)', font: { size: 12 } },
          grid: { color: '#E2E6EA' },
          ticks: {
            callback: function(v) { return v + '%'; },
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/**
 * Renders a horizontal bar chart showing token usage per model.
 * Highlights the difference between thinking and standard models.
 *
 * @param {string} canvasId - The id of the <canvas> element
 * @param {Array} metadataArr - Array of model metadata objects with survey_scenario_tokens
 * @param {Array} compositeData - Array of composite data for provider colors
 */
function renderTokenChart(canvasId, metadataArr, compositeData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  /* Build a lookup from model name to provider */
  const providerMap = {};
  compositeData.forEach(m => { providerMap[m.model] = m.provider; });

  /* Filter to models with token data, sort by total tokens descending */
  const withTokens = metadataArr
    .filter(m => m.survey_scenario_tokens != null)
    .sort((a, b) => b.survey_scenario_tokens - a.survey_scenario_tokens);

  const labels = withTokens.map(m => m.model);
  const values = withTokens.map(m => m.survey_scenario_tokens);
  const colors = withTokens.map(m => getProviderColor(providerMap[m.model] || m.provider));

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Tokens (Survey + Scenarios)',
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(c => c + 'CC'),
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 20,
        categoryPercentage: 0.8
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
            label: function(ctx) {
              return ctx.raw.toLocaleString() + ' tokens';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#E2E6EA' },
          ticks: {
            callback: function(v) { return (v / 1000).toFixed(0) + 'k'; },
            font: { size: 11 }
          },
          title: { display: true, text: 'Total Tokens', font: { size: 12 } }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
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
      renderTopChart('neuromythsChart', data, 'neuromyths_pct', 'Educational Neuroscience');
      renderTopChart('pedagogyChart', data, 'pedagogy_pct', 'Pedagogical Knowledge');
    }

    /* Results page: has scenariosChart (index page does not) */
    if (document.getElementById('scenariosChart')) {
      const data = await loadCompositeData();

      /* Educational Alignment Index chart (all 21 models) */
      renderAllModelsChart('eaiChart', data, 'composite', 'Educational Alignment Index');

      /* Individual benchmark charts */
      renderAllModelsChart('neuromythsChart', data, 'neuromyths_pct', 'Educational Neuroscience');
      renderAllModelsChart('scenariosChart', data, 'scenarios_pct', 'Implementation Scenarios');
      renderAllModelsChart('cdpkChart', data, 'pedagogy_cdpk', 'General Pedagogical Knowledge');
      renderAllModelsChart('sendChart', data, 'pedagogy_send', 'Special Education Needs & Disability');

      /* ACARA chart */
      if (document.getElementById('acaraChart')) {
        const acaraData = await loadAcaraData();
        renderAcaraChart('acaraChart', acaraData);
      }

      /* Timeline chart — requires date adapter for time scale */
      if (document.getElementById('timelineChart')) {
        const metadata = await loadModelMetadata();
        renderTimelineChart('timelineChart', data, metadata);
      }

      /* Token usage chart */
      if (document.getElementById('tokenChart')) {
        const metadata = await loadModelMetadata();
        renderTokenChart('tokenChart', metadata, data);
      }
    }
  } catch (error) {
    console.error('Failed to load chart data:', error);
  }
});
