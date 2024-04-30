import React, { useState, useRef, useCallback, useMemo } from 'react';
import styles from './ResizableElement.module.scss';
import TextAreaWithRemove from './TextAreaWithRemove';  // Ensure the correct import path

interface ResizableElementProps {
    id: number;
    removeElement: (id: number) => void;
}

export const ResizableElement: React.FC<ResizableElementProps> = ({ id, removeElement }) => {
    const [size, setSize] = useState<{ width: number; height: number }>({ width: 300, height: 200 });
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [content, setContent] = useState<Array<{ id: number; type: 'title' | 'textarea'; value: string; disabled: boolean }>>([]);
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const nextId = useRef(0);

    const handleResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = ref.current?.offsetWidth ?? 0;
        const startHeight = ref.current?.offsetHeight ?? 0;

        function resize(moveEvent: MouseEvent) {
            setSize({
                width: startWidth + (moveEvent.clientX - startX),
                height: startHeight + (moveEvent.clientY - startY),
            });
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        }

        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    }, []);

    const handleDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startElementX = position.x;
        const startElementY = position.y;

        function drag(moveEvent: MouseEvent) {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            setPosition({
                x: startElementX + deltaX,
                y: startElementY + deltaY
            });
        }

        function stopDrag() {
            window.removeEventListener('mousemove', drag);
            window.removeEventListener('mouseup', stopDrag);
        }

        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', stopDrag);
    }, [position]);

    const handleTitleInputSubmit = useCallback(() => {
        if (titleInputValue.trim() !== '') {
            setContent(prev => [
                ...prev,
                { id: nextId.current++, type: 'title', value: titleInputValue, disabled: false }
            ]);
            setTitleInputValue('');  // Clear the input after submitting
            setShowTitleInput(false);  // Hide the input field
        }
    }, [titleInputValue]);

    const handleInputChange = useCallback((id: number, value: string) => {
        setContent(prev => prev.map(item => item.id === id ? { ...item, value } : item));
    }, []);

    const removeContent = useCallback((id: number) => {
        setContent(prev => prev.filter(item => item.id !== id));
    }, []);

    const articleStyle = useMemo(() => ({
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate(${position.x}px, ${position.y}px)`
    }), [size, position]);

    return (
        <article ref={ref} className={styles.resizableArticle} style={articleStyle} tabIndex={0}
            onFocus={() => setIsFocused(true)} onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsFocused(false);
                }
            }}>
            <div className={styles.contentArea}>
                {content.map((item) => (
                    item.type === 'textarea' ? (
                        <TextAreaWithRemove
                            key={item.id}
                            id={item.id}
                            value={item.value}
                            disabled={item.disabled}
                            onChange={handleInputChange}
                            onFocus={() => { }}
                            onBlur={() => { }}
                            onRemove={removeContent}
                        />
                    ) : (
                        <h2 key={item.id}>{item.value}</h2>
                    )
                ))}
            </div>
            <div className={styles.controls}>
                {showTitleInput ? (
                    <>
                        <input
                            type="text"
                            value={titleInputValue}
                            onChange={(e) => setTitleInputValue(e.target.value)}
                            placeholder="Enter title text"
                        />
                        <button onClick={handleTitleInputSubmit}>Submit Title</button>
                    </>
                ) : (
                    <>
                        {isFocused && <div><button onClick={() => setShowTitleInput(true)}>Add Title</button>
                            <button onClick={() => setContent(prev => [...prev, { id: nextId.current++, type: 'textarea', value: '', disabled: false }])}>Add Textarea</button></div>}
                    </>
                )}
            </div>
            {isFocused && (
                <>
                    <button className={styles.removeButton} onClick={() => removeElement(id)}>X</button>
                    <div className={styles.dragHandle} onMouseDown={handleDrag}>Drag</div>
                </>
            )}
            <div className={styles.resizeHandle} onMouseDown={handleResize} />
        </article>
    );
};
