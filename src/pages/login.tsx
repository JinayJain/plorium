import { Button, Center } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Layout from "@/components/layout/Layout";
import { withUnauthed } from "@/util/server/withAuth";

const Login = () => {
  const router = useRouter();
  const { callbackUrl } = router.query;

  return (
    <Layout title="Login">
      <Center>
        <Button
          leftIcon={<FcGoogle />}
          onClick={() =>
            signIn("google", {
              callbackUrl: callbackUrl ? String(callbackUrl) : "/",
            })
          }
          variant="outline"
        >
          Sign in with Google
        </Button>
      </Center>
    </Layout>
  );
};

export const getServerSideProps = withUnauthed(() => ({
  props: {},
}));

export default Login;
