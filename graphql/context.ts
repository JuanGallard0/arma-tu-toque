import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';
import { Claims, getSession } from '@auth0/nextjs-auth0';

export type Context = {
  user?: Claims;
  accessToken?: string;
  prisma: PrismaClient;
};

export async function createContext({ req, res }): Promise<Context> {
  const session = getSession(req, res);

  if(session)
    return {
      user: session.user,
      accessToken: session.accessToken,
      prisma,
    };

  return {
    prisma
  };
}