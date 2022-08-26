import { GetServerSidePropsContext } from "next";
import { getRoadmapById } from "../../server/db/queries";
import InferNextProps from "../../util/types/InferNextProps";

function Roadmap({ roadmap }: InferNextProps<typeof getServerSideProps>) {
  return (
    <div>
      <h1>{roadmap?.name}</h1>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id;
  const roadmap = await getRoadmapById(parseInt(id as string, 10));

  return {
    props: {
      roadmap,
    },
  };
};

export default Roadmap;
