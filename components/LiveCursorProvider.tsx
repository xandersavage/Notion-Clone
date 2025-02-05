"use client";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent, useEffect } from "react";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  // Get scroll container reference
  const getScrollContainer = () =>
    document.querySelector("#main-scroll-area") as HTMLElement;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const container = getScrollContainer();
    const x = e.clientX + (container?.scrollLeft || 0);
    const y = e.clientY + (container?.scrollTop || 0);

    updateMyPresence({
      cursor: { x: Math.floor(x), y: Math.floor(y) },
    });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {others.map(
        ({ connectionId, presence, info }) =>
          presence.cursor && (
            <FollowPointer
              key={connectionId}
              x={presence.cursor.x}
              y={presence.cursor.y}
              info={info}
            />
          )
      )}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
