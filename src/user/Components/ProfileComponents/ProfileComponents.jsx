const ProfileComponents = () => {
  return (
    <>
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card-body text-center">
        <h5 className="mb-3">Profile</h5>
        <div className="mb-2">
          <label htmlFor="namaLengkap"><strong>Nama Lengkap:</strong></label>
          <p className="form-control mx-auto" id="namaLengkap"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            Kunarto Dira Patsy
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="email"><strong>Email:</strong></label>
          <p className="form-control mx-auto" id="email"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            rendir@gmail.com
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="alamat"><strong>Alamat:</strong></label>
          <p className="form-control mx-auto" id="alamat"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            Jalan Babarsari No 153
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="nomorTelepon"><strong>Nomor Telepon:</strong></label>
          <p className="form-control mx-auto" id="nomorTelepon"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            081345678906
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="tanggalLahir"><strong>Tanggal Lahir:</strong></label>
          <p className="form-control mx-auto" id="tanggalLahir"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            10-10-2000
          </p>
        </div>
        <div className="mb-2">
          <label className="row" htmlFor="fotoKTP"><strong>Foto KTP:</strong></label>
          <img
            src="https://picsum.photos/id/237/200/300.jpg"
            className="img-fluid mx-auto"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            alt="Foto KTP"
          />
        </div>
        <a className="btn btn-success" href="/editProf">Ubah Profil</a>
      </div>
    </div>
    </>
  );
}

export default ProfileComponents;
