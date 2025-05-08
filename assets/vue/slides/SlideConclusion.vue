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
    <h1 v-if="slideStep >= 1">Takeaways</h1>
    <ul v-if="slideStep >= 2" class="mt-6">
      <li>
        LiveView is fantastic, but complex client-state needs careful thought.
      </li>
      <li>
        Mixing LV with a frontend lib (like Vue via LiveVue) offers a powerful
        hybrid.
      </li>
      <li>
        Identify clear use cases: isolated complex widgets or full component
        rendering.
      </li>
      <li>
        LiveVue provides the bridge with great DX, performance, and access to
        the Vue ecosystem.
      </li>
      <li>
        Choose the right tool for the job – sometimes that means combining
        tools!
      </li>
    </ul>
    <p v-if="slideStep >= 2" class="mt-8 font-semibold text-xl">
      Find the balance that works for your team and project.
    </p>
  </div>
</template>
