# LiveVue Talk: Slide Outline

**Theme:** Building the presentation *in* LiveVue itself!

---

## Slide 1: Title Slide

*   **Title:** Why mixing LiveView and a frontend library is a great idea
*   **Subtitle:** Bridging the gap with LiveVue
*   **Your Name & Title**
*   **Conference:** ElixirConfEU 2025
*   **(Optional Visual):** LiveVue logo + Phoenix logo + Vue logo, maybe subtly animated using Vue transition (Idea 1).

---

## Slide 2: The Power of LiveView (Introduction - 5 mins)

*   **Headline:** LiveView: The Revolution We Love
*   **Bullet Points:**
    *   Server-rendered HTML over WebSockets
    *   Rich interactivity *without* writing JS (mostly! 😉)
    *   Stateful, declarative UI on the server
    *   Simplified development model
*   **(Visual):** Simple diagram showing a browser connecting to Phoenix/LiveView, emphasizing server state.
*   **Engage:** "Who here loves building with LiveView?" (Show of hands)

---

## Slide 3: The Growing Challenge (Client-Side State Problem - 7 mins)

*   **Headline:** But... Sometimes We Need More Client-Side Smarts
*   **Bullet Points:**
    *   When do things get tricky?
        *   Complex form interactions (multi-step, dynamic validation)
        *   Smooth, intricate animations & transitions
        *   UI widgets needing instant feedback (sliders, drag-n-drop)
        *   Offline capabilities / optimistic UI
        *   Integrating 3rd-party JS libraries
*   **Engage:** "Raise your hand if you've found yourself writing complex Phoenix hooks that felt... a bit like old-school JS?"
*   **(Visual):** Maybe a cartoon showing a tangled mess labeled "JS Hooks".

---

## Slide 4: The Hooks Approach & Its Limits

*   **Headline:** Phoenix Hooks: Powerful, But Are They Always the Answer?
*   **Bullet Points:**
    *   The `phx-hook` mechanism: how it works (briefly).
    *   Pros: Good for simple, targeted interactions.
    *   Cons:
        *   Imperative vs. Declarative
        *   Can become hard to manage/reuse state across hooks.
        *   Feels disconnected from the HEEx template.
        *   Boilerplate for complex state management.
*   **(Code Snippet):** [YOUR EXAMPLE of a relatively complex hook implementation]
*   **Transition:** "We need a way to manage client state declaratively, like we're used to."

---

## Slide 5: Inspiration from Elsewhere

*   **Headline:** How Do Other Ecosystems Bridge This Gap?
*   **Bullet Points:**
    *   **React Server Components:** Server rendering + client interactivity.
    *   **Inertia.js (Laravel/Rails):** Use server-side routing with client-side frameworks.
    *   **LiveSvelte:** Svelte components within LiveView (Acknowledge the pioneer!).
*   **Key Idea:** Combining server strengths with client component models.
*   **(Visual):** Logos of these technologies/concepts.

---

## Slide 6: Introducing LiveVue (Enter Frontend Libraries - 8 mins)

*   **Headline:** LiveVue: Seamless Vue Components Inside LiveView
*   **Bullet Points:**
    *   Keep LiveView for overall page structure, routing, and server state.
    *   Use Vue for components demanding rich interactivity or complex local state.
    *   Get the best of both worlds!
*   **(Visual):** Core diagram of LiveVue:
    *   Browser -> LiveView (Server State) -> `<.vue>` component definition.
    *   LiveView sends props/events via data attributes.
    *   `live_vue.js` hook mounts Vue component.
    *   Vue component manages local state & emits events back (`JS.push`).
    *   Show data flow arrows.

---

## Slide 7: LiveVue: How it Works

*   **Headline:** Under the Hood (Simplified)
*   **Bullet Points:**
    *   HEEx `<.vue>` tag renders a `div` with `data-` attributes (props, event handlers).
    *   `LiveVue.JS` Hook:
        *   Initializes Vue component on `mounted`.
        *   Injects props & event handlers.
        *   Updates props reactively on `updated`.
        *   Handles cleanup on `destroyed`.
    *   SSR (Server-Side Rendering) for initial load.
    *   Vite Integration: Blazing fast HMR for Elixir *and* Vue!
*   **(Code Snippet):** Show the basic `<.vue>` syntax in HEEx and the corresponding simple Vue component structure.
*   **(Demo - Optional):** Briefly show HMR working - change Elixir code -> browser updates; change Vue code -> browser updates instantly.

