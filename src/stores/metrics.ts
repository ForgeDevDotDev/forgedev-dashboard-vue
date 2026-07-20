// src/stores/metrics.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Metric {
  clientId: string;
  clientName: string;           
  codeQuality: number;
  velocity: number;
  iterationQuality: number;
  communication: number;
  sprintNumber: number;
  note?: string;              
}

export const useMetricsStore = defineStore('metrics', () => {
  const metrics = ref<Metric[]>([]);

  const fetchMetrics = async () => {
    try {
      // TODO: Replace with your actual API call
      // const response = await fetch('/api/metrics');
      // metrics.value = await response.json();

      // trial data
      metrics.value = [
        {
          clientId: "C001",
          clientName: "Acme Corp",
          codeQuality: 92,
          velocity: 85,
          iterationQuality: 88,
          communication: 95,
          sprintNumber: 12,
          note: "Good progress in refactoring"
        },
        {
          clientId: "C002",
          clientName: "TechFlow Inc",
          codeQuality: 78,
          velocity: 82,
          iterationQuality: 75,
          communication: 80,
          sprintNumber: 11,
          note: ""
        }
      ];
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      metrics.value = [];
    }
  };

  const exportToCSV = (data: Metric[] = metrics.value) => {
    if (!data.length) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Client ID",
      "Client Name",
      "Code Quality",
      "Velocity",
      "Iteration Quality",
      "Communication",
      "Sprint Number",
      "Note"
    ];

    const csvRows = [
      headers.join(','),
      ...data.map(m => [
        m.clientId,
        `"${m.clientName}"`,
        m.codeQuality,
        m.velocity,
        m.iterationQuality,
        m.communication,
        m.sprintNumber,
        `"${m.note || ''}"`
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `client-metrics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    metrics,
    fetchMetrics,
    exportToCSV,
  };
});