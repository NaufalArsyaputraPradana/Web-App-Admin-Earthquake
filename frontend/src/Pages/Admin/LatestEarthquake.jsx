import { useEffect, useState } from "react";
import axios from "axios";

const LatestEarthquake = () => {
  const [earthquake, setEarthquake] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLatestEarthquake = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml",
        { headers: { "Content-Type": "application/xml" } }
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "application/xml");

      const gempa = xmlDoc.getElementsByTagName("gempa")[0];

      const earthquakeData = {
        tanggal: gempa.getElementsByTagName("Tanggal")[0].textContent,
        jam: gempa.getElementsByTagName("Jam")[0].textContent,
        datetime: gempa.getElementsByTagName("DateTime")[0].textContent,
        magnitude: gempa.getElementsByTagName("Magnitude")[0].textContent,
        kedalaman: gempa.getElementsByTagName("Kedalaman")[0].textContent,
        koordinat: gempa.getElementsByTagName("point")[0]?.textContent || "-",
        lintang: gempa.getElementsByTagName("Lintang")[0].textContent,
        bujur: gempa.getElementsByTagName("Bujur")[0].textContent,
        wilayah: gempa.getElementsByTagName("Wilayah")[0].textContent,
        potensi: gempa.getElementsByTagName("Potensi")[0]?.textContent || "-",
        dirasakan:
          gempa.getElementsByTagName("Dirasakan")[0]?.textContent ||
          "Tidak dirasakan",
        shakemap:
          "https://data.bmkg.go.id/DataMKG/TEWS/" +
          gempa.getElementsByTagName("Shakemap")[0].textContent,
      };

      setEarthquake(earthquakeData);
    } catch (error) {
      console.error("Gagal mengambil data gempa terbaru:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestEarthquake();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Gempa Bumi Terbaru
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-600">Memuat data...</p>
      ) : earthquake ? (
        <div className="space-y-4">
          <p>
            <strong>Tanggal:</strong> {earthquake.tanggal}
          </p>
          <p>
            <strong>Jam:</strong> {earthquake.jam}
          </p>
          <p>
            <strong>DateTime:</strong> {earthquake.datetime}
          </p>
          <p>
            <strong>Magnitudo:</strong> {earthquake.magnitude}
          </p>
          <p>
            <strong>Kedalaman:</strong> {earthquake.kedalaman}
          </p>
          <p>
            <strong>Koordinat:</strong> {earthquake.koordinat}
          </p>
          <p>
            <strong>Lintang:</strong> {earthquake.lintang}
          </p>
          <p>
            <strong>Bujur:</strong> {earthquake.bujur}
          </p>
          <p>
            <strong>Lokasi:</strong> {earthquake.wilayah}
          </p>
          <p>
            <strong>Potensi:</strong> {earthquake.potensi}
          </p>
          <p>
            <strong>Dirasakan:</strong> {earthquake.dirasakan}
          </p>
          <div>
            <strong>Shakemap:</strong>
            <img
              src={earthquake.shakemap}
              alt="Peta Guncangan Gempa"
              className="mt-2 rounded-md shadow-md"
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Tidak ada data gempa terbaru.
        </p>
      )}
    </div>
  );
};

export default LatestEarthquake;
