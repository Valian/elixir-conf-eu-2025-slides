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
    <h1 class="text-6xl font-bold mb-6">
      Why mixing LiveView and a frontend library is a great idea
    </h1>
    <h2 class="text-3xl mb-8">Bridging the gap with LiveVue</h2>
    <p class="text-xl mb-4">Jakub @Valian Skałecki</p>
    <p class="text-lg text-gray-600">ElixirConfEU 2025</p>
    <!-- Optional Visual: Could add logos here -->
  </div>
</template>
