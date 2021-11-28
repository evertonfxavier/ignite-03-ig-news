/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import type { GetStaticProps } from "next";

import { SubscribeButton } from "../Components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "../styles/home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export const Home: React.FC<HomeProps> = ({ product }) => {
  // console.log(props)

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
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
};

export default Home;

//SSR
//Vai ser sempre no formato de const, pois no próprio next eu posso importar a tipagem GetServerSideProps
//GetStaticProps > SSG > 
//Se houver informação diferente por usuário é melhor utilizar o GetServerSideProps
export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve("price_1JRF9JJaIBVLT88m8I4h1YG6");

  const product = {
    priceId: price.id,
    // amount: Number(price.unit_amount) / 100,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price.unit_amount) / 100),
  };

  return {
    props: {
      product,
    },
    //quanto tempo em seg eu quero que essa página se mantenha sem previsar ser revalidada/reconstruída.
    revalidate: 60 * 60 * 24, //24h
  };
};
