// Import useState dan useEffect untuk mengelola state dan side effects
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request
import axios from "axios";
// Import useNavigate untuk navigasi dan useParams untuk mengambil parameter URL
import { useNavigate, useParams } from "react-router-dom";

export default function EditResep() {
  // useNavigate hook untuk redirect
  const navigate = useNavigate();
  // useParams hook untuk mengambil id dari URL
  const { id } = useParams();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    namaResep: "",
    negara: "",
    bahan: "",
  });

  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);

  // State untuk menandakan proses loading
  const [loading, setLoading] = useState(false);

  // State untuk menandakan proses loading saat fetch data
  const [isLoadingData, setIsLoadingData] = useState(true);

  // useEffect untuk fetch data fakultas berdasarkan id
  useEffect(() => {
    const fetchResep = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(
          `https://newexpresssi5a-three.vercel.app/api/resep/${id}`
        );
        // Set data ke form
        setFormData({
          namaResep: response.data.namaResep,
          negara: response.data.negara,
          bahan: response.data.bahan,
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching resep:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Terjadi kesalahan saat mengambil data"
        );
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchResep();
  }, [id]); // Dependency array berisi id, akan dijalankan ulang jika id berubah

  // Fungsi untuk handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.namaResep || !formData.negara || !formData.bahan) {
      setError("Semua field harus diisi!");
      return;
    }

    // Tandai proses pengiriman data ke API
    setLoading(true);
    // Reset error
    setError(null);

    try {
      // Kirim patch request ke API untuk update data
      // Hanya kirim field yang diperlukan (nama dan singkatan)
      const response = await axios.patch(
        `https://newexpresssi5a-three.vercel.app/api/resep/${id}`,
        {
          namaResep: formData.namaResep,
          negara: formData.negara,
          bahan: formData.bahan,
        }
      );

      console.log("Resep updated:", response.data);
      // Redirect ke halaman list resep
      navigate("/resep");
    } catch (err) {
      console.error("Error updating resep:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengupdate data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Tampilkan loading saat data sedang diambil
  if (isLoadingData) {
    return <div className="container-fluid mt-5">Loading...</div>;
  }

  // Render form edit
  return (
    <div className="container-fluid mt-5">
      <h2 className="mb-4">Edit Resep</h2>

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
        {/* Input field untuk nama fakultas */}
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
            disabled={loading}
          />
        </div>

        {/* Input field untuk singkatan fakultas */}
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
            disabled={loading}
          />
        </div>

        {/* Input field untuk singkatan fakultas */}
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
            disabled={loading}
          />
        </div>

        {/* Tombol submit */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Mengupdate..." : "Update"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/resep")}
            disabled={loading}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
