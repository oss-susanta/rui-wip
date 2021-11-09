import React from "react";
import Trustmark from "./Trustmark";

const styles = {
  ring: [
    "animate-spin",
    "absolute w-full h-full",
    "rounded-full",
    "border-solid border-8 border-r-transparent border-[#38d200]",
  ].join(" "),
};

export default function Loading({ text }) {
  return (
    <div className="w-full h-full grid place-items-center">
      <figure className="flex flex-col gap-4 items-center">
        <div className="relative w-24 h-24 grid place-items-center">
          <Trustmark />
          <i className={styles.ring} />
        </div>
        <figcaption hidden={text == null}>{text}</figcaption>
      </figure>
    </div>
  );
}
