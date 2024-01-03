import Banner from "../../Components/Banner/Banner";
import Map from "../../Components/Map/Map";
import NewsletterSignUp from "../../Components/NewsletterSignup/NewslatterSignup";
import SpecialOffer from "../../Components/SpecialOffer/SpecialOffer";
import SpecialOffers from "../../Components/SpecialOffers/SpecialOffers";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Map></Map>
            <SpecialOffers></SpecialOffers>
            <SpecialOffer></SpecialOffer>
            <NewsletterSignUp></NewsletterSignUp>
        </div>
    );
};

export default Home;