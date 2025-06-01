import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PlanProvider } from '../context/PlanContext';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlanProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlanProvider>
  );
}
