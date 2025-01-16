import { MouseEventHandler } from "react";
import "./style.css";

export default function Button({
    label,
    onClick
} : {
    label: String,
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    // TODO: migrate css to classnames
    // TODO: add a parameter for extra class names
    return <button className="rounded-full" onClick={onClick}>{label}</button>
}