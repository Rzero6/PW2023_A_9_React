export const tableHeader = [
    { id: "nama", label: "Nama", minWidth: 150 },
    {
      id: "tipe",
      label: "Tipe",
      minWidth: 100,
      format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    { id: "cabang", label: "Cabang", minWidth: 100 },
    {
      id: "disewa",
      label: "Disewa",
      minWidth: 10,
      format: (value) => (value ? "Iya" : "Tidak"),
    },
    {
      id: "harga_sewa",
      label: "Harga Sewa",
      minWidth: 140,
      align: "right",
      format: (value) => `Rp. ${value.toLocaleString("id-ID")}`,
    },
    { id: "no_polisi", label: "No Polisi", minWidth: 100 },
    { id: "tahun", label: "Tahun", minWidth: 50, align: "right" },
    {
      id: "bahan_bakar",
      label: "Bahan Bakar",
      minWidth: 120,
      format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    { id: "jml_tempat_duduk", label: "Kapasitas", minWidth: 100 },
    {
      id: "transmisi",
      label: "Transmisi",
      minWidth: 100,
      format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
  ];