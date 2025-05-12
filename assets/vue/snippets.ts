export const liveVueCode1 = `<script setup lang="ts">
import { ref } from "vue";

// props come from the server
const props = defineProps<{ count: number }>();

// local state
const diff = ref(1);
<\/script>

<template>
  Current count
  <div>{{ props.count }}</div>
  <label>Diff: </label>
  <input v-model.number="diff" type="range" min="1" max="10" />

  <button phx-click="inc" :phx-value-diff="diff">
    Increase counter by {{ diff }}
  </button>
</template>
`;

export const liveVueCode2 = `<script setup lang="ts">
import { ref } from "vue";

// props come from the server
const props = defineProps<{ count: number }>();

// local state
const diff = ref(1);
<\/script>

<template>
  Current count
  <div>{{ props.count }}</div>
  <label>Diff: </label>
  <input v-model.number="diff" type="range" min="1" max="10" />

  <button @click="$live.pushEvent('inc', { diff })">
    Increase counter by {{ diff }}
  </button>
</template>
`;

export const liveVueCode3 = `<script setup lang="ts">
import { ref } from "vue";
import { useLiveVue } from "live_vue";

// props come from the server
const props = defineProps<{ count: number }>();
const live = useLiveVue();

// local state
const diff = ref(1);
const handleClick = () => {
  live.pushEvent("inc", { diff: diff.value });
};
<\/script>

<template>
  <!-- ... -->
  <button @click="handleClick">
    Increase counter by {{ diff }}
  </button>
</template>
`;

export const liveVueHeexCode = `defmodule LiveVueExamplesWeb.LiveCounter do
  use LiveVueExamplesWeb, :live_view

  def render(assigns) do
    ~H"""
    <.vue
      count={@count}
      v-component="Counter"
      v-socket={@socket}
    />
    """
  end

  def mount(_params, _session, socket) do
    {:ok, assign(socket, :count, 0)}
  end

  def handle_event("inc", %{"value" => diff}, socket) do
    {:noreply, update(socket, :count, &(&1 + diff))}
  end
end
`;

export const liveVueRenderCode = `def vue(assigns) do
  # preparation of props and ssr
  # ...
  ~H"""
  <%= raw(@ssr_render[:preloadLinks]) %>
  <div
    id={assigns[:id] || id(@component_name)}
    data-name={@component_name}
    data-props={json(@props)}
    data-ssr={(@ssr_render != nil) |> to_string()}
    phx-update="ignore"
    phx-hook="VueHook"
  ><%= raw(@ssr_render[:html]) %></div>
  """
end
`;

export const liveVueHookCode = `const LiveVueHook = {
  async mounted() {
    const componentName = this.el.getAttribute("data-name")
    const component = await resolve(componentName)
    const props = reactive(JSON.parse(this.el.getAttribute("data-props")))

    const app = setup({ component, props, el: this.el });

    this.vue = { props, app }
  },
  updated() {
    Object.assign(this.vue.props, JSON.parse(this.el.getAttribute("data-props")))
  },
  destroyed() {
    this.vue.app.unmount()
  }
}
`;

export const liveVueResolveCode = `export default createLiveVue({
  resolve: name => {
    const components = import.meta.glob("./**/*.vue", { eager: true })

    // finds component by name or path suffix and gives a nice error message.
    return findComponent(components, name)
  },

  setup: ({ component, props, el }) => {
    const app = createApp({ render: () => h(component, props) })
    // add your own plugins here
    // app.use(pinia)
    app.mount(el)
    return app
  },
})
`;

export const complexLiveViewHookCode = `mounted() {
  this.applyHighlight();
  const statusEl = document.createElement('div');
  this.el.appendChild(statusEl);
  this.el.addEventListener('mouseenter', () => {
    statusEl.textContent = this.el.dataset.highlight === "true" ? "on" : "off";
  });
},
updated() {
  this.applyHighlight();
},
applyHighlight() {
  if (this.el.dataset.highlight === "true") {
    this.el.classList.add("text-yellow-500", "font-bold");
  } else {
    this.el.classList.remove("text-yellow-500", "font-bold");
  }
}`;

export const liveVueFormCode = `const { submit, fields, isSubmitting } = useLiveForm(
  toRef(props, 'form'),
  {
    changeEvent: 'validate',
    submitEvent: 'submit',
  }
)

const language = fields['language']
const instructions = fields['ai']['instructions']
`;

export const liveVueFormHTML = `<form @submit.prevent="submit">
  <label for="language">Language</label>
  <select id="language" v-model="language.value">
    <option value="en">English</option>
    <option value="es">Spanish</option>
  </select>

  <p class="danger" v-if="language.errors.length > 0">
    {{ language.errorMessage }}
  </p>

  <button type="submit" :disabled="!form.meta.touched ||!form.meta.valid || isSubmitting">
    {{ isSubmitting ? 'Submitting...' : 'Submit' }}
  </button>
</form>
`;
