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
const twitterHandle = "https://twitter.com/Valian"; // Replace with actual handle if different
const githubHandle = "https://github.com/Valian";
const email = "your-email@example.com"; // Replace with your actual email
</script>

<template>
  <div class="text-center">
    <h1 class="text-6xl font-bold mb-10">Questions?</h1>

    <div class="space-y-3 text-xl">
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
      <p>
        <strong>Slides Link:</strong>
        <span class="text-gray-500 italic"
          >(Optional: Add link here if you host them)</span
        >
      </p>
      <p class="mt-6 pt-4 border-t">
        <strong>Contact:</strong> Jakub Skałecki <br />
        <a
          :href="githubHandle"
          target="_blank"
          class="text-blue-600 hover:underline"
          >GitHub: @Valian</a
        >
        |
        <a
          :href="twitterHandle"
          target="_blank"
          class="text-blue-600 hover:underline"
          >Twitter: @Valian</a
        >
        |
        <!-- <a :href="`mailto:${email}`" class="text-blue-600 hover:underline">{{ email }}</a> -->
      </p>
    </div>
  </div>
</template>
