export function ChessPositionX() {
    const names = ["a", "b", "c", "d", "e", "f", "g", "h"];

    return (
        <div className="flex flex-row items-center">
            {names.map((name) => (
                <div
                    className="flex justify-center items-center w-16 h-4 text-black"
                    key={`${name}-xpos`}>
                    {name}
                </div>
            ))}
        </div>
    );
}

export function ChessPositionY() {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

    return (
        <div className="flex flex-col">
            {numbers.map((number) => (
                <div
                    className="flex justify-center items-center w-4 h-16 text-black"
                    key={`${number}-ypos`}>
                    {number}
                </div>
            ))}
        </div>
    );
}
