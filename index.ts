import figlet from "figlet";
import { serve } from "bun";

const server = serve({
  port: 3000,
  fetch(req) {
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
});

console.log(`Server is running on ${server.url}`);
