// polyfill recommended by Vite https://vitejs.dev/config/build-options#build-modulepreload
import "vite/modulepreload-polyfill";
import { h, onMounted, onUnmounted } from "vue";
import { createLiveVue, findComponent, useLiveVue } from "live_vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $live: ReturnType<typeof useLiveVue>;
  }
}

export default createLiveVue({
  // name will be passed as-is in v-component of the .vue HEEX component
  resolve: (name: string) => {
    // we're importing from ../../lib to allow collocating Vue files with LiveView files
    // eager: true disables lazy loading - all these components will be part of the app.js bundle
    // more: https://vite.dev/guide/features.html#glob-import
    const components = {
      ...import.meta.glob("./**/*.vue", { eager: true }),
      ...import.meta.glob("../../lib/**/*.vue", { eager: true }),
    };

    // finds component by name or path suffix and gives a nice error message.
    // `path/to/component/index.vue` can be found as `path/to/component` or simply `component`
    // `path/to/Component.vue` can be found as `path/to/Component` or simply `Component`
    return findComponent(components, name);
  },
  // it's a default implementation of creating and mounting vue app, you can easily extend it to add your own plugins, directives etc.
  setup: ({ createApp, component, props, slots, plugin, el }) => {
    const app = createApp({
      render: () => {
        app.config.globalProperties.$live = useLiveVue();
        return h(component, props, slots);
      },
    });
    app.use(plugin);

    // add your own plugins here
    // app.use(pinia)
    app.mount(el);
    return app;
  },
});

export function useLiveEvent<T>(event: string, callback: (data: T) => void) {
  let callbackRef: number | null = null;
  onMounted(() => {
    const live = useLiveVue();
    callbackRef = live.handleEvent(event, callback) as unknown as number;
  });
  onUnmounted(() => {
    const live = useLiveVue();
    if (callbackRef) live.removeHandleEvent(callbackRef);
    callbackRef = null;
  });
}

// Create a composable for navigation
export const usePhxNavigation = () => {
  const live = useLiveVue();
  const liveSocket = live?.liveSocket;

  if (!liveSocket) console.error("LiveSocket not initialized");

  const patch = (
    hrefOrQueryParams: string | Record<string, string>,
    opts: { replace?: boolean; event?: Event } = {}
  ) => {
    let href = typeof hrefOrQueryParams === "string" ? hrefOrQueryParams : window.location.pathname;
    if (typeof hrefOrQueryParams === "object") {
      const queryParams = new URLSearchParams(hrefOrQueryParams);
      href = `${href}?${queryParams.toString()}`;
    }
    liveSocket.pushHistoryPatch(opts.event || new Event("click"), href, opts.replace ? "replace" : "push", null);
  };

  const navigate = (href: string, opts: { replace?: boolean; event?: Event } = {}) => {
    liveSocket.historyRedirect(opts.event || new Event("click"), href, opts.replace ? "replace" : "push", null, null);
  };

  return {
    patch,
    navigate,
  };
};
