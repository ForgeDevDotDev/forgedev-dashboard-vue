//Mutations
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
  workosUserId: v.string(),
  name: v.string(),
  email: v.string(),
  role: v.union(
    v.literal("admin"),
    v.literal("client"),
    v.literal("senior")
  ),
},

  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});