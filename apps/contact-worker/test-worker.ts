export default {
  async fetch(request: Request): Promise<Response> {
    console.log("Worker received request!");
    return new Response("Worker is alive! 🚀", { status: 200 });
  }
}