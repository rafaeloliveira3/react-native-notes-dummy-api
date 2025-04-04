import { FC, useEffect, useState } from "react";
import { StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { NoteCard, BaseModal } from "@/presentation/atomic/organisms";
import { PrivateScreenTemplate } from "../PrivateScreenTemplate";
import { useNotes } from "@/data";
import { GetNotesResponse } from "@/model/get-notes.response";
import { CreateNoteForm, EditNoteForm } from "@/presentation/atomic/molecules";
import { Colors } from "@/themes/Colors";

import { useColorScheme } from "@/hooks/useColorScheme";

export const CardsListTemplate: FC = () => {
  const colorScheme = useColorScheme();

  const { getNotes, notes, getNotesResponseStatus, deleteNotes } = useNotes();
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [displayedData, setDisplayedData] = useState<GetNotesResponse[]>([]);
  const [selectedNote, setSelectedNote] = useState<GetNotesResponse | null>(
    null
  );

  const [showAddNotesModal, setShowAddNotesModal] = useState(false);
  const [showEditNotesModal, setShowEditNotesModal] = useState(false);

  const loadMoreData = () => {
    if (loading || allDataLoaded) return;
    if (displayedData?.length === notes.length) {
      setAllDataLoaded(true);
      return;
    }

    setLoading(true);

    const nextPage = currentPage + 1;
    const min = currentPage * pageSize;
    const max = nextPage * pageSize;
    const newData = notes.slice(min, max);
    setDisplayedData([...displayedData, ...newData]);

    setCurrentPage(currentPage + 1);
    setLoading(false);
  };

  const handleDelete = (item: GetNotesResponse) => {
    Alert.alert("Excluir Nota", "Deseja excluir essa nota?", [
      {
        text: "Sim",
        onPress: () => deleteNotes(item.id),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    const initialValue = notes.slice(0, pageSize);
    setDisplayedData(initialValue);
    setCurrentPage(1);
  }, [notes]);

  return (
    <PrivateScreenTemplate
      openCreateNotesModalFunction={() => setShowAddNotesModal(true)}
    >
      <BaseModal
        visible={showAddNotesModal}
        onRequestClose={() => setShowAddNotesModal(false)}
      >
        <CreateNoteForm
          closeModalFunction={() => setShowAddNotesModal(false)}
        />
      </BaseModal>
      <BaseModal
        visible={showEditNotesModal}
        onRequestClose={() => setShowEditNotesModal(false)}
      >
        <EditNoteForm
          closeModalFunction={() => setShowEditNotesModal(false)}
          noteId={selectedNote?.id}
          noteContent={selectedNote?.body}
          noteTitle={selectedNote?.title}
        />
      </BaseModal>
      {getNotesResponseStatus.status === "pending" ? (
        <ActivityIndicator size="large" color={Colors.primary.tint} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={displayedData}
          onEndReached={loadMoreData}
          contentContainerStyle={{ rowGap: 8 }}
          onEndReachedThreshold={0.4}
          style={styles.cardsContainer}
          renderItem={({ item }) => (
            <NoteCard
              openModalFunction={() => setShowEditNotesModal(true)}
              selectCurrentNote={() => setSelectedNote(item)}
              handleDeleteFunction={() => handleDelete(item)}
              title={item.title}
              description={item.body}
            />
          )}
        />
      )}
    </PrivateScreenTemplate>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 12,
  },
});
