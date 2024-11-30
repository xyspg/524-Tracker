import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export interface Card {
  card: {
    label: string;
    imageUrl: string;
    value: string;
  };
  date: Date;
}


export const cardsAtom = atomWithStorage<Card[]>('cardData', []);

// Derived atom to calculate 5/24 status
export const chase524StatusAtom = atom((get) => {
  const cards = get(cardsAtom);
  const now = new Date();
  const twentyFourMonthsAgo = new Date(now.setMonth(now.getMonth() - 24));
  
  // Filter cards opened in last 24 months
  const recentCards = cards.filter(card => new Date(card.date) > twentyFourMonthsAgo);
  
  // Sort cards by date to find when the user will be free from 5/24
  const sortedCards = [...recentCards].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Calculate when the user will be free (24 months after the 5th newest card)
  let nextFreeDate = null;
  if (sortedCards.length >= 5) {
    const fifthNewestCard = sortedCards[sortedCards.length - 5];
    nextFreeDate = new Date(fifthNewestCard.date);
    nextFreeDate.setMonth(nextFreeDate.getMonth() + 24);
  }

  return {
    cardsWithin524: recentCards.length,
    nextFreeDate,
    isUnder524: recentCards.length < 5
  };
});
