import {z} from "zod"
import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";

export const agentsRouter = createTRPCRouter({

  getOne: protectedProcedure.input(z.object({id:z.string()})).query(async ({input}) => {
    const [existingAgent] = await db
      .select({
        //TODO - change this to actual count
        meetingCount:sql<number>`2`,
        ...getTableColumns(agents),
        
      })
      .from(agents)
      .where(eq(agents.id,input.id));
    return existingAgent;
  }),

  getMany: protectedProcedure
    .input(z.object({
      page: z.number().default(DEFAULT_PAGE),
      pageSize: z.number()
        .min(MIN_PAGE_SIZE)
        .max(MAX_PAGE_SIZE)
        .default(DEFAULT_PAGE_SIZE),
      search:z.string().nullish(),  
    }).optional())
    .query(async ({ctx,input}) => {
    const data = await db.select({
        //TODO - change this to actual count
        meetingCount:sql<number>`2`,
        ...getTableColumns(agents),
        
      })
      .from(agents)
      .where(
        and(
          eq(agents.userId, ctx.auth.user.id),
        )
      )
    return data;
  }),
  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdAgent;
    }),
});
