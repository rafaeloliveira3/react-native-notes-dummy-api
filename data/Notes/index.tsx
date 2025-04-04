import { CreateNotesRequest } from "@/model/create-notes.request";
import { GetNotesResponse } from "@/model/get-notes.response";
import { EditNotesRequest } from "@/model/edit-notes.request";
import { RequestStatus } from "@/model/request-status";
import { api } from "@/service/axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { Alert } from "react-native";

interface NotesProviderProps {
  children: ReactNode;
}

interface NotesContextProps {
  createNotesRequestStatus: RequestStatus;
  getNotes: () => void;
  getNotesResponseStatus: RequestStatus;
  createNotes: (newNote: CreateNotesRequest) => void;
  editNotesRequestStatus: RequestStatus;
  editNotes: (newData: EditNotesRequest, id: number) => void;
  deleteNotesRequestStatus: RequestStatus;
  deleteNotes: (id: number) => void;
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

  const [editNotesRequestStatus, setEditNotesRequestStatus] =
    useState<RequestStatus>({
      status: "idle",
    });

  const [deleteNotesRequestStatus, setDeleteNotesRequestStatus] =
    useState<RequestStatus>({
      status: "idle",
    });

  const getNotes = async () => {
    setGetNotesResponseStatus({ status: "pending" });

    try {
      const { data } = await api.get("/posts");
      setGetNotesResponseStatus({ status: "succeeded" });
      setNotes(data);
    } catch {
      setGetNotesResponseStatus({ status: "failed" });
    } finally {
      setGetNotesResponseStatus({ status: "idle" });
    }
  };

  const createNotes = async (newNote: CreateNotesRequest) => {
    setCreateNotesRequestStatus({ status: "pending" });

    try {
      await api.post("/posts", newNote);
      Alert.alert("Sucesso", "Nota criada com sucesso!");
      setCreateNotesRequestStatus({ status: "succeeded" });
    } catch {
      Alert.alert("Erro", "Erro ao criar a nota!");
      setCreateNotesRequestStatus({ status: "failed" });
    } finally {
      setCreateNotesRequestStatus({ status: "idle" });
    }
  };

  const editNotes = async (newData: EditNotesRequest, id: number) => {
    setEditNotesRequestStatus({ status: "pending" });

    try {
      await api.patch(`/posts/${id}`, newData);
      Alert.alert("Sucesso", "Nota editada com sucesso!");
      setEditNotesRequestStatus({ status: "succeeded" });
    } catch {
      Alert.alert("Erro", "Erro ao editar a nota!");
      setEditNotesRequestStatus({ status: "failed" });
    } finally {
      setEditNotesRequestStatus({ status: "idle" });
    }
  };

  const deleteNotes = async (id: number | undefined) => {
    if (id) {
      setDeleteNotesRequestStatus({ status: "pending" });

      try {
        await api.delete(`/posts/${id}`);
        Alert.alert("Sucesso", `Nota deletada com sucesso! ID ${id}`);
        setDeleteNotesRequestStatus({ status: "succeeded" });
      } catch {
        Alert.alert("Erro", "Erro ao editar a nota!");
        setDeleteNotesRequestStatus({ status: "failed" });
      } finally {
        setDeleteNotesRequestStatus({ status: "idle" });
      }
    }
  };

  return (
    <NotesContext.Provider
      value={{
        getNotes,
        getNotesResponseStatus,
        createNotes,
        createNotesRequestStatus,
        editNotes,
        editNotesRequestStatus,
        deleteNotes,
        deleteNotesRequestStatus,
        notes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
