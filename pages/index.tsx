import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>          
          Well hello there
        </h1>

        <p className={styles.description}></p>

        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h3>Greeting</h3>
          </a>

          <a href="" className={styles.card}>
            <h3>Salut</h3>
            <p></p>
          </a>

          <a href="" className={styles.card}>
            <h3>Hilsen</h3>
            <p></p>
          </a>

          <a href="" className={styles.card}>
            <h3>Grüße</h3>
            <p></p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
