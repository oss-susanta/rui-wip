import Box from "./Box";
import page from "./PageLayout";
import grid from "./GridLayout";

const boxes = ((colors) => {
  const boxes = {};
  colors.forEach((color) => {
    boxes[color] = {
      id: color,
      name: color,
      category: "Data",
      component: () => <Box color={color} />,
      preview: () => (
        <div className="w-16 h-8 mx-auto" style={{ background: color }} />
      ),
    };
  });
  return boxes;
})(["DarkOrange", "DarkOrchid", "DarkSalmon", "DarkSeaGreen"]);

const widgets = {
  ...boxes,
  [page.id]: page,
  [grid.id]: grid,
};

export default widgets;
