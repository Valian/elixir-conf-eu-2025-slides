# Presentation Ideas for LiveVue Talk

This document outlines potential examples and interactive elements for the LiveVue conference talk, focusing on demonstrating the library's strengths by building parts of the presentation itself in LiveVue.

## Simple Examples (Highlighting DX & Client-Side Advantages)

1.  **Declarative Slide Transitions:**
    *   **Concept:** Use Vue's built-in `<transition>` or libraries like `VueUse` for smooth, declarative animations between slides or elements (e.g., bullet points fading in).
    *   **LiveVue Showcase:** Demonstrates achieving complex animations declaratively in Vue, contrasting with potentially more imperative `JS.transition` hooks in vanilla LiveView. LiveView manages `@current_slide_index`, Vue handles the visual transition logic.

2.  **Complex UI Element without Server Roundtrips:**
    *   **Concept:** Include interactive elements like sliders, draggable lists, or a simple drawing canvas *within* a slide. Interaction logic (dragging, drawing) is handled entirely in Vue. Only the final state might be sent to the server.
    *   **LiveVue Showcase:** Shows handling purely client-side state and complex UI interactions without server roundtrips for micro-updates, improving responsiveness. Addresses the "hooks become unwieldy" point. Vue component manages internal state, potentially emitting a `final-change` event (`v-on:final-change={JS.push(...)})`) on completion.

3.  **Integrating an Existing Vue Library:**
    *   **Concept:** Embed a component from a popular Vue library (e.g., syntax highlighter, charting component, markdown renderer).
    *   **LiveVue Showcase:** Highlights leveraging the Vue ecosystem directly within LiveView, avoiding reimplementation or complex hook wrappers. Install via npm, import in `LiveVue` setup, and use in a `.vue` component with props from LiveView.

## Complex / Impressive Examples (Blending Client & Server State)

4.  **Live Audience Poll / Reaction:**
    *   **Concept:** Audience visits a link (QR code on slide) and taps reaction buttons (Agree, Like, 🤔). Main presentation slide updates in real-time with aggregate counts/visualizations.
    *   **LiveVue Showcase:** Perfect blend:
        *   **Client (Vue in Presentation):** Smooth, real-time display/animation of incoming reactions. Manages visual state. Subscribes to PubSub topic.
        *   **Server (LiveView):** Handles `handle_event("vote", ...)`), aggregates counts (server state), broadcasts updates via PubSub.
    *   **Implementation:** Presenter's Vue component listens to PubSub. Audience page uses `phx-click={JS.push(...)}`. LiveView handles events, updates assigns, broadcasts. Vue component receives broadcasts and updates reactively.

5.  **Simple Shared Interactive Element:**
    *   **Concept:** A slide featuring an element that all connected audience members can interact with simultaneously. State is synchronized via the server.
    *   **LiveVue Showcase:** Demonstrates client/server blend with shared state:
        *   **Client (Vue):** Provides optimistic UI updates (e.g., immediate feedback on click/drag) and smooth animations upon server confirmation. Manages local interaction state (e.g., "is dragging"). Reconciles local state with server updates.
        *   **Server (LiveView):** Source of truth for the shared element's state. Handles `handle_event`s, resolves conflicts, broadcasts updated state via PubSub.
    *   **Specific Examples:**
        *   **A. Shared Clicker Grid:** A grid of buttons/squares. Audience members click squares. The square changes color briefly locally (optimistic UI) and then settles to a color pushed by the server (e.g., cycling through colors, showing the last clicker's "color"). Server broadcasts the state of the grid. Demonstrates optimistic UI and server reconciliation.
        *   **B. Mini Collaborative Pixel Board:** A small grid (e.g., 10x10). Audience members can tap a pixel to change its color. The server maintains the state of the board and broadcasts changes. Client-side Vue handles rendering the grid efficiently and applying updates. Shows managing slightly more complex shared state.
        *   **C. Simple Tug-of-War:** Two buttons ("Pull Left", "Pull Right"). Audience clicks push events. The server calculates the "rope position" based on clicks per second for each side and broadcasts the position. The Vue component animates the rope smoothly based on the broadcasted state. Demonstrates server aggregation and client-side animation based on server state.

## Considerations for Audience Interaction

*   **Simplicity:** Focus on clear demonstrations (poll, simple clicker) over complex games.
*   **Instructions:** Use QR codes and short URLs.
*   **Reliability:** Ensure the core talk doesn't *depend* on the interaction working perfectly. It's a bonus.
*   **Performance:** Consider basic server-side throttling for `handle_event`.