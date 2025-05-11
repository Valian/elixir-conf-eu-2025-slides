<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, defineProps } from "vue";
import { createChart, LineSeries, IChartApi, ISeriesApi, SeriesType, LineData, Time } from "lightweight-charts";

const props = defineProps<{
  data: LineData<Time>[];
}>();

// Lightweight Charts™ instances
let series: ISeriesApi<SeriesType> | null = null;
let chart: IChartApi | null = null;

const chartContainer = ref<HTMLDivElement | null>(null);

// Auto resizes the chart when the browser window is resized.
const resizeHandler = (): void => {
  if (chart && chartContainer.value) {
    const dimensions = chartContainer.value.getBoundingClientRect();
    chart.resize(dimensions.width, dimensions.height);
  }
};

onMounted(() => {
  if (!chartContainer.value) {
    console.error("Chart container DOM element not found during onMounted.");
    return;
  }
  // Ensure chartOptions is at least an empty object if undefined, as createChart expects an object.
  chart = createChart(chartContainer.value, {
    localization: { timeFormatter: (time: number) => `${time}s` },
    timeScale: {
      tickMarkFormatter: (time: number) => `${time}s`,
    },
  });
  series = chart.addSeries(LineSeries, {});
  series.setData(props.data);
  chart.timeScale().fitContent();

  window.addEventListener("resize", resizeHandler);
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }
  series = null; // Clear series reference
  window.removeEventListener("resize", resizeHandler);
});

/*
 * Watch for changes to any of the component properties.

 * If an options property is changed then we will apply those options
 * on top of any existing options previously set (since we are using the
 * `applyOptions` method).
 *
 * If there is a change to the chart type, then the existing series is removed
 * and the new series is created, and assigned the data.
 *
 */

watch(
  () => props.data,
  (newData: LineData<Time>[]) => {
    if (series) {
      series.setData(newData);
    }
  }
);
</script>

<template>
  <div class="lw-chart" ref="chartContainer"></div>
</template>

<style scoped>
.lw-chart {
  height: 100%;
}
</style>
