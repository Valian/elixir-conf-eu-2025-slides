<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 3, // 1: Headline, 2: Approach 1, 3: Approach 2
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div>
    <h1 v-if="slideStep >= 1">
      Implementation Strategies: Finding the Right Balance
    </h1>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-if="slideStep >= 2">
        <h2 class="mb-2">1. Isolated Components</h2>
        <p>
          Use <code>&lt;.vue&gt;</code> for specific complex widgets within a
          larger LiveView.
        </p>
        <ul class="list-disc list-inside mb-2">
          <li>Date pickers</li>
          <li>Rich text editors</li>
          <li>Interactive charts</li>
          <li>Complex forms / UI elements</li>
        </ul>
        <p class="italic text-gray-500">
          [Diagram Placeholder: LiveView page with one box labeled "Vue
          Component"]
        </p>
        <p class="font-semibold">Great for enhancing existing LiveViews.</p>
      </div>
      <div v-if="slideStep >= 3">
        <h2 class="mb-2">2. Top-Level Component (Inertia.js Style)</h2>
        <p>
          Render the main content area of a LiveView with a single
          <code>&lt;.vue&gt;</code> component.
        </p>
        <ul class="list-disc list-inside mb-2">
          <li>LiveView handles layout, routing, initial data.</li>
          <li>Vue component handles the entire page's UI logic.</li>
        </ul>
        <p class="italic text-gray-500">
          [Diagram Placeholder: LiveView layout with central area labeled "Vue
          Component"]
        </p>
        <p class="font-semibold">
          Good for apps with heavy client-side focus or migrating Vue apps.
        </p>
      </div>
    </div>
    <p v-if="slideStep >= 3" class="mt-6 text-center text-red-600 font-bold">
      Avoid the messy middle! Mixing responsibilities heavily leads to
      confusion.
    </p>
  </div>
</template>
