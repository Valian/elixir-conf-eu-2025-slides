<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  useSlots,
  watch,
  type VNode,
} from "vue";

// Define the model for the current slide number
const currentSlideNumber = defineModel<number>({ default: 1 });

// Keep track of the current step within the active slide
const currentStep = ref(1);

// Get the default slot content (which should be PresentationSlide components)
const slots = useSlots();
const slides = ref<VNode[]>([]);

// Function to filter and get only the Slide components from the slot
const getSlidesFromSlot = () => {
  const defaultSlot = slots.default ? slots.default() : [];
  return defaultSlot.filter(
    (vnode) => typeof vnode.type === "object" && (vnode.type as any).__isSlide
  );
};

// Initialize slides on mount and when slot content changes
onMounted(() => {
  slides.value = getSlidesFromSlot();
});
// watch(slots, () => {
//   slides.value = getSlidesFromSlot();
// });

// Calculate the total number of steps for the current slide
const currentSlideSteps = computed(() => {
  const currentSlideVNode = slides.value[currentSlideNumber.value - 1];
  // Default to 1 step if slideSteps prop is not provided
  return currentSlideVNode?.props?.slideSteps ?? 1;
});

// Navigation logic
const next = () => {
  if (currentStep.value < currentSlideSteps.value) {
    // Go to the next step within the current slide
    currentStep.value++;
  } else if (currentSlideNumber.value < slides.value.length) {
    // Go to the first step of the next slide
    currentSlideNumber.value++;
    currentStep.value = 1;
  }
};

const previous = () => {
  if (currentStep.value > 1) {
    // Go to the previous step within the current slide
    currentStep.value--;
  } else if (currentSlideNumber.value > 1) {
    // Go to the last step of the previous slide
    currentSlideNumber.value--;
    // Need to calculate the steps of the *new* current slide
    const prevSlideVNode = slides.value[currentSlideNumber.value - 1];
    const prevSlideSteps = prevSlideVNode?.props?.slideSteps ?? 1;
    currentStep.value = prevSlideSteps;
  }
};

// Handle keyboard events for navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowRight") {
    next();
  } else if (event.key === "ArrowLeft") {
    previous();
  }
};

// Add/remove keyboard listener
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

// Watch for external changes to currentSlideNumber and reset step
watch(currentSlideNumber, (newSlideNumber, oldSlideNumber) => {
  // Only reset step if the slide *actually* changed
  if (newSlideNumber !== oldSlideNumber) {
    currentStep.value = 1;
  }
});
</script>
<template>
  <div class="presentation-slideshow relative w-full h-full overflow-hidden">
    <!-- Render all slide components, but only the active one will be visible -->
    <!-- Pass necessary props -->
    <component
      v-for="(slide, index) in slides"
      :key="index"
      :is="slide"
      :isActive="index + 1 === currentSlideNumber"
      :slideStep="index + 1 === currentSlideNumber ? currentStep : 1"
    />

    <!-- Optional: Display slide/step number for debugging -->
    <div class="absolute bottom-2 right-2 text-xs text-gray-500">
      Slide {{ currentSlideNumber }} / {{ slides.length }} (Step
      {{ currentStep }} / {{ currentSlideSteps }})
    </div>
  </div>
</template>
