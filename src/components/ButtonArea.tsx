import React from "react";
import styles from "./ButtonArea.module.scss";

type ButtonProps = {
    text: string;
    callback(e: React.MouseEvent<HTMLButtonElement>): void;
};

type ButtonAreaProps = {
    buttons: ButtonProps[];
};

export const ButtonArea: React.FC<ButtonAreaProps> = ({ buttons }) => {
    return (
        <nav className={styles.menu}>
            {buttons.map((button, index) => (
                <button key={index} onClick={button.callback} className={styles.menuButton}>
                    {button.text}
                </button>
            ))}
        </nav>
    );
};
