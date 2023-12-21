import SearchFilteringComponents from "../Components/SearchSectionComponents/SearchFilteringComponents/SearchFilteringComponents";
import MainContentSearch from "../Components/SearchSectionComponents/MainContentSearch/MainContentSearch";
import { useLocation } from "react-router";
import { GetAllMobil } from "../../api/apiMobil";
import { useState, useEffect } from "react";
import { Loading } from "../../admin/components/loading/Loading";
import { Alert, Container } from "react-bootstrap";
const Search = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const jsonData = queryParams.get("data");
  const transaksi = JSON.parse(jsonData);
  const [mobil, setMobil] = useState([]);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const mobilResponse = await GetAllMobil();
      const filteredMobil = mobilResponse.filter((item) => {
        console.log(
          item.disewa,
          item.tipe,
          item.id_cabang,
          transaksi.tipe,
          transaksi.id_cabang_pickup
        );
        return (
          item.disewa === 0 &&
          item.tipe === transaksi.tipe &&
          parseInt(item.id_cabang) === parseInt(transaksi.id_cabang_pickup)
        );
      });
      setMobil(filteredMobil);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <Loading />
        </div>
      ) : mobil.length > 0 ? (
        <MainContentSearch mobil={mobil} transaksi={transaksi} />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <Alert variant="dark" className="text-center">
            Maaf mobil yang dicari tidak ada ☹️
          </Alert>
        </div>
      )}
    </>
  );
};

export default Search;
