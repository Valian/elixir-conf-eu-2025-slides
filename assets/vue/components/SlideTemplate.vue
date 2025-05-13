<script setup lang="ts">
import { computed } from "vue";
import dragon from "@/images/elixir_conf_dragon_background.jpeg";
import waves from "@/images/elixir_conf_waves_background.jpeg";
import elixirPurple from "@/images/elixir_conf_eu_purple.png";
import elixirWhite from "@/images/elixir_conf_eu_white.png";
import github from "@/images/github.svg?url";
import x from "@/images/x.svg?url";

const props = defineProps<{
  variant: "dragon" | "waves" | "default";
  center?: boolean;
  class?: string;
}>();

const img = computed(() => {
  if (props.variant === "dragon") return dragon;
  if (props.variant === "waves") return waves;
  return null;
});
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center bg-black">
    <div class="w-screen overflow-hidden relative aspect-video bg-white">
      <img v-if="img" :src="img" class="w-full h-full object-cover" />
      <img :src="variant === 'default' ? elixirPurple : elixirWhite" class="absolute right-8 top-8 w-1/4" />
      <div
        class="absolute inset-0 p-24 flex flex-col"
        :class="[props.class, center ? 'items-center justify-center' : '']"
      >
        <slot />
      </div>
      <div
        class="absolute bottom-0 left-0 p-4 flex items-center gap-2"
        :class="variant === 'default' ? 'text-gray-600' : 'text-white'"
      >
        <img :src="github" class="w-6 h-6" alt="GitHub" />
        <span class="text-2xl">Valian</span>
      </div>

      <div
        class="absolute bottom-0 right-0 p-4 flex items-center gap-2"
        :class="variant === 'default' ? 'text-gray-600' : 'text-white'"
      >
        <span class="text-2xl">jskalc</span>
        <img :src="x" class="w-6 h-6" alt="X" />
      </div>
    </div>
  </div>
</template>
