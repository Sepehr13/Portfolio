"use client";

import Image from "next/image";
import clsx from "clsx";
import { useState, useSyncExternalStore } from "react";
import AppIcon from "./AppIcon";

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 5) + 1;
}

const subscribeToMount = () => () => {};

export default function WorkBGGen(props: { iconUrl: string, className?: string }) {
  const [num] = useState(() => generateRandomNumber());
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);

  if (!mounted) {
    return null; // Render nothing on the server or until mounted
  }

  return (
    <div className={clsx("relative w-full h-full sm:shadow-xl", props.className)}>
      <Image
        src={`/work-bgs/${num}.jpg`}
        width={200}
        height={80}
        alt="Work Background"
        className={clsx(
          "absolute -top-full left-0 w-full object-center"
        )}
      />
      <div className="flex w-full h-full justify-center items-center">
        <AppIcon theme="light">
          <Image src={props.iconUrl} width={70} height={70} alt="Work Icon" />
        </AppIcon>
      </div>
    </div>
  );
}