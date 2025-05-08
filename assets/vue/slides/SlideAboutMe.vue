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
    <h1 class="text-6xl font-bold mb-6">whoami</h1>
    <ul class="mt-6">
      <li>Based in Warsaw, Poland</li>
      <li>~10 years as a Python full-stack developer</li>
      <li>~3 years with Elixir</li>
      <li>
        Author of
        <a
          href="https://github.com/valian/livevue"
          target="_blank"
          class="text-blue-600 hover:underline"
          >LiveVue</a
        >
        library
      </li>
      <li>
        Currently building a startup with Elixir called
        <a
          href="https://postline.ai"
          target="_blank"
          class="text-blue-600 hover:underline"
          >Postline.ai</a
        >
      </li>
      <li>Always on a lookout for the "perfect" developer experience</li>
    </ul>
    <!-- Optional Visual: Could add logos here -->
  </div>
</template>
