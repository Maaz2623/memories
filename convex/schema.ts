import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    years: defineTable({
        name: v.string(),
    }),
    months: defineTable({
        name: v.string(),
        yearId: v.id("years")
    }).index("by_year_id", ["yearId"])
})

export default schema