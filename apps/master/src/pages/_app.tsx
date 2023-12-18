import "@stigg/react-sdk/dist/styles.css";
import type { AppProps } from "next/app";

import { StiggProvider } from "@stigg/react-sdk";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StiggProvider apiKey={process.env.NEXT_PUBLIC_STIGG_API_KEY || " "}>
      <Component {...pageProps} />
    </StiggProvider>
  );
}
