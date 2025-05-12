import { computed, watchEffect } from "vue";

import { Ref, ref } from "vue";
import { useNow } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";

type EmojiState = {
  id: string;
  emoji: string;
  timeOfAppearance: number;
  xPos: number;
  speed: number;
  size: string;
};

export const useEmojis = (containerRef: Ref<HTMLElement | null>) => {
  const activeEmojis = ref<Array<EmojiState>>([]);
  const now = useNow({ interval: "requestAnimationFrame" });
  const { height: windowHeight } = useWindowSize();

  let nextId = 0;

  const addEmoji = (emoji: string) => {
    const containerWidth = containerRef.value?.clientWidth;
    if (!containerWidth) {
      // Fallback or error handling if containerRef is not yet available or has no width
      console.warn("Emoji container width is not available.");
      return;
    }

    const newEmoji = {
      id: `emoji-${nextId++}`,
      emoji,
      size: `${Math.random() * 100 + 50}px`, // size in pixels, from 50px to 150px
      timeOfAppearance: now.value.getTime(), // milliseconds
      xPos: (Math.random() * 0.9 + 0.05) * containerWidth, // position in pixels, from 5% to 95% of container width
      speed: Math.random() * 100 + 75, // speed in pixels per second, from 75px/s to 175px/s
    };
    activeEmojis.value.push(newEmoji);
  };

  const calculateYPosition = (emoji: EmojiState) => {
    const elapsedTimeSeconds = (now.value.getTime() - emoji.timeOfAppearance) / 1000;
    return elapsedTimeSeconds * emoji.speed;
  };

  const computedEmojis = computed(() => {
    return activeEmojis.value.map((emoji) => ({
      ...emoji,
      yPos: calculateYPosition(emoji),
    }));
  });

  watchEffect(() => {
    const currentContainerHeight = containerRef.value?.clientHeight || windowHeight.value;
    activeEmojis.value = activeEmojis.value.filter((emoji) => {
      const yPos = calculateYPosition(emoji);
      // Keep emoji if its calculated upward movement is less than the container height
      return yPos < currentContainerHeight;
    });
  });

  return { addEmoji, emojis: computedEmojis };
};
