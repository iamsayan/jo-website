import Page from './page'

export async function generateMetadata({ params }) {
    return {
        title: `Jagadhatri Puja ${params?.year} Jubilee, Pre Jubilee List, Schedule`,
        description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${params?.year} the great festival of Chandannagar.`,
    }
}

export default Page