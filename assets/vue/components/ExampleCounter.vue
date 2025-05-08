<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ count: number }>();

const diff = ref(1);
</script>

<template>
  Current count
  <div>{{ props.count }}</div>
  <label>Diff: </label>
  <input v-model.number="diff" type="range" min="1" max="10" />

  <button @click="$live.pushEvent('inc', { diff })" class="bg-black text-white rounded p-4">
    Increase counter by {{ diff }}
  </button>
</template>
