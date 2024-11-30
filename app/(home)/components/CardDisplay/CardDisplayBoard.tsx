"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { cardsAtom, chase524StatusAtom } from "@/app/atoms/cardAtoms";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const CardDisplayBoard = () => {
  const [cards, setCards] = useAtom(cardsAtom);
  const [imageLoadStatus, setImageLoadStatus] = useState<Map<string, boolean>>(new Map());
  const chase524 = useAtom(chase524StatusAtom)[0];

  if (cards.length === 0) {
    return null;
  }

  const deleteCard = (cardValue: string) => {
    const updatedCards = cards.filter((card) => card.card.value !== cardValue);
    setCards(updatedCards);

    // Remove the card from the image loading status map
    setImageLoadStatus((prevState) => {
      const newState = new Map(prevState);
      newState.delete(cardValue);
      return newState;
    });
  };

  const handleImageLoad = (cardValue: string) => {
    setImageLoadStatus((prevState) => {
      const newState = new Map(prevState);
      newState.set(cardValue, true);
      return newState;
    });
  };

  return (
    <div className="p-8 md:p-16">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">
            You had{" "}
            <span className="font-bold text-3xl">
              {chase524.cardsWithin524}
            </span>{" "}
            cards in the past 24 months.
          </h2>
          <h2 className="text-lg font-medium">
            You are {chase524.isUnder524 ? "under " : "over"} 5/24.
          </h2>
          {chase524.nextFreeDate && (
            <h2 className="text-lg font-medium">
              You need to wait until{" "}
              <span className="font-bold text-3xl">
                {format(chase524.nextFreeDate!, "yyyy-MM-dd")}
              </span>{" "}
              to get a new card.
            </h2>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
              const isLoaded = imageLoadStatus.get(card.card.value) || false;

              return (
                <Card
                  key={card.card.value}
                  className="flex flex-col items-center space-x-1 w-full relative"
                >
                  <X
                    className="absolute top-2 right-2 cursor-pointer size-4"
                    onClick={() => deleteCard(card.card.value)}
                  />

                  <CardHeader>
                    <h2 className="text-sm text-center font-medium leading-5 text-wrap max-w-[250px]">
                      {card.card.label}
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="w-[171.2px] h-[107.96px] relative">
                      {!isLoaded && (
                        <Skeleton className="absolute inset-0 w-full h-full" />
                      )}
                      <Image
                        src={card.card?.imageUrl}
                        alt={card.card?.label}
                        width={85.6 * 2}
                        height={53.98 * 2}
                        className={`${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity`}
                        onLoadingComplete={() => handleImageLoad(card.card.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Approved on {format(card.date, "yyyy-MM-dd")}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
