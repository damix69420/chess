import { ChessColor, ChessFigure } from "./ChessFigure";

export interface ChessSquareProps {
    position: [number, number];
    figure?: ChessFigure;
    selected: boolean;
    possibleMoves: [number, number][];
    onClick: () => void;
}

export default function ChessSquare({
    position,
    figure,
    selected,
    possibleMoves,
    onClick,
}: ChessSquareProps) {
    return (
        <div
            className={`flex justify-center items-center w-16 h-16 ${
                position[0] % 2 === position[1] % 2
                    ? "bg-blue-500"
                    : "bg-blue-300"
            } ${
                figure?.color === ChessColor.WHITE ? "text-white" : "text-black"
            } ${selected && "bg-orange-900"}`}
            onClick={onClick}>
            {figure && figure.getFigureName()}
        </div>
    );
}
