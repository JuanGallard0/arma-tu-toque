import { enumType, intArg, objectType, stringArg } from "nexus";
import { extendType } from "nexus";
import { Link } from "./Link";
import { RFQ } from "./RFQ";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.string("image");
    t.field("role", { type: Role });
    t.list.field("favorites", {
      type: Link,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .favorites();
      },
    });
    t.field("profile", {
      type: Link,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .profile();
      },
    });
    t.list.field("sentRFQs", {
      type: RFQ,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .sentRFQs();
      },
    });
    t.list.field("receivedRFQs", {
      type: RFQ,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .receivedRFQs();
      },
    });
  },
});

const Role = enumType({
  name: "Role",
  members: ["USER", "ADMIN"],
});

export const UserFavorites = extendType({
  type: "Query",
  definition(t) {
    t.list.field("favorites", {
      type: "Link",
      async resolve(_, _args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
          include: {
            favorites: true,
          },
        });
        if (!user) throw new Error("Invalid user");
        return user.favorites;
      },
    });
  },
});

export const UserRFQs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("receivedRFQs", {
      type: "RFQ",
      async resolve(_, _args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
          include: {
            receivedRFQs: true,
          },
        });
        if (!user) throw new Error("Invalid user");
        return user.receivedRFQs;
      },
    });
  },
});

export const UserProfile = extendType({
  type: "Query",
  definition(t) {
    t.field("profile", {
      type: "Link",
      async resolve(_, _args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
          select: {
            profile:true
          },
        });
        if (!user) throw new Error("Invalid user");
        return user.profile;
      },
    });
  },
});

export const BookmarkLink = extendType({
  type: "Mutation",
  definition(t) {
    t.field("bookmarkLink", {
      type: "Link",
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        const link = await ctx.prisma.link.findUnique({
          where: { id: args.id },
        });

        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
          include: {
            favorites: true,
          },
        });

        user.favorites.map(async ({ id }) => {
          if (id == args.id) {
            await ctx.prisma.user.update({
              where: {
                email: ctx.user.email,
              },
              data: {
                favorites: {
                  disconnect: {
                    id: link.id,
                  },
                },
              },
            });
            return link;
          }
        });

        await ctx.prisma.user.update({
          where: {
            email: ctx.user.email,
          },
          data: {
            favorites: {
              connect: {
                id: link.id,
              },
            },
          },
        });
        return link;
      },
    });
  },
});
