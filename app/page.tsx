import Head from 'next/head'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>아름다운 Next.js</title>
        <meta name="description" content="아주 이쁜 Next.js 페이지입니다." />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>아름다운 bin 피아노</span>
        </h1>
        <p className={styles.description}>
          지금 바로 등록!
        </p>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 아름다운 bin piano</p>
      </footer>
    </div>
  )
}

export default Home
