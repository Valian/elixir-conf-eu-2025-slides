<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 2, // 1: Headline, 2: Bullets + Code Placeholder
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div>
    <h1 v-if="slideStep >= 1">LiveVue: Under the Hood (Simplified)</h1>
    <div
      v-if="slideStep >= 2"
      class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <ul>
          <li>
            HEEx <code>&lt;.vue&gt;</code> tag renders a <code>div</code> with
            <code>data-*</code> attributes (props, events).
          </li>
          <li>
            <code>LiveVue.JS</code> Hook:
            <ul class="list-disc list-inside ml-4">
              <li>Initializes Vue component on <code>mounted</code>.</li>
              <li>Injects props & event handlers.</li>
              <li>Updates props reactively on <code>updated</code>.</li>
              <li>Handles cleanup on <code>destroyed</code>.</li>
            </ul>
          </li>
          <li>SSR (Server-Side Rendering) for initial load performance.</li>
          <li>Vite Integration: Blazing fast HMR for Elixir *and* Vue!</li>
        </ul>
        <p class="mt-4 font-semibold">
          Optimized: Only changed props/slots/handlers are sent!
        </p>
      </div>
      <div>
        <h2>Basic Usage</h2>
        <pre><code v-pre># lib/my_app_web/live/my_live.ex
def render(assigns) do
  ~H"""
  &lt;.Counter count={@count} v-socket={@socket} v-on:inc={JS.push("inc")} /&gt;
  """
end

# assets/vue/Counter.vue
&lt;script setup&gt;
const props = defineProps(['count'])
const emit = defineEmits(['inc'])
&lt;/script&gt;
&lt;template&gt;
  &lt;div&gt;Count: {{ props.count }}&lt;/div&gt;
  &lt;button @click="emit('inc', { value: 1 })"&gt;Inc&lt;/button&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>
  </div>
</template>
