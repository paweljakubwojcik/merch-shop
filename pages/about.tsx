import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import Layout from '../components/Layout'

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: { ...(await serverSideTranslations(locale, ['common'])) },
})

const About: NextPageWithLayout = () => {
    return <h2 className="h-screen">Hello About</h2>
}

About.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default About
