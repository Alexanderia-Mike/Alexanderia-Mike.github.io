import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from "react";
import "./style.css";
import clsx from "clsx";
import { ExtraClassNames, Hiddable } from "../common";

interface ToggleProps extends Hiddable, ExtraClassNames {
  onChange: ChangeEventHandler;
  label: string;
  render?: () => ReactNode;
  checked?: boolean;
  id?: string;
}

export default function Toggle({
  onChange,
  hide,
  label,
  checked,
  render,
  classNames,
  id,
}: ToggleProps) {
  const inputElmt = (
    <input
      type="checkbox"
      hidden
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
      }}
      checked={checked ?? false}
    />
  );
  return (
    <div
      id={id}
      className={clsx(
        "toggle mx-5 flex flex-grow flex-shrink-0 my-3",
        classNames,
        hide && "hidden",
      )}
    >
      <label className="slider">{inputElmt}</label>
      <span className="label whitespace-nowrap" id="slider-label">
        {render ? render() : label}
      </span>
    </div>
  );
}
