import { default as NextDocument, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class Document extends NextDocument {
  static getInitialProps({ renderPage }) {
    const sh = new ServerStyleSheet(),
      page = renderPage(App => props => sh.collectStyles(<App {...props} />)),
      styleTags = sh.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>Polynom</title>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Document;
