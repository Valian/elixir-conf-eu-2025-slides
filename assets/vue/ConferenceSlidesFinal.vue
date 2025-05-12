<script setup lang="ts">
import Prism from "prismjs";
import { watch, nextTick, ref } from "vue";
import SlideTemplate from "@/vue/components/SlideTemplate.vue";
import { useSlideAnimation } from "@/js/useSlideAnimation";
import ExampleCounter from "@/vue/components/ExampleCounter.vue";
import EmojiDisplay from "@/vue/components/EmojiDisplay.vue";
import * as snippets from "./snippets.ts";
import QrcodeVue from "qrcode.vue";

import svelte from "@/images/svelte.png";
import react from "@/images/react.png";
import vue from "@/images/vue.png";
import phoenix from "@/images/phoenix.svg?url";
import diagramSpa from "@/images/diagram_spa.png";
import isolatedExample from "@/images/isolated_example.png";
import exclusiveExample from "@/images/exclusive_example.png";
import mixingExample from "@/images/mixing_example.png";
import postlineColocation from "@/images/colocation.png";
import postlineExample from "@/images/postline_example.png";
import diagramLiveViewInitial from "@/images/diagram_live_view_initial.png";
import diagramLiveViewFinal from "@/images/diagram_live_view_final.png";
import diagramLiveVue from "@/images/diagram_live_vue.png";
import me from "@/images/foto_small.jpeg";
import hooks from "@/images/diagram_hooks.png";
import vueSigil from "@/images/vue_sigil.png";
import whyNotBoth from "@/images/why-not-both-why-not.gif";
import { usePhxNavigation } from "./index.ts";
import ExampleChart from "./components/ExampleChart.vue";
import { useStorage } from "@vueuse/core";

const props = defineProps<{
  currentSlide: number;
  count: number;
  timeseriesData: { value: number; time: number }[];
  watchersEndpoint: string;
}>();

const featureCards = [
  {
    emoji: "⚡",
    title: "End-To-End Reactivity",
    description: "Seamless integration with LiveView for real-time updates",
  },
  {
    emoji: "🔋",
    title: "Server-Side Rendered",
    description: "Vue components rendered on the server for optimal performance",
  },
  { emoji: "🐌", title: "Lazy-loading", description: "Load Vue components on-demand for faster initial page loads" },
  { emoji: "🪄", title: "~V Sigil", description: "Alternative LiveView DSL for inline Vue components" },
  {
    emoji: "🦄",
    title: "Phoenix utilities",
    description: "Access to Phoenix helpers, links, events, and form handling",
  },
  { emoji: "💀", title: "Dead View Support", description: "Use Vue components in both live and dead views" },
  {
    emoji: "🦥",
    title: "Slot Interoperability",
    description: "Pass content from Phoenix to Vue components using slots",
  },
  { emoji: "🚀", title: "Amazing DX", description: "Excellent developer experience with Vite integration" },
];

const { patch } = usePhxNavigation();
const qrcodeSize = useStorage("qrcodeSize", 500);
const diff = ref(0);

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

useSlideAnimation({
  totalSteps: 50,
  onSlideChange: (direction) => patch(`/slides/${props.currentSlide + direction + 1}`),
});
</script>

