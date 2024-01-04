"use client";
import {
  EventUserItem,
  EventsItem,
  EventsListModel,
  EventsModel,
} from "api/models/Hive/events";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
} from "react";

export interface EventsContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  currentEvent: EventsItem | undefined;
  setCurrentEvent: any;
  eventList: EventsListModel[];
  setEventList: any;
  eventOwner: EventUserItem | undefined;
  setEventOwner: any;
  eventResp: EventsModel | undefined;
  setEventResp: any;
  eventAttendeesList: EventUserItem[];
  setEventAttendeesList: any;
  fromDate: Date | null;
  setFromDate: any;
  toDate: Date | null;
  setToDate: any;
}

const EventsContext = createContext<EventsContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  currentEvent: undefined,
  setCurrentEvent: (): EventsItem | undefined => undefined,
  eventList: [],
  setEventList: (): EventsListModel[] => [],
  eventOwner: undefined,
  setEventOwner: (): any => undefined,
  eventResp: undefined,
  setEventResp: (): any => undefined,
  eventAttendeesList: [],
  setEventAttendeesList: (): any => [],
  fromDate: null,
  setFromDate: (): any => null,
  toDate: null,
  setToDate: (): any => null,
});

export const EventsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [currentEvent, setCurrentEvent] = useState<EventsItem | undefined>(
    undefined
  );
  const [eventList, setEventList] = useState<EventsListModel[]>([]);
  const [eventOwner, setEventOwner] = useState<EventUserItem | undefined>(
    undefined
  );
  const [eventResp, setEventResp] = useState<EventsModel | undefined>(
    undefined
  );
  const [eventAttendeesList, setEventAttendeesList] = useState<EventUserItem[]>(
    []
  );

  return (
    <EventsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        currentEvent,
        setCurrentEvent,
        eventList,
        setEventList,
        eventOwner,
        setEventOwner,
        eventResp,
        setEventResp,
        eventAttendeesList,
        setEventAttendeesList,
        toDate,
        setToDate,
        fromDate,
        setFromDate,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => useContext(EventsContext);
