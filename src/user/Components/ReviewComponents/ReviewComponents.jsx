import "./ReviewComponentsStyle.css"

const ReviewComponents = () => {
  return (
    <>
      <h5 className="card-title center-text mt-5">
        Ayo Beri Review Untuk Mobil Ini
      </h5>
      <div className="card mt-5 mb-3 d-flex justify-content-center " style={{}}>
        <img
          src="https://static.wixstatic.com/media/80e573_756d54c0b87947e59bf26df872a1b6c6~mv2.png/v1/crop/x_341,y_81,w_1259,h_556/fill/w_824,h_400,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/Car%20Subscription%20New%20Zealand%20-%20Snap%20Subscribe.png"
          className="card-img-top"
          alt="kaleb"
        />
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title center-text">VOLKSWAGEN</h5>
          <p className="card-text center-text">
            <small className="text-body-secondary">
              Tambahkan Reviewmu Disini...
            </small>
          </p>
          <p className="card-text center-text">
            <span style={{ color: "gold" }}>
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>
          </p>
          <button className="btn btn-dark mt-auto">Posting</button>
        </div>
      </div>
    </>
  );
};

export default ReviewComponents