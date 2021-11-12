import 'tailwindcss/tailwind.css'
import React, {createContext} from 'react'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
