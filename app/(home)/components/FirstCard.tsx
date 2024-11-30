"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardPicker } from "@/app/(home)/components/CardForm/CardPicker";
import { cards } from "@/app/data/cards";
import { CardPopOver } from "@/app/(home)/components/CardForm/CardPopOver";

export const FirstCard = () => {
  const [cardValue, setCardValue] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);

  const currentCard = cards.find((card) => card.value === cardValue);
  useEffect(() => {
    if (displayCard) {
      setIsOpen(true);
    }
  }, [cardValue]);

  if (!currentCard) return null

  const displayCard = cardValue !== "";



  return (
    <Layout>
      {displayCard && (
        <CardPopOver
          currentCard={currentCard}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
      <CardHeader>
        <h2 className="text-lg font-medium">Record your first card</h2>
      </CardHeader>
      <CardContent>
        <CardPicker onValueChange={setCardValue} />
      </CardContent>
    </Layout>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl">{children}</Card>
    </div>
  );
};
