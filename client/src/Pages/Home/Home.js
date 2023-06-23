
import "./Home.css"
import { About, Blog, Footer, HeadSection, Header, ReviewsForm, Service, Testmonial } from "../../Sections"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

const Home = () => {
    const [reviews, setReviews] = useState()
    return (
        <>
            <Header />
            <HeadSection />
            <About />
            <Service
                subtitle="Service"
                sectionTitle="What I Do"
                p1={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. In alias dignissimos.`}
                p2="rerum commodi corrupti, temporibus non quam." />
            <Service
                subtitle="Skills"
                sectionTitle="Why Choose me"
                p1={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. In alias dignissimos.`}
                p2="rerum commodi corrupti, temporibus non quam." />
            <Testmonial />
            <ReviewsForm />
            {/* <Blog /> */}
            <Footer />
        </>

    )
}

export default Home