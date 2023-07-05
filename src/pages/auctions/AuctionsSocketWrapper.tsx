import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

import { getActive } from "@api/gears/auction";
import { SocketProvider } from "@hooks/auctions";
import { useAuth } from "@hooks/auth";
import type { Auction } from "@typing/api/gears/auctions";

import AuctionsEdit from "./AuctionsEdit";

const AuctionsSocketWrapper: React.FC = () => {
  const { refreshUser } = useAuth();

  const [_auction, setAuction] = useState<Auction | null>(null);
  const [_finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    void reloadAuction(() => void 0);
  }, []);

  async function reloadAuction(cb: (_?: any) => void) {
    return new Promise(() => {
      getActive()
        .then(({ data }) => setAuction(data))
        .then(cb)
        .catch(() => {
          refreshUser();
          setFinished(true);
        });
    });
  }

  return (
    <>
      {_auction && !_finished ? (
        <SocketProvider room={_auction.id} onReload={reloadAuction}>
          <AuctionsEdit auction={_auction} />
        </SocketProvider>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Card horizontal imgSrc="/auction.png" className="w-max items-center">
            <h5 className="text-2xl font-bold">Enchère terminée !</h5>
          </Card>
        </div>
      )}
    </>
  );
};

export default AuctionsSocketWrapper;
