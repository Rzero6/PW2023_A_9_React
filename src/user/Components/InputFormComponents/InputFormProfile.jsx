const InputFormProfile = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card-body text-center">
        <h1 className="mb-3">Profile</h1>
        <div className="mb-2">
          <label htmlFor="namaLengkap"><strong>Nama Lengkap:</strong></label>
          <input className="form-control mx-auto" id="namaLengkap" type="text"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email"><strong>Email:</strong></label>
          <input className="form-control mx-auto" id="email" type="email"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="alamat"><strong>Alamat:</strong></label>
          <input className="form-control mx-auto" id="alamat" type="text"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="nomorTelepon"><strong>Nomor Telepon:</strong></label>
          <input className="form-control mx-auto" id="nomorTelepon" type="tel"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="tanggalLahir"><strong>Tanggal Lahir:</strong></label>
          <input className="form-control mx-auto" id="tanggalLahir" type="date"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="foto_ktp"><strong>Foto KTP</strong></label>
          <input type="file" className="form-control mx-auto" id="foto_ktp"
            style={{ maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          />
        </div>
        <div className="mb-2">
          <a href="/profile" className="btn btn-danger">Batal</a>
          <a href="/profile" className="btn btn-primary">Simpan</a>
        </div>
      </div>
    </div>
  );
}

export default InputFormProfile;
