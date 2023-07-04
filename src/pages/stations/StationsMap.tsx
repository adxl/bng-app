import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle, HiStar } from "react-icons/hi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { Accordion, Alert, Badge, Button, Card, Label, Modal, Select, Textarea } from "flowbite-react";
import Lottie from "lottie-react";
import { QRCodeCanvas } from "qrcode.react";

import { getSelfEventsWinner } from "@api/events/events-winner";
import { createReport } from "@api/gears/reports";
import { createRide, endRide, getEndRideUri, getSelfCurrentRide, reviewRide } from "@api/gears/rides";
import { getAllStations } from "@api/gears/stations";
import { getAllSkins } from "@api/gears/vehicles-skins";
import { useAuth } from "@hooks/auth";
import type { Ride } from "@typing/api/gears/rides";
import type { Station } from "@typing/api/gears/stations";
import type { Vehicle } from "@typing/api/gears/vehicles";
import type { VehicleSkin } from "@typing/api/gears/vehicles-skins";

import JetpackData from "../../../public/28991-jetpack-man-gsb.json";
import { getAllExamsUser } from "../../api/exams/exams";

import "leaflet/dist/leaflet.css";

const StationsMap: React.FC = () => {
  const { user } = useAuth();

  const [_stations, setStations] = useState<Station[]>([]);
  const [_skins, setSkins] = useState<VehicleSkin[]>([]);
  const [_ride, setRide] = useState<Ride | null>(null);

  const [_selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [_selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [_selectedSkin, setSelectedSkin] = useState<VehicleSkin | null>(_skins[0]);

  const [_userCaps, setUserCaps] = useState<number>(0);

  const [_review, setReview] = useState<number | null>(null);
  const [_hover, setHover] = useState<number | null>(null);
  const _comment = useRef<HTMLTextAreaElement>(null);

  const [_openModal, setOpenModal] = useState<boolean>();

  const [_allowedVehiclesTypes, setAllowedVehiclesTypes] = useState<string[]>([]);

  const [_error, setError] = useState<string>("");
  const [_success, setSuccess] = useState<string>("");

  useEffect(() => {
    updateRide();

    Promise.all([getAllExamsUser(), getAllStations(), getAllSkins()]).then(([{ data: exams }, { data: stationsData }, { data: skins }]) => {
      const allowedVehiclesTypes = exams.filter((exam) => exam.attempts).map((exam) => exam.typeId);
      const stations = stationsData
        .filter((s) => s.active)
        .map((s) => ({
          ...s,
          vehicles: s.vehicles.filter((v) => v.active && allowedVehiclesTypes.includes(v.type.id)),
        }));

      setAllowedVehiclesTypes(allowedVehiclesTypes);
      setStations(stations);
      setSkins(skins);
    });
    getAllSkins().then(({ data }) => setSkins(data));
    getSelfEventsWinner(user.id!).then(({ data }) => {
      setUserCaps(data.caps);
    });
  }, [user]);

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
    if (vehicle.type.capsMilestone > _userCaps) {
      return setError("Tu n'as pas encore débloqué ce véhicule");
    }

    if (!_allowedVehiclesTypes.includes(vehicle.type.id)) {
      setError("Vous n'avez pas le droit d'utiliser ce véhicule");
      return;
    }
    setSelectedVehicle(vehicle);
    setOpenModal(true);
  };

  const handleSelectSkin = (id: string) => {
    const skin = _skins.find((skin) => skin.id === id);

    if (!skin) return setError("Skin invalide");

    setSelectedSkin(skin);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createRide({ vehicle: _selectedVehicle!, userId: user.id!, skin: _selectedSkin! })
      .then(() => {
        setOpenModal(false);
        setSuccess("Réservation effectuée !");
        updateRide();
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleEndRideSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    endRide(_ride!.id, { endStation: _selectedStation! })
      .then(() => {
        setOpenModal(false);
        updateRide();

        if (!_review) {
          setSuccess("Course terminée !");
          return;
        }

        reviewRide(_ride!.id, { review: _review, comment: _comment.current ? _comment.current.value : undefined })
          .then(() => {
            setSuccess("Course terminée !");
            if (_review === 1) {
              createReport({ ride: _ride! });
            }
          })
          .catch(() => setError("Une erreur est survenue"));
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const updateRide = () => {
    getSelfCurrentRide().then(({ data }) => setRide(data));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative w-full">
      {_success && (
        <Alert color="success" className="mb-5 absolute top-6 left-1/2 -translate-x-1/2 z-20" icon={HiInformationCircle}>
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
              <h2 className="mb-6">
                Véhicules disponibles dans <strong>{_selectedStation.name}</strong>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {_selectedStation.vehicles
                  .sort((v1, v2) => (v1.type.capsMilestone < v2.type.capsMilestone ? -1 : 1))
                  .map((vehicle) => {
                    const isUnlocked = vehicle.type.capsMilestone <= _userCaps;

                    return (
                      <Card key={vehicle.id}>
                        <div>
                          <h4 className="font-medium">{vehicle.type.name}</h4>
                          <small> Fabriqué en {vehicle.year}</small>
                        </div>

                        {isUnlocked ? (
                          <Badge color="green">Débloqué</Badge>
                        ) : (
                          <Badge color="red">
                            <div className="flex mr-5">Non disponible</div>
                          </Badge>
                        )}
                        {isUnlocked ? (
                          <Button color="dark" onClick={() => handleSelectVehicle(vehicle)}>
                            Réserver
                          </Button>
                        ) : (
                          <Button color="dark" disabled>
                            <img src="/cap.png" alt="cap" className="w-6 h-6 mr-2" />
                            {vehicle.type.capsMilestone} capsules requises
                          </Button>
                        )}
                      </Card>
                    );
                  })}
              </div>
              <div className="bg-red-200 rounded p-5 mt-5">
                <p>Tu cherches un véhicule en particulier ?</p>
                <p>
                  Assure-toi d&apos;avoir le&nbsp;
                  <Link className="underline text-blue-500" to="/licenses">
                    permis adéquat
                  </Link>
                  &nbsp;pour piloter ce dernier
                </p>
              </div>
              <Modal show={_openModal} onClose={() => setOpenModal(false)} className="z-10">
                <Modal.Header>
                  Réservation du véhicule
                  <b>
                    {_selectedVehicle?.type.name} #{_selectedVehicle?.id.substring(30)}
                  </b>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleReservationSubmit} className="flex flex-col w-full gap-4">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-4">
                        <div className="text-start mb-2 block">
                          <Label value="Skin du véhicule" />
                        </div>
                        <Select required onChange={(e) => handleSelectSkin(e.currentTarget.value)}>
                          <option>---</option>
                          {_skins.map((skin) => {
                            const isUnlocked = _userCaps >= skin.tier * 50;
                            return (
                              <option
                                disabled={!isUnlocked}
                                className="flex justify-center align-center"
                                key={skin.id}
                                value={isUnlocked ? skin.id : ""}
                              >
                                {!isUnlocked && "🔒 "}
                                {`${skin.name} ${!isUnlocked ? `(${skin.tier * 50} capsules)` : ""}  `}
                              </option>
                            );
                          })}
                        </Select>
                      </div>
                      <img src={_selectedSkin?.image} className="col-span-2 border rounded-md h-28 w-full" style={{ objectFit: "cover" }} />
                    </div>
                    {_error && (
                      <Alert color="failure" className="mb-5 absolute top-6 left-1/2 -translate-x-1/2" icon={HiInformationCircle}>
                        <p>{_error}</p>
                      </Alert>
                    )}
                    <Button type="submit" color="dark" className="max-w-max self-end">
                      Réserver
                    </Button>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          ) : (
            <div>Clique sur une station pour voir ses informations</div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center col-span-2 max-h-md">
          <Card className="mb-5">
            <Lottie animationData={JetpackData} className="w-52 self-center" />
            <h5 className="text-lg">Vous êtes déjà sur une course ! Veuillez d&apos;abord terminer celle-ci !</h5>
          </Card>
          <Button color="dark" onClick={() => setOpenModal(true)}>
            Finir la course
          </Button>

          <Modal show={_openModal} onClose={() => setOpenModal(false)} className="z-10">
            <Modal.Header>Finir la course</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleEndRideSubmit} className="flex flex-col w-full gap-4">
                <div className="text-start mb-2 block">
                  <Label value="Station d'arrivée" />
                </div>
                <Select required onChange={(e) => handleSelectStation(e.currentTarget.value)} className="mb-2">
                  <option>---</option>
                  {_stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </Select>

                {_ride.id && _selectedStation && (
                  <div className="w-full flex flex-col justify-center items-center mb-10">
                    <div className="mb-5">
                      <h4>Scanne ce QR-Code qui vient de s&apos;afficher sur le tableau de bord de ton véhicule</h4>
                      <p>Afin de mettre fin à ta course</p>
                    </div>
                    <div>
                      <QRCodeCanvas value={getEndRideUri(_ride.id, _selectedStation.id)} />
                    </div>
                  </div>
                )}

                <Accordion className="w-full mb-2">
                  <Accordion.Panel>
                    <Accordion.Title> Laisser un avis</Accordion.Title>
                    <Accordion.Content>
                      <div className="flex justify-center w-full">
                        <div className="flex flex-col max-w-md w-1/2 gap-4 w-full">
                          <div>
                            <div className="text-start mb-2 block">
                              <Label value="Note" />
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, index) => {
                                const currentRating = index + 1;
                                return (
                                  <label key={currentRating}>
                                    <input
                                      className="hidden"
                                      type="radio"
                                      name="rating"
                                      value={currentRating}
                                      onClick={() => setReview(currentRating)}
                                    />
                                    <HiStar
                                      className="star"
                                      size={32}
                                      color={currentRating <= (_hover! || _review!) ? "#ffc107" : "#e4e5e9"}
                                      onMouseEnter={() => setHover(currentRating)}
                                      onMouseLeave={() => setHover(null)}
                                    />
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <div className="text-start mb-2 block">
                              <Label value="Commentaire" />
                            </div>
                            <Textarea ref={_comment} placeholder="Un petit commentaire ?" />
                          </div>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
                <Button type="submit" color="dark" className="max-w-max self-end">
                  Finir la course
                </Button>
                {_error && (
                  <Alert color="failure" className="mb-5 absolute top-6 left-1/2 -translate-x-1/2" icon={HiInformationCircle}>
                    <p>{_error}</p>
                  </Alert>
                )}
              </form>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default StationsMap;
