export const liveVueCode = `<script setup lang="ts">
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
    const props = reactive(getProps(this.el, this.liveSocket))

    const app = createApp({ render: () => h(component, props) });
    app.mount(this.el);
    this.vue = { props, app }
  },
  updated() {
    Object.assign(this.vue.props, getProps(this.el, this.liveSocket))
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

  setup: ({ createApp, component, props, slots, plugin, el }) => {
    const app = createApp({ render: () => h(component, props, slots) })
    app.use(plugin)
    // add your own plugins here
    // app.use(pinia)
    app.mount(el)
    return app
  },
})
`;
