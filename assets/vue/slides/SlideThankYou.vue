<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

useSlideAnimation({
  totalSteps: 1,
  onSlideChange: (direction) => emits("slide-change", direction),
});

const repoUrl = "https://github.com/Valian/live_vue";
const docsUrl = "https://hexdocs.pm/live_vue";
</script>

<template>
  <div class="text-center">
    <h1 class="text-7xl font-bold mb-12">Thank You!</h1>

    <p class="text-2xl mb-6">Let's build amazing hybrid apps!</p>

    <div class="space-y-2 text-xl mt-8">
      <p>
        <strong>LiveVue Repo:</strong>
        <a
          :href="repoUrl"
          target="_blank"
          class="text-blue-600 hover:underline"
          >{{ repoUrl }}</a
        >
      </p>
      <p>
        <strong>LiveVue Docs:</strong>
        <a
          :href="docsUrl"
          target="_blank"
          class="text-blue-600 hover:underline"
          >{{ docsUrl }}</a
        >
      </p>
    </div>
    <!-- Maybe add LiveVue logo here -->
  </div>
</template>
