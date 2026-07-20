<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
  data: any[];
  metric: string;
  title: string;
  color: string;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  renderChart();
});

watch(() => props.data, renderChart, { deep: true });

const renderChart = () => {
  if (!canvasRef.value || !props.data.length) return;

  if (chartInstance) chartInstance.destroy();

  const sortedData = [...props.data].sort((a, b) => a.sprintNumber - b.sprintNumber);

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: sortedData.map(item => `Sprint ${item.sprintNumber}`),
      datasets: [{
        label: props.title,
        data: sortedData.map(item => item[props.metric]),
        borderColor: props.color,
        backgroundColor: props.color + '20',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: { min: 0, max: 100, grid: { color: '#e2e8f0' } },
        x: { grid: { color: '#e2e8f0' } }
      }
    }
  });
};
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm">
    <h3 class="font-semibold mb-4">{{ title }}</h3>
    <div class="h-80">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>