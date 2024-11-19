type ToggleButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
};

export const ToggleButton = ({
    label,
    onClick,
    disabled = false,
    isActive = false,
}: ToggleButtonProps) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`text-white text-sm transition-colors rounded px-3 py-1 ${isActive ? "bg-gray-800 hover:bg-gray-700" : "bg-black hover:bg-gray-800"
                } disabled:bg-black/75`}
        >
            {label}
        </button>
    );
};
