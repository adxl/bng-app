import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Label, Select } from "flowbite-react";

import { getOneReport, updateReport } from "@api/gears/reports";
import { ReportStatusList } from "@typing/api/gears/reports";

import { updateVehicle } from "../../api/gears/vehicles";
import type { Vehicle } from "../../typing/api/gears/vehicles";

const ReportsEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [_error, setError] = useState<string>("");
  const [_status, setStatus] = useState<string>("");
  const [_vehicle, setVehicle] = useState<Vehicle>();

  useEffect(() => {
    getOneReport(id!).then(({ data }) => {
      if (data.status === "Terminé") navigate("/admin/reports");

      if (!data.ride.vehicle) navigate("/admin/reports");

      setStatus(data.status);
      setVehicle(data.ride.vehicle);
    });
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStatus = ReportStatusList.find((status) => status === _status);

    if (!newStatus) return setError("Statut invalide");

    updateReport(id!, { status: newStatus })
      .then(() => {
        navigate("/admin/reports");
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleDisable = () => {
    updateVehicle(_vehicle!.id, { active: false })
      .then(() => {
        setVehicle({ ..._vehicle!, active: false });
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  const handleEnable = () => {
    updateVehicle(_vehicle!.id, { active: true })
      .then(() => {
        setVehicle({ ..._vehicle!, active: true });
      })
      .catch(() => setError("Une erreur est survenue"));
  };

  return (
    <div className="w-full">
      {_vehicle && (
        <>
          {_vehicle.active ? (
            <div className="flex flex-col w-full">
              <div className="flex justify-between mb-5">
                <Link to="/admin/reports">
                  <Button gradientDuoTone="greenToBlue">Retour</Button>
                </Link>
              </div>
              {_error && (
                <Alert color="failure" icon={HiInformationCircle}>
                  <p>{_error}</p>
                </Alert>
              )}
              <Card className="self-center">
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="flex justify-start mb-2 block">
                      <Label value="Changer le statut" />
                    </div>
                    <Select className="w-full" value={_status} onChange={(e) => setStatus(e.target.value)}>
                      {ReportStatusList.map((status) => (
                        <option value={status} key={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <Button gradientDuoTone="greenToBlue" type="submit">
                    Enregistrer
                  </Button>
                </form>
              </Card>
              <div className="flex justify-center mt-5 w-full">
                <Button
                  onClick={handleDisable}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center mr-2 mb-2"
                >
                  Désactiver l&lsquo;appareil {_vehicle.type.name} #{_vehicle.id.substring(30)}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-5">
                <Link to="/admin/reports">
                  <Button gradientDuoTone="greenToBlue">Retour</Button>
                </Link>
              </div>
              <div className="flex justify-center mt-5 w-full">
                <Button
                  onClick={handleEnable}
                  type="button"
                  className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center mr-2 mb-2"
                >
                  Réactiver l&lsquo;appareil {_vehicle.type.name} #{_vehicle.id.substring(30)}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportsEdit;
