import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ students }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          All of our students
        </h1>
        {
          students != null &&
          students.map((student: any) => {
            <Link
              passHref
              key={student.name}
              href={`/student/${encodeURIComponent(student.slug)}`}
            >
              <div key={student.slug}>
                <div>{student.name}</div>
                <Image src={student.student_headshot} height={250} width={250} alt={student.name} />
                <div>{student.major}</div>
                <div>{student.university}</div>
                <div>{student.story}</div>
              </div>
            </Link>
          })
        }
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const query = {
    type: "students",
  }

  const students = await axios.get(`${process.env.BASE_URL}/buckets/${process.env.BUCKET_SLUG}/objects?query=${query}&limit=10`, {
    params: {
      read_key: process.env.READ_KEY
    }
  })

  return {
    props: {
      students,
    },
  }
}
