"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FloatingDonateButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
          >
            <Link href="https://www.donationalerts.com/r/gio00" target="_blank" rel="noopener noreferrer">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Support the Project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingDonateButton; 