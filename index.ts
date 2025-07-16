import figlet from "figlet";

const server = Bun.serve({
  port: 3000,
  fetch(req, server) {
    // if (server.upgrade(req)) {
    //   console.log("Upgrade successful");
    //   return new Response("Upgrade successful");
    // }
    // return new Response("Upgrade failed", { status: 505 });

    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response(
        figlet.textSync("Hello World! Olowo baba-- fetch", {
          font: "Standard",
        }),
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
    } else {
      return new Response("Not found", { status: 404 });
    }
  },
  routes: {
    "/": (req) => {
      return new Response(
        figlet.textSync("Hello World! Olowo baba-- routes", {
          font: "Standard",
        }),
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
    },
    "/users": {
      GET: (req) => {
        return new Response(JSON.stringify({ message: "Hello World!" }), {
          headers: { "Content-Type": "application/json" },
        });
      },
      POST: async (req) => {
        const body = await req.json();
        return new Response(JSON.stringify({ message: "Hello World!" }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
    "/users/:id": (req) => {
      const { id } = req.params;
      return new Response(JSON.stringify({ message: "Hello World!", id }), {
        headers: { "Content-Type": "application/json" },
      });
    },
  },
  development: true,
  websocket: {
    open(ws) {
      console.log("WebSocket opened");
    },
    message(ws, message) {
      console.log("WebSocket message", message);
    },
    close(ws) {
      console.log("WebSocket closed");
    },
  },
});

console.log(`Server is running on ${server.url}`);
