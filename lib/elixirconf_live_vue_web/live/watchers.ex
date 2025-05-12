defmodule ElixirconfLiveVueWeb.WatchersLive do
  use ElixirconfLiveVueWeb, :live_view
  alias ElixirconfLiveVueWeb.Presence

  @presence_topic "slides:users"

  def render(assigns) do
    ~H"""
    <div class="h-[100dvh] bg-gray-800 flex flex-col items-center p-4 text-white">
      <!-- Main Content: centered and takes up available space -->
      <div class="flex-grow flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold mb-12">Send an Emoji!</h1>
        <div class="grid grid-cols-2 gap-6">
          <.button
            phx-click="send-emoji"
            phx-value-emoji="👍"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-5xl transform active:scale-90 transition-transform"
          >
            👍
          </.button>
          <.button
            phx-click="send-emoji"
            phx-value-emoji="🎉"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-lg text-5xl transform active:scale-90 transition-transform"
          >
            🎉
          </.button>
          <.button
            phx-click="send-emoji"
            phx-value-emoji="❤️"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-8 rounded-lg text-5xl transform active:scale-90 transition-transform"
          >
            ❤️
          </.button>
          <.button
            phx-click="send-emoji"
            phx-value-emoji="😂"
            class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-6 px-8 rounded-lg text-5xl transform active:scale-90 transition-transform"
          >
            😂
          </.button>
        </div>
      </div>
      
    <!-- Footer -->
      <div class="w-full flex flex-col items-center py-4">
        <img src="/img/elixir_conf_eu_white.png" class="max-w-40 mb-3" />
        <div class="flex space-x-6 text-sm">
          <a
            href="https://twitter.com/jskalc"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-300 transition-colors"
          >
            Twitter @jskalc
          </a>
          <a
            href="https://github.com/Valian/live_vue"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-gray-300 transition-colors"
          >
            LiveVue on GitHub
          </a>
        </div>
      </div>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    user_id = Base.encode16(:crypto.strong_rand_bytes(16))

    if connected?(socket) do
      Presence.track(self(), @presence_topic, "user:" <> user_id, %{
        online_at: System.system_time(:second)
      })

      send(self(), :loop)
    end

    {:ok, assign(socket, user_id: user_id)}
  end

  def handle_event("send-emoji", %{"emoji" => emoji}, socket) do
    ElixirconfLiveVueWeb.Endpoint.broadcast_from(self(), @presence_topic, "add-emoji", emoji)
    {:noreply, socket}
  end
end
