import PesananComponent from "../Components/PesananComponent/PesananComponent";
import Navbar from "../Components/Partials/Navbar/Navbar";

const Pesanan = () => {
    return(
        <>
        <Navbar page="Riwayat Pesanan" pathUrl="/riwayat"/>
        <PesananComponent/>
        </>
    )
}

export default Pesanan