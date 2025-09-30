// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import "../app/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/LoadingScreen";


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      {loading && <LoadingScreen />}
 
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
