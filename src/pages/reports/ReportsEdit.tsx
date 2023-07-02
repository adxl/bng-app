import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Label, Select } from "flowbite-react";

import { getOneReport, updateReport } from "@api/gears/reports";
import { ReportStatusList } from "@typing/api/gears/reports";

const ReportsEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [_error, setError] = useState<string>("");
  const [_status, setStatus] = useState<string>("");
  useEffect(() => {
    getOneReport(id!).then(({ data }) => {
      setStatus(data.status);
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

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-5">
        <Link to="/admin/reports">
          <Button gradientDuoTone="greenToBlue">Retour</Button>
        </Link>
      </div>
      <Card className="self-center">
        {_error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <p>{_error}</p>
          </Alert>
        )}
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
    </div>
  );
};

export default ReportsEdit;
