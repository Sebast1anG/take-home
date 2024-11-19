import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { ToggleButton } from "./ToggleButton";
import { useStore } from "../store";

export const Entrypoint = () => {
  const {
    visibleCards,
    setVisibleCards,
    deletedCards,
    addDeletedCard,
    setDeletedCards,
  } = useStore();

  const listQuery = useGetListData();
  const [showDeletedCards, setShowDeletedCards] = useState(false);

  useEffect(() => {
    if (!listQuery.isLoading && listQuery.data) {
      // Inicjalizacja widocznych kart na podstawie danych z API
      setVisibleCards(listQuery.data.filter((item) => item.isVisible) ?? []);
    }
  }, [listQuery.isLoading, listQuery.data, setVisibleCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const handleDelete = (id: number) => {
    const card = visibleCards.find((card) => card.id === id);
    if (card) {
      addDeletedCard({
        id: card.id,
        title: card.title,
        description: card.description,
        isVisible: card.isVisible,
      });
      setVisibleCards(visibleCards.filter((card) => card.id !== id));
    }
  };

  const handleRevert = (id: number) => {
    const card = deletedCards.find((card) => card.id === id);
    if (card) {
      setDeletedCards(deletedCards.filter((c) => c.id !== id));
      setVisibleCards([...visibleCards, card]);
    }
  };

  const handleRefresh = () => {
    listQuery.refetch();
  };

  return (
    <div className="flex gap-x-16">
      {/* Visible Cards Section */}
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              description={card.description}
              onDelete={() => handleDelete(card.id)}
              id={card.id}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <div className="flex gap-x-2">
            <ToggleButton
              label={showDeletedCards ? "Hide" : "Reveal"}
              onClick={() => setShowDeletedCards((prev) => !prev)}
              disabled={!deletedCards.length}
              isActive={showDeletedCards}
            />
            <ToggleButton
              label="Refresh"
              onClick={handleRefresh}
              disabled={listQuery.isFetching}
            />
          </div>
        </div>
        {showDeletedCards && (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card, index) => (
              <div key={`deleted-${card.id}-${index}`}>
                <Card
                  title={card.title}
                  description=""
                  id={card.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
