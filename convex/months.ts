import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByYearId = query({
  args: {
    yearId: v.id("years"), // yearId is optional
  },
  handler: async (ctx, args) => {
    // Check if yearId is provided, return early if undefined
    if (!args.yearId) return;

    const months = await ctx.db
      .query("months")
      .withIndex("by_year_id", (q) => q.eq("yearId", args.yearId)) // yearId is used here
      .collect();

    return months;
  },
});
