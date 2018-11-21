import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static getInitialProps = async ctx => await NextDocument.getInitialProps(ctx);

  render() {
    return (
      <html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:image" content="/static/og-image.png" />
          <meta property="og:title" content="為愛返鄉，我們願意走這麼遠！" />
          <meta
            property="og:description"
            content="統計國內外為支持婚姻平權與性平教育返鄉者的旅程資料，包含旅途時間、費用與距離，快來新增資料，讓你的行動影響更多人吧！"
          />
          <meta property="og:url" content="https://govote-tw.herokuapp.com" />

          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
            rel="stylesheet"
          />

          <style
            dangerouslySetInnerHTML={{
              __html: `
              @font-face {
                font-family: 'Noto Sans CJK tc';
                font-weight: 900;
                src: url("/static/font/NotoSansCJKtc-Black.otf") format("opentype");
              }

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
