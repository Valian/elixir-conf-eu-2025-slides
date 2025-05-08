defmodule ElixirconfLiveVueWeb.SlidesLive do
  use ElixirconfLiveVueWeb, :live_view

  def render(assigns) do
    ~H"""
    <.vue
      currentSlide={@currentSlide}
      count={@count}
      v-component="ConferenceSlidesFinal"
      v-socket={@socket}
      v-on:slide-change={JS.push("slide-change")}
    />
    """
  end

  def mount(_params, _session, socket) do
    if connected?(socket) do
      send(self(), :loop)
    end

    {:ok, assign(socket, count: 0)}
  end

  def handle_params(params, _uri, socket) do
    slide =
      case params do
        %{"slide_number" => slide_number} ->
          String.to_integer(slide_number)

        _ ->
          1
      end

    {:noreply, assign(socket, currentSlide: slide - 1)}
  end

  def handle_event("slide-change", %{"direction" => direction}, socket) do
    {:noreply,
     assign(socket, currentSlide: max(min(socket.assigns.currentSlide + direction, 25), 0))}
  end

  def handle_event("inc", %{"diff" => value}, socket) do
    {:noreply, assign(socket, count: socket.assigns.count + value)}
  end

  def handle_info(:loop, socket) do
    socket = push_event(socket, "add-emoji", %{emoji: "👋"})
    Process.send_after(self(), :loop, 1000)
    {:noreply, socket}
  end
end
