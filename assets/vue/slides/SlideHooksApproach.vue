<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 2, // 1: Headline, 2: Pros/Cons + Code Placeholder
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div>
    <h1 v-if="slideStep >= 1">
      Phoenix Hooks: Powerful, But Always the Answer?
    </h1>
    <div
      v-if="slideStep >= 2"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
    >
      <div>
        <h2>How it works (briefly)</h2>
        <p>
          The <code>phx-hook</code> attribute links DOM elements to JavaScript
          objects.
        </p>
        <h2>Pros</h2>
        <ul>
          <li>Good for simple, targeted interactions.</li>
        </ul>
        <h2>Cons</h2>
        <ul>
          <li>Imperative vs. Declarative (Feels like a step back!)</li>
          <li>Hard to manage/reuse state across hooks.</li>
          <li>Disconnected from the HEEx template's flow.</li>
          <li>Boilerplate for complex state.</li>
        </ul>
      </div>
      <div>
        <h2>Example Complex Hook</h2>
        <pre><code>// Placeholder for your complex hook example
// Show how state management can become tangled

const MyComplexHook = {
  mounted() {
    this.state = { count: 0, isActive: false };
    this.el.addEventListener("click", () => {
      this.state.count++;
      this.updateUI();
      this.pushEvent("update_count", { count: this.state.count });
    });
    // ... more listeners, complex setup ...
  },
  updateUI() {
    // ... imperative DOM manipulation ...
  },
  // ... other lifecycle hooks ...
}
</code></pre>
        <p class="mt-4">
          "We need a way to manage client state declaratively, like we're used
          to."
        </p>
      </div>
    </div>
  </div>
</template>
