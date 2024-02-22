import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
        <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
                integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e"
                crossOrigin="anonymous"
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}