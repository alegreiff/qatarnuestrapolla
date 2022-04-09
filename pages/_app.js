import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { pollaTheme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={pollaTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
