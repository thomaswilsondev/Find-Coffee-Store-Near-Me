import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Banner from "../components/banner/banner";

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width="700" height="400" />
        </div>
      </main>
    </div>
  );
}
