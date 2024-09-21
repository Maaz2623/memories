import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByYearId = query({
  args: {
    yearId: v.id("years"),
  },
  handler: async (ctx, args) => {
    const months = await ctx.db
      .query("months")
      .withIndex("by_year_id", (q) => q.eq("yearId", args.yearId))
      .collect();

    return months;
  },
});
