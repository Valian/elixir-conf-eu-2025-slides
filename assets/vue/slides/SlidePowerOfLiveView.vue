<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";
import liveView from "@/images/live_view.svg?component";

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
    <h1 v-if="slideStep >= 1">LiveView: The Revolution We Love</h1>
    <!-- <ul v-if="slideStep >= 2" class="mt-6">
      <li>Server-rendered HTML over WebSockets</li>
      <li>Rich interactivity <em>without</em> writing JS (mostly! 😉)</li>
      <li>Stateful, declarative UI on the server</li>
      <li>Simplified development model</li>
    </ul> -->
    <live-view class="w-full h-auto mt-8" />
    <!-- Visual: Diagram placeholder -->
  </div>
</template>
