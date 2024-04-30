// TextAreaWithRemove.tsx
import React, { useState } from 'react';
import styles from './TextAreaWithRemove.module.scss';

interface TextAreaWithRemoveProps {
    value: string;
    id: number;
    disabled: boolean;
    onChange: (id: number, value: string) => void;
    onFocus: (id: number) => void;
    onBlur: (id: number) => void;
    onRemove: (id: number) => void;
}

const TextAreaWithRemove: React.FC<TextAreaWithRemoveProps> = ({
    value,
    id,
    disabled,
    onChange,
    onFocus,
    onBlur,
    onRemove
}) => {
    const [showEditor, setShowEditor] = useState<boolean>(true);
    return (
        <div className={showEditor ? styles.textareaContainer : `${styles.textareaContainer} ${styles.hiddenEditor}`} style={{
            border: showEditor ? '' : 'none',
            background: showEditor ? '' : 'none'
        }}>
            <textarea
                key={`textarea_${id}`}
                value={value}
                disabled={disabled}
                onFocus={() => { onFocus(id); setShowEditor(true); }}
                onBlur={() => { onBlur(id); setShowEditor(false); }}
                onChange={(e) => onChange(id, e.target.value)}
                style={{ width: '100%', minHeight: '50px', boxSizing: "border-box", background: showEditor ? '' : 'none' }}
            />
            <button onClick={() => onRemove(id)} className={styles.removeButton}>×</button>
        </div >
    );
};

export default TextAreaWithRemove;
