<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

useSlideAnimation({
  totalSteps: 1,
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div class="text-center">
    <h1>Demo Time: Declarative Client-Side UI</h1>
    <p class="mt-6 text-lg">
      Let's see how LiveVue helps build complex UI declaratively.
    </p>
    <p class="mt-4 text-gray-600 italic">
      (Demo: Showcasing declarative slide transitions or a complex UI element
      like a slider/drawing pad)
    </p>
    <!-- Placeholder for Live Coding / Code Snippet display -->
    <pre
      class="mt-4 text-left"
    ><code>// Code Snippet for the demo will be shown here...</code></pre>
  </div>
</template>
