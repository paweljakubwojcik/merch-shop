import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout'

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: { ...(await serverSideTranslations(locale)) },
})

const Home: NextPageWithLayout = () => {
    const { t } = useTranslation(['homepage'])
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center absolute top-0">
            <header>
                <h2 className="font-bold text-lg m-4">{t('greetings')}</h2>
            </header>
            <p className="text-sm">{t('info')}</p>
        </div>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Home
