import { Box, Container, ContainerProps } from "@chakra-ui/react";
import Head from "next/head";

import Footer from "./Footer";
import Navbar from "./Navbar";

type OpenGraphProps = {
  title: string;
  type?: string;
};

const DESCRIPTION =
  "Learn anything with the best resources curated by experts, and vetted by people like you.";

function Layout({
  children,
  variant = "default",
  title,
  ogProps = {
    title: "Plorium",
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

        <meta name="description" content={DESCRIPTION} />

        <meta property="og:image" content={ogUrl} />
        <meta property="og:title" content={titleArray.join(" | ")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plorium.com" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:site_name" content="Plorium" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@plorium" />
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
