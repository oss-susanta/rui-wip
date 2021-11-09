import jokes from "./Jokes";
import comics from "./Comics";
import bored from "./Bored";
import currency from "./CurrencyExchange";
import university from "./University";
import page from "./PageLayout";
import grid from "./GridLayout";

const widgets = {
  [currency.id]: currency,
  [university.id]: university,
  [jokes.id]: jokes,
  [bored.id]: bored,
  [comics.id]: comics,
  [page.id]: page,
  [grid.id]: grid,
};

export default widgets;
