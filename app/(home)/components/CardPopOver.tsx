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
import { ApplyDate } from "./CardForm/ApplyDate";
import {Card} from "@/types/card";

interface CardPopOverProps {
  currentCard: Card;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CardPopOver = ({
  currentCard,
  open,
  onOpenChange,
}: CardPopOverProps) => {
  const [loading, setLoading] = React.useState(true);
  const [date, setDate] = React.useState<Date | null>(null);

  const saveToLocalStorage = () => {
    const data = localStorage.getItem("cardData") ?? "[]"
    let cardArray = JSON.parse(data);
    
    if (date) {
      const newEntry = {
        card: currentCard,
        date: date,
      };
      
      if (!Array.isArray(cardArray)) {
        cardArray = [];
      }
      
      cardArray.push(newEntry);
      localStorage.setItem("cardData", JSON.stringify(cardArray));
    }
  }

  useEffect(() => {
    saveToLocalStorage();
    onOpenChange(false);
  }, [date])

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCard.label}</DialogTitle>
            <DialogDescription>
              Issued by {currentCard.issuer}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 justify-center items-center relative w-full">
            {loading && <Skeleton className="w-[342.4px] h-[215.92px]" />}
            <Image
              src={currentCard?.imageUrl}
              alt={currentCard?.label}
              width={85.6 * 4}
              height={53.98 * 4}
              onLoad={() => setLoading(false)}
            />
          
          <ApplyDate onDateSelected={setDate} />

          </div>


        </DialogContent>
      </Dialog>
    </div>
  );
};
