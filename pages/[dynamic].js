import Head from "next/head";
import { useRouter } from "next/router";

const DynamicRoute = () => {
  const router = useRouter();
  const query = router.query.dynamic;
  console.log("query", query);

  return (
    <>
      <Head>
        <title>{query}</title>
      </Head>
      <div>{` Hi There I am a dynamic route: ${query}`}</div>
    </>
  );
};

export default DynamicRoute;
