import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
    args: {
        name: v.string(),
        yearId: v.id("years")
    },
    handler: async (ctx, args) => {

        const parsedMonth = args.name.toLowerCase()

        const monthId = await ctx.db.insert("months", {
            name: parsedMonth,
            yearId: args.yearId
        })


        return monthId
    }
})