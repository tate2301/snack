import clsx from "clsx";
import useToggle from "../../lib/hooks/useToggle";
import { motion } from "framer-motion";

const taskTextVariants = {
  checked: {
    textDecoration: "line-through",
  },
  unchecked: {},
};

export default function Subtask({}) {
  const [checked, check] = useToggle(false);

  return (
    <div className="flex gap-4 items-center group">
      <input type="checkbox" checked={checked} onChange={check} />
      <motion.p
        variants={taskTextVariants}
        animate={checked ? "checked" : "unchecked"}
        className={clsx(
          "line-clamp-1 py-2 group-checked:text-zinc-400 border-b w-full text-sm",
          checked ? "text-zinc-300" : "text-zinc-600 "
        )}
      >
        Update nameservers for domain
      </motion.p>
    </div>
  );
}
