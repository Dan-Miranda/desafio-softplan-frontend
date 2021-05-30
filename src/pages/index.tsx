import React from 'react';
import Head from 'next/head';
import PaginaInicial from '../components/organisms/Home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cadastro de Pessoas</title>
      </Head>

      <main>
        <PaginaInicial />
      </main>
    </>
  );
}
