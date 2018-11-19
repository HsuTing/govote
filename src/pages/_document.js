import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static getInitialProps = async ctx => await NextDocument.getInitialProps(ctx);

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
