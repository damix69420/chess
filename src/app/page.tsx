"use client";

import ChessBoard from "@/components/ChessBoard";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen w-screen justify-center items-center">
            <ChessBoard />
        </main>
    );
}
