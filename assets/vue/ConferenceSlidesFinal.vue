<script setup lang="ts">
import Prism from "prismjs";
import { watch, nextTick } from "vue";
import SlideTemplate from "@/vue/components/SlideTemplate.vue";
import { useSlideAnimation } from "@/js/useSlideAnimation";
import ExampleCounter from "@/vue/components/ExampleCounter.vue";
import EmojiDisplay from "@/vue/components/EmojiDisplay.vue";
import * as snippets from "./snippets.ts";

import svelte from "@/images/svelte.png";
import react from "@/images/react.png";
import vue from "@/images/vue.png";
import diagramSpa from "@/images/diagram_spa.png";
import diagramLiveViewInitial from "@/images/diagram_live_view_initial.png";
import diagramLiveViewFinal from "@/images/diagram_live_view_final.png";
import hooks from "@/images/diagram_hooks.png";
import whyNotBoth from "@/images/why-not-both-why-not.gif";

const props = defineProps<{
  currentSlide: number;
  count: number;
}>();

watch(
  () => props.currentSlide,
  () => {
    nextTick(() => {
      console.log("highlighting");
      console.log(document.querySelectorAll("pre code"));
      Prism.highlightAll();
    });
  }
);

const emits = defineEmits<{
  (e: "slide-change", params: { direction: 1 | -1 }): void;
}>();

useSlideAnimation({
  totalSteps: 30,
  onSlideChange: (direction) => emits("slide-change", { direction }),
});
</script>

