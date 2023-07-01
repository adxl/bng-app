import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import CountUp from "react-countup";
import { FaPaintBrush } from "react-icons/fa";
import { LuPlaneLanding, LuPlaneTakeoff } from "react-icons/lu";
import { Link } from "react-router-dom";
import { ArcElement, Legend, Tooltip } from "chart.js";
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Title } from "chart.js";
import { Button, Card, Carousel, Timeline } from "flowbite-react";

import { getAllUsers } from "@api/auth/user";
import { getAllEvents } from "@api/events/events";
import { getAllEnded } from "@api/exams/attempts";
import { getSelfRides } from "@api/gears/rides";
import { getAllStations } from "@api/gears/stations";
import { getAllVehicles } from "@api/gears/vehicles";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useAuth } from "@hooks/auth";
import type { User } from "@typing/api/auth/users";
import {
  ADMINISTRATOR,
  INSTRUCTOR,
  isAdmin,
  isInstructor,
  isOrganizer,
  isTechnician,
  isUser,
  ORGANIZER,
  TECHNICIAN,
  USER,
} from "@typing/api/auth/users";
import type { Event } from "@typing/api/events/events";
import type { Attempt } from "@typing/api/exams/attempts";
import type { Ride } from "@typing/api/gears/rides";
import type { Station } from "@typing/api/gears/stations";
import type { Vehicle } from "@typing/api/gears/vehicles";

interface ChartSkeleton {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
  }[];
  redraw: boolean;
}

interface ChartSkeletonLine {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
  redraw: boolean;
}
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type AttemptMonthStat = {
  month: string;
  count: number;
};

const Home: React.FC = () => {
  const { user } = useAuth();

  const [_rides, setRides] = useState<Ride[]>([]);
  const [_events, setEvents] = useState<Event[]>([]);
  const [_preferedTypes, setPreferedTypes] = useState<[string, number][]>([]);

  const [_vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [_stations, setStations] = useState<Station[]>([]);
  const [_users, setUsers] = useState<User[]>([]);
  const [_eventsDashboard, setEventsDashboard] = useState<Event[]>([]);
  const [_attempts, setAttempts] = useState<Attempt[]>([]);

  const [_chartVehicle, setChartVehicle] = useState<ChartSkeleton>({ labels: [], datasets: [], redraw: false });
  const [_chartStation, setChartStation] = useState<ChartSkeleton>({ labels: [], datasets: [], redraw: false });
  const [_chartUser, setChartUser] = useState<ChartSkeleton>({ labels: [], datasets: [], redraw: false });
  const [_chartEvent, setChartEvent] = useState<ChartSkeleton>({ labels: [], datasets: [], redraw: false });
  const [_chartAttempt, setChartAttempt] = useState<ChartSkeleton>({ labels: [], datasets: [], redraw: false });
  const [_chartAttemptsLine, setChartAttemptsLine] = useState<ChartSkeletonLine>({ labels: [], datasets: [], redraw: false });

  useEffect(() => {
    if (isUser(user)) {
      getSelfRides().then((response) => {
        setRides(response.data.filter((ride) => ride.userId === user.id));

        setPreferedTypes(
          Object.entries(
            response.data.reduce((acc: Record<string, number>, ride) => {
              acc[ride.vehicle.type.name] = (acc[ride.vehicle.type.name] || 0) + 1;
              return acc;
            }, {})
          ).sort((a, b) => b[1] - a[1])
        );
      });

      getAllEvents().then(({ data }) => {
        setEvents(data);
      });
    }
  }, []);

  const getStationData = () => {
    getAllStations().then((response) => {
      setStations(response.data);
    });
  };

  const getVehicleData = () => {
    getAllVehicles().then((response) => {
      setVehicles(response.data);
    });
  };

  const getUsersData = () => {
    getAllUsers().then((response) => {
      setUsers(response.data);
    });
  };

  const getEventsData = () => {
    getAllEvents().then((response) => {
      setEventsDashboard(response.data);
    });
  };

  const getAttemptsData = () => {
    getAllEnded().then((response) => {
      setAttempts(response.data);
    });
  };

  const labels = ["janvier", "févirer", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "décembre"];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Nombre d'examens par mois",
      },
    },
  };

  const chartVehicleOptions = React.useCallback(() => {
    const brokenVehicles = _vehicles.filter((vehicle) => !vehicle.active).length;
    const activeVehicles = _vehicles.filter((vehicle) => vehicle.active).length;

    setChartVehicle({
      labels: ["En panne", "En service"],
      datasets: [
        {
          label: "Véhicules",
          data: [brokenVehicles, activeVehicles],
          backgroundColor: ["rgb(249 115 22)", "rgb(6 182 212)"],
          hoverOffset: 4,
        },
      ],
      redraw: true,
    });
  }, [_vehicles]);

  const chartUserOptions = React.useCallback(() => {
    const AdminUsers = _users.filter((user) => user.role === ADMINISTRATOR).length;
    const UserUsers = _users.filter((user) => user.role === USER).length;
    const TechnicianUsers = _users.filter((user) => user.role === TECHNICIAN).length;
    const OrganizerUsers = _users.filter((user) => user.role === ORGANIZER).length;
    const InstructorUsers = _users.filter((user) => user.role === INSTRUCTOR).length;
    setChartUser({
      labels: ["Admin", "Utilisateur", "Technicien", "Organisateur", "Instructeur"],
      datasets: [
        {
          label: "Utilisateurs",
          data: [AdminUsers, UserUsers, TechnicianUsers, OrganizerUsers, InstructorUsers],
          backgroundColor: ["rgb(249 115 22)", "rgb(6 182 212)", "rgb(99 102 241)", "rgb(236 72 153)", "#2C2C54"],
          hoverOffset: 4,
        },
      ],
      redraw: true,
    });
  }, [_users.length]);

  const chartEventOptions = React.useCallback(() => {
    const eventsFuture = _eventsDashboard.filter((event) => !event.endedAt).length;
    const eventsPast = _eventsDashboard.filter((event) => event.endedAt).length;

    setChartEvent({
      labels: ["A venir", "Passé"],
      datasets: [
        {
          label: "Evènements",
          data: [eventsFuture, eventsPast],
          backgroundColor: ["rgb(249 115 22)", "rgb(6 182 212)"],
          hoverOffset: 4,
        },
      ],
      redraw: true,
    });
  }, [_eventsDashboard]);

  const chartStationOptions = React.useCallback(() => {
    const brokenStations = _stations.filter((station) => station.active === false).length;
    const activeStations = _stations.filter((station) => station.active === true).length;
    setChartStation({
      labels: ["Fermé", "Ouverte"],
      datasets: [
        {
          label: "Stations",
          data: [brokenStations, activeStations],
          backgroundColor: ["rgb(249 115 22)", "rgb(6 182 212)"],
          hoverOffset: 4,
        },
      ],
      redraw: true,
    });
  }, [_stations]);

  const chartAttemptOptions = React.useCallback(() => {
    const successAttempts = _attempts.filter((attempt) => attempt.score >= 80).length;
    const failedAttempts = _attempts.filter((attempt) => attempt.score < 80).length;
    setChartAttempt({
      labels: ["Echoué", "Reussi"],
      datasets: [
        {
          label: "Examens",
          data: [failedAttempts, successAttempts],
          backgroundColor: ["rgb(249 115 22)", "rgb(6 182 212)"],
          hoverOffset: 4,
        },
      ],
      redraw: true,
    });
  }, [_attempts]);

  const calculateAttemptsByMonthSucces = React.useCallback(() => {
    const filteredAttempts = _attempts.filter((attempt) => attempt.score >= 80);

    return filteredAttempts.reduce((countByMonth: AttemptMonthStat[], attempt) => {
      const month = new Date(attempt.createdAt).toLocaleString("default", { month: "long" });
      const monthIndex = countByMonth.findIndex((item) => item.month === month);

      if (monthIndex !== -1) {
        countByMonth[monthIndex].count += 1;
      } else {
        countByMonth.push({ month, count: 1 });
      }

      return countByMonth;
    }, []);
  }, [_attempts]);

  const calculateAttemptsByMonthFailes = React.useCallback(() => {
    const filteredAttempts = _attempts.filter((attempt) => attempt.score < 80);

    return filteredAttempts.reduce((countByMonth: AttemptMonthStat[], attempt) => {
      const month = new Date(attempt.createdAt).toLocaleString("default", { month: "long" });
      const monthIndex = countByMonth.findIndex((item) => item.month === month);

      if (monthIndex !== -1) {
        countByMonth[monthIndex].count += 1;
      } else {
        countByMonth.push({ month: month, count: 1 });
      }

      return countByMonth;
    }, []);
  }, [_attempts]);

  const chartAttemptLineOptions = React.useCallback(() => {
    const attemptsByMonthSuccess = calculateAttemptsByMonthSucces();
    const attemptsByMonthFailed = calculateAttemptsByMonthFailes();

    const countsByMonthSucces = labels.map((label) => {
      const monthItem = attemptsByMonthSuccess.find((item) => item.month === label);
      return monthItem ? monthItem.count : 0;
    });

    const countsByMonthFailed = labels.map((label) => {
      const monthItem = attemptsByMonthFailed.find((item) => item.month === label);
      return monthItem ? monthItem.count : 0;
    });

    setChartAttemptsLine({
      labels,
      datasets: [
        {
          label: "Réussies",
          data: countsByMonthSucces,
          borderColor: "rgb(6 182 212)",
          backgroundColor: "rgb(6 182 212)",
        },
        {
          label: "Echouées",
          data: countsByMonthFailed,
          borderColor: "rgb(249 115 22)",
          backgroundColor: "rgb(249 115 22)",
        },
      ],
      redraw: true,
    });
  }, [_attempts]);

  useEffect(() => {
    if (isTechnician(user)) {
      getStationData();
      getVehicleData();
    }

    if (isOrganizer(user)) {
      getEventsData();
      getStationData();
    }

    if (isInstructor(user)) {
      getAttemptsData();
    }

    if (isAdmin(user)) {
      getUsersData();
      getStationData();
      getVehicleData();
      getEventsData();
      getAttemptsData();
    }
  }, []);

  useEffect(() => {
    chartUserOptions();
    chartVehicleOptions();
    chartStationOptions();
    chartEventOptions();
    chartAttemptOptions();
    chartAttemptLineOptions();
  }, [_users, _vehicles, _stations, _events, _attempts]);

  return (
    <React.Fragment>
      <Card className="w-full mb-5">
        <h5 className="text-2xl font-bold">Bienvenue sur Board N&apos; Go !</h5>
      </Card>
      {isUser(user) && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="row-span-2 hidden md:flex">
            <h5 className="text-xl font-medium">Évènements</h5>
            <div className="flex items-baseline">
              <span className="text-gray-600">A venir </span>
              <FaPaintBrush className="ml-1" color="#10B981" size={15}></FaPaintBrush>
              <span className="text-gray-600">- Terminé </span>
              <FaPaintBrush className="ml-1" color="#F59E0B" size={15}></FaPaintBrush>
            </div>
            <FullCalendar
              viewClassNames={"w-full"}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={_events.map((event) => ({
                title: event.name,
                date: event.startsAt,
                allDay: true,
                backgroundColor: event.endedAt ? "#10B981" : "#F59E0B",
                borderColor: event.endedAt ? "#10B981" : "#F59E0B",
              }))}
            />
          </Card>

          <Card>
            <h5 className="text-xl font-medium">Mes derniers trajets</h5>
            <div className="grid-cols-3 hidden md:grid">
              {_rides.length > 0 ? (
                _rides.slice(0, 3).map((ride) => (
                  <Timeline className="text-start" key={ride.id}>
                    <Timeline.Item>
                      <Timeline.Content>
                        <Timeline.Point icon={LuPlaneTakeoff} />
                        <Timeline.Time>
                          {new Date(ride.createdAt).toLocaleDateString("fr-FR")} à&nbsp;
                          {new Date(ride.createdAt).toLocaleTimeString("fr-FR")}
                        </Timeline.Time>
                        <Timeline.Title>De: {ride.startStation.name}</Timeline.Title>
                        <Timeline.Body>
                          <p className="text-gray-500 text-sm">{ride.vehicle.type.name}</p>
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Timeline.Content>
                        <Timeline.Point icon={LuPlaneLanding} />
                        <Timeline.Time>
                          {ride.endedAt ? (
                            <>
                              {new Date(ride.endedAt).toLocaleDateString("fr-FR")} à&nbsp;
                              {new Date(ride.endedAt).toLocaleTimeString("fr-FR")}
                            </>
                          ) : (
                            <>Course non terminée</>
                          )}
                        </Timeline.Time>
                        <Timeline.Title>À: {ride.endStation?.name}</Timeline.Title>
                        <Timeline.Body>
                          <p className="text-gray-500 text-sm">{ride.vehicle.type.name}</p>
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  </Timeline>
                ))
              ) : (
                <div className="flex flex-wrap justify-center col-span-3 ">
                  <img src="/ticket.png" className="h-20 mb-2" />
                  <p className="text-center w-full">Vous n&apos;avez aucun trajet...</p>
                </div>
              )}
            </div>
            <Carousel className="col-span-3 ml-2 md:hidden">
              {_rides.length > 0 ? (
                _rides.slice(0, 3).map((ride) => (
                  <Timeline className="text-start" key={ride.id}>
                    <Timeline.Item>
                      <Timeline.Content className="relative">
                        <Timeline.Point icon={LuPlaneTakeoff} />
                        <Timeline.Time>
                          {new Date(ride.createdAt).toLocaleDateString("fr-FR")} à&nbsp;
                          {new Date(ride.createdAt).toLocaleTimeString("fr-FR")}
                        </Timeline.Time>
                        <Timeline.Title>De: {ride.startStation.name}</Timeline.Title>
                        <Timeline.Body>
                          <p className="text-gray-500 text-sm">{ride.vehicle.type.name}</p>
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Timeline.Content className="relative">
                        <Timeline.Point icon={LuPlaneLanding} />
                        <Timeline.Time>
                          {ride.endedAt ? (
                            <>
                              {new Date(ride.endedAt).toLocaleDateString("fr-FR")} à&nbsp;
                              {new Date(ride.endedAt).toLocaleTimeString("fr-FR")}
                            </>
                          ) : (
                            <>Course non terminée</>
                          )}
                        </Timeline.Time>
                        <Timeline.Title>À: {ride.endStation?.name}</Timeline.Title>
                        <Timeline.Body>
                          <p className="text-gray-500 text-sm">{ride.vehicle.type.name}</p>
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  </Timeline>
                ))
              ) : (
                <div className="flex flex-wrap justify-center col-span-3 ">
                  <img src="/ticket.png" className="h-20 mb-2" />
                  <p className="text-center w-full">Vous n&apos;avez aucun trajet...</p>
                </div>
              )}
            </Carousel>
          </Card>
          <Card className="row-span-2 h-max">
            <h5 className="text-xl font-medium">Véhicules préférés</h5>
            <div className="grid grid-cols-3 gap-2">
              {_preferedTypes[1] && (
                <div className="flex flex-col justify-end">
                  <p>{_preferedTypes[1][0]}</p>
                  <div className="flex justify-center items-center bg-gray-500 h-28 rounded-lg">
                    <img src="/medaille-dargent.png" alt="Médaille d'argent" className="h-2/3" />
                  </div>
                </div>
              )}
              {_preferedTypes[0] && (
                <div className="flex flex-col justify-end">
                  <p>{_preferedTypes[0][0]}</p>
                  <div className="flex justify-center items-center bg-yellow-400 h-40 rounded-lg">
                    <img src="/medaille-dor.png" alt="Médaille d'or" className="h-2/3" />
                  </div>
                </div>
              )}
              {_preferedTypes[2] && (
                <div className="flex flex-col justify-end">
                  <p>{_preferedTypes[2][0]}</p>
                  <div className="flex justify-center items-center bg-yellow-800 h-20 rounded-lg">
                    <img src="/medaille-de-bronze.png" alt="Médaille de bronze" className="h-2/3" />
                  </div>
                </div>
              )}
            </div>
          </Card>
          <Button color="dark">
            <Link to="events">Voir tous les évènements</Link>
          </Button>
        </div>
      )}
      {!isUser(user) && (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          {isTechnician(user) && (
            <>
              <Card className="col-1">
                <h5 className="text-xl font-medium">Véhicules</h5>
                <Doughnut data={_chartVehicle} />
              </Card>
              <Card className="col-1">
                <h5 className="text-xl font-medium">Stations</h5>
                <Doughnut data={_chartStation} />
              </Card>
              <div className="grid-cols-2 gap-4">
                <Card className=" mb-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold">
                  <CountUp style={{ fontSize: "xx-large" }} end={_vehicles.length} duration={5} />
                  <h5 className="text-xl font-medium">Véhicules</h5>
                </Card>
                <Card className=" mb-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold">
                  <CountUp style={{ fontSize: "xx-large" }} end={_stations.length} duration={5} />
                  <h5 className="text-xl font-medium">Stations</h5>
                </Card>
              </div>
            </>
          )}
          {isAdmin(user) && (
            <>
              <Card className="col-1">
                <h5 className="text-xl font-medium">Véhicules</h5>
                <Doughnut data={_chartVehicle} />
              </Card>
              <Card className="col-1">
                <h5 className="text-xl font-medium">Stations</h5>
                <Doughnut data={_chartStation} />
              </Card>
              <Card className="col-span-1">
                <h5 className="text-xl font-medium">Evenements</h5>
                <Doughnut data={_chartEvent} />
              </Card>
              <Card className="col-1">
                <h5 className="text-xl font-medium">Examen</h5>
                <Doughnut data={_chartAttempt} />
              </Card>
              <Card className="col-span-1">
                <h5 className="text-xl font-medium">Utilisateurs</h5>
                <Doughnut data={_chartUser} />
              </Card>
              <div className="grid-cols-2 gap-4">
                <Card className=" mb-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold">
                  <CountUp style={{ fontSize: "xx-large" }} end={_vehicles.length} duration={5} />
                  <h5 className="text-xl font-medium">Véhicules</h5>
                </Card>
                <Card className=" mb-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold">
                  <CountUp style={{ fontSize: "xx-large" }} end={_stations.length} duration={5} />
                  <h5 className="text-xl font-medium">Stations</h5>
                </Card>
                <Card className=" mb-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold">
                  <CountUp style={{ fontSize: "xx-large" }} end={_eventsDashboard.length} duration={5} />
                  <h5 className="text-xl font-medium">Evenements</h5>
                </Card>
              </div>
              <Card className="col-span-2">
                <Line data={_chartAttemptsLine} options={options} />
              </Card>
            </>
          )}
          {isOrganizer(user) && (
            <>
              <Card className="col-1">
                <h5 className="text-xl font-medium">Stations</h5>
                <Doughnut data={_chartStation} />
              </Card>
              <Card className="col-span-1">
                <h5 className="text-xl font-medium">Evenements</h5>
                <Doughnut data={_chartEvent} />
              </Card>
              <div className="grid-cols-2 gap-4">
                <Card className=" mb-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold">
                  <CountUp style={{ fontSize: "xx-large" }} end={_eventsDashboard.length} duration={5} />
                  <h5 className="text-xl font-medium">Evenements</h5>
                </Card>
              </div>
            </>
          )}
          {isInstructor(user) && (
            <>
              <Card className="col-1">
                <h5 className="text-xl font-medium">Examen</h5>
                <Doughnut data={_chartAttempt} />
              </Card>
              <Card className="col-span-2">
                <Line data={_chartAttemptsLine} options={options} />
              </Card>
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
