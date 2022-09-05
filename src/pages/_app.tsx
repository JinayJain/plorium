import { ChakraProvider } from "@chakra-ui/react";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Fonts from "@/util/theme/font";
import theme from "@/util/theme/theme";

import { AppRouter } from "./api/trpc/[trpc]";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Fonts />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: "/api/trpc",
    };
  },
})(App);
