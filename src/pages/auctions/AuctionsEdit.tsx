import React from "react";
import { TbSkateboard } from "react-icons/tb";

const AuctionsEdit: React.FC = () => {
  return (
    <>
      <div className="flex justify-start">
        <p>Crée le 12/12/2020</p>
      </div>
      <div className="grid grid-cols-3 gap-9 w-full">
        <div className="col-span-2 border-lime-800 border-lime-100">
          <div className="flex justify-between mb-8">
            <p className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white ">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Chaussure à propulsion</span>
            </p>
            <p className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white ">#0293399</p>
          </div>

          <div className="w-full flex justify-center ">
            <div className=" p-7 bg-slate-500 rounded-full">
              <TbSkateboard className="text-9xl	" />
            </div>
          </div>

          <div className="w-full flex justify-start">
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left">
              <li>Année de création : </li>
              <li>Mise en disposition : </li>
              <li>Nombre d'utilisation : </li>
              <li>Dernière utilisation : </li>
              <li>Nombre de réparation : </li>
            </ul>
          </div>
        </div>
        <div className=" border-lime-400 border-l-4 ">
          <h2 className="text-4xl font-extrabold dark:text-white">Prix actuel : 100€</h2>
          <h2 className="text-4xl font-extrabold dark:text-white">Prix de base : 50€</h2>
          <p className="text-base font-extrabold dark:text-white">60 participations dont 3 participants </p>
          <button
            type="button"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900 w-4/5"
          >
            Click
          </button>
          <p>Prochain prix : 5€</p>
          <div>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left">
              <li>Nom Prenom a cliqué à 15:30:49</li>
              <li>Nom Prenom a cliqué à 15:30:49</li>
              <li>Nom Prenom a cliqué à 15:30:49</li>
              <li>Nom Prenom a cliqué à 15:30:49</li>
              <li>Nom Prenom a cliqué à 15:30:49</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionsEdit;
