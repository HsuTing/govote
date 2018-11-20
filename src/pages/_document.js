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

          <style
            dangerouslySetInnerHTML={{
              __html: `
              @font-face {
                font-family: 'Noto Sans CJK tc';
                font-weight: 700;
                src: url("/static/font/NotoSansCJKtc-Bold.otf") format("opentype");
              }

              @font-face {
                font-family: 'Noto Sans CJK tc';
                src: url("/static/font/NotoSansCJKtc-Medium.otf") format("opentype");
              }
             `,
            }}
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
