/*
Per-client detail view
Sprint history
Trend charts
Cohort percentile ..
*/
<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMetricsStore } from "@/stores/metricsStore";
import TrendChart from "@/components/TrendChart.vue";  

const route = useRoute();
const router = useRouter();
const metricsStore = useMetricsStore();

onMounted(async () => {
  const clientId = route.params.id as string;
  if (clientId) await metricsStore.fetchClientMetrics(clientId);
});

const clientMetrics = computed(() => metricsStore.clientMetrics);
const latest = computed(() => clientMetrics.value.at(-1));

// Dynamic Cohort Percentile
const getPercentile = (score: number = 0, metricKey: string): string => {
  const allScores = metricsStore.metrics
    .map(m => (m as any)[metricKey])
    .filter(s => typeof s === "number");

  if (!allScores.length) return "N/A";
  
  const ranked = [...allScores].sort((a, b) => b - a);
  const position = ranked.findIndex(s => s <= score) + 1;
  const percentile = Math.ceil((position / ranked.length) * 100);
  
  return `Top ${percentile}%`;
};

// Cohort data
const cohortData = computed(() => ({
  codeQuality: getPercentile(latest.value?.codeQuality, 'codeQuality'),
  velocity: getPercentile(latest.value?.velocity, 'velocity'),
  iterationQuality: getPercentile(latest.value?.iterationQuality, 'iterationQuality'),
  communication: getPercentile(latest.value?.communication, 'communication'),
}));

const getScoreColor = (score: number = 0) => {
  if (score >= 85) return "text-emerald-600";
  if (score >= 70) return "text-amber-600";
  return "text-red-600";
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button @click="router.go(-1)" class="text-slate-500 hover:text-slate-700">← Back</button>
        <div>
          <h1 class="text-3xl font-bold">{{ latest?.clientName || 'Client' }}</h1>
          <p class="text-slate-500">Detailed Performance Analytics</p>
        </div>
      </div>

      <!-- Current Scores -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div v-for="metric in ['codeQuality', 'velocity', 'iterationQuality', 'communication']" 
             :key="metric" 
             class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-slate-500 capitalize">{{ metric.replace(/([A-Z])/g, ' $1') }}</p>
          <p :class="['text-5xl font-bold mt-2', getScoreColor(latest?.[metric])]">
            {{ latest?.[metric] ?? '—' }}
          </p>
        </div>
      </div>

      <!-- Cohort Positioning -->
      <div class="bg-white rounded-2xl p-6 shadow-sm mb-10">
        <h2 class="text-xl font-semibold mb-4">Cohort Positioning</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(value, key) in cohortData" :key="key" class="bg-slate-50 rounded-xl p-4">
            <p class="text-sm text-slate-500 capitalize">{{ key.replace(/([A-Z])/g, ' $1') }}</p>
            <p class="text-2xl font-bold text-indigo-600">{{ value }}</p>
          </div>
        </div>
      </div>

      <!-- Trend Charts -->
      <div class="mb-10">
        <h2 class="text-xl font-semibold mb-4">Performance Trends</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart 
            :data="clientMetrics" 
            metric="codeQuality" 
            title="Code Quality Trend"
            color="#10b981"
          />
          <TrendChart 
            :data="clientMetrics" 
            metric="velocity" 
            title="Velocity Trend"
            color="#3b82f6"
          />
          <TrendChart 
            :data="clientMetrics" 
            metric="iterationQuality" 
            title="Iteration Quality Trend"
            color="#8b5cf6"
          />
          <TrendChart 
            :data="clientMetrics" 
            metric="communication" 
            title="Communication Trend"
            color="#f59e0b"
          />
        </div>
      </div>

      <!-- Sprint History -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="p-6 border-b">
          <h2 class="text-xl font-semibold">Sprint History</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-50">
                <th class="p-4 text-left">Sprint</th>
                <th class="p-4 text-center">Code Quality</th>
                <th class="p-4 text-center">Velocity</th>
                <th class="p-4 text-center">Iteration</th>
                <th class="p-4 text-center">Communication</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in clientMetrics" :key="m._id || m.sprintNumber" class="border-b hover:bg-slate-50">
                <td class="p-4 font-medium">#{{ m.sprintNumber }}</td>
                <td class="p-4 text-center font-semibold" :class="getScoreColor(m.codeQuality)">{{ m.codeQuality }}</td>
                <td class="p-4 text-center font-semibold" :class="getScoreColor(m.velocity)">{{ m.velocity }}</td>
                <td class="p-4 text-center font-semibold" :class="getScoreColor(m.iterationQuality)">{{ m.iterationQuality }}</td>
                <td class="p-4 text-center font-semibold" :class="getScoreColor(m.communication)">{{ m.communication }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>