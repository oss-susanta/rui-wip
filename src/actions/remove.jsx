import { FiX } from "react-icons/fi";

const plugin = {
  id: "remove-item",
  text: "Remove",
  icon: FiX,
  onTrigger({ id, parentId, dispatch, removeItem }) {
    dispatch(removeItem({ id, parentId }));
  },
};

export default plugin;