---

## Slide 8: Implementation Strategies (7 mins)

*   **Headline:** Finding the Right Balance
*   **Two Valid Approaches:**
    *   **1. Isolated Components:** Use `<.vue>` for specific complex widgets within a larger LiveView (Date pickers, rich text editors, interactive charts).
        *   **(Visual):** Diagram showing a LiveView page with several standard elements and one box labeled "Vue Component".
    *   **2. Top-Level Component:** Render the main content area of a LiveView with a single `<.vue>` component (Inertia.js style).
        *   **(Visual):** Diagram showing a LiveView layout (nav, footer) with the entire central content area labeled "Vue Component".
*   **Why avoid the messy middle?** (Mixing responsibilities heavily leads to confusion).
*   **Choosing:** Depends on the app complexity and team expertise.

---

## Slide 9: LiveVue In Action: Simple Demo (8 mins total for demos)

*   **Headline:** Demo Time: Declarative Client-Side UI
*   **Concept:** Showcasing a simple example from `ideas.md`.
*   **Suggestion:** Implement **Declarative Slide Transitions** (Idea 1) for the presentation itself. Point it out here.
    *   "Notice the smooth transitions between these slides? That's Vue's `<transition>` component, driven by LiveView sending the current slide index as a prop."
*   **Alternatively/Additionally:** Show **Complex UI Element** (Idea 2) like a slider or mini drawing pad within this slide.
*   **(Live Coding/Code Snippet):** Show the HEEx and Vue code for the chosen simple example.

---

## Slide 10: LiveVue In Action: Interactive Demo

*   **Headline:** Demo Time: Blending Server & Client State
*   **Concept:** Showcase one of the interactive examples.
*   **Suggestion:** Implement the **Live Audience Poll / Reaction** (Idea 4) or one of the **Simple Shared Interactive Element** options (Idea 5 A, B, or C).
*   **Engage:** Display the QR code/link.
    *   "Let's try something together! Scan this QR code or visit this URL on your phone."
*   Run the interactive demo.
*   **(Live Coding/Code Snippet):** Briefly show the key parts: `handle_event` on the server, `JS.push` from the audience page, and the Vue component reacting to PubSub messages / props.
*   **(Visual):** The interactive element itself!

---

## Slide 11: Key Benefits Recap

*   **Headline:** Why Consider This Approach?
*   **Bullet Points:**
    *   ✅ **End-to-End Reactivity:** Seamless updates from server to client.
    *   ✅ **Leverage Vue Ecosystem:** Use existing components and libraries.
    *   ✅ **Improved DX:** Declarative client-side code, Vite HMR.
    *   ✅ **Clear Boundaries:** Separate server/client state concerns.
    *   ✅ **SSR:** Good performance and SEO.
    *   ✅ **Slot Interoperability:** Mix Phoenix components and Vue slots.

---

## Slide 12: Future Plans & Roadmap

*   **Headline:** What's Next for LiveVue?
*   **Bullet Points:** (Referencing your README)
    *   Automatic event handlers (`usePushEvent`?)
    *   Form helpers (`useLiveForm`?)
    *   Event handling utilities (`useEventHandler`?)
    *   Payload optimizations (JSON Patch diffs)
    *   VS Code Sigil Highlighting
    *   Phoenix Stream support
    *   [Anything else you plan to add?]
*   **Call to Action:** Contributions welcome! (Link to GitHub repo)

---

## Slide 13: Conclusion (5 mins total including Q&A)

*   **Headline:** Takeaways
*   **Bullet Points:**
    *   LiveView is fantastic, but complex client-state needs careful thought.
    *   Mixing LV with a frontend lib (like Vue via LiveVue) offers a powerful hybrid.
    *   Identify clear use cases: isolated complex widgets or full component rendering.
    *   LiveVue provides the bridge with good DX and performance.
*   **Final Thought:** Choose the right tool for the job, sometimes that means combining tools!

---

## Slide 14: Q&A

*   **Title:** Questions?
*   **Your Contact Info:** (Twitter/GitHub/Email)
*   **Link to LiveVue Repo/Docs**
*   **Link to these slides (optional)**
*   **(Visual):** Clean slide with contact info and links.

---

## Slide 15: Thank You!

*   Simple Thank You slide.
*   Maybe repeat key links.

---
