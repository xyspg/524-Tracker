import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplyDate } from "./ApplyDate";
import { useAtom } from "jotai";
import { cardsAtom, Card } from "@/app/atoms/cardAtoms";
import type { Card as CardType } from "@/types/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CardPopOverProps {
  currentCard: CardType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CardPopOver = ({
  currentCard,
  open,
  onOpenChange,
}: CardPopOverProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const [date, setDate] = React.useState<Date | null>(null);
  const [cards, setCards] = useAtom(cardsAtom);

  useEffect(() => {
    if (open) {
      setLoaded(false);
    }
  }, [open]);

  const saveToLocalStorage = () => {
    if (date) {
      const existingCardIndex = cards.findIndex(
        (item) => item.card.value === currentCard.value,
      );

      if (existingCardIndex !== -1) {
        // Update existing card's date
        const updatedCards = [...cards];
        updatedCards[existingCardIndex] = {
          ...updatedCards[existingCardIndex],
          date: date,
        };
        setCards(updatedCards);
      } else {
        // Add new card
        const newEntry: Card = {
          card: currentCard,
          date: date,
        };
        setCards([...cards, newEntry]);
      }

      setDate(null);
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (date) {
      saveToLocalStorage();
    }
  }, [date]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add Card</DrawerTitle>
            <DrawerDescription>
              {currentCard.label}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 justify-center items-center relative w-full">
            <div className="relative w-[342.4px] h-[215.92px]">
              {!loaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <Image
                src={currentCard?.imageUrl}
                alt={currentCard?.label}
                className={`${!loaded ? "opacity-0" : "opacity-100"} transition-opacity`}
                width={342.4}
                height={215.92}
                onLoadingComplete={() => setLoaded(true)}
              />
            </div>

            <ApplyDate onDateSelected={setDate} />
          </div>
          <DrawerFooter className="pt-2 mt-8">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCard.label}</DialogTitle>
            {/* <DialogDescription> */}
            {/* Issued by {currentCard.issuer} */}
            {/* </DialogDescription> */}
          </DialogHeader>
          <div className="flex flex-col gap-4 justify-center items-center relative w-full">
            <div className="relative w-[342.4px] h-[215.92px]">
              {!loaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <Image
                src={currentCard?.imageUrl}
                alt={currentCard?.label}
                className={`${!loaded ? "opacity-0" : "opacity-100"} transition-opacity`}
                width={342.4}
                height={215.92}
                onLoadingComplete={() => setLoaded(true)}
              />
            </div>

            <ApplyDate onDateSelected={setDate} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
