<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 2, // 1: Headline, 2: Bullets
  onSlideChange: (direction) => emits("slide-change", direction),
});

const repoUrl = "https://github.com/Valian/live_vue";
</script>

<template>
  <div>
    <h1 v-if="slideStep >= 1">What's Next for LiveVue? (Roadmap 🎯)</h1>
    <div v-if="slideStep >= 2" class="mt-6">
      <ul>
        <li>
          Automatic event handlers (default push,
          <code>usePushEvent</code> utility).
        </li>
        <li>
          Form helpers (<code>useLiveForm</code> for Changesets/Validation).
        </li>
        <li>
          Event handling utilities (<code>useEventHandler</code> for
          <code>handleEvent</code>).
        </li>
        <li>Payload optimizations (JSON Patch diffs for props).</li>
        <li>VS Code Extension (Sigil Highlighting for <code>~V</code>).</li>
        <li>Phoenix Stream support as props.</li>
        <li>Installation helper (maybe using Igniter).</li>
        <li><em>Your ideas here!</em></li>
      </ul>
      <p class="mt-6">
        Contributions are welcome! Let's make LiveView + Vue even better
        together.
      </p>
      <p class="mt-2">
        <a
          :href="repoUrl"
          target="_blank"
          class="text-blue-600 hover:underline"
          >{{ repoUrl }}</a
        >
      </p>
    </div>
  </div>
</template>
