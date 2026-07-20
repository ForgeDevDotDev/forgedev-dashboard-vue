//for users collection
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
  users: defineTable({
    workosUserId: v.string(),
    email: v.string(),
    name: v.string(),

    role: v.union(
      v.literal("admin"),
      v.literal("client"),
      v.literal("senior")
    ),

    avatarUrl: v.optional(v.string()),
    track: v.optional(v.string()),
    domain: v.optional(v.string()),
    tier: v.optional(v.string()),
    cohort: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    status: v.optional(v.string()),
    assignedSeniorId: v.optional(v.id("users")),
    timezone: v.optional(v.string()),
  }),
});
