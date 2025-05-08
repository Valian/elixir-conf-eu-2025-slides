<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 2, // 1: Headline, 2: Bullets
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div>
    <h1 v-if="slideStep >= 1">Inspiration: How Do Others Bridge This Gap?</h1>
    <div v-if="slideStep >= 2" class="mt-6">
      <ul>
        <li>
          <strong>React Server Components:</strong> Server rendering + client
          interactivity.
        </li>
        <li>
          <strong>Inertia.js (Laravel/Rails):</strong> Server-side routing with
          client-side frameworks.
        </li>
        <li>
          <strong>LiveSvelte:</strong> Svelte components within LiveView
          (Pioneering work!)
        </li>
      </ul>
      <p class="mt-4 font-semibold">
        Key Idea: Combine server strengths with client component models.
      </p>
      <!-- Visual: Logos placeholder -->
    </div>
  </div>
</template>
