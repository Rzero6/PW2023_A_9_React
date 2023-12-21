export const tableHeader = [
  { id: "nama", label: "Nama", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "menyewa",
    label: "Menyewa",
    minWidth: 10,
    format: (value) => (value ? "Iya" : "Tidak"),
  },
  {
    id: "created_at",
    label: "Bergabung Sejak",
    minWidth: 170,
    format: (value) => {
      const date = new Date(value);
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];

      const dayName = days[date.getDay()];
      const dayNumber = date.getDate();
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();

      return `${dayName}, ${dayNumber} ${monthName} ${year}`;
    },
  },
  {
    id: "email_verified_at",
    label: "Terverifikasi",
    minWidth: 10,
    format: (value) => (value !== null ? "Iya" : "Tidak"),
  },
];
