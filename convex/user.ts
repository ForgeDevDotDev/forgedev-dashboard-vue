//Mutations
import {mutation,query} from"./_generated/server";
import{v} from "convex/values"; //misses {v} import

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

//fetch users
export const getUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});