// Dummy data semua kapal
const jadwalKapal = {
  "satria-jaya": [
    { tanggal: "2025-06-05", tujuan: "Batam - Dompak", status: "Tersedia" },
    { tanggal: "2025-06-07", tujuan: "Batam - Dompak", status: "Penuh" },
  ],
  "nusantara-express": [
    { tanggal: "2025-06-06", tujuan: "Batam - Tanjung Pinang", status: "Tersedia" }
  ],
  // Tambah kapal lainnya di sini
};

document.addEventListener("DOMContentLoaded", () => {
  const namaKapal = document.body.dataset.kapal;
  const data = jadwalKapal[namaKapal] || [];

  const tbody = document.querySelector("#tabel-jadwal tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (data.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3">Tidak ada jadwal tersedia.</td>`;
    tbody.appendChild(tr);
    return;
  }

  data.forEach((jadwal) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${jadwal.tanggal}</td>
      <td>${jadwal.tujuan}</td>
      <td style="color: ${jadwal.status === "Tersedia" ? "green" : "red"};">
        ${jadwal.status}
      </td>
    `;
    tbody.appendChild(tr);
  });
});
