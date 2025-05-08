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
    <h1>Demo Time: Blending Server & Client State</h1>
    <p class="mt-6 text-lg">
      Now, let's see how LiveVue handles interactions involving both server and
      client state.
    </p>
    <p class="mt-4 text-gray-600 italic">
      (Demo: Live Audience Poll / Reaction or Simple Shared Interactive Element
      like a Clicker Grid)
    </p>
    <div class="mt-4">
      <!-- Placeholder for QR Code / Link -->
      <p class="font-bold">[QR Code / Link Placeholder]</p>
      <p>
        "Let's try something together! Scan this QR code or visit this URL on
        your phone."
      </p>
    </div>
    <!-- Placeholder for Live Coding / Code Snippet display -->
    <pre
      class="mt-4 text-left"
    ><code v-pre>// Key code parts (handle_event, JS.push, Vue reaction) will be shown here...</code></pre>
    <!-- Placeholder for the interactive element itself -->
    <div class="mt-6 p-4 border rounded bg-gray-50 min-h-[100px]">
      [Interactive Demo Element Placeholder]
    </div>
  </div>
</template>