<template>
  <div class="overflow-hidden">
    <SlideTemplate v-if="props.currentSlide === 0" variant="dragon" center>
      <h1 class="text-center text-white">Why mixing LiveView and a frontend library is a great idea</h1>
      <h2 class="text-center text-white">Jakub @Valian Skałecki</h2>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 1" variant="default">
      <div class="grid grid-cols-2 gap-4">
        <div>
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
        </div>
        <div class="flex items-center">
          <img :src="me" class="object-cover aspect-square max-h-64 rounded-full border-8 border-yellow-300" />
        </div>
      </div>
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

      <div class="grid grid-cols-2 gap-4">
        <div>
          <p>- Simplified state synchronization</p>
          <p>- No API routes to maintain</p>
          <p>- Almost not JS necessary</p>
          <p>- Great productivity</p>
        </div>
        <div class="flex items-center justify-left">
          <img :src="phoenix" class="max-h-48" />
        </div>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 6" variant="default" center>
      <img :src="diagramLiveViewInitial" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 7" variant="default" center>
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
      <!-- TODO - add some snippet here -->
      <h1>Official solution = %JS{} and hooks</h1>
      <p>- phx-hook creates a javascript object tied to the DOM object</p>
      <p>- mounted, updated, destroyed</p>

      <p class="mt-12">Cons</p>
      <p>- a single hook per element</p>
      <p>- biggest problem - it's imperative and detached from HEEX</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 10" variant="default" center>
      <img :src="hooks" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 11" variant="default" center>
      <blockquote class="text-5xl italic border-l-4 border-gray-400 text-gray-800 pl-6 py-2 max-w-5xl">
        "Generally writing JS hooks makes the code a little tricky to reason about. <br /><br />When you start to have a
        lot of JS it ends up having similar problems to jquery."
      </blockquote>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 12" variant="default">
      <h1>Example of a complex hook</h1>
      <pre><code class="language-javascript">{{ snippets.complexLiveViewHookCode }}</code></pre>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 13" variant="default">
      <h1>Comparision</h1>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-orange-100 p-4 rounded-md">
          <h2>LiveView</h2>
          <p>- state primarily on the <b>server</b></p>
          <p>- declarative server side rendering</p>
          <p>- little JS</p>
          <p>- no API necessary</p>
        </div>
        <div class="bg-green-100 p-4 rounded-md">
          <h2>SPA</h2>
          <p>- state primarily on the <b>client</b></p>
          <p>- declarative client-side rendering</p>
          <p>- clear place for client-side state</p>
        </div>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 14" variant="default" center>
      <img :src="whyNotBoth" class="h-1/2" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 15" variant="default">
      <div class="flex justify-center items-center h-full">
        <div class="flex flex-col text-5xl gap-12">
          <div class="flex gap-4 items-center">
            <img :src="phoenix" class="object-fit max-h-32" />
            <span>+</span>
            <img :src="svelte" class="object-fit max-w-32" />
            <span>=&nbsp;LiveSvelte</span>
          </div>
          <div class="flex gap-4 items-center">
            <img :src="phoenix" class="object-fit max-h-32" />
            <span>+</span>
            <img :src="vue" class="object-fit max-w-32" />
            <span>=&nbsp;LiveVue</span>
          </div>
          <div class="flex gap-4 items-center">
            <img :src="phoenix" class="object-fit max-h-32" />
            <span>+</span>
            <img :src="react" class="object-fit max-w-32" />
            <span>=&nbsp;LiveReact</span>
          </div>
        </div>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 16" variant="default" center>
      <img :src="diagramLiveVue" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 17" variant="default" center>
      <pre><code class="language-html">{{ snippets.liveVueCode }}</code></pre>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 18" variant="default" center>
      <pre><code class="language-elixir">{{ snippets.liveVueHeexCode }}</code></pre>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 19" variant="default" center>
      <div class="grid grid-cols-3 gap-4">
        <div class="p-8 rounded-lg bg-blue-100 flex flex-col gap-6 text-3xl">
          <p>Server state</p>
          <pre>{{ { count: props.count } }}</pre>
        </div>
        <div class="p-8 rounded-lg bg-green-100 flex flex-col gap-6 text-3xl">
          <ExampleCounter :count="props.count" v-model:diff="diff" />
        </div>
        <div class="p-8 rounded-lg bg-orange-100 flex flex-col gap-6 text-3xl">
          <p>Client state</p>
          <pre>{{ { diff: diff } }}</pre>
        </div>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 20" variant="default">
      <h1>How it works under the hood?</h1>
      <pre><code class="language-elixir">{{ snippets.liveVueRenderCode }}</code></pre>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 21" variant="default">
      <h1>How it works under the hood?</h1>
      <div class="flex justify-center items-center mt-8">
        <pre><code class="language-javascript">{{ snippets.liveVueHookCode }}</code></pre>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 22" variant="default">
      <h1>How it works under the hood?</h1>
      <div class="flex justify-center items-center mt-8">
        <pre><code class="language-javascript">{{ snippets.liveVueResolveCode }}</code></pre>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 23" variant="default">
      <h1>What's inside?</h1>
      <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="card in featureCards" :key="card.title" class="rounded-lg bg-amber-50 p-6">
          <div class="text-5xl mb-2">{{ card.emoji }}</div>
          <h3 class="text-4xl font-semibold mb-2 text-pink-600">{{ card.title }}</h3>
          <p class="text-2xl text-slate-600">{{ card.description }}</p>
        </div>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 24" variant="default">
      <!-- TODO - add a diagram here -->
      <h1>Integration tips & tricks</h1>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <div class="text-center">
          <p class="font-bold">A few, isolated client-side components</p>
          <p class="text-gray-500">Rich text editor, live preview etc</p>
          <img :src="isolatedExample" class="mt-8" />
        </div>
        <div class="text-center">
          <p class="font-bold">Top-level Vue component per live view</p>
          <p class="text-gray-500">Interia.js approach</p>
          <img :src="exclusiveExample" class="mt-8" />
        </div>
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 25" variant="default">
      <!-- TODO - add a diagram here -->
      <h1>Integration tips & tricks</h1>
      <div class="text-center">
        <p class="font-bold">Mixing Vue and HEEX components is not perfect</p>
        <p class="text-gray-500">duplication of common components (buttons, inputs etc)</p>
        <p class="text-gray-500">SSR might get slow - synchronous execution</p>
        <img :src="mixingExample" class="mt-8 w-1/2 mx-auto" />
      </div>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 26" variant="default">
      <h1>Integration tips & tricks - colocation</h1>
      <img :src="postlineColocation" class="mt-8 max-h-[60vh] mx-auto aspect-auto" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 27" variant="default">
      <h1>Integration tips & tricks - colocation</h1>
      <img :src="postlineExample" class="max-h-[75vh] mx-auto aspect-auto" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 28" variant="default">
      <h1>Integration tips & tricks - Vue sigil</h1>
      <img :src="vueSigil" class="mt-8 max-h-[60vh] mx-auto aspect-auto" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 29" variant="default">
      <h1>Drawbacks</h1>
      <p>- JSON serialization is necessary, either global implementation of `Jason.encode/2` or mapping functions</p>
      <p>- Testing is more complex</p>
      <p>- JS bundle size will increase</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 30" variant="default" center>
      <h1>Demo time! QR code</h1>
      <QrcodeVue :value="props.watchersEndpoint" level="H" :size="qrcodeSize" class="w-full h-full" />
      <input type="range" v-model="qrcodeSize" min="100" max="500" class="mt-8" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 31" variant="default">
      <h1>Demo time! Emojis 😍</h1>
      <EmojiDisplay />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 32" variant="default">
      <h1>Demo time! Online users 😍</h1>
      <ExampleChart :data="props.timeseriesData" />
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 33" variant="default">
      <h1>Summary</h1>
      <p>- Clear place for declarative client-side state</p>
      <p>- Access to vast ecosystem of frontend libraries</p>
      <p>- Easy to hire Vue / React / Svelte developers</p>
      <p>- LLMs are better at it than HEEX 🦾</p>
      <p>- Great DX</p>
    </SlideTemplate>
    <SlideTemplate v-if="props.currentSlide === 34" variant="default" center>
      <h1>✨ Thank you! ✨</h1>
      <p>Questions?</p>
    </SlideTemplate>
  </div>
</template>

<style>
h1 {
  @apply text-5xl font-bold mb-10;
  /* Adjusted size */
}

h2 {
  @apply text-4xl font-semibold mb-4;
  /* Adjusted size */
}

p {
  @apply text-4xl mb-4;
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
code[class*="language-"],
pre[class*="language-"] {
  @apply text-3xl;
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
