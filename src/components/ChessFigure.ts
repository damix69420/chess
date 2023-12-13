enum ChessFigureType {
    PAWN,
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING,
}

enum ChessColor {
    WHITE,
    BLACK,
}

type ChessPosition = [number, number];

class ChessFigure {
    type: ChessFigureType;
    color: ChessColor;
    position: ChessPosition;
    icon: string = "";

    isEaten: boolean = false;

    constructor(
        type: ChessFigureType,
        color: ChessColor,
        position: ChessPosition
    ) {
        this.type = type;
        this.color = color;
        this.position = position;

        this.icon = `${this.getFigureColor()}-${this.getFigureName()}.png`;
    }

    public getFigureName(): string {
        switch (this.type) {
            case ChessFigureType.PAWN:
                return "Pawn";
            case ChessFigureType.ROOK:
                return "Rook";
            case ChessFigureType.KNIGHT:
                return "Knight";
            case ChessFigureType.BISHOP:
                return "Bishop";
            case ChessFigureType.QUEEN:
                return "Queen";
            case ChessFigureType.KING:
                return "King";
        }
    }

    public getFigureColor(): string {
        switch (this.color) {
            case ChessColor.WHITE:
                return "white";
            case ChessColor.BLACK:
                return "black";
        }
    }

    public eat(): void {
        this.isEaten = true;
    }

    public move(position: ChessPosition): void {
        this.position = position;
    }

    // Returns the position of the figure in the chess notation
    public getPosition(): string {
        const [x, y] = this.position;
        const letter = String.fromCharCode(97 + x);
        return `${letter}${y + 1}`;
    }

    public setPosition(position: string): void {
        const letter = position[0].charCodeAt(0) - 97;
        const number = parseInt(position[1]) - 1;
        this.position = [letter, number];
    }

    public getMoves(): ChessPosition[] {
        switch (this.type) {
            case ChessFigureType.PAWN:
                return this.getPawnMoves();
            case ChessFigureType.ROOK:
                return this.getRookMoves();
            case ChessFigureType.KNIGHT:
                return this.getKnightMoves();
            case ChessFigureType.BISHOP:
                return this.getBishopMoves();
            case ChessFigureType.QUEEN:
                return this.getQueenMoves();
            case ChessFigureType.KING:
                return this.getKingMoves();
        }
    }

    private getPawnMoves(): ChessPosition[] {
        const [x, y] = this.position;
        const moves: ChessPosition[] = [];

        if (this.color === ChessColor.WHITE) {
            if (y === 1) {
                moves.push([x, y + 1]);
                moves.push([x, y + 2]);
            } else {
                moves.push([x, y + 1]);
            }
        } else {
            if (y === 6) {
                moves.push([x, y - 1]);
                moves.push([x, y - 2]);
            } else {
                moves.push([x, y - 1]);
            }
        }

        moves.filter((move) => this.isMoveAvailable(move));

        return moves;
    }

    private getRookMoves(): ChessPosition[] {
        const [x, y] = this.position;
        const moves: ChessPosition[] = [];

        for (let i = 0; i < 8; i++) {
            if (i !== x) {
                moves.push([i, y]);
            }
            if (i !== y) {
                moves.push([x, i]);
            }
        }

        moves.filter((move) => this.isMoveAvailable(move));

        return moves;
    }

    private getKnightMoves(): ChessPosition[] {
        const [x, y] = this.position;
        const moves: ChessPosition[] = [];

        moves.push([x + 1, y + 2]);
        moves.push([x + 2, y + 1]);
        moves.push([x + 2, y - 1]);
        moves.push([x + 1, y - 2]);
        moves.push([x - 1, y - 2]);
        moves.push([x - 2, y - 1]);
        moves.push([x - 2, y + 1]);
        moves.push([x - 1, y + 2]);

        moves.filter((move) => this.isMoveAvailable(move));

        return moves;
    }

    private getBishopMoves(): ChessPosition[] {
        const [x, y] = this.position;
        const moves: ChessPosition[] = [];

        for (let i = 0; i < 8; i++) {
            if (i !== x && i !== y) {
                moves.push([i, i]);
                moves.push([i, 7 - i]);
            }
        }

        moves.filter((move) => this.isMoveAvailable(move));

        return moves;
    }

    private getQueenMoves(): ChessPosition[] {
        const [x, y] = this.position;
        const moves: ChessPosition[] = [];

        for (let i = 0; i < 8; i++) {
            if (i !== x) {
                moves.push([i, y]);
            }
            if (i !== y) {
                moves.push([x, i]);
            }
            if (i !== x && i !== y) {
                moves.push([i, i]);
                moves.push([i, 7 - i]);
            }
        }

        moves.filter((move) => this.isMoveAvailable(move));

        return moves;
    }

    private getKingMoves(): ChessPosition[] {
        const [x, y] = this.position;
        const moves: ChessPosition[] = [];

        moves.push([x + 1, y + 1]);
        moves.push([x + 1, y]);
        moves.push([x + 1, y - 1]);
        moves.push([x, y - 1]);
        moves.push([x - 1, y - 1]);
        moves.push([x - 1, y]);
        moves.push([x - 1, y + 1]);
        moves.push([x, y + 1]);

        moves.filter((move) => this.isMoveAvailable(move));

        return moves;
    }

    public getAvailableMoves(): ChessPosition[] {
        const moves = this.getMoves();
        const availableMoves: ChessPosition[] = [];

        for (const move of moves) {
            if (this.isMoveAvailable(move)) {
                availableMoves.push(move);
            }
        }

        return availableMoves;
    }

    private isMoveAvailable(move: ChessPosition): boolean {
        const [x, y] = move;

        if (x < 0 || x > 7 || y < 0 || y > 7) {
            return false;
        }

        return true;
    }
}

export { ChessFigure, ChessFigureType, ChessColor };
export type { ChessPosition };
