import { ChakraProvider } from "@chakra-ui/react";
import { withTRPC } from "@trpc/next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "@/util/redux/store";
import Fonts from "@/util/theme/font";
import theme from "@/util/theme/theme";

import { AppRouter } from "./api/trpc/[trpc]";

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Fonts />
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
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
