import "./PesananComponentStyle.css"

const PesananComponent = () => {
    return(
    <>
      <h5 className="card-title center-text mt-5">Ongoing</h5>
      <p className="center-text"><strong>Kamu Sedang Menyewa Mobil ini</strong></p>
      <br /><br /><br />
      <div className="card mb-3">
        <img src="https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg" className="card-img-top" alt="kaleb" />
        <div className="card-body">
          <h5 className="card-title center-text">Hyundai Grand I10 NIOS</h5>
          <p className="card-text center-text">Pick Up : Yogyakarta Drop Off : Semarang</p>
          <p className="card-text center-text"><small className="text-body-secondary">Waktu PickUp: 25-10-2023 Waktu DropOff: 26-10-2023</small></p>
        </div>
      </div>
    </>
    )
}

export default PesananComponent;