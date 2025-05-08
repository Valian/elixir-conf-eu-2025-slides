<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 3,
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div>
    <h1>Intro</h1>
    <p v-if="slideStep === 1">Step: {{ slideStep }}</p>
    <p v-if="slideStep === 2">Step: {{ slideStep }}</p>
    <p v-if="slideStep === 3">Step: {{ slideStep }}</p>
  </div>
</template>
