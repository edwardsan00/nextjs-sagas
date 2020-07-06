import Link from 'next/link'
import Layout from '../components/Layout'
import { Typography } from '@material-ui/core'

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <Typography variant="h1">About</Typography>
    <Typography variant="h5">This is the about page</Typography>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
