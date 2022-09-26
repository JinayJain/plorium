import { Box, Container, ContainerProps } from "@chakra-ui/react";
import Head from "next/head";

import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({
  children,
  variant = "default",
  title = "Plorium",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "bare";
  title?: string;
} & ContainerProps) {
  return (
    <Box>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Navbar />
      <main>
        {variant === "default" ? (
          <Container
            maxW={props.maxW || "container.xl"}
            py={props.py ?? 8}
            {...props}
          >
            {children}
          </Container>
        ) : (
          children
        )}
      </main>
      <Footer />
    </Box>
  );
}

export default Layout;
