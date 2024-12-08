import { publicProcedure, createTRPCRouter } from "@/server/api/trpc";

export const pingRouter = createTRPCRouter({
  greeting: publicProcedure.query(() => "hello tRPC v10!"),
});
 
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type PingRouter = typeof pingRouter;
