import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  metrics: defineTable({
    clientId: v.id("users"),
    sprintNumber: v.number(),

    codeQuality: v.number(),
    velocity: v.number(),
    iterationQuality: v.number(),
    communication: v.number(),

    notes: v.optional(v.string()),

    recordedAt: v.number(),
    recordedBy: v.id("users"),
  })
    .index("by_client", ["clientId"])
    .index("by_sprint", ["sprintNumber"]),
});

