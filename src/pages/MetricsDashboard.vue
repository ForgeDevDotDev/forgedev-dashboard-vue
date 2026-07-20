/*
Fetch all metrics
Show overview cards
Display client table
Display charts
Navigate to detail page
*/
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMetricsStore } from "@/stores/metrics";

const router = useRouter();
const metricsStore = useMetricsStore();

onMounted(async () => {
  await metricsStore.fetchMetrics();
});

// Computed values
const totalClients = computed(() => metricsStore.metrics.length);

const averages = computed(() => {
  if (!totalClients.value) {
    return { codeQuality: 0, velocity: 0, iterationQuality: 0, communication: 0 };
  }

  const sums = metricsStore.metrics.reduce(
    (acc, m) => {
      acc.codeQuality += m.codeQuality || 0;
      acc.velocity += m.velocity || 0;
      acc.iterationQuality += m.iterationQuality || 0;
      acc.communication += m.communication || 0;
      return acc;
    },
    { codeQuality: 0, velocity: 0, iterationQuality: 0, communication: 0 }
  );

  return {
    codeQuality: Math.round(sums.codeQuality / totalClients.value),
    velocity: Math.round(sums.velocity / totalClients.value),
    iterationQuality: Math.round(sums.iterationQuality / totalClients.value),
    communication: Math.round(sums.communication / totalClients.value),
  };
});

const totalSprints = computed(() => {
  if (!totalClients.value) return 0;
  return Math.max(...metricsStore.metrics.map(m => m.sprintNumber || 0));
});

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-emerald-600";
  if (score >= 70) return "text-amber-600";
  return "text-red-600";
};

const getScoreBg = (score: number) => {
  if (score >= 85) return "bg-emerald-100";
  if (score >= 70) return "bg-amber-100";
  return "bg-red-100";
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-slate-900 mb-8">
        Client Metrics Dashboard
      </h1>

      <!-- Overview Cards -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-slate-500">Total Clients</p>
          <p class="text-4xl font-bold mt-2">{{ totalClients }}</p>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-slate-500">Avg Code Quality</p>
          <p :class="['text-4xl font-bold mt-2', getScoreColor(averages.codeQuality)]">
            {{ averages.codeQuality }}
          </p>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-slate-500">Avg Velocity</p>
          <p :class="['text-4xl font-bold mt-2', getScoreColor(averages.velocity)]">
            {{ averages.velocity }}
          </p>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-slate-500">Avg Iteration Quality</p>
          <p :class="['text-4xl font-bold mt-2', getScoreColor(averages.iterationQuality)]">
            {{ averages.iterationQuality }}
          </p>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <p class="text-sm text-slate-500">Avg Communication</p>
          <p :class="['text-4xl font-bold mt-2', getScoreColor(averages.communication)]">
            {{ averages.communication }}
          </p>
        </div>
      </div>

      <!-- Client Overview Table -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="p-6 border-b flex justify-between items-center">
          <h2 class="font-semibold text-xl">Client Overview</h2>
          
          <!-- Future: Add search, filter, export buttons here -->
          <div class="flex gap-3">
            <button class="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50">
              Export CSV
            </button>

            <button 
  @click="metricsStore.exportToCSV(metricsStore.metrics)"
  class="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
>
  Export CSV
</button>
            <button class="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50">
              Export PDF
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-50 border-b">
                <th class="p-4 text-left font-medium text-slate-600">Client</th>
                <th class="p-4 text-center font-medium text-slate-600">Code Quality</th>
                <th class="p-4 text-center font-medium text-slate-600">Velocity</th>
                <th class="p-4 text-center font-medium text-slate-600">Iteration</th>
                <th class="p-4 text-center font-medium text-slate-600">Communication</th>
                <th class="p-4 text-center font-medium text-slate-600">Sprint</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="metric in metricsStore.metrics"
                :key="`${metric.clientId}-${metric.sprintNumber}`"
                class="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                @click="router.push(`/metrics/${metric.clientId}`)"
              >
                <td class="p-4 font-medium">
                  {{ metric.clientName || metric.clientId }}
                </td>
                <td class="p-4 text-center">
                  <span :class="['font-semibold', getScoreColor(metric.codeQuality)]">
                    {{ metric.codeQuality }}
                  </span>
                </td>
                <td class="p-4 text-center">
                  <span :class="['font-semibold', getScoreColor(metric.velocity)]">
                    {{ metric.velocity }}
                  </span>
                </td>
                <td class="p-4 text-center">
                  <span :class="['font-semibold', getScoreColor(metric.iterationQuality)]">
                    {{ metric.iterationQuality }}
                  </span>
                </td>
                <td class="p-4 text-center">
                  <span :class="['font-semibold', getScoreColor(metric.communication)]">
                    {{ metric.communication }}
                  </span>
                </td>
                <td class="p-4 text-center text-slate-500">
                  #{{ metric.sprintNumber }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>