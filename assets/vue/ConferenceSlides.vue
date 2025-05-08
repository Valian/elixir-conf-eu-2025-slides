<script setup lang="ts">
// Import all slide components
import SlideTitle from "./slides/SlideTitle.vue";
import SlidePowerOfLiveView from "./slides/SlidePowerOfLiveView.vue";
import SlideChallenge from "./slides/SlideChallenge.vue";
import SlideHooksApproach from "./slides/SlideHooksApproach.vue";
import SlideInspiration from "./slides/SlideInspiration.vue";
import SlideIntroLiveVue from "./slides/SlideIntroLiveVue.vue";
import SlideHowItWorks from "./slides/SlideHowItWorks.vue";
import SlideStrategies from "./slides/SlideStrategies.vue";
import SlideDemo1 from "./slides/SlideDemo1.vue";
import SlideDemo2 from "./slides/SlideDemo2.vue";
import SlideBenefits from "./slides/SlideBenefits.vue";
import SlideRoadmap from "./slides/SlideRoadmap.vue";
import SlideConclusion from "./slides/SlideConclusion.vue";
import SlideQA from "./slides/SlideQA.vue";
import SlideThankYou from "./slides/SlideThankYou.vue";
import SlideAboutMe from "./slides/SlideAboutMe.vue";

const props = defineProps<{
  currentSlide: number;
}>();

const emits = defineEmits<{
  (e: "slide-change", params: { direction: 1 | -1 }): void;
}>();

// Define the order of slides
const slides = [
  { component: SlideTitle }, // 1. Title
  { component: SlideAboutMe }, // 2. About me
  { component: SlidePowerOfLiveView }, // 3. Power of LiveView
  { component: SlideChallenge }, // 4. The Challenge
  { component: SlideHooksApproach }, // 5. Hooks Approach
  { component: SlideInspiration }, // 6. Inspiration
  { component: SlideIntroLiveVue }, // 7. Intro LiveVue
  { component: SlideHowItWorks }, // 8. How It Works
  { component: SlideStrategies }, // 9. Strategies
  { component: SlideDemo1 }, // 10. Demo 1 (Declarative)
  { component: SlideDemo2 }, // 11. Demo 2 (Interactive)
  { component: SlideBenefits }, // 12. Benefits
  { component: SlideRoadmap }, // 13. Roadmap
  { component: SlideConclusion }, // 14. Conclusion
  { component: SlideQA }, // 15. Q&A
  { component: SlideThankYou }, // 16. Thank You
];
</script>

<template>
  <div class="overflow-hidden">
    <Transition name="slide-fade" mode="out-in">
      <component
        class="flex flex-col items-center justify-center h-screen p-8 w-full max-w-5xl mx-auto text-left"
        :is="slides[props.currentSlide]?.component"
        :key="props.currentSlide"
        @slide-change="emits('slide-change', { direction: $event })"
      />
    </Transition>
  </div>
</template>
<!--
<style>
h1 {
  @apply text-5xl font-bold mb-6 leading-tight; /* Adjusted size */
}

h2 {
  @apply text-3xl font-semibold mb-4; /* Adjusted size */
}

p {
  @apply text-xl mb-4; /* Adjusted size */
}

ul {
  @apply list-disc list-inside mb-4 pl-4 text-xl space-y-2; /* Adjusted size & spacing */
}

/* Nested lists */
ul ul {
  @apply mt-2 mb-2 text-lg; /* Slightly smaller text for nested */
}

li {
  @apply mb-2;
}

pre {
  @apply bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto mb-4 text-base; /* Adjusted style */
}

code {
  /* Inline code */
  @apply font-mono text-base bg-gray-200 px-1 rounded;
}

pre code {
  /* Code within pre blocks */
  @apply block bg-transparent p-0 rounded-none font-mono text-sm; /* Reset styles for code inside pre, adjust size */
}

a {
  @apply text-blue-600 hover:text-blue-800 hover:underline;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out; /* Slightly slower */
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-30px); /* Leave in opposite direction */
  opacity: 0;
}
</style> -->
