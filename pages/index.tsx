import { ReactElement } from 'react'
import Layout from '../components/Layout'

const Home: NextPageWithLayout = () => {
    return <h2 className="h-screen">Hello merch shop</h2>
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Home
