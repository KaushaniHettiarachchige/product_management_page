"use client";

import * as Switch from "@radix-ui/react-switch";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-600 dark:text-slate-300">☀️</span>

      <Switch.Root
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="relative h-7 w-12 rounded-full bg-slate-300 transition data-[state=checked]:bg-slate-700 outline-none cursor-pointer"
      >
        <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white transition will-change-transform data-[state=checked]:translate-x-6" />
      </Switch.Root>

      <span className="text-sm text-slate-600 dark:text-slate-300">🌙</span>
    </div>
  );
}