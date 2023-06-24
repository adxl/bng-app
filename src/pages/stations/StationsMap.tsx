import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button, Card } from "flowbite-react";

import { getAllStations } from "@api/gears/stations";
import type { Station } from "@typing/api/gears/stations";

import "leaflet/dist/leaflet.css";

const StationsMap: React.FC = () => {
  const [_stations, setStations] = useState<Station[]>([]);
  const [_selectedStation, setSelectedStation] = useState<Station | null>(null);

  useEffect(() => {
    getAllStations().then(({ data }) => setStations(data));
  }, []);

  const handleSelectStation = (id: string) => {
    const station = _stations.find((station) => station.id === id);
    setSelectedStation(station as Station);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div id="map" className="w-full">
        <MapContainer center={[48.865, 2.335]} zoom={12} scrollWheelZoom={false}>
          <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png" />
          {_stations.map((station) => (
            <div key={station.id}>
              <Marker position={[station.latitude, station.longitude]}>
                <Popup className="map-popup">
                  <strong>{station.name}</strong>
                  <div>
                    <strong>Véhicules: </strong>
                    <span>{station.vehicles.length}</span>
                  </div>
                  <Button color="dark" onClick={() => handleSelectStation(station.id)}>
                    Détails
                  </Button>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      </div>

      {_selectedStation ? (
        <div>
          <h2>
            Véhicules disponibles dans <strong>{_selectedStation.name}</strong>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {_selectedStation.vehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <p> {vehicle.type.name} </p>
                <small> #{vehicle.id.substring(30)} </small>
                <p> DDF: {vehicle.year}</p>
                <Button color="dark" onClick={() => alert("TODO: Réserver")}>
                  Réserver
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>Clique sur une station pour voir ses informations</div>
      )}
    </div>
  );
};

export default StationsMap;
