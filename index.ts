//import figlet from "figlet";

// const server = Bun.serve({
//   port: 3000,
//   fetch(req, server) {
//     // if (server.upgrade(req)) {
//     //   console.log("Upgrade successful");
//     //   return new Response("Upgrade successful");
//     // }
//     // return new Response("Upgrade failed", { status: 505 });

//     const url = new URL(req.url);
//     if (url.pathname === "/") {
//       return new Response(
//         figlet.textSync("Hello World! Olowo baba-- fetch", {
//           font: "Standard",
//         }),
//         {
//           headers: { "Content-Type": "text/plain" },
//         }
//       );
//     } else {
//       return new Response("Not found", { status: 404 });
//     }
//   },
//   routes: {
//     "/": (req) => {
//       return new Response(
//         figlet.textSync("Hello World! Olowo baba-- routes", {
//           font: "Standard",
//         }),
//         {
//           headers: { "Content-Type": "text/plain" },
//         }
//       );
//     },
//     "/users": {
//       GET: (req) => {
//         return new Response(JSON.stringify({ message: "Hello World!" }), {
//           headers: { "Content-Type": "application/json" },
//         });
//       },
//       POST: async (req) => {
//         const body = await req.json();
//         return new Response(JSON.stringify({ message: "Hello World!" }), {
//           headers: { "Content-Type": "application/json" },
//         });
//       },
//     },
//     "/users/:id": (req) => {
//       const { id } = req.params;
//       return new Response(JSON.stringify({ message: "Hello World!", id }), {
//         headers: { "Content-Type": "application/json" },
//       });
//     },
//   },
//   development: true,
//   websocket: {
//     open(ws) {
//       console.log("WebSocket opened");
//     },
//     message(ws, message) {
//       console.log("WebSocket message", message);
//     },
//     close(ws) {
//       console.log("WebSocket closed");
//     },
//   },
// });

// console.log(`Server is running on ${server.url}`);

// src/index.ts (or src/index.js)

interface Env {
  // You can define environment variables here
  MY_VARIABLE: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: any // Fixed: Use 'any' for ExecutionContext to avoid TS error
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(
        //figlet.textSync("Hello World!", { font: "Standard" }),
        "Hello World!",
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
    }

    if (url.pathname === "/hello") {
      return new Response(
        `Hello from Cloudflare Worker! Env var: ${env.MY_VARIABLE}`,
        { status: 200 }
      );
    }

    if (url.pathname === "/ip") {
      // Accessing request headers to get client IP
      const ip = request.headers.get("CF-Connecting-IP");
      return new Response(`Your IP is: ${ip}`, { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
};
