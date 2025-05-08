<script setup lang="ts">
import { computed } from "vue";
import dragon from "@/images/elixir_conf_dragon_background.jpeg";
import waves from "@/images/elixir_conf_waves_background.jpeg";
import elixirPurple from "@/images/elixir_conf_eu_purple.png";
import elixirWhite from "@/images/elixir_conf_eu_white.png";
console.log(dragon);
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
  <div class="h-screen w-screen overflow-hidden relative">
    <img v-if="img" :src="img" class="w-full h-full object-cover" />
    <img :src="variant === 'default' ? elixirPurple : elixirWhite" class="absolute right-8 top-8 w-1/4" />
    <div
      class="absolute inset-0 p-24 flex flex-col"
      :class="[props.class, center ? 'items-center justify-center' : '']"
    >
      <slot />
    </div>
  </div>
</template>
