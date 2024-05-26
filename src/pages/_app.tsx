import CustomLoader from "@/components/customLoader";
import SideBar from "@/components/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const allowedRoutes = ["/login", "/register"];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <RecoilRoot>
          {allowedRoutes.includes(router.route) ? (
            <Component {...pageProps} />
          ) : (
            <SideBar>
              <Loading />
              <Component {...pageProps} />
              {/* <PlayMusic songsArray={songs} open={open} setOpen={setOpen} /> */}
            </SideBar>
          )}
        </RecoilRoot>
      ) : null}
    </>
  );
}


const Loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const handleStart = (url: any) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleComplete = (url: any) => {
      if (url === router.asPath) {
        setLoading(false);
      }
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);
    };
  });

  return (
    <>
      <CustomLoader loading={loading} />
    </>
  );
};
