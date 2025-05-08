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
    <h1 v-if="slideStep >= 1">There's always client-side state</h1>
    <div v-if="slideStep >= 2" class="mt-6">
      <ul>
        <li>Complex form interactions (multi-step, dynamic validation)</li>
        <li>Smooth, intricate animations & transitions</li>
        <li>UI widgets needing instant feedback (sliders, drag-n-drop)</li>
        <li>Accessibility (eg aria-attributes)</li>
        <li>Integrating 3rd-party JS libraries</li>
      </ul>
      <p class="mt-4 italic">
        "Raise your hand if you've found yourself writing complex Phoenix hooks
        that felt... a bit like old-school JS?"
      </p>
      <!-- Visual: Tangled hook cartoon placeholder -->
    </div>
  </div>
</template>
