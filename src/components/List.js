import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BtnStyle = styled.button`
  position: absolute;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  font-weight: 600;
  border: none;
  padding: 5px 10px 6px 10px;
  border-radius: 50%;
  float: right;
`;

const ListStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};

  & span {
    margin-left: 5px;
  }
`;

function List({ todoData, setTodoData }) {
  const handleCompleteChange = (id) => {
    const newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  const handleClick = (id) => {
    const newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleEnd = (result) => {
    if (!result.destination) return;

    const changedData = todoData;

    const [reorderedItem] = changedData.splice(result.source.index, 1);

    changedData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(changedData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ListStyle
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      completed={data.completed}
                    >
                      <input
                        onChange={() => handleCompleteChange(data.id)}
                        type="checkbox"
                        defaultChecked={false}
                      />
                      <span>{data.title}</span>
                      <BtnStyle onClick={() => handleClick(data.id)}>
                        x
                      </BtnStyle>
                    </ListStyle>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default List;
