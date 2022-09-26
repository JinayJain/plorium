import { Box, Container, ContainerProps } from "@chakra-ui/react";

import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({
  children,
  variant = "default",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "bare";
} & ContainerProps) {
  return (
    <Box>
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
