"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
export const NavbarItem = ({ path, text }: { path: string; text: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && path === "/") ||
    pathname === path ||
    pathname?.startsWith(`${path}/`);

  const onClick = () => {
    router.push(path);
  };
  return (
    <button
      onClick={onClick}
      aria-label={text}
      type="button"
      className={cn(
        "text-white tracking-wider font-[600]  transition-all hover:text-green-500 ",
        isActive && "text-primary hover:text-primary/50",
      )}
    >
      {text}
    </button>
  );
};
