import { choice, TypeSafeClient } from "@typesafe-ai/sdk";
import { join } from "node:path";
import {
  isThinkRequest,
  isThinkResponse,
  type ThinkResponse,
} from "./api/think";

const port = Number(process.env.PORT ?? 3000);
const client = new TypeSafeClient();

const questions = {
  input: choice("You're playing the classic game snake. What is the next most [optimal input]?", {
    up: null,
    down: null,
    left: null,
    right: null,
  }),
  for: choice("How many tiles will you move in [optimal input] for until [next input] is optimal?", {
    "1": null,
    "2-3": null,
    "4-9": null,
    "10+": null,
  }),
  next_input: choice("What's the next optimal input?", {
    up: null,
    down: null,
    left: null,
    right: null,
  }),
} as const;

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

async function handleThink(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Content-Type must be application/json" }, 415);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Request body must be valid JSON" }, 400);
  }

  if (!isThinkRequest(body)) {
    return json({ error: "Request body must contain a non-empty string prompt" }, 400);
  }

  try {
    const result = await client.systemOne({
      state: { prompt: body.prompt },
      questions: {
        input: choice("What's your next input [optimal input]?", {
          up: null,
          down: null,
          left: null,
          right: null,
        }),
        for: choice("How many tiles will you move in that direction for?", {
          "1": null,
          "2-3": null,
          "4-9": null,
          "10+": null,
        }),
        next_input: choice("After you're done with that move, what move comes next?", {
          up: null,
          down: null,
          left: null,
          right: null,
        }),
      },
    });

    if (!isThinkResponse(result)) {
      return json({ error: "System One returned an invalid response" }, 502);
    }

    return json(result satisfies ThinkResponse);
  } catch (error) {
    console.error("System One request failed", error instanceof Error ? error.message : error);
    return json({ error: "System One request failed" }, 502);
  }
}

async function serveClient(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const relativePath = url.pathname === "/" ? "index.html" : url.pathname.slice(1);

  if (relativePath.includes("..")) {
    return json({ error: "Not found" }, 404);
  }

  const file = Bun.file(join(process.cwd(), "dist", relativePath));
  if (!(await file.exists())) {
    return json({ error: "Not found" }, 404);
  }

  return new Response(file);
}

async function startServer() {
  const build = await Bun.build({
    entrypoints: ["./src/index.html"],
    outdir: "./dist",
    target: "browser",
  });

  if (!build.success) {
    console.error("Failed to build the client", build.logs);
    process.exit(1);
  }

  const server = Bun.serve({
    port,
    fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/api/think") {
        return handleThink(request);
      }

      return serveClient(request);
    },
  });

  console.log(`Server listening on ${server.url}`);
}

startServer();