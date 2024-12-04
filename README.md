# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

UAS Pemrograman Web Gasal 2023/2024

Kelas A Kelompok 9

Anggota Kelompok:
- Kevin Valencio Patsy (210711013) - frontend
- Reynold Kunarto (210711015) - fullstack + hosting
- Marselinus Dira Agaska (210711058) - frontend

Username & Password Login:

- Login User:
    -Email: michaelreynoldk@gmail.com
    -Password: userpw
- Login Admin:
    -Email: admin
    -Password: admin

Bonus yang diambil:
- Hosting:
    -Backend: https://pw2023-a-9-rentalmobil.up.railway.app
    -Frontend:

- Routes API:
    -POST /register - register
    -POST /login - login

    -POST /admin/login - loginAdmin
    -POST /admin/register - registerAdmin

    -GET /cabang - index
    -POST /cabang - store
    -GET /cabang/{id} - show
    -PUT /cabang/{id} - update
    -DELETE /cabang/{id} - destroy

    -GET /mobil - index
    -POST /mobil - store
    -GET /mobil/{id} - show
    -GET /mobil/cabang/{id} - showMobilByCabang
    -PATCH /mobil/{id} - update
    -DELETE /mobil/{id} - destroy

    -GET /transaksi - index
    -POST /transaksi - store
    -GET /transaksi/{id} - show
    -GET /transaksi/{status} - showTransaksiByUserAndStatus
    -PATCH /transaksi/{id} - updateStatus
    -DELETE /transaksi/{id} - destroy

    -GET /review - index
    -POST /review - store
    -GET /review/{id} - show
    -GET /review/mobil/{id} - showByMobil
    -PATCH /review/{id} - update
    -DELETE /review/{id} - destroy

    -GET /user - index
    -GET /user/{id} - show
    -PATCH /user/{id} - update
    -DELETE /user/{id} - destroy

- React:
    -Link Repository: https://github.com/Rzero6/PW2023_A_9_React.git 
