"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function GenrePage() {
    const { id } = useParams();
    const [genre, setGenre] = useState({});

    return (
        <div>

        </div>
    );
}