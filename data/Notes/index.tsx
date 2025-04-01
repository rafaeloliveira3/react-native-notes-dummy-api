import { CreateNotesRequest } from "@/model/create-notes.request";
import { GetNotesResponse } from "@/model/get-notes.response";
import { RequestStatus } from "@/model/request-status";
import { api } from "@/service/axios";
import { ReactNode, createContext, useContext, useState } from "react";

interface NotesProviderProps {
  children: ReactNode;
}

interface NotesContextProps {
  getNotesResponseStatus: RequestStatus;
  createNotes: (newNote: CreateNotesRequest) => void;
  createNotesRequestStatus: RequestStatus;
  fetchNotes: () => void;
  notes: GetNotesResponse[];
}

const NotesContext = createContext<NotesContextProps>({} as NotesContextProps);

export const useNotes = () => {
  return useContext(NotesContext);
};

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<GetNotesResponse[]>([]);
  const [getNotesResponseStatus, setGetNotesResponseStatus] =
    useState<RequestStatus>({
      status: "idle",
    });

  const [createNotesRequestStatus, setCreateNotesRequestStatus] =
    useState<RequestStatus>({
      status: "idle",
    });

  const fetchNotes = async () => {
    setGetNotesResponseStatus({ status: "pending" });

    try {
      const { data } = await api.get("/posts");
      setGetNotesResponseStatus({ status: "succeeded" });
      setNotes(data);
    } catch {
      console.log("Erro ao buscar");
      setGetNotesResponseStatus({ status: "failed" });
    }
  };

  const createNotes = async (newNote: CreateNotesRequest) => {
    setCreateNotesRequestStatus({ status: "pending" });

    try {
      await api.post("/posts", newNote);
      setCreateNotesRequestStatus({ status: "succeeded" });
    } catch {
      console.log("Erro ao criar nota");
      setCreateNotesRequestStatus({ status: "failed" });
    }
  };

  return (
    <NotesContext.Provider
      value={{
        fetchNotes,
        getNotesResponseStatus,
        createNotes,
        createNotesRequestStatus,
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
