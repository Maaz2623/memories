import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    body: v.string(),
    image: v.id("_storage"),
    video: v.optional(v.id("_storage")),
    yearId: v.id("years"),
    monthId: v.id("months"),
    title: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const memoryId = await ctx.db.insert("memories", {
      body: args.body,
      title: args.title,
      date: args.date,
      image: args.image,
      video: args.video,
      yearId: args.yearId,
      monthId: args.monthId,
      updatedAt: Date.now(),
    });

    return memoryId;
  },
});

export const get = query({
  args: {
    yearId: v.id("years"),
    monthId: v.id("months"),
  },
  handler: async (ctx, args) => {
    const memories = await ctx.db
      .query("memories")
      .withIndex("by_year_id_by_month_id", (q) =>
        q.eq("yearId", args.yearId).eq("monthId", args.monthId)
      )
      .order("desc")
      .collect();

    // Correct memory formatting
    const formattedMemories = await Promise.all(
      memories.map(async (memory) => {
        const image = memory.image
          ? await ctx.storage.getUrl(memory.image) // Await the URL retrieval
          : undefined;

        return {
          ...memory, // Correctly reference memory (not memories)
          image,
        };
      })
    );

    return formattedMemories; // Return the formatted memories
  },
});

export const getAllByYearId = query({
  args: {
    yearId: v.id("years"),
  },
  handler: async (ctx, args) => {
    const memories = await ctx.db
      .query("memories")
      .withIndex("by_year_id", (q) => q.eq("yearId", args.yearId))
      .collect();

    // Correct memory formatting
    const formattedMemories = await Promise.all(
      memories.map(async (memory) => {
        const image = memory.image
          ? await ctx.storage.getUrl(memory.image) // Await the URL retrieval
          : undefined;

        return {
          ...memory, // Correctly reference memory (not memories)
          image,
        };
      })
    );

    return formattedMemories;
  },
});
