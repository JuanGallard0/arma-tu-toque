import { nonNull, objectType, stringArg, extendType, intArg } from "nexus";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";

export const RFQ = objectType({
  name: "RFQ",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("description");
    t.string("address1");
    t.string("address2");
    t.string("time");
    t.string("date");
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
        time: nonNull(stringArg()),
        date: nonNull(stringArg()),
        type: nonNull(stringArg()),
        receiverId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
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
          receiver: { connect: { id: args.receiverId } },
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
