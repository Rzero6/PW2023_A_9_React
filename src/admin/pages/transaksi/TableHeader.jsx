export const tableHeader = [
  { id: "id", label: "ID", minWidth: 50 },
  {
    id: "mobil",
    label: "Mobil",
    minWidth: 150,
  },
  {
    id: "peminjam",
    label: "User",
    minWidth: 150,
  },
  {
    id: "pickup",
    label: "Pickup Lokasi",
    minWidth: 130,
  },
  {
    id: "dropoff",
    label: "Dropoff Lokasi",
    minWidth: 130,
  },
  {
    id: "waktu_pickup",
    label: "Pickup",
    minWidth: 100,
    format: (value) => {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  {
    id: "waktu_dropoff",
    label: "Dropoff",
    minWidth: 100,
    format: (value) => {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
  },
  {
    id: "metode_pembayaran",
    label: "Pembayaran",
    minWidth: 50,
  },
  {
    id: "details",
    label: "Tambahan",
    minWidth: 130,
  },
  {
    id: "created_at",
    label: "Tanggal Transaksi",
    minWidth: 150,
    format: (value) => {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
];
