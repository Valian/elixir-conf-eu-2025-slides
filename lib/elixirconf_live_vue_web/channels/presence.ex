defmodule ElixirconfLiveVueWeb.Presence do
  @moduledoc """
  Provides presence tracking to channels and processes.

  See the [`Phoenix.Presence`](https://hexdocs.pm/phoenix/Phoenix.Presence.html)
  docs for more details.
  """
  use Phoenix.Presence,
    otp_app: :elixirconf_live_vue,
    pubsub_server: ElixirconfLiveVue.PubSub
end
