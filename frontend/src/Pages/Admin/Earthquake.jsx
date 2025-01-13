import { useEffect, useState } from "react";
import axios from "axios";

// Komponen untuk menampilkan data gempa terkini
const Earthquake = () => {
  // State untuk menyimpan data gempa
  const [earthquakes, setEarthquakes] = useState([]);
  // State untuk menyimpan status loading
  const [isLoading, setIsLoading] = useState(false);
  // State untuk menyimpan error
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data gempa
  const fetchEarthquakeData = async () => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get(
        "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml",
        { headers: { "Content-Type": "application/xml" } }
      );

      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "application/xml");

      // Ambil elemen <gempa>
      const earthquakeElements = xmlDoc.getElementsByTagName("gempa");
      const earthquakeData = Array.from(earthquakeElements).map((item) => ({
        tanggal: item.getElementsByTagName("Tanggal")[0]?.textContent || "-",
        jam: item.getElementsByTagName("Jam")[0]?.textContent || "-",
        magnitude:
          item.getElementsByTagName("Magnitude")[0]?.textContent || "-",
        kedalaman:
          item.getElementsByTagName("Kedalaman")[0]?.textContent || "-",
        wilayah: item.getElementsByTagName("Wilayah")[0]?.textContent || "-",
        koordinat:
          item.getElementsByTagName("Coordinates")[0]?.textContent || "-",
        potensi: item.getElementsByTagName("Potensi")[0]?.textContent || "-",
      }));

      // Validasi data gempa
      if (!earthquakeData.length) {
        throw new Error("Tidak ada data gempa terkini.");
      }

      setEarthquakes(earthquakeData);
    } catch (error) {
      console.error("Gagal mengambil data gempa:", error);
      setError("Gagal mengambil data gempa. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakeData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Data Gempa Bumi Terkini
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-600">Memuat data...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : earthquakes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                {[
                  "Tanggal",
                  "Jam",
                  "Magnitude",
                  "Kedalaman",
                  "Wilayah",
                  "Koordinat",
                  "Potensi",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 text-left text-sm font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {earthquakes.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-4 text-sm border-b">{item.tanggal}</td>
                  <td className="py-3 px-4 text-sm border-b">{item.jam}</td>
                  <td className="py-3 px-4 text-sm border-b">
                    {item.magnitude}
                  </td>
                  <td className="py-3 px-4 text-sm border-b">
                    {item.kedalaman}
                  </td>
                  <td className="py-3 px-4 text-sm border-b">{item.wilayah}</td>
                  <td className="py-3 px-4 text-sm border-b">
                    {item.koordinat}
                  </td>
                  <td className="py-3 px-4 text-sm border-b">{item.potensi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Tidak ada data gempa terkini.
        </p>
      )}
    </div>
  );
};

export default Earthquake;
