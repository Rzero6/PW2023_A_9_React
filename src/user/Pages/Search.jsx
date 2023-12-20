import SearchFilteringComponents from "../Components/SearchSectionComponents/SearchFilteringComponents/SearchFilteringComponents";
import MainContentSearch from "../Components/SearchSectionComponents/MainContentSearch/MainContentSearch";
import Navbar from "../Components/Partials/Navbar/Navbar";
import Footer from "../Components/Partials/Footer/Footer";

const Search = () => {
    return(
        <>
        <Navbar/>
        <SearchFilteringComponents/>
        <MainContentSearch/>
        <Footer/>
        </>
    )
}

export default Search;