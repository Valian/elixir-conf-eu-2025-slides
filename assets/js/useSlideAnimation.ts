import { onMounted, onUnmounted, ref } from "vue";

export type UseSlideAnimationParams = {
  totalSteps: number;
  onSlideChange: (direction: 1 | -1) => void;
};

export const useSlideAnimation = (params: UseSlideAnimationParams) => {
  // const slideStep = ref(0);
  const slideStep = ref(params.totalSteps);

  const next = () => {
    slideStep.value = Math.min(slideStep.value + 1, params.totalSteps + 1);
    if (slideStep.value > params.totalSteps) {
      params.onSlideChange(1);
    }
  };

  const previous = () => {
    params.onSlideChange(-1);
    // slideStep.value = Math.max(slideStep.value - 1, 0);
    // if (slideStep.value === 0) {
    //   params.onSlideChange(-1);
    // }
  };

  // Handle keyboard events for navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      next();
    } else if (event.key === "ArrowLeft") {
      previous();
    }
  };
  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
  });

  return { slideStep, next, previous };
};
