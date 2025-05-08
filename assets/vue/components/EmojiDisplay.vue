<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useNow, useWindowSize } from "@vueuse/core";
import { useLiveEvent } from "@/vue";

type EmojiState = {
  id: string;
  emoji: string;
  timeOfAppearance: number;
  xPos: string;
  speed: number;
  size: string;
};
const EMOJI_CHARACTERS = ["😀", "😂", "😍", "🥳", "🤯", "🚀", "🎉", "🦄", "💖", "🔥", "🌟", "🎈", "🌈", "🍕", "🍩"];
const activeEmojis = ref<Array<EmojiState>>([]);

const now = useNow({ interval: "requestAnimationFrame" });
const { height: windowHeight } = useWindowSize();
const containerRef = ref<HTMLDivElement | null>(null);

let nextId = 0;

const addRandomEmoji = () => {
  const randomEmojiCharacter = EMOJI_CHARACTERS[Math.floor(Math.random() * EMOJI_CHARACTERS.length)];
  addEmoji(randomEmojiCharacter);
};

useLiveEvent("add-emoji", ({ emoji }: { emoji: string }) => addEmoji(emoji));

const addEmoji = (emoji: string) => {
  const newEmoji = {
    id: `emoji-${nextId++}`,
    emoji,
    size: `${Math.random() * 100 + 50}px`, // size in pixels, from 50px to 150px
    timeOfAppearance: now.value.getTime(), // milliseconds
    xPos: `${Math.random() * 90 + 5}vw`, // position in vw, from 5vw to 95vw
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
  if (computedEmojis.value.length > 0) console.log(computedEmojis.value[0].yPos);
});

watchEffect(() => {
  const currentContainerHeight = containerRef.value?.clientHeight || windowHeight.value;
  activeEmojis.value = activeEmojis.value.filter((emoji) => {
    const yPos = calculateYPosition(emoji);
    // Keep emoji if its calculated upward movement is less than the container height
    return yPos < currentContainerHeight;
  });
});
</script>

<template>
  <div class="emoji-container" ref="containerRef">
    <span
      v-for="emoji in computedEmojis"
      :key="emoji.id"
      class="emoji"
      :style="{
        transform: `translate(${emoji.xPos}, -${emoji.yPos}px)`,
        left: `0`,
        bottom: `0`,
        fontSize: emoji.size,
      }"
    >
      {{ emoji.emoji }}
    </span>
    <button @click="addRandomEmoji" class="add-emoji-button">Add Emoji</button>
  </div>
</template>

<style scoped>
.emoji-container {
  position: relative;
  width: 100%;
  height: 100vh; /* Default to full viewport height */
  overflow: hidden;
  background-color: #f0f0f0; /* Light background for better visibility */
  border: 1px solid #ccc; /* Optional: for visualizing the container bounds */
}

.emoji {
  position: absolute;
  /* 'bottom' and 'left' are effectively the origin point for the transform */
  bottom: 0;
  left: 0;
  user-select: none; /* Prevent text selection of emojis */
  will-change: transform; /* Hint to browser for optimization */
}

.add-emoji-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10; /* Ensure button is above emojis */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease-in-out;
}

.add-emoji-button:hover {
  background-color: #0056b3;
}

.add-emoji-button:active {
  background-color: #004085;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%) translateY(1px);
}
</style>
