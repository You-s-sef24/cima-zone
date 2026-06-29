"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    return (
        <div>

        </div>
    );
}