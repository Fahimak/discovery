import { SegmentItem } from "api/models/Story/story";
import { useHiveConfigContext } from "context/Hive/hiveConfig";
import { useStoryContext } from "context/Story/stories";
import useStoriesApi from "hooks/apiHooks/Story/useStoriesApi";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list: SegmentItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "2px",
  margin: `0 ${grid}px 0 0`,
  transform: isDragging ? "scale(1.2)" : "",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#fafafa" : "",
  border: isDraggingOver ? "2px dashed #ccc" : "",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  padding: grid,
  overflow: "auto",
});

interface Props {
  originalItems: any[];
  currentIdx: number;
}

const DragReplace = ({ originalItems, currentIdx }: Props) => {
  const [items, setItems] = useState<SegmentItem[]>(originalItems);

  const stories = useStoryContext();

  const storyUuid = stories.storyUuid;

  useEffect(() => {
    setItems(originalItems);
  }, [originalItems]);

  const { ToastInfo } = useHiveConfigContext();

  const { updateStoryOrder } = useStoriesApi();

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      ToastInfo("Please drag and drop inside the specified box");
      return;
    }

    const updatedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(updatedItems);

    updateStoryOrder(
      updatedItems[result.destination.index].id,
      originalItems[result.destination.index].segmentOrder +
        (result.destination.index > result.source.index ? 1 : 0)
    );

    // Update the state or dispatch an action with updatedItems if necessary
  };

  const handleStoryChange = (data: SegmentItem, idx: number) => {
    stories.setCurrentStoryId(data.id);
    stories.setCurrentStoryIndex(idx);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id.toString()}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div
                      key={index}
                      style={{
                        backgroundColor: item.colorCode || "",
                      }}
                      className={`story_nav_dot_item pointer ${
                        index === currentIdx ? "selected_nav_dot" : ""
                      }`}
                      onClick={() => handleStoryChange(item, index)}
                    >
                      {item.thumbnailUrl && (
                        <img
                          src={item.thumbnailUrl}
                          alt="story_thumbnail"
                          className="story_display_image_wrapper"
                        />
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragReplace;
