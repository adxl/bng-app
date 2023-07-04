import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle, HiOutlineExclamationCircle, HiPencilSquare } from "react-icons/hi2";
import { RiAuctionLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Alert, Badge, Button, Card, Label, Modal, TextInput } from "flowbite-react";

import { getActive } from "@api/gears/auction";
import { getAllVehicles } from "@api/gears/vehicles";
import { useAuth } from "@hooks/auth";
import { isTechnician } from "@typing/api/auth/users";
import type { Auction } from "@typing/api/gears/auctions";
import type { Vehicle } from "@typing/api/gears/vehicles";

import { createAuction } from "../../api/gears/auction";

const VehiclesList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [_vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [_openModal, setOpenModal] = useState<boolean>();
  const [_vehiculeToAuction, setVehiculeToAuction] = useState<Vehicle>();
  const _auctionBasePrice = useRef<HTMLInputElement>(null);
  const _auctionClickPrice = useRef<HTMLInputElement>(null);
  const [_currentAuction, setCurrentAuction] = useState<Auction | null>(null);
  const [_error, setError] = useState<string>("");

  useEffect(() => {
    getAllVehicles().then(({ data }) => setVehicles(data));
    refreshAuction();
  }, []);

  function handleOpenModal(vehicle: Vehicle) {
    setVehiculeToAuction(vehicle);
    setOpenModal(true);
  }

  const handleCreateAuction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!_auctionBasePrice) return;
    if (!_auctionClickPrice) return;
    if (!_vehiculeToAuction) return;
    const data = {
      vehicle: _vehiculeToAuction!,
      basePrice: Number(_auctionBasePrice.current!.value),
      clickPrice: Number(_auctionClickPrice.current!.value),
    };

    createAuction(data)
      .then(() => {
        refreshAuction();
        // navigate("/admin/auction");
      })
      .catch(() => setError("Une erreur est survenue lors de la création de l'enchère"));
  };

  const refreshAuction = (): void => {
    getActive().then(({ data }) => {
      setCurrentAuction(data);
    });
  };

  return (
    <>
      {_error && (
        <Alert color="failure" className="mb-5" icon={HiInformationCircle}>
          <p>{_error}</p>
        </Alert>
      )}
      {isTechnician(user) && (
        <div className="flex justify-end my-4">
          <Link to="create">
            <Button gradientDuoTone="greenToBlue">Ajouter un véhicule</Button>
          </Link>
        </div>
      )}
      <div className="w-full grid gris-col-1 md:grid-cols-3 gap-4">
        {_vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <Card>
              <div className="flex flex-col items-start">
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex align-center">
                    <p className="whitespace-nowrap">#{vehicle.id.substring(30)}</p>
                    {vehicle.active ? (
                      <Badge color="green" className="mr-3">
                        Opérationnel
                      </Badge>
                    ) : (
                      <Badge color="red" className="whitespace-nowrap mr-3">
                        En panne
                      </Badge>
                    )}
                  </div>
                  <div className="w-full flex justify-end">
                    {isTechnician(user) && (
                      <Link to={`edit/${vehicle.id}`}>
                        <Button gradientDuoTone="greenToBlue">
                          <HiPencilSquare />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Année de fabrication:</strong>
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Type:</strong>
                  <span>{vehicle.type.name}</span>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-2">
                    <strong>Station actuelle:</strong>
                    <span>{vehicle?.station?.name || "-"}</span>
                  </div>           
                  <div className="flex justify-end">
                    {isTechnician(user) && !_currentAuction && (
                      <Button gradientDuoTone="pinkToOrange" onClick={() => handleOpenModal(vehicle)}>
                        <RiAuctionLine />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Type :</strong>
                  <span>{vehicle.type.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Station actuelle :</strong>
                  <span>{vehicle?.station?.name || "En cours d'utilisation"}</span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {!_currentAuction && (
        <Modal show={_openModal} size="md" popup onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Êtes vous sûre de vouloir mettre{" "}
                <span className="font-bold">
                  {_vehiculeToAuction?.type.name} #{_vehiculeToAuction?.id.substring(30)}
                </span>{" "}
                en enchères ?
              </h3>
              <div className="flex gap-3 text-red-700">
                <p>En mettant ce véhicule en enchères, vous ne pourrez plus le modifier. Il sera disponible pour les enchères et ne sera plus</p>
              </div>
              <form onSubmit={handleCreateAuction} className="mt-4 text-center">
                <Label>Avant de confirmer, veuillez remplir ces champs</Label>
                <br />
                <br />
                <Label>Prix de départ</Label>
                <TextInput type="number" required min="1" ref={_auctionBasePrice}></TextInput>
                <Label>Prix au click</Label>
                <TextInput type="number" required min="1" ref={_auctionClickPrice}></TextInput>
                <div className="flex justify-center gap-4 mt-4">
                  <Button color="failure" onClick={() => setOpenModal(undefined)}>
                    Annuler
                  </Button>
                  <Button type="submit" color="gray">
                    Confirmer
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {isTechnician(user) && _vehicles.length > 9 && (
        <div className="flex justify-end my-4">
          <Link to="create">
            <Button gradientDuoTone="greenToBlue">Ajouter un véhicule</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default VehiclesList;
