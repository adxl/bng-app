import type { Response } from "@typing/api/axios";
import type { Event } from "@typing/api/events/events";

import { _delete, _get, _patch, _post } from "../gateway";

import type { CreateEventDto, UpdateEventDto } from "./dto/events.dto";

const URL = import.meta.env.VITE_API_URL + "/events/events";

export const getAllEvents = (): Response<Event[]> => {
  return _get(URL);
};

export const getOneEvent = (id: string): Response<Event> => {
  return _get(URL + `/${id}`);
};

export const createEvent = (data: CreateEventDto): Response<any> => {
  return _post(URL, data);
};

export const updateEvent = (id: string, data: UpdateEventDto): Response<void> => {
  return _patch(URL + `/${id}`, data);
};

export const deleteEvent = (id: string): Response<void> => {
  return _delete(URL + `/${id}`);
};
