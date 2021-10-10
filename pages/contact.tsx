import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import Layout from '../components/Layout'

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: { ...(await serverSideTranslations(locale)) },
})

const Contact: NextPageWithLayout = () => {
    return <h2 className="h-screen">Hello merch Contact</h2>
}

Contact.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Contact
