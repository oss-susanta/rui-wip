import jokes from "./Jokes";
import comics from "./Comics";
import bored from "./Bored";
import currency from "./CurrencyExchange";
import university from "./University";
import collapse from "./CollapseLayout";
import grid from "./GridLayout";
import page from "./PageLayout";

const widgets = {
  [currency.id]: currency,
  [university.id]: university,
  [jokes.id]: jokes,
  [bored.id]: bored,
  [comics.id]: comics,
  [page.id]: page,
  [grid.id]: grid,
  [collapse.id]: collapse,
};

export default widgets;
