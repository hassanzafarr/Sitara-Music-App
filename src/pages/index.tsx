import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AudioPlayer from './home'

import { useMediaQuery, useTheme } from '@mui/material';
import CustomDrawer from '@/components/sidebar'
import LandingPage from './home'
import { useRouter } from 'next/router'
import { useEffect } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  return (
    <main className={inter.className}>
      <LandingPage />
    </main>
  );
}
