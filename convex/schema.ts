//for users collection
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.string(),

    track: v.optional(v.string()),
    domain: v.optional(v.string()),
    tier: v.optional(v.string()),
    cohort: v.optional(v.string()),
    startDate: v.optional(v.string()),
  }),
});