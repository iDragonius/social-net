import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className = 'text-7xl text-pink-200'>HELLO WORLD</h1>      
      </div>
      
      
    </div>
  )
}
