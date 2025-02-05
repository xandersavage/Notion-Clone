import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";

const FollowPointer = ({ x, y, info }: { x: number; y: number; info: any }) => {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      style={{
        position: "absolute",
        top: y,
        left: x,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      // ... rest of motion props
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-6 w-6"
        style={{
          color: color,
          transform: "rotate(-70deg)",
          position: "relative",
          left: "-4px", // Fine-tune icon position
        }}
      >
        <path
          fill={color}
          stroke={color}
          strokeWidth="2"
          d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
        />
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
          position: "absolute",
          left: "24px", // Position label to the right of cursor
          top: "-8px",
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap 
        min-w-max text-xs rounded-full"
      >
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
