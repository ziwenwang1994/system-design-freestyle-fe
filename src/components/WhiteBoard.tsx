// WhiteBoard.tsx
import React, { useState } from "react";
import styles from "./WhiteBoard.module.scss";
import { ButtonArea } from "./ButtonArea";
import { CanvasArea } from "./CanvasArea";

type ButtonProps = {
    text: string;
    callback(e: React.MouseEvent<HTMLButtonElement>): void;
}

export const WhiteBoard: React.FC = () => {
    const [elements, setElements] = useState<number[]>([]);
    const removeElement = (id: number) => {
        setElements(prev => prev.filter(elementId => elementId !== id));
    };
    let nextId = 0;

    const addButton: ButtonProps = {
        text: "Add Resizable Element",
        callback: () => {
            setElements(prev => [...prev, nextId++]);
        }
    };

    const [buttons] = useState<ButtonProps[]>([addButton]);

    return <main className={styles.whiteBoard}>
        <h1>Whiteboard Freestyle - in progress</h1>
        <ButtonArea buttons={buttons} />
        <CanvasArea elements={elements} removeElement={removeElement} />
    </main>
}
