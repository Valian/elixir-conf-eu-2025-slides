<script setup lang="ts">
import { ref } from "vue";
import { useLiveEvent } from "@/vue";
import { useEmojis } from "./useEmojis";

const EMOJI_CHARACTERS = ["😀", "😂", "😍", "🥳", "🤯", "🚀", "🎉", "🦄", "💖", "🔥", "🌟", "🎈", "🌈", "🍕", "🍩"];
const containerRef = ref<HTMLDivElement | null>(null);
const { addEmoji, emojis } = useEmojis(containerRef);

const addRandomEmoji = () => {
  const randomEmojiCharacter = EMOJI_CHARACTERS[Math.floor(Math.random() * EMOJI_CHARACTERS.length)];
  addEmoji(randomEmojiCharacter);
};

useLiveEvent("add-emoji", ({ emoji }: { emoji: string }) => addEmoji(emoji));
</script>

<template>
  <div class="emoji-container" ref="containerRef">
    <span
      v-for="emoji in emojis"
      :key="emoji.id"
      class="emoji"
      :style="{
        transform: `translate(${emoji.xPos}px, -${emoji.yPos}px)`,
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
