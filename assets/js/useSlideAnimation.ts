import { onMounted, onUnmounted, ref } from "vue";

export type UseSlideAnimationParams = {
  onSlideChange: (direction: 1 | -1) => void;
};

export const useSlideAnimation = (params: UseSlideAnimationParams) => {
  const next = () => params.onSlideChange(1);
  const previous = () => params.onSlideChange(-1);

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

  return { next, previous };
};
