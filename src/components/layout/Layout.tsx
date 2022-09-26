import { Box, Container } from "@chakra-ui/react";

import Footer from "./Footer";
import Navbar from "./Navbar";

const LAYOUT_WIDTH = "1200px";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl">{children}</Container>
      <Footer />
    </Box>
  );
}

export default Layout;
