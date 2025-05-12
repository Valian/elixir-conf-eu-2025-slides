<script setup lang="ts">
const props = defineProps<{ count: number }>();

const diff = defineModel<number>("diff", { required: true });
</script>

<template>
  Current count
  <div>{{ props.count }}</div>
  <label>Diff: </label>
  <input v-model.number="diff" type="range" min="1" max="9" />

  <button @click="$live.pushEvent('inc', { diff })" class="bg-black text-white rounded p-4 min-w-80">
    Increase counter by {{ diff }}
  </button>
</template>
