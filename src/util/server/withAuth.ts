import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const withAuth = <T>(
  inner?: (ctx: GetServerSidePropsContext, session: Session) => Promise<T> | T,
  options?: {
    redirectTo?: string;
  },
): ((ctx: GetServerSidePropsContext) => Promise<
  | T
  | {
      redirect?: {
        destination: string;
        permanent?: boolean;
      };
      notFound?: boolean;
    }
>) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession({ req: ctx.req });

    // either session and authed or no session and unauthedOnly are allowed
    // redirect with callbackUrl if session is missing

    if (!session) {
      return {
        redirect: {
          destination:
            options?.redirectTo ?? `/login?callbackUrl=${ctx.resolvedUrl}`,
          permanent: false,
        },
      };
    }

    return inner
      ? inner(ctx, session)
      : {
          props: {},
        };
  };
};

export const withUnauthed = <T>(
  inner?: (ctx: GetServerSidePropsContext) => T | Promise<T>,
  options?: {
    redirectTo?: string;
  },
): ((ctx: GetServerSidePropsContext) => Promise<
  | T
  | {
      redirect?: {
        destination: string;
        permanent?: boolean;
      };
    }
>) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession({ req: ctx.req });

    // either session and authed or no session and unauthedOnly are allowed
    if (session) {
      return {
        redirect: {
          destination: options?.redirectTo ?? "/",
          permanent: false,
        },
      };
    }

    return inner
      ? inner(ctx)
      : {
          props: {},
        };
  };
};
