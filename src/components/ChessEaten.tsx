import { ChessFigure } from "./ChessFigure";

export interface ChessEatenProps {
    figures: ChessFigure[];
}

export default function ChessEaten({ figures }: ChessEatenProps) {
    return (
        <div className="flex flex-col">
            Pojedeno:
            {figures.map((figure, i) => (
                <div className="flex justify-center items-center w-16 h-16 text-black" key={i}>
                    {figure?.getFigureName()}
                </div>
            ))}
        </div>
    );
}
