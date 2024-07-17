"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    socialLink?: any;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  md:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <div
            className="w-[280px] max-w-full  flex-shrink-0  md:w-[500px] relative rounded-2xl bg-card bg-cover p-[2px] overflow-hidden"
            key={item.name}
          >
            <li className=" px-8 py-6 rounded-2xl h-full">
              <blockquote className="rounded-2xl p-[1px]">
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <div className="relative z-20 mb-6 flex flex-row items-center justify-between">
                  <span className="text-base md:text-lg leading-[1.6] text-white   font-medium tracking-wide">
                    {item.name}
                  </span>
                  <Link
                    href={item?.socialLink ? item?.socialLink : ""}
                    className="text-white "
                  >
                    <FaLinkedin size={23} />
                  </Link>
                </div>
                <span className=" relative z-20 text-sm md:text-base leading-[1.6] text-dark-700 font-lato">
                  {item.quote}
                </span>
              </blockquote>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
