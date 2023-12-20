import React, { useState } from 'react';

const InputFormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate successful login since we don't have user data yet
    if (username.trim() !== '' && password.trim() !== '') {
      // Set the cookie for authentication
      document.cookie = `username=${username}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;

      // Redirect to the logged-in page (replace with your actual logic)
      window.location.href = '/';
    } else {
      // Handle invalid login attempt (e.g., display an error message)
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <form className="card p-3" action="/login" style={{ minWidth: '40%' }} onSubmit={handleSubmit}>
        <div className="card-body">
          <h1 className="text-center mb-3">Sign in</h1>
          <input
            className="form-control mb-2"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Email"
          />
          <div>
            <input
              className="form-control mb-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="d-flex w-100 justify-content-center mb-2">
            <button type="submit" className="btn flex-grow-1" style={{backgroundColor: '#198754', color: 'white'}}>Login</button>
          </div>
          <div className="d-flex w-100 justify-content-center">
            <p className="me-3">Belum punya akun? </p>
            <a className="text-decoration-none text-success" href="/register">Daftar Sekarang</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputFormLogin;
