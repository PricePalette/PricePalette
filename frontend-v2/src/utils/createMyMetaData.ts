import { v4 as uuidv4 } from "uuid";

export function createMyMetaData(metaData: any) {
  let newMetadata = metaData;

  if (newMetadata.cards.length > 0) {
    let newCards = newMetadata.cards;
    newCards = newCards.map((card: any) => ({ ...card, id: uuidv4() }));
    newMetadata.cards = newCards;
  }

  return metaData;
}
