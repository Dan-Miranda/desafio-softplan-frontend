import React from 'react';
import Head from 'next/head';
import PaginaInicial from '../components/organisms/Home';
import Header from '../components/molecules/Header';

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
