import { Draggable, DragDropContext, Droppable } from "@hello-pangea/dnd";
import { rem, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { IconGripVertical } from "@tabler/icons-react";
import classes from "@/styles/drapNDropCards.module.css";
import { useMetaData } from "@/stores/useMetaData";
import { arrayMoveImmutable } from "array-move";
import cx from "clsx";

export function DrapNDropCards() {
  const metaData = useMetaData((state) => state.metaData);
  const updateCards = useMetaData((state) => state.updateCards);
  const [state, handlers] = useListState(metaData?.cards);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </div>
          <div>
            <Text>{item.title}</Text>
            <Text c="dimmed" size="sm">
              {item.description}
            </Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        console.log("oldCards: ", metaData);
        const newCards = arrayMoveImmutable(
          metaData?.cards!,
          source.index,
          destination?.index || 0
        );
        updateCards(newCards);
        console.log("newCardsNonState: ", newCards);
        console.log("newCards: ", metaData);
        return handlers.reorder({
          from: source.index,
          to: destination?.index || 0,
        });
      }}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
