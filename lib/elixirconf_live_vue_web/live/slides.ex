defmodule ElixirconfLiveVueWeb.SlidesLive do
  use ElixirconfLiveVueWeb, :live_view
  alias ElixirconfLiveVueWeb.Presence

  @presence_topic "slides:users"

  def render(assigns) do
    ~H"""
    <.vue
      currentSlide={@currentSlide}
      count={@count}
      timeseriesData={@timeseries_data}
      watchersEndpoint={ElixirconfLiveVueWeb.Endpoint.url() <> "/watchers"}
      v-component="ConferenceSlidesFinal"
      v-socket={@socket}
    />
    """
  end

  def mount(_params, _session, socket) do
    if connected?(socket) do
      ElixirconfLiveVueWeb.Endpoint.subscribe(@presence_topic)
      send(self(), :loop)
    end

    {:ok,
     assign(socket,
       count: 0,
       currentSlide: 0,
       timeseries_data: [],
       online_users: Presence.list(@presence_topic) |> map_size(),
       start_time: DateTime.to_unix(DateTime.utc_now())
     )}
  end

  def handle_params(params, _uri, socket) do
    case Integer.parse(params["slide_number"] || "") do
      {slide_number, _} ->
        {:noreply, assign(socket, currentSlide: slide_number - 1)}

      :error ->
        {:noreply, push_patch(socket, to: ~p"/slides/1")}
    end
  end

  def handle_event("inc", %{"diff" => value}, socket) do
    {:noreply, assign(socket, count: socket.assigns.count + value)}
  end

  def handle_info(:loop, socket) do
    now = DateTime.to_unix(DateTime.utc_now())
    start = socket.assigns.start_time
    new_data_point = %{time: now - start, value: socket.assigns.online_users}

    updated_timeseries_data =
      (socket.assigns.timeseries_data ++ [new_data_point])
      |> Enum.take(-120)

    Process.send_after(self(), :loop, 1000)
    {:noreply, assign(socket, timeseries_data: updated_timeseries_data)}
  end

  def handle_info(%{event: "add-emoji", payload: emoji}, socket) do
    {:noreply, push_event(socket, "add-emoji", %{emoji: emoji})}
  end

  def handle_info(%{event: "presence_diff", topic: @presence_topic}, socket) do
    online_users = Presence.list(@presence_topic) |> map_size()
    {:noreply, assign(socket, online_users: online_users)}
  end
end
