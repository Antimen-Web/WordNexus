import "styles/globals.css";
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReduxProvider } from "@redux/provider";

export const metadata = {
  title: "Discover the World of Words with WordNexus",
  description:
    "Explore, Learn, and Connect with the Advanced English Dictionary",
};

const RootLayout = ({ Component, pageProps }) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  const siteName = "WordNexus";
  const baseUrl = "https://word-nexus.vercel.app";

  return (
    <Provider>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={baseUrl + currentUrl}
        />
        <link rel="canonical" href={baseUrl + currentUrl} />
        <meta property="og:locale" content="en" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={baseUrl + currentUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:image"
          content={baseUrl + "/assets/images/logo1.png"}
        />
        <meta property="og:image:width" content="636" />
        <meta property="og:image:height" content="636" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={baseUrl + "/assets/images/logo1.png"}
        />
        <meta name="twitter:description" content={metadata.description} />

        <script type="application/ld+json">
          {`
              {
                  "@context": "http://www.schema.org",
                  "@type": "Organization",
                  "name": "${siteName}",
                  "url": "${baseUrl}/",
                  "logo": "${baseUrl}/assets/images/logo1.png",
                  "description": "${metadata.description}"
              }
              `}
        </script>

        <script type="application/ld+json">
          {`
              {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "@id": "${baseUrl}#website",
                  "url": "${baseUrl}/",
                  "name": "${siteName}",
                  "description": "${metadata.description}",
                  "publisher": {
                    "@id": "${baseUrl}#organization"
                  },
                  "potentialAction": [{
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "${baseUrl}?s={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                  }],
                  "inLanguage": "en"
              }
              `}
        </script>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={baseUrl + "/assets/images/apple-touch-icon.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={baseUrl + "/assets/images/favicon-32x32.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={baseUrl + "/assets/images/favicon-16x16.png"}
        />
        <link
          rel="manifest"
          href={baseUrl + "/assets/images/site.webmanifest"}
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <ReduxProvider>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Nav />
          <Component {...pageProps} />
        </main>
      </ReduxProvider>
    </Provider>
  );
};

export default RootLayout;
