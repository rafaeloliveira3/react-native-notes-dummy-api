import { useEffect, useState } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { NoteCard } from "@/presentation/atomic/organisms";
import { PrivateScreenTemplate } from "@/presentation/atomic/templates";
import { useNotes } from "@/data";
import { GetNotesResponse } from "@/model/get-notes.response";
import { Theme } from "@/themes/Colors";

export default function CardsList() {
  const { fetchNotes, notes, getNotesResponseStatus } = useNotes();
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [displayedData, setDisplayedData] = useState<GetNotesResponse[]>([]);

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

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const initialValue = notes.slice(0, pageSize);
    setDisplayedData(initialValue);
    setCurrentPage(1);
  }, [notes]);

  return (
    <PrivateScreenTemplate>
      {getNotesResponseStatus.status === "pending" ? (
        <ActivityIndicator size="large" color={Theme.default} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={displayedData}
          onEndReached={loadMoreData}
          contentContainerStyle={{ rowGap: 8 }}
          onEndReachedThreshold={0.3}
          style={styles.cardsContainer}
          renderItem={({ item }) => (
            <NoteCard title={item.title} description={item.body} />
          )}
        />
      )}
    </PrivateScreenTemplate>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 12,
  },
});
