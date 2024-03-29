import React, { useCallback } from "react";
import { Button } from "flowbite-react";

import { useSocket } from "@hooks/auctions";
import { useAuth } from "@hooks/auth";
import { isUser } from "@typing/api/auth/users";
import type { Auction } from "@typing/api/gears/auctions";

type Props = {
  auction: Auction;
};

const AuctionsEdit: React.FC<Props> = ({ auction }) => {
  const { user } = useAuth();
  const { clickEvent } = useSocket();

  const handleClick = useCallback(() => {
    clickEvent();
  }, [clickEvent]);

  return (
    <div className="grid grid-cols-8 gap-4 w-full">
      <div className="col-span-6">
        <div className="flex justify-start">
          <p>Crée le {new Date(auction.createdAt).toLocaleDateString("fr-FR")}</p>
        </div>
        <div className="grid grid-cols-3 gap-9 w-full">
          <div className="col-span-3 border-lime-800 border-lime-100">
            <div className="flex w-full justify-between mb-8">
              <p className="mb-4 text-4xl font-extrabold text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{auction.vehicle.type.name}</span>
              </p>
              <p className="mb-4 text-4xl font-extrabold text-gray-900">#{auction.vehicle.id.substring(30)}</p>
            </div>

            <div className="w-full flex justify-center ">
              <div className=" p-7 bg-white rounded-full shadow-lg border">
                <img src={auction.vehicle.type.name + ".png"} className="w-20 h-20" />
              </div>
            </div>

            <div className="w-full flex justify-start">
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside text-left">
                <li>Année de création : {auction.vehicle.year}</li>
                <li>Mise en disposition : {new Date(auction.vehicle.createdAt).getFullYear()} </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="shadow-lg border rounded-lg p-5">
          <div className="w-full flex items-center justify-center">
            <h2 className="text-4xl font-extrabold">Prix actuel : {auction.basePrice + auction.clicks.length}</h2>
            <img src="/cap.png" alt="cap" className="w-10 h-10 ml-2" />
          </div>
          <div className="flex items-center justify-center my-3">
            <h2 className="text-4xl font-extrabold">Prix de base : {auction.basePrice}</h2>
            <img src="/cap.png" alt="cap" className="w-10 h-10 ml-2" />
          </div>
          {isUser(user) && (
            <Button
              onClick={handleClick}
              type="button"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-2 w-full"
            >
              À MOI !
              <img src="/a-moi.png" alt="a moi" className="w-8 h-8 ml-2" />
            </Button>
          )}
          <div className="flex items-center justify-center mt-3">
            <p className="text-md">Coût du clic : {auction.clickPrice}</p>
            <img src="/cap.png" alt="cap" className="w-6 h-6 ml-2" />
          </div>
          <div className="mt-5">
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside text-left">
              {auction.clicks.slice(0, 5).map((click) => (
                <React.Fragment key={click.id}>
                  {click.userId === user.id ? (
                    <li className="bg-green-200 rounded-md">
                      Vous avez cliqué le {new Date(click.timestamp).toLocaleDateString("fr-FR")} à{" "}
                      {new Date(click.timestamp).toLocaleTimeString("fr-FR")}
                    </li>
                  ) : (
                    <li>
                      #{click.userId.substring(30)} a cliqué le {new Date(click.timestamp).toLocaleDateString("fr-FR")} à{" "}
                      {new Date(click.timestamp).toLocaleTimeString("fr-FR")}
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionsEdit;
