/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from 'next/head';

import { SubscribeButton } from "../Components/SubscribeButton";

import styles from "../styles/home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get to access to all publications <br />
            {/* <span>for {product.amount} month</span> */}
          </p>

          {/* <SubscribeButton priceId={product.priceId} /> */}
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
};

export default Home;
