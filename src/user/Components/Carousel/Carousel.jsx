import "./CarouselStyles.css"

const Carousel = () => {
    const gambar1 = "https://static.wixstatic.com/media/80e573_756d54c0b87947e59bf26df872a1b6c6~mv2.png/v1/crop/x_341,y_81,w_1259,h_556/fill/w_824,h_400,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/Car%20Subscription%20New%20Zealand%20-%20Snap%20Subscribe.png";
  const gambar2 = "https://assets.fastly.carvana.io/home-assets/nba/civic.png";
  const gambar3 = "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg";

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={gambar1} className="d-block w-100" alt="Not Found" />
        </div>
        <div className="carousel-item">
          <img src={gambar2} className="d-block w-100" alt="Not Found" />
        </div>
        <div className="carousel-item">
          <img src={gambar3} className="d-block w-100" alt="Not Found" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
