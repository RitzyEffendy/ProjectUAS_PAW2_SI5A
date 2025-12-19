// Import React untuk membuat komponen
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateResep() {

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    namaResep: "",
    negara: "",
    bahan: "",
    kategori_id: "",
  });

  // State untuk menyimpan data kategori
  const [kategori, setKategori] = useState([]);

  // Fungsi untuk handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch kategori data saat komponen mount
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get(
          "https://newexpresssi5a-three.vercel.app/api/kategori"
        );
        setKategori(response.data);
      } catch (err) {
        console.error("Error fetching kategori:", err);
      }
    };
    fetchKategori();
  }, []);

  // Fungsi untuk handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.namaResep || !formData.negara || !formData.bahan || !formData.kategori_id) {
      setError("Semua field harus diisi!");
      return;
    }

    // Reset error
    setError(null);
    setLoading(true);

    try {
      // Kirim POST request ke API
      const response = await axios.post(
        "https://newexpresssi5a-three.vercel.app/api/resep",
        formData
      );

      console.log("Resep created:", response.data);
      
      // Tampilkan notifikasi sukses
      Swal.fire({
        title: "Berhasil!",
        text: "Data resep berhasil disimpan.",
        icon: "success"
      });

      // Reset form setelah berhasil
      setFormData({
        namaResep: "",
        negara: "",
        bahan: "",
        kategori_id: "",
      });
    } catch (err) {
      console.error("Error creating resep:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat menyimpan data"
      );
    } finally {
      setLoading(false);
    }
  };

    // Simulasi berhasil
    // alert("Validasi berhasil! Data siap dikirim.");
    // console.log("Data yang akan dikirim:", formData);
    // };

  // Render form sederhana
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Resep</h2>

       {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

        {/* Tampilkan state untuk debugging */}
        <div className="alert alert-info">
        <strong>State saat ini:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>

      {/* Form untuk input data fakultas */}
      <form onSubmit={handleSubmit}>
        {/* Input field untuk nama menu */}
        <div className="mb-3">
          <label htmlFor="namaResep" className="form-label">
            Nama Resep
          </label>
          <input
            type="text"
            className="form-control"
            id="namaResep"
            name="namaResep"
            value={formData.namaResep}
            onChange={handleChange}
            placeholder="Contoh: Risotto"
          />
        </div>

        {/* Input field untuk negara */}
        <div className="mb-3">
          <label htmlFor="negara" className="form-label">
            Negara
          </label>
          <input
            type="text"
            className="form-control"
            id="negara"
            name="negara"
            value={formData.negara}
            onChange={handleChange}
            placeholder="Contoh: Italia"
          />
        </div>

        {/* Input field untuk bahan */}
        <div className="mb-3">
          <label htmlFor="bahan" className="form-label">
            Bahan
          </label>
          <input
            type="text"
            className="form-control"
            id="bahan"
            name="bahan"
            value={formData.bahan}
            onChange={handleChange}
            placeholder="Contoh: Nasi"
          />
        </div>

        {/* Select field untuk kategori */}
        <div className="mb-3">
          <label htmlFor="kategori_id" className="form-label">
            Kategori
          </label>
          <select
            className="form-control"
            id="kategori_id"
            name="kategori_id"
            value={formData.kategori_id}
            onChange={handleChange}
          >
            <option value="">Pilih Kategori</option>
            {kategori.map((kat) => (
              <option key={kat._id} value={kat._id}>
                {kat.kategoriResep}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/resep")}
            disabled={loading}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}