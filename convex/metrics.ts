import { mutation, query } from "./_generated/server";
import {v} from "convex/values"

export const create = mutation({
  args: {},
  handler: async (ctx,args) => {
    // ctx.db.insert(...)
    return await ctx.db.insert;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    // return await ctx.db.query("metrics").collect();
    return [];
  },
});

export const getByClient = query({
  args: {
    clientId: v.id("clients"),
  },
  handler: async (ctx, args) => {
    // query by client
  },
});

export const update = mutation({
  args: {
    id: v.id("metrics"),
  },
  handler: async (ctx, args) => {
    // update metric
  },
});

export const remove = mutation({
  args: {
    id: v.id("metrics"),
  },
  handler: async (ctx, args) => {
    // delete metric
  },
});
//post-> mutation
//get-> query getALL
//get/client:id-> query getByClient
//put-> mutation update
//delete id -> mutation reomve.