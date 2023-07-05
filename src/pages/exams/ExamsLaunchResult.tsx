import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Player } from "@lottiefiles/react-lottie-player";

type Props = {
  isSuccess: boolean;
  typeExam: string;
  score: number;
};

const ExamsLaunchResult: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { isSuccess, typeExam, score } = state as Props;

  if (!isSuccess || !typeExam || !score) navigate("/licenses");

  return (
    <>
      {isSuccess ? (
        <div className="md:flex w-full justify-center relative">
          <div className=" absolute">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Félicitation</span> <br />
            </h1>
            <h2 className="text-4xl font-bold dark:text-white leading-snug">
              Vous avez réussi votre examen <br />
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{typeExam}</span>
              <br />
              avec un score de
              <mark className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> {score}%</mark>
            </h2>
            <p className="mt-10 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Vous pouvez dès à présent réserver cette technologie lors de vos courses.
            </p>
            <Link to={"/licenses"} className="z-50 relative">
              <p className=" text-xl text-blue-600 dark:text-blue-500 mt-10">Retourner à la page des examens</p>
            </Link>
          </div>
          <div className=" absolute z-10 -top-28">
            <Player
              src="https://assets1.lottiefiles.com/packages/lf20_wys2rrr6.json"
              background="transparent"
              speed={1}
              loop={true}
              autoplay
              style={{ height: "100%", width: "100%" }}
            ></Player>
          </div>
        </div>
      ) : (
        <div className="md:flex w-full gap-16 justify-center relative">
          <div className="  top-80">
            <Player
              src="https://assets7.lottiefiles.com/packages/lf20_Dy6fnTXaf4.json"
              background="transparent"
              speed={1}
              style={{ height: "300px", width: "300px" }}
              loop
              autoplay
            ></Player>
          </div>
          <div className=" ">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 ">Oh dommage</span> <br />
            </h1>
            <h2 className="text-3xl font-bold dark:text-white leading-snug">
              Vous avez échoué à votre examen <br />
              <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{typeExam}</span>
              <br />
              avec un score de
              <span className="px-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 "> {score}%</span>
            </h2>
            <Link to={"/licenses"}>
              <p className=" text-xl text-blue-600 dark:text-blue-500 mt-10">Retourner à la page des examens</p>
            </Link>
          </div>
        </div>
      )}
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    </>
  );
};

export default ExamsLaunchResult;
