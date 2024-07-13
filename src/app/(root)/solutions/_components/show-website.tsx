"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Code, MonitorCheck, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WebsitePreview } from "./webiste-preview";

export const ShowWebsite = ({ solution, slug }: any) => {
  const [view, setView] = useState(1);
  return (
    <div className="mt-4  mx-auto w-full">
      <div className="w-full border border-gray-700 border-b-0 bg-gray-800 flex items-center justify-between rounded-t-lg p-3">
        <div className="w-15">
          <span className="w-3 h-3 rounded-full inline-block bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block mx-2"></span>
          <span className="w-3 h-3 rounded-full inline-block bg-green-500"></span>
        </div>
        <div className="hidden md:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center text-gray-400 border border-gray-600 bg-gray-700 transition hover:text-white hover:bg-gray-800 focus:outline-none p-2 mr-2 rounded-lg"
                  onClick={() => setView(1)}
                >
                  <MonitorCheck size={"18"} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex items-center text-gray-400 border border-gray-600 bg-gray-700 transition hover:text-white hover:bg-gray-800 focus:outline-none p-2 mr-2 rounded-lg"
                  onClick={() => setView(2)}
                >
                  <Smartphone size={"18"} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  target="_blank"
                  href={`/playground/${slug}?solution=true`}
                  className="flex items-center text-gray-400 border border-gray-600 bg-gray-700 transition hover:text-white hover:bg-gray-800 focus:outline-none p-2 mr-2 rounded-lg"
                >
                  <Code size="18" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="relative border border-gray-700 rounded-b-lg h-screen overflow-hidden">
        <WebsitePreview solution={solution} />
      </div>
    </div>
  );
};
