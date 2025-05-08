<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  slideSteps?: number; // Optional: defined by user, read by slideshow
  isActive: boolean; // Controlled by Slideshow
  slideStep: number; // Current step for this slide if active
}>();

// Add this option so the parent can identify slide VNodes
defineOptions({
  __isSlide: true,
});
</script>

<template>
  <div
    v-show="isActive"
    class="presentation-slide w-full h-full absolute top-0 left-0"
  >
    <!-- Pass slideStep down to the user-provided content -->
    <slot :slideStep="slideStep" />
  </div>
</template>
