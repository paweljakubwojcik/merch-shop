import { ReactElement } from 'react'
import Layout from '../components/Layout'

const Contact: NextPageWithLayout = () => {
    return <h2 className="h-screen">Hello merch Contact</h2>
}

Contact.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Contact
