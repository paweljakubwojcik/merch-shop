import { ReactElement } from 'react'
import Layout from '../components/Layout'

const About: NextPageWithLayout = () => {
    return <h2 className="h-screen">Hello About</h2>
}

About.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default About
