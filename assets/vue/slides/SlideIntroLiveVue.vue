<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 2, // 1: Headline, 2: Bullets + Diagram Placeholder
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div>
    <h1 v-if="slideStep >= 1">
      LiveVue: Seamless Vue Components Inside LiveView
    </h1>
    <div
      v-if="slideStep >= 2"
      class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <ul>
          <li>Keep LiveView for page structure, routing, and server state.</li>
          <li>
            Use Vue for components demanding rich interactivity or complex local
            state.
          </li>
          <li>
            Get the best of both worlds! Declarative client-side UI meets
            powerful server logic.
          </li>
          <li>
            Leverage the huge Vue ecosystem (UI libraries, state management,
            etc.).
          </li>
        </ul>
      </div>
      <div class="text-center italic text-gray-500">
        <!-- Placeholder for Core LiveVue Diagram -->
        <p>
          [Diagram Placeholder: Show Browser -> LiveView -> &lt;.vue&gt; ->
          live_vue.js -> Vue Component data flow]
        </p>
        <p>LiveView sends props/events via data attributes.</p>
        <p>
          Vue component manages local state & emits events back
          (<code>JS.push</code>).
        </p>
      </div>
    </div>
  </div>
</template>
