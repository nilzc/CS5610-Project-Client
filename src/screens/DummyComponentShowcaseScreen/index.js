// I will dump all the components to this.

import LargeInfoCard from "./LargeInfoCard";
import MovieScroll from "./MovieScroll";
import Navbar1 from "./NavBar";
import SearchComponent from "./SearchComponent";
import JoinToday from "./JoinToday";
import LeaderBoard from "./LeaderBoard";
import FullWheel from "./FullWheel";
import Footer from "./Footer";


const DummyComponentShowcaseScreen = () => {
    return (
        <div className="container">
            <Navbar1/>
            <MovieScroll/>
            <MovieScroll/>
            <MovieScroll/>
            <SearchComponent/>
            <LargeInfoCard/>
            <JoinToday/>
            <LeaderBoard/>
            <FullWheel
                percentage={0.9}
                radius={22}
                arcX={22 + 5}
                arcY={22 + 5}
                lw={5}
                />
            <Footer/>
        </div>
    )
};
export default DummyComponentShowcaseScreen;