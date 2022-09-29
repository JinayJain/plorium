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
      <Box as="main" minH="calc(100vh - 64px)" overflow="auto" py={4}>
        {variant === "default" ? (
          <Container maxW={props.maxW || "container.xl"} {...props}>
            {children}
          </Container>
        ) : (
          children
        )}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
