import React from "react";

const FormLogin = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <form className="card p-3" action="{{url('loggedIn')}}" style={{ minWidth: '40%' }}>
        <div className="card-body">
          <h1 className="text-center mb-3">Sign in</h1>
          <input className="form-control mb-2" type="email" required placeholder="Email" />
          <div>
            <input className="form-control mb-2" type="password" required placeholder="Password" />
          </div>
          <div className="d-flex justify-content-between mb-2">
            <div>
              <input className="form-check-input" type="checkbox" id="checkBoxRememberMe" />
              <label htmlFor="checkBoxRememberMe">Remember me</label>
            </div>
            <a className="text-decoration-none text-success" href="#">Forgot password?</a>
          </div>
          <div className="d-flex w-100 justify-content-center mb-2">
            <button type="submit" className="btn btn-success flex-grow-1">Login</button>
          </div>
          <div className="d-flex w-100 justify-content-center">
            <p className="me-3">Belum punya akun? </p>
            <a className="text-decoration-none text-success" href="{{url ('register')}}">Daftar Sekarang</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;