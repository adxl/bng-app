import type { ReactElement, ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { type Socket, io } from "socket.io-client";

import { useAuth } from "./auth";

type SocketContextType = {
  _token: string | null;
  _socket: Socket | null;
  _isLoaded: boolean;
  clickEvent: () => void;
};

const defaultSocketContext = {
  _token: "",
  _socket: null,
  _isLoaded: false,
  clickEvent: () => void 0,
};
const SocketContext = createContext<SocketContextType>(defaultSocketContext);
export const useSocket = (): SocketContextType => useContext(SocketContext);

interface IProps {
  room: string;
  onReload: (_?: any) => void;
  children: ReactNode;
}

export function SocketProvider({ room, onReload, children }: IProps): ReactElement {
  const { _token, refreshUser } = useAuth();

  const [_socket, setSocket] = useState<Socket | null>(null);
  const [_isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const socketURL = import.meta.env.VITE_WS_URL + "/auctions";
    const socket = io(socketURL, { auth: { token: _token }, reconnection: false, transports: ["websocket"] });

    socket.on("joinedRoom", () => {
      setIsLoaded(true);
    });

    socket.on("leftRoom", () => {
      console.log("left");
    });

    socket.emit("joinRoom", { room });
    setSocket(socket);
  }, []);

  useEffect(() => {
    _socket?.on("updateData", () => {
      onReload(() => {
        refreshUser();
        setIsLoaded(true);
      });
    });
    _socket?.on("auctionEnd", () => {
      onReload(() => {
        refreshUser();
        setIsLoaded(true);
      });
    });
  }, [_socket]);

  const clickEvent = () => {
    const message = {
      room,
      token: _token,
    };

    _socket?.emit("click", message);
  };

  const value = {
    _token: _token,
    _socket: _socket,
    _isLoaded: _isLoaded,
    clickEvent,
  };

  return <SocketContext.Provider value={value}>{!_isLoaded ? <Spinner className="my-5" /> : children}</SocketContext.Provider>;
}
