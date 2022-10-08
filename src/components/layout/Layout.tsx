import { Box, Container, ContainerProps } from "@chakra-ui/react";
import Head from "next/head";

import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({
  children,
  variant = "default",
  title,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "bare";
  title?: string | string[];
} & Omit<ContainerProps, "title">) {
  const titleWords = title ? (Array.isArray(title) ? title : [title]) : [];
  const titleArray = [...titleWords, "Plorium"];

  return (
    <Box>
      <Head>
        <title>{titleArray.join(" | ")}</title>
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
