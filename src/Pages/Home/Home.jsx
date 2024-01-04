import Banner from "../../Components/Banner/Banner";
import Map from "../../Components/Map/Map";
import NewsletterSignUp from "../../Components/NewsletterSignup/NewslatterSignup";
import SpecialOffer from "../../Components/SpecialOffer/SpecialOffer";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Map></Map>
            <SpecialOffer></SpecialOffer>
            <NewsletterSignUp></NewsletterSignUp>
        </div>
    );
};

export default Home;