import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
const CarouselHome = () => {
  const gambar1 =
    "https://static.wixstatic.com/media/80e573_756d54c0b87947e59bf26df872a1b6c6~mv2.png/v1/crop/x_341,y_81,w_1259,h_556/fill/w_824,h_400,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/Car%20Subscription%20New%20Zealand%20-%20Snap%20Subscribe.png";
  const gambar2 = "https://assets.fastly.carvana.io/home-assets/nba/civic.png";
  const gambar3 =
    "https://www.pngplay.com/wp-content/uploads/8/White-Volkswagen-Car-PNG-Free-File-Download.png";

  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <Image src={gambar1} alt="not found" />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <Image src={gambar2} alt="not found" />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <Image src={gambar3} alt="not found" />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselHome;
