"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function PersonPage() {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    
    return (
        <div>

        </div>
    );
}