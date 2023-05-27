import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params);
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
      }),
    },
  };
}
export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  console.log("router", router);
  console.log("props", props);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { address, name, neighbourhood } = props.coffeeStore;
  return (
    <divs>
      <Head>
        <title>{name}</title>
      </Head>
      Coffee Store Page {router.query.id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </divs>
  );
};

export default CoffeeStore;
