const ReviewItem = ({ review }) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex justify-content-md-start align-items-md-center">
            <img
              className="img-fluid rounded-circle me-2"
              style={{ width: '30px', height: '30px', objectFit: 'cover' }}
              src="https://picsum.photos/200"
              alt="Rusak"
            />
            <h5>{review.userReview}</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex justify-content-end">
            <p>{review.tanggal_review}</p>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-10">
          <p className="ms-3">{review.detail}</p>
        </div>
        <div className="col-md-2">
          <div className="d-flex justify-content-end align-items-center">
            <i className="fa-solid fa-star me-1" style={{ color: '#ffea00' }}></i>
            <strong>{review.userRating}</strong>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ReviewItem;
