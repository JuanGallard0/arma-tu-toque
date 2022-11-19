import { nonNull, objectType, stringArg, extendType, intArg } from "nexus";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import { NexusNonNullDef } from "nexus/dist/core";

export const RFQ = objectType({
  name: "RFQ",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("description");
    t.string("address1");
    t.string("address2");
    t.int("time");
    t.int("date");
    t.string("type");
    t.boolean("accepted");
    t.string("senderId");
    t.string("receiverId");
  },
});

export const CreateRFQMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createRFQ", {
      type: RFQ,
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        address1: nonNull(stringArg()),
        address2: stringArg(),
        time: nonNull(intArg()),
        date: nonNull(intArg()),
        type: nonNull(stringArg()),
        receiverId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
        });
        const receiver = await ctx.prisma.user.findUnique({
          where: {
            id: args.receiverId,
          },
        });
        const newRFQ = {
          title: args.title,
          description: args.description,
          address1: args.address1,
          address2: args.address2,
          time: args.time,
          date: args.date,
          type: args.type,
          sender: { connect: { id: user.id } },
          receiver: { connect: { id: receiver.id } },
        };

        return await ctx.prisma.rFQ.create({
          data: newRFQ,
        });
      },
    });
  },
});

/*
// get ALl Links
export const LinksQuery = extendType({
  type: "Query",
  definition(t) {
    t.connectionField("links", {
      type: Link,
      resolve: async (_, { after, first }, ctx) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error("cursor is invalid");

        const [totalCount, items] = await Promise.all([
          ctx.prisma.link.count(),
          ctx.prisma.link.findMany({
            take: first,
            skip: offset,
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});
// get Unique Link
export const LinkByIDQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("link", {
      type: "Link",
      args: { id: nonNull(stringArg()) },
      resolve(_parent, args, ctx) {
        const link = ctx.prisma.link.findUnique({
          where: {
            id: args.id,
          },
        });
        return link;
      },
    });
  },
});

// create link
// update Link
export const UpdateLinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateLink", {
      type: "Link",
      args: {
        id: stringArg(),
        title: stringArg(),
        url: stringArg(),
        imageUrl: stringArg(),
        category: stringArg(),
        description: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.link.update({
          where: { id: args.id },
          data: {
            title: args.title,
            url: args.url,
            imageUrl: args.imageUrl,
            category: args.category,
            description: args.description,
          },
        });
      },
    });
  },
});
// // delete Link
export const DeleteLinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteLink", {
      type: "Link",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.link.delete({
          where: { id: args.id },
        });
      },
    });
  },
});
*/
