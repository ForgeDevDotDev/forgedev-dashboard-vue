import { mutation, query } from "./_generated/server";
import {v} from "convex/values"

export const create = mutation({
  args: {
    clientId: v.id("users"),
    sprintNumber: v.number(),
    codeQuality: v.number(),
    velocity: v.number(),
    iterationQuality: v.number(),
    communication: v.number(),
    notes: v.optional(v.string()),
    recordedAt: v.number(),
    recordedBy: v.id("users"),
  },
  handler: async (ctx,args) => {
    return await ctx.db.insert("metrics",args);
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return [];
  },
});

export const getByClient = query({
  args: {
    clientId: v.id("users"),//in schemas we describe users(not client).
  },
  handler: async (ctx, args) => {
  },
});

export const update = mutation({
  args: {
    id: v.id("metrics"),
  },
  handler: async (ctx, args) => {
  },
});

export const remove = mutation({
  args: {
    id: v.id("metrics"),
  },
  handler: async (ctx, args) => {
  },
});