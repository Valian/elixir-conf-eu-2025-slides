<script setup lang="ts">
import { useSlideAnimation } from "@/js/useSlideAnimation";

const emits = defineEmits<{
  (e: "slide-change", direction: 1 | -1): void;
}>();

const { slideStep } = useSlideAnimation({
  totalSteps: 2, // 1: Headline, 2: Bullets
  onSlideChange: (direction) => emits("slide-change", direction),
});
</script>

<template>
  <div>
    <h1 v-if="slideStep >= 1">Why Consider This Approach? LiveVue Benefits</h1>
    <ul
      v-if="slideStep >= 2"
      class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
    >
      <li>
        ✅ <strong>End-to-End Reactivity:</strong> Seamless server-client
        updates.
      </li>
      <li>
        ✅ <strong>Leverage Vue Ecosystem:</strong> Use existing components,
        tools, & libraries.
      </li>
      <li>
        ✅ <strong>Improved DX:</strong> Declarative client code, Vite HMR,
        colocated components.
      </li>
      <li>
        ✅ <strong>Clear Boundaries:</strong> Separate server/client state
        concerns effectively.
      </li>
      <li>
        ✅ <strong>SSR Included:</strong> Good performance and SEO
        out-of-the-box.
      </li>
      <li>
        ✅ <strong>Slot Interoperability:</strong> Mix Phoenix components and
        Vue slots easily.
      </li>
      <li>
        ✅ <strong>TypeScript Support:</strong> Type safety across your stack.
      </li>
      <li>
        ✅ <strong>Test Utilities:</strong> Easily test your Vue components
        alongside LiveView tests.
      </li>
    </ul>
  </div>
</template>
