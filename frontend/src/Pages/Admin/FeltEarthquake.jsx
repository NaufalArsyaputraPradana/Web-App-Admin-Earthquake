import { useEffect, useState } from "react";
import axios from "axios";

const FeltEarthquakes = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeltEarthquakes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.xml",
        { headers: { "Content-Type": "application/xml" } }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "application/xml");

      const gempaList = Array.from(xmlDoc.getElementsByTagName("gempa")).map(
        (gempa) => ({
          tanggal: gempa.getElementsByTagName("Tanggal")[0].textContent,
          jam: gempa.getElementsByTagName("Jam")[0].textContent,
          datetime: gempa.getElementsByTagName("DateTime")[0].textContent,
          magnitude: gempa.getElementsByTagName("Magnitude")[0].textContent,
          kedalaman: gempa.getElementsByTagName("Kedalaman")[0].textContent,
          koordinat: gempa.getElementsByTagName("point")[0]?.textContent || "-",
          lintang: gempa.getElementsByTagName("Lintang")[0].textContent,
          bujur: gempa.getElementsByTagName("Bujur")[0].textContent,
          wilayah: gempa.getElementsByTagName("Wilayah")[0].textContent,
          dirasakan:
            gempa.getElementsByTagName("Dirasakan")[0]?.textContent || "-",
        })
      );

      setEarthquakes(gempaList);
    } catch (error) {
      console.error("Gagal mengambil data gempa yang dirasakan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeltEarthquakes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Daftar 15 Gempabumi Dirasakan
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-600">Memuat data...</p>
      ) : earthquakes.length > 0 ? (
        <ul className="space-y-4">
          {earthquakes.map((gempa, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 rounded-md shadow-md border-l-4 border-blue-500"
            >
              <p>
                <strong>No:</strong> {index + 1}
              </p>
              <p>
                <strong>Tanggal:</strong> {gempa.tanggal}
              </p>
              <p>
                <strong>Jam:</strong> {gempa.jam}
              </p>
              <p>
                <strong>DateTime:</strong> {gempa.datetime}
              </p>
              <p>
                <strong>Magnitudo:</strong> {gempa.magnitude}
              </p>
              <p>
                <strong>Kedalaman:</strong> {gempa.kedalaman}
              </p>
              <p>
                <strong>Koordinat:</strong> {gempa.koordinat}
              </p>
              <p>
                <strong>Lintang:</strong> {gempa.lintang}
              </p>
              <p>
                <strong>Bujur:</strong> {gempa.bujur}
              </p>
              <p>
                <strong>Lokasi:</strong> {gempa.wilayah}
              </p>
              <p>
                <strong>Dirasakan:</strong> {gempa.dirasakan}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">
          Tidak ada data gempa dirasakan.
        </p>
      )}
    </div>
  );
};

export default FeltEarthquakes;
