"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { GithubIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <div className="h-20 p-4 md:p-6 bg-neutral-50">
      <nav className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2658A0] to-blue-500">
          Chase 5/24 Tracker
        </h1>
        <div className="flex flex-row gap-2">
          <a
            href="https://github.com/xyspg/524-Tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-10">
              <GithubIcon className="size-4" />
            </Button>
          </a>

          <Button
            onClick={() => {
              if (!confirm("Are you sure you want to clear all data?")) return;
              localStorage.clear();
              window.location.reload();
            }}
            variant="destructive"
            className="w-10"
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </nav>
    </div>
  );
};
