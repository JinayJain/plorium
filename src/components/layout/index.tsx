import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "./Footer";
import Nav, { NAV_HEIGHT } from "./Nav";

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
      <Box px={4} pb={8} minH={`calc(100vh - ${NAV_HEIGHT})`}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
