import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Nav from "./Nav";

const Layout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      <Box px={4}>{children}</Box>
    </Box>
  );
};

export default Layout;
