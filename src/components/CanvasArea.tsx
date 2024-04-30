// CanvasArea.tsx
import React from 'react';
import { ResizableElement } from './ResizableElement';
import styles from './CanvasArea.module.scss';

type CanvasAreaProps = {
    elements: number[];
    removeElement: (id: number) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({ elements, removeElement }) => {
    return (
        <article className={styles.canvasArea}>
            {elements.map(id => (
                <ResizableElement key={id} id={id} removeElement={removeElement} />
            ))}
        </article>
    );
}
