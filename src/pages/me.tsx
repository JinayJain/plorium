import { Heading } from "@chakra-ui/react";

import Layout from "@/components/layout/Layout";
import { withAuth } from "@/util/server/withAuth";

function Profile() {
  return (
    <Layout title="Profile">
      <Heading>Profile</Heading>
    </Layout>
  );
}

export const getServerSideProps = withAuth();
export default Profile;