<template>
  <div class="overflow-hidden">
    <SlideTemplate v-if="props.currentSlide === 0" variant="dragon" center>
      <h1 class="text-center text-white">Why mixing LiveView and a frontend library is a great idea</h1>
      <h2 class="text-center text-white">Jakub @Valian Skałecki</h2>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 1" variant="default">
      <h1>About me</h1>
      <p>Based in Warsaw, Poland</p>
      <p>~10 years as a Python full-stack developer</p>
      <p>~3 years with Elixir</p>
      <p>- Author of <a href="https://github.com/valian/livevue" target="_blank"> LiveVue </a></p>
      <p>
        - Currently building a startup with Elixir called
        <a href="https://postline.ai" target="_blank">Postline.ai</a>
      </p>
      <p>- Always on a lookout for the "perfect" developer experience</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 2" variant="default">
      <h1>Let's quickly talk about SPAs</h1>
      <p>- Dynamic, rich UIs and interactions</p>
      <p>- No latency unless new data is needed</p>
      <p>- Mobile-like feel</p>
      <p>- Offline capabilities</p>

      <div class="flex flex-row gap-4 mt-12">
        <img :src="vue" class="object-fit max-h-64" />
        <img :src="react" class="object-fit max-h-64" />
        <img :src="svelte" class="object-fit max-h-64" />
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 3" variant="default" center>
      <img :src="diagramSpa" class="" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 4" variant="default">
      <h1>The tale of two states</h1>
      <p>The core of an SPA is its client-side state management and reliance on APIs.</p>
      <p>It imposes certain complexity on the developer.</p>
      <p>- design & maintain API routes</p>
      <p>- global client-side state - Redux, Vuex etc</p>
      <p>- desyncs</p>
      <p>- SEO</p>
      <p>- JS ecosystem fatigue & bundle size</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 5" variant="default">
      <h1>Phoenix LiveView: The Stateful Server-Side Revolution</h1>
      <p>- Simplified state synchronization</p>
      <p>- No API routes to maintain</p>
      <p>- Almost not JS necessary</p>
      <p>- Great productivity</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 6" variant="default">
      <img :src="diagramLiveViewInitial" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 7" variant="default">
      <img :src="diagramLiveViewFinal" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 8" variant="default">
      <h1>There's always a client-side state</h1>
      <p>- Not every interaction requires server round-trip</p>
      <p>- Complex form interactions (multi-step, dynamic validation)</p>
      <p>- Smooth, intricate animations & transitions</p>
      <p>- UI widgets needing instant feedback (sliders, drag-n-drop, maps)</p>
      <p>- Accessibility (eg aria-attributes)</p>
      <p>- Integrating 3rd-party JS libraries</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 9" variant="default">
      <h1>Official solution = %JS{} and hooks</h1>
      <p>- phx-hook creates a javascript object tied to the DOM object</p>
      <p>- mounted, updated, destroyed</p>

      <p class="mt-12">Cons</p>
      <p>- a single hook per element</p>
      <p>- biggest problem - it’s imperative and detached from HEEX</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 10" variant="default" center>
      <img :src="hooks" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 11" variant="default" center>
      <blockquote class="text-4xl italic border-l-4 border-gray-400 text-gray-800 pl-6 py-2">
        "Generally writing JS hooks makes the code a little tricky to reason about. <br />When you start to have a lot
        of JS it ends up having similar problems to jquery."
      </blockquote>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 11" variant="default">
      <h1>Example of a complex hook</h1>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 12" variant="default">
      <h1>Comparision</h1>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-100 p-4 rounded-md">
          <h2>LiveView</h2>
          <p>- state primarily on the server</p>
          <p>- declarative server side rendering</p>
          <p>- imperative client-side rendering</p>
          <p>- latency cost for things that might not need it</p>
          <p>- no clear place for client-side state</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-md">
          <h2>SPA</h2>
          <p>- state primarily on the client</p>
          <p>- requires API</p>
          <p>- complex client-side state management</p>
        </div>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 13" variant="default" center>
      <img :src="whyNotBoth" class="h-1/2" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 14" variant="default" center>
      <pre><code class="language-html">{{ snippets.liveVueCode }}</code></pre>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 15" variant="default" center>
      <pre><code class="language-elixir">{{ snippets.liveVueHeexCode }}</code></pre>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 16" variant="default" center>
      <div class="p-8 rounded-lg bg-gray-100 flex flex-col gap-6 text-3xl">
        <ExampleCounter :count="props.count" />
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 17" variant="default">
      <h1>How it works under the hood?</h1>
      <pre><code class="language-elixir">{{ snippets.liveVueRenderCode }}</code></pre>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 18" variant="default">
      <h1>How it works under the hood?</h1>
      <div class="flex justify-center items-center mt-8">
        <pre><code class="language-javascript">{{ snippets.liveVueHookCode }}</code></pre>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 19" variant="default">
      <h1>How it works under the hood?</h1>
      <div class="flex justify-center items-center mt-8">
        <pre><code class="language-javascript">{{ snippets.liveVueResolveCode }}</code></pre>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 20" variant="default">
      <h1>What's inside?</h1>
      <p>- SSR support</p>
      <p>- Hot Reload in development</p>
      <p>- Code splitting</p>
      <p>- HEEX slots</p>
      <p>- Vue sigil</p>
      <p>- Payload optimizations</p>
      <p>- Handlers for component reuse</p>
      <p>- utilities for forms, events etc</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 21" variant="default">
      <!-- TODO - add a diagram here -->
      <h1>Integration tips & tricks</h1>
      <p>1. A few, isolated client-side components - Rich text editor, live preview etc</p>
      <p>2. One top-level Vue component per live view - Inertia.js approach</p>

      <p class="mt-12">Mixing Vue and HEEX components is not perfect:</p>
      <p>- duplication of common components (buttons, inputs etc)</p>
      <p>- SSR might get slow - synchronous execution</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 22" variant="default">
      <h1>Integration tips & tricks</h1>
      <p>TODO: screenshot of the postline colocation</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 23" variant="default">
      <h1>Demo time! Emojis 😍</h1>
      <EmojiDisplay />
    </SlideTemplate>
  </div>
</template>

<style>
h1 {
  @apply text-5xl font-bold mb-10;
  /* Adjusted size */
}

h2 {
  @apply text-3xl font-semibold mb-4;
  /* Adjusted size */
}

p {
  @apply text-3xl mb-4;
  /* Adjusted size */
}

ul {
  @apply list-disc list-inside mb-4 pl-4 text-xl space-y-2;
  /* Adjusted size & spacing */
}

/* Nested lists */
ul ul {
  @apply mt-2 mb-2 text-lg;
  /* Slightly smaller text for nested */
}

li {
  @apply mb-2;
}

a {
  @apply text-blue-600 hover:text-blue-800 hover:underline;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
  /* Slightly slower */
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  /* Leave in opposite direction */
  opacity: 0;
}
</style>
