import { useEffect, useState } from "react";
import ChessSquare from "./ChessSquare";
import { ChessColor, ChessFigure, ChessFigureType } from "./ChessFigure";
import { ChessPositionX, ChessPositionY } from "./ChessPositions";
import ChessEaten from "./ChessEaten";

export default function ChessBoard() {
    const [figures, setFigures] = useState([
        new ChessFigure(ChessFigureType.ROOK, ChessColor.WHITE, [0, 0]),
        new ChessFigure(ChessFigureType.KNIGHT, ChessColor.WHITE, [1, 0]),
        new ChessFigure(ChessFigureType.BISHOP, ChessColor.WHITE, [2, 0]),
        new ChessFigure(ChessFigureType.QUEEN, ChessColor.WHITE, [3, 0]),
        new ChessFigure(ChessFigureType.KING, ChessColor.WHITE, [4, 0]),
        new ChessFigure(ChessFigureType.BISHOP, ChessColor.WHITE, [5, 0]),
        new ChessFigure(ChessFigureType.KNIGHT, ChessColor.WHITE, [6, 0]),
        new ChessFigure(ChessFigureType.ROOK, ChessColor.WHITE, [7, 0]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [0, 1]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [1, 1]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [2, 1]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [3, 1]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [4, 1]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [5, 1]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [6, 1]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.WHITE, [7, 1]),

        new ChessFigure(ChessFigureType.ROOK, ChessColor.BLACK, [0, 7]),
        new ChessFigure(ChessFigureType.KNIGHT, ChessColor.BLACK, [1, 7]),
        new ChessFigure(ChessFigureType.BISHOP, ChessColor.BLACK, [2, 7]),
        new ChessFigure(ChessFigureType.QUEEN, ChessColor.BLACK, [3, 7]),
        new ChessFigure(ChessFigureType.KING, ChessColor.BLACK, [4, 7]),
        new ChessFigure(ChessFigureType.BISHOP, ChessColor.BLACK, [5, 7]),
        new ChessFigure(ChessFigureType.KNIGHT, ChessColor.BLACK, [6, 7]),
        new ChessFigure(ChessFigureType.ROOK, ChessColor.BLACK, [7, 7]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [0, 6]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [1, 6]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [2, 6]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [3, 6]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [4, 6]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [5, 6]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [6, 6]),
        new ChessFigure(ChessFigureType.PAWN, ChessColor.BLACK, [7, 6]),
    ]);

    const [grid, setGrid] = useState<any[][]>(
        Array(8)
            .fill(null)
            .map(() => Array(8).fill(null))
    );

    useEffect(() => {
        const newGrid = Array(8)
            .fill(null)
            .map(() => Array(8).fill(null));

        for (const figure of figures) {
            const [x, y] = figure.position;
            newGrid[y][x] = figure;
        }

        setGrid(newGrid);
    }, [figures]);

    const [selectedFigure, setSelectedFigure] = useState<ChessFigure | null>(
        null
    );

    const [selectedSquare, setSelectedSquare] = useState<number[]>([]);
    const [possibleMoves, setPossibleMoves] = useState<[number, number][]>([]);
    const [turn, setTurn] = useState<ChessColor>(ChessColor.WHITE);
    const [eaten, setEaten] = useState<ChessFigure[]>([]);

    return (
        <div className="flex flex-row">
            <ChessPositionY />
            <div className="flex flex-col">
                <div className="flex flex-col">
                    {grid.map((row, y) => (
                        <div className="flex flex-row" key={y}>
                            {row.map((fig: ChessFigure, x) => (
                                <ChessSquare
                                    key={`${x}-${y}`}
                                    position={[x, y]}
                                    figure={fig}
                                    selected={
                                        selectedSquare[0] === x &&
                                        selectedSquare[1] === y
                                    }
                                    possibleMoves={possibleMoves}
                                    onClick={() => {
                                        if (fig && fig.color === turn) {
                                            if (fig === selectedFigure) {
                                                setSelectedFigure(null);
                                                setSelectedSquare([]);
                                                setPossibleMoves([]);
                                            }
                                            setSelectedFigure(fig);
                                            setSelectedSquare([x, y]);
                                        } else {
                                            if (selectedFigure) {
                                                if (
                                                    // selectedFigure
                                                    //     .getAvailableMoves()
                                                    //     .some(
                                                    //         ([x1, y1]) =>
                                                    //             x1 === x &&
                                                    //             y1 === y
                                                    //     )
                                                    true
                                                ) {
                                                    const newFigures =
                                                        figures.filter(
                                                            (fig) =>
                                                                fig !==
                                                                selectedFigure
                                                        );
                                                    newFigures.push(
                                                        new ChessFigure(
                                                            selectedFigure.type,
                                                            selectedFigure.color,
                                                            [x, y]
                                                        )
                                                    );
                                                    setFigures(newFigures);
                                                    setSelectedFigure(null);
                                                    setSelectedSquare([]);
                                                    setPossibleMoves([]);

                                                    if (fig)
                                                        setEaten([
                                                            ...eaten,
                                                            fig,
                                                        ]);

                                                    setTurn(
                                                        turn ===
                                                            ChessColor.WHITE
                                                            ? ChessColor.BLACK
                                                            : ChessColor.WHITE
                                                    );
                                                }
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <ChessPositionX />
            </div>
            <ChessEaten figures={eaten} />
        </div>
    );
}
