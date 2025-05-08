# Slide outline

# Title slide

# About me

# How rendering works in LiveView

- Server has the state
- Renders HTML based on the state
- Sends HTML diff to the client

"small diagram how it works"

"Who here loves building with LiveView?"

# The Challenge

- Where's the place for client-side state? (maybe images or nice examples, not only text?)
  - Complex form interactions (multi-step, dynamic validation)
  - Smooth, intricate animations & transitions
  - UI widgets needing instant feedback (sliders, drag-n-drop)
  - Accessibility (eg aria-attributes)
  - Off-the-shelf 3rd-party JS libraries

# Official solution
- JS module! Hooks! Can be done, but...

- it's imperative, not declarative (one state change should conditionally change multiple HTML elements)
- we are left on our own - plain JS, need to wrap vanilla libraries
- adding new hooks is detached from the component logic
- JS module: everything needs to be rendered and sent to the client, eg modals

"Example of an imperative hook that tries to synchronize multiple HTML elements on change"

# Are there other solutions which solve problem of client-side state?

- React, Vue, Svelte etc
- CLient side state -> HTML: solved long time ago
- frontend libraries solved declarative rendering & client-side state long time ago
- just they struggle with the server-side state getting out of sync with the client-side state (stateless server)
- so why not to use them?
- let's provide top-level props to frontend components and let them handle rendering and client-side state!
- it's not magic - data-props and phx-update="ignore" are your friends
- events are handled in the same way

"small diagram how it works"

# Benefits

- stateful client and server side - a very powerful combination
- clear separation between server and client state
- access to rich ecosystem of frontend libraries
- familiar development experience
- could reuse skills of frontend developers instead of teaching them HEEX, Live Components etc

# Downsides

- serialization to JSON - Jason protocols or custom dumping functions
- anything else?

"small diagram how it works"

# Getting started with LiveVue

- Show a snippet of code and result


- LiveVue is a library that implements the idea for Vue.js
- implements the idea, and adds some more features
  - SSR
  - LiveReload
  - Slots
  - ~VUE sigil
  - DX with Vite


# How it works under the hood

- data-props and phx-update="ignore"
- LiveVue hook


# Usage strategies

- one route: a few highly interactive, specialized components (WYSIWYG editor, complex drag-n-drop etc)
- another route: one, top level component per page (Intertia.js style)
- middle ground is possible, but complicated - you might need to duplicate common components in both Elixir and JS

# Demos
- Timer showing when events came (like a client-side stopwatch)
- Slides



















