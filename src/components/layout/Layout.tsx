import { Box, Container, ContainerProps } from "@chakra-ui/react";
import Head from "next/head";

import Footer from "./Footer";
import Navbar from "./Navbar";

type OpenGraphProps = {
  title: string;
  type?: string;
};

function Layout({
  children,
  variant = "default",
  title,
  ogProps = {
    title: "Roadmap",
  },
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "bare";
  title?: string | string[];
  ogProps?: OpenGraphProps;
} & Omit<ContainerProps, "title">) {
  const titleWords = title ? (Array.isArray(title) ? title : [title]) : [];
  const titleArray = [...titleWords, "Plorium"];

  const searchParams = new URLSearchParams();

  if (ogProps.title) {
    searchParams.append("title", ogProps.title);
  }

  if (ogProps.type) {
    searchParams.append("type", ogProps.type);
  }

  const ogUrl = `https://plorium.vercel.app/api/og?${searchParams.toString()}`;

  return (
    <Box>
      <Head>
        <title>{titleArray.join(" | ")}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta property="og:image" content={ogUrl} />
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
