import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Alert, Button, Card, Label, Modal, Select } from "flowbite-react";
import Lottie from "lottie-react";

import { createRide, getSelfCurrentRide } from "@api/gears/rides";
import { getAllStations } from "@api/gears/stations";
import { getAllSkins } from "@api/gears/vehicles-skins";
import { useAuth } from "@hooks/auth";
import type { Ride } from "@typing/api/gears/rides";
import type { Station } from "@typing/api/gears/stations";
import type { Vehicle } from "@typing/api/gears/vehicles";
import type { VehicleSkin } from "@typing/api/gears/vehicles-skins";

import JetpackData from "../../../public/28991-jetpack-man-gsb.json";

import "leaflet/dist/leaflet.css";

const StationsMap: React.FC = () => {
  const { user } = useAuth();

  const [_stations, setStations] = useState<Station[]>([]);
  const [_skins, setSkins] = useState<VehicleSkin[]>([]);
  const [_ride, setRide] = useState<Ride | null>(null);

  const [_selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [_selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [_selectedSkin, setSelectedSkin] = useState<VehicleSkin | null>(_skins[0]);

  const [_openModal, setOpenModal] = useState<boolean>();

  const [_error, setError] = useState<string>("");
  const [_success, setSuccess] = useState<string>("");

  useEffect(() => {
    updateRide();
    getAllStations().then(({ data }) => setStations(data));
    getAllSkins().then((response) => setSkins(response.data));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  }, [_error, _success]);

  const handleSelectStation = (id: string) => {
    const station = _stations.find((station) => station.id === id);
    setSelectedStation(station as Station);
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenModal(true);
  };

  const handleSelectSkin = (id: string) => {
    const skin = _skins.find((ride) => ride.id === id);

    if (!skin) return setError("Skin invalide");

    setSelectedSkin(skin);
  };

  const handleReservationSubmit = () => {
    createRide({ vehicle: _selectedVehicle!, userId: user.id!, skin: _selectedSkin! })
      .then(() => {
        setOpenModal(false);
        setSuccess("Réservation effectuée !");
        updateRide();
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  function updateRide() {
    getSelfCurrentRide(user.id!)
      .then((response) => setRide(response.data))
      .catch(() => setRide(null));
  }

  return (
    <div className="grid grid-cols-2 gap-4 relative w-full">
      {_success && (
        <Alert color="success" className="mb-5 absolute top-0 left-1/2" icon={HiInformationCircle}>
          <p>{_success}</p>
        </Alert>
      )}
      {!_ride ? (
        <>
          <div id="map" className="w-full">
            <MapContainer center={[48.865, 2.335]} zoom={12} scrollWheelZoom={false} className="z-0">
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
                    <Button color="dark" onClick={() => handleSelectVehicle(vehicle)}>
                      Réserver
                    </Button>
                  </Card>
                ))}
              </div>
              <Modal show={_openModal} onClose={() => setOpenModal(false)} className="z-10">
                <Modal.Header>
                  Réservation du véhicule{" "}
                  <b>
                    {_selectedVehicle?.type.name} #{_selectedVehicle?.id.substring(30)}
                  </b>
                </Modal.Header>
                <Modal.Body>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4">
                      <div className="text-start mb-2 block">
                        <Label value="Skin du véhicule" />
                      </div>
                      <Select required onChange={(e) => handleSelectSkin(e.currentTarget.value)}>
                        {_skins.map((skin) => (
                          <option key={skin.id} value={skin.id}>
                            {skin.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <img src={_selectedSkin?.image} className="col-span-2 border rounded-md" />
                  </div>
                  {_error && (
                    <Alert color="failure" className="mb-5 absolute top-6 left-1/2 -translate-x-1/2" icon={HiInformationCircle}>
                      <p>{_error}</p>
                    </Alert>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Annuler
                  </Button>
                  <Button color="dark" onClick={handleReservationSubmit}>
                    Réserver
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            <div>Clique sur une station pour voir ses informations</div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center col-span-2 max-h-md">
          <Card>
            <Lottie animationData={JetpackData} className="w-52 self-center" />
            <h5 className="text-lg">Vous êtes déjà sur une course ! Veuillez d&apos;abord terminer celle-ci !</h5>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StationsMap;
