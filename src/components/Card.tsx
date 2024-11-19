import { ExpandButton, DeleteButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  id: number;
  title: string;
  description: string;
  onDelete?: () => void;
};

export const Card = ({ id, title, description, onDelete }: CardProps) => {
  const { expandedCards, toggleCardExpansion } = useStore();
  const isExpanded = expandedCards.includes(id);

  const handleToggleExpand = () => toggleCardExpansion(id);

  return (
    <div className="border border-black px-2 py-1.5 transition-all duration-300">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {description && (
            <ExpandButton onClick={handleToggleExpand}>
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>
          )}
          {onDelete && <DeleteButton onClick={onDelete} />}
        </div>
      </div>
      {description && (
        <p
          className={`text-sm transition-all duration-300 ${isExpanded
            ? "max-h-full opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
