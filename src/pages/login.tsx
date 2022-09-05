import { Button, Center } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

import Layout from "@/components/layout/Layout";

import { authOptions } from "./api/auth/[...nextauth]";

const Login = () => {
  return (
    <Layout>
      <Center>
        <Button
          onClick={() => signIn("google")}
          leftIcon={<FaGoogle />}
          colorScheme="green"
        >
          Login
        </Button>
      </Center>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions,
  );

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
