const CarCard = ({ carData }) => {
  const { imageUrl, title, description, date, reviewUrl } = carData;

  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imageUrl} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {reviewUrl ? (
                <a
                  className="text-decoration-none text-success"
                  href={reviewUrl}
                >
                  Review Sekarang
                </a>
              ) : (
                description
              )}
            </p>
            <p className="card-text">
              <small className="text-body-secondary">{date}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
