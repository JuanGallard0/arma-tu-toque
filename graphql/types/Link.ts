import { nonNull, objectType, stringArg, extendType, booleanArg } from "nexus";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.string("id");
    t.int("index");
    t.int("userId");
    t.string("title");
    t.string("url");
    t.string("description");
    t.string("imageUrl");
    t.string("category");
    t.string("ownerId");
    t.string("firstName");
    t.string("lastName");
    t.string("email");
    t.string("birthDate");
    t.string("state");
    t.string("hasInstruments");
    t.string("instruments");
  },
});

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
export const CreateLinkMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createLink", {
      type: Link,
      args: {
        title: nonNull(stringArg()),
        url: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        category: nonNull(stringArg()),
        description: nonNull(stringArg()),
        firstName: stringArg(),
        lastName: stringArg(),
        email: stringArg(),
        birthDate: stringArg(),
        state: stringArg(),
        hasInstruments: stringArg(),
        instruments: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
        });
        /*
        if (!user || user.role !== "ADMIN") {
          throw new Error(`You do not have permission to perform action`);
        }
      */
        const newLink = {
          title: args.title,
          url: args.url,
          imageUrl: args.imageUrl,
          category: args.category,
          description: args.description,
          owner: { connect: { id: user.id } },
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          birthDate: args.birthDate,
          state: args.state,
          hasInstruments: args.hasInstruments,
          instruments: args.instruments,
        };

        return await ctx.prisma.link.create({
          data: newLink,
        });
      },
    });
  },
});

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
