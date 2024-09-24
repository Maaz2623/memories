import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
  args: {
    id: v.optional(v.id("years")),
  },
  handler: async (ctx, args) => {
    if (!args.id) return;

    const year = await ctx.db.get(args.id);

    if (!year) {
      return null;
    }

    return year;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const years = ctx.db.query("years").collect();
    return years;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const yearId = await ctx.db.insert("years", {
      name: args.name,
    });

    await ctx.db.insert("months", { name: "january", yearId });
    await ctx.db.insert("months", { name: "february", yearId });
    await ctx.db.insert("months", { name: "march", yearId });
    await ctx.db.insert("months", { name: "april", yearId });
    await ctx.db.insert("months", { name: "may", yearId });
    await ctx.db.insert("months", { name: "june", yearId });
    await ctx.db.insert("months", { name: "july", yearId });
    await ctx.db.insert("months", { name: "august", yearId });
    await ctx.db.insert("months", { name: "september", yearId });
    await ctx.db.insert("months", { name: "october", yearId });
    await ctx.db.insert("months", { name: "november", yearId });
    await ctx.db.insert("months", { name: "december", yearId });

    return yearId;
  },
});
