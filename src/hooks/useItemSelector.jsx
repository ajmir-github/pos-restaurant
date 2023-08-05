import { useState } from "react";

export default function useItemSelector(initial = null) {
  const [selectedItem, setSelectedItem] = useState(null);
  const selectItem = (item, isSelected) =>
    setSelectedItem(isSelected ? null : item);
  const isSelectedItem = (item) => {
    if (!selectedItem) return false;
    return selectedItem._id === item._id;
  };
  const cancelEdit = () => setSelectedItem(null);
  return {
    selectedItem,
    selectItem,
    isSelectedItem,
    cancelEdit,
  };
}
