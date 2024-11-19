import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ListItem, DeletedListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: DeletedListItem[];
  expandedCards: number[];
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  addDeletedCard: (card: DeletedListItem) => void;
  removeDeletedCard: (id: number) => void;
  setDeletedCards: (cards: DeletedListItem[]) => void;
  toggleCardExpansion: (id: number) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      // Initial state
      visibleCards: [],
      deletedCards: [],
      expandedCards: [],

      // Actions
      setVisibleCards: (cards) => {
        set((state) => {
          state.visibleCards = cards;
        });
      },

      addDeletedCard: (card) => {
        set((state) => {
          state.deletedCards.push(card);
        });
      },

      removeDeletedCard: (id) => {
        set((state) => {
          state.deletedCards = state.deletedCards.filter(
            (card) => card.id !== id
          );
        });
      },

      setDeletedCards: (cards) => {
        set((state) => {
          state.deletedCards = cards;
        });
      },

      toggleCardExpansion: (id) => {
        set((state) => {
          const isExpanded = state.expandedCards.includes(id);
          if (isExpanded) {
            state.expandedCards = state.expandedCards.filter(
              (cardId) => cardId !== id
            );
          } else {
            state.expandedCards.push(id);
          }
        });
      },
    })),
    {
      name: "cardState", // Key for localStorage
    }
  )
);
