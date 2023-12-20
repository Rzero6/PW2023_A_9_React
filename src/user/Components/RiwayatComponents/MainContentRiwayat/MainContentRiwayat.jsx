import CarCard from "../CarCard/CarCard";
import "./MainContentRiwayatStyle.css"

const MainContentRiwayat = () => {
  const carsData = [
    {
      imageUrl:
        "https://static.wixstatic.com/media/80e573_756d54c0b87947e59bf26df872a1b6c6~mv2.png/v1/crop/x_341,y_81,w_1259,h_556/fill/w_824,h_400,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/Car%20Subscription%20New%20Zealand%20-%20Snap%20Subscribe.png",
      title: "Volkswagen",
      description: "",
      date: "20-10-2023",
      reviewUrl: "/review",
    },
    {
      imageUrl: "https://assets.fastly.carvana.io/home-assets/nba/civic.png",
      title: "Honda Civic",
      description:
        "Boleh lah ini mobil, untuk keluarga yang ga terlalu banyak, nyaman dan sporty.",
      date: "15-09-2023",
      reviewUrl: "",
    },
    {
      imageUrl:
        "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg",
      title: "Hyundai Grand i10 NIOS",
      description: "mobil ini sangat nyaman dan hemat",
      date: "15-06-2023",
      reviewUrl: "",
    },
  ];
  return (
    <div className="container mt-5">
        <h5 class="card-title center-text mb-5">Riwayat Pesanan Anda</h5>
      {carsData.map((car) => (
        <CarCard key={car.title} carData={car} />
      ))}
    </div>
  );
};


export default MainContentRiwayat;
