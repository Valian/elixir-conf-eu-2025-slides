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
import diagramSpaThumbs from "@/images/diagram_spa_thumbs.png";
import isolatedExample from "@/images/isolated_example.png";
import exclusiveExample from "@/images/exclusive_example.png";
import mixingExample from "@/images/mixing_example.png";
import postlineColocation from "@/images/colocation.png";
import postlineExample from "@/images/postline_example.png";
import diagramLiveViewInitial from "@/images/diagram_live_view_initial.png";
import diagramLiveViewFinal from "@/images/diagram_live_view_final.png";
import diagramLiveVue from "@/images/diagram_live_vue.png";
import vite from "@/images/vite.png";
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
const diff = ref(1);

const changeSlide = (direction: 1 | -1) => patch(`/slides/${props.currentSlide + direction + 1}`);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

useSlideAnimation({ onSlideChange: changeSlide });
</script>

<template>
  <div class="overflow-hidden">
    <Transition name="slide-fade" mode="out-in" @enter="() => Prism.highlightAll()">
      <div :key="props.currentSlide">
        <SlideTemplate v-if="props.currentSlide === 0" variant="dragon" center>
          <h1 class="text-center text-white">Why mixing LiveView and a frontend library is a great idea</h1>
          <h2 class="text-center text-white">Jakub @Valian Skałecki</h2>
          <button
            @click="toggleFullscreen"
            class="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 bg-black/20 hover:bg-black/50 rounded-md text-white"
          >
            Fullscreen
          </button>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 1" variant="default">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <h1>About me</h1>
              <p>Coming from Warsaw, Poland</p>
              <p>~10 years as a Python full-stack developer</p>
              <p>~3 years with Elixir</p>
              <p>- Author of <a href="https://github.com/valian/livevue" target="_blank"> LiveVue </a></p>
              <p>
                - Currently building a startup with Elixir called
                <a href="https://postline.ai" target="_blank">Postline.ai</a>
              </p>
              <p>- Always on a lookout for the "perfect" developer experience</p>
            </div>
            <div class="flex items-center justify-center">
              <img :src="me" class="object-cover aspect-square max-h-80 rounded-full border-8 border-yellow-300" />
            </div>
          </div>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 2" variant="default">
          <h1>Let's quickly talk about SPAs</h1>
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <p>- Dynamic, rich UIs and interactions</p>
              <p>- No latency unless new data is needed</p>
              <p>- Mobile-like feel</p>
              <p>- Offline capabilities</p>
              <p class="text-red-500">- Complex to implement</p>
            </div>

            <div class="flex flex-col gap-4 items-center justify-center">
              <img :src="vue" class="object-fit max-w-48" />
              <img :src="react" class="object-fit max-w-48" />
              <img :src="svelte" class="object-fit max-w-48" />
            </div>
          </div>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 3" variant="default" center>
          <img :src="diagramSpa" class="" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 4" variant="default" center>
          <img :src="diagramSpaThumbs" class="" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 5" variant="default">
          <h1>Phoenix LiveView: The Stateful Server-Side Revolution</h1>

          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <p>- Simplified state synchronization</p>
              <p>- No API routes to maintain</p>
              <p>- Almost no JS necessary</p>
              <p>- Great productivity</p>
            </div>
            <div class="flex items-center justify-center">
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
          <p>- Complex form interactions (multi-step, dynamic validation)</p>
          <p>- Smooth, intricate animations & transitions</p>
          <p>- UI widgets needing instant feedback (sliders, drag-n-drop, maps, charts)</p>
          <p>- Accessibility (aria-attributes)</p>
          <p>- Integrating 3rd-party JS libraries</p>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 9" variant="default" center>
          <img :src="postlineExample" class="max-h-[75vh] mx-auto aspect-auto" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 10" variant="default">
          <!-- TODO - add some snippet here -->
          <h1>Official solution - LiveView.JS and hooks</h1>
          <p>- JS injects commands to be executed by the client</p>
          <p>- phx-hook creates a javascript object tied to the DOM object</p>
          <p>- hook lifecycle: mounted, updated, destroyed</p>

          <p class="mt-12 font-bold">Cons</p>
          <p>- a single hook per element</p>
          <p>- biggest problem - it's <b>imperative</b> and not <b>declarative</b></p>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 11" variant="default" center>
          <img :src="hooks" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 12" variant="default" center>
          <blockquote class="text-5xl italic border-l-4 border-gray-400 text-gray-800 pl-6 py-2 max-w-5xl">
            "Generally writing JS hooks makes the code a little tricky to reason about. <br /><br />When you start to
            have a lot of JS it ends up having similar problems to jquery."
          </blockquote>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 13" variant="default">
          <h1>Example of a complex hook</h1>
          <pre><code class="language-javascript">{{ snippets.complexLiveViewHookCode }}</code></pre>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 14" variant="default">
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
        <SlideTemplate v-if="props.currentSlide === 15" variant="default" center>
          <img :src="whyNotBoth" class="h-1/2" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 16" variant="default">
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
        <SlideTemplate v-if="props.currentSlide === 17" variant="default" center>
          <img :src="diagramLiveVue" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 18" variant="default" center>
          <pre><code class="language-elixir">{{ snippets.liveVueHeexCode }}</code></pre>
        </SlideTemplate>

        <SlideTemplate v-if="props.currentSlide === 19" variant="default" center>
          <pre><code class="language-html">{{ snippets.liveVueCode1 }}</code></pre>
        </SlideTemplate>

        <SlideTemplate v-if="props.currentSlide === 20" variant="default" center>
          <pre><code class="language-html">{{ snippets.liveVueCode2 }}</code></pre>
        </SlideTemplate>

        <SlideTemplate v-if="props.currentSlide === 21" variant="default" center>
          <pre><code class="language-html">{{ snippets.liveVueCode3 }}</code></pre>
        </SlideTemplate>

        <SlideTemplate v-if="props.currentSlide === 22" variant="default" center>
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
        <SlideTemplate v-if="props.currentSlide === 23" variant="default">
          <h1>How it works under the hood?</h1>
          <pre><code class="language-elixir">{{ snippets.liveVueRenderCode }}</code></pre>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 24" variant="default">
          <h1>How it works under the hood?</h1>
          <div class="flex justify-center items-center mt-8">
            <pre><code class="language-javascript">{{ snippets.liveVueResolveCode }}</code></pre>
          </div>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 25" variant="default">
          <h1>How it works under the hood?</h1>
          <div class="flex justify-center items-center mt-8">
            <pre><code class="language-javascript">{{ snippets.liveVueHookCode }}</code></pre>
          </div>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 26" variant="default">
          <h1>What's inside?</h1>
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div v-for="card in featureCards" :key="card.title" class="rounded-lg bg-amber-50 p-6">
              <div class="text-5xl mb-2">{{ card.emoji }}</div>
              <h3 class="text-4xl font-semibold mb-2 text-pink-600">{{ card.title }}</h3>
              <p class="text-2xl text-slate-600">{{ card.description }}</p>
            </div>
          </div>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 27" variant="default">
          <h1>Vite is a secret sauce</h1>
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <p>- Alternative to ESbuild</p>
              <p>- No bundle in development - native ES Modules</p>
              <p>- Best-in-class hot reload</p>
              <p>- Used also for in-memory SSR</p>
            </div>
            <div>
              <img :src="vite" />
            </div>
          </div>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 28" variant="default">
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
        <SlideTemplate v-if="props.currentSlide === 29" variant="default">
          <!-- TODO - add a diagram here -->
          <h1>Integration tips & tricks</h1>
          <div class="text-center">
            <p class="font-bold">Mixing Vue and HEEX components is not perfect</p>
            <p class="text-gray-500">duplication of common components (buttons, inputs etc)</p>
            <p class="text-gray-500">SSR might get slow - synchronous execution</p>
            <img :src="mixingExample" class="mt-8 w-1/2 mx-auto" />
          </div>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 30" variant="default">
          <h1>Integration tips & tricks - colocation</h1>
          <img :src="postlineColocation" class="mt-8 max-h-[60vh] mx-auto aspect-auto" />
        </SlideTemplate>

        <SlideTemplate v-if="props.currentSlide === 31" variant="default">
          <h1>Integration tips & tricks - Vue sigil</h1>
          <img :src="vueSigil" class="mt-8 max-h-[60vh] mx-auto aspect-auto" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 32" variant="default">
          <h1>Phoenix utils - coming soon!</h1>
          <pre><code class="language-javascript">{{ snippets.liveVueFormCode }}</code></pre>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 33" variant="default">
          <h1>Phoenix utils - coming soon!</h1>
          <pre><code class="language-html">{{ snippets.liveVueFormHTML }}</code></pre>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 34" variant="default">
          <h1>Drawbacks</h1>
          <p>
            - JSON serialization is necessary, either global implementation of `Jason.encode/2` or mapping functions
          </p>
          <p>- Testing is more complex</p>
          <p>- JS bundle size will increase</p>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 35" variant="default" center>
          <h1>Demo time! QR code</h1>
          <QrcodeVue :value="props.watchersEndpoint" level="H" :size="qrcodeSize" class="w-full h-full" />
          <input type="range" v-model="qrcodeSize" min="100" max="500" class="mt-8" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 36" variant="default">
          <h1>Demo time! Emojis 😍</h1>
          <EmojiDisplay />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 37" variant="default">
          <h1>Demo time! Online users 😍</h1>
          <ExampleChart :data="props.timeseriesData" />
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 38" variant="default">
          <h1>Summary</h1>
          <p>- Clear place for declarative client-side state</p>
          <p>- Access to vast ecosystem of frontend libraries</p>
          <p>- Easy to hire Vue / React / Svelte developers</p>
          <p>- LLMs are better at it than HEEX 🦾</p>
          <p>- Great DX with Vite</p>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 39" variant="default">
          <h1>Future plans</h1>
          <p>- Igniter installer</p>
          <p>- Diff optimizations</p>
          <p>- End to end testing</p>
          <p>- Utils: Streams</p>
          <p>- Utils: File uploads</p>
        </SlideTemplate>
        <SlideTemplate v-if="props.currentSlide === 40" variant="default" center>
          <h1>✨ Thank you! ✨</h1>
          <p class="text-4xl mb-12">Let's build amazing hybrid apps! 💪</p>
          <a href="https://github.com/Valian/live_vue" target="_blank" class="text-3xl mb-8">
            github.com/Valian/live_vue
          </a>
          <p>Questions?</p>
        </SlideTemplate>
        <div class="flex flex-col items-center justify-center h-[100dvh]">
          <div class="p-8 rounded-lg bg-green-100 flex flex-col gap-6 text-3xl" v-if="props.currentSlide === 41">
            <ExampleCounter :count="props.count" v-model:diff="diff" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
h1 {
  @apply text-5xl font-bold mb-14;
  /* Adjusted size */
}

h2 {
  @apply text-4xl font-semibold mb-4;
  /* Adjusted size */
}

p {
  @apply text-5xl mb-10;
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
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20px);
  /* Leave in opposite direction */
  opacity: 0;
}
</style>
