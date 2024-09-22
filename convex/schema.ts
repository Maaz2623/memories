import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  years: defineTable({
    name: v.string(),
  }),
  months: defineTable({
    name: v.string(),
    yearId: v.id("years"),
  }).index("by_year_id", ["yearId"]),
  memories: defineTable({
    title: v.string(),
    date: v.string(),
    body: v.string(),
    image: v.id("_storage"),
    video: v.optional(v.id("_storage")),
    yearId: v.id("years"),
    monthId: v.id("months"),
    updatedAt: v.number(),
  })
    .index("by_year_id", ["yearId"])
    .index("by_year_id_by_month_id", ["yearId", "monthId"]),
});

export default schema;
