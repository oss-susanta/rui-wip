import jokes from "./Jokes";
import comics from "./Comics";
import bored from "./Bored";
import page from "./PageLayout";
import grid from "./GridLayout";

const widgets = {
  [jokes.id]: jokes,
  [bored.id]: bored,
  [comics.id]: comics,
  [page.id]: page,
  [grid.id]: grid,
};

export default widgets;
