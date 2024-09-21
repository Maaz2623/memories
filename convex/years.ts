import { v } from "convex/values";
import { mutation, QueryCtx } from "./_generated/server";
import { GenericMutationCtx } from "convex/server";


export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {


    const yearId = await ctx.db.insert("years", {
      name: args.name,
    });

    await ctx.db.insert("months", {name: "january", yearId})
    await ctx.db.insert("months", {name: "february", yearId})
    await ctx.db.insert("months", {name: "march", yearId})
    await ctx.db.insert("months", {name: "april", yearId})
    await ctx.db.insert("months", {name: "may", yearId})
    await ctx.db.insert("months", {name: "june", yearId})
    await ctx.db.insert("months", {name: "july", yearId})
    await ctx.db.insert("months", {name: "august", yearId})
    await ctx.db.insert("months", {name: "september", yearId})
    await ctx.db.insert("months", {name: "october", yearId})
    await ctx.db.insert("months", {name: "november", yearId})
    await ctx.db.insert("months", {name: "december", yearId})

    return yearId;
  },
});
