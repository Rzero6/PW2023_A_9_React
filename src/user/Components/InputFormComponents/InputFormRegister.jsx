const InputFormRegister = () => {
    return(
        <>
         <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <form className="card p-3" action="" style={{ minWidth: '40%' }}>
        <div className="card-body">
          <h1 className="text-center mb-3">Create Account</h1>

          <input className="form-control mb-2" type="text" required placeholder="Nama Lengkap" />
          <input className="form-control mb-2" type="email" required placeholder="Email" />
          <input className="form-control mb-2" type="tel" required placeholder="Telepon" />
          <input className="form-control mb-2" type="text" required placeholder="Alamat" />
          <input className="form-control mb-2" type="date" required placeholder="Tanggal Lahir" max={new Date().toISOString().split('T')[0]} />
          <div>
            <input className="form-control mb-2" type="password" required placeholder="Password" />
            <input className="form-control mb-2" type="password" required placeholder="Confirm Password" />
          </div>
          <div className="d-flex w-100 justify-content-center mb-2">
            <button type="submit" className="btn btn-success flex-grow-1">Create</button>
          </div>
          <div className="d-flex w-100 justify-content-center">
            <p className="me-3">Sudah punya akun? </p>
            <a className="text-decoration-none text-success" href="/login">Login</a>
          </div>
        </div>
      </form>
    </div>
        </>
    )
}

export default InputFormRegister