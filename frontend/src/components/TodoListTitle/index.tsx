import { useState } from "react";
import { TodoType, TodoTypeType } from "../../types/todo-board-types";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";

type Props = {
  todoListDict: TodoTypeType;
  data: TodoType[] | null;
  h1TextStyling: string;
  deleteTodoItemList: (title: string) => void;
  todoLists: TodoTypeType[];
  setTodoLists: (todoLists: TodoTypeType[]) => void;
  index: number;
  isTitleUpdating: boolean;
  setIsTitleUpdating: (isTitleUpdating: boolean) => void;
  setData: (data: TodoType[] | null) => void;
};

const TodoListTitle = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempTitle, setTempTitle] = useState<string>(props.todoListDict.title);

  const updateTitle = (id: string, newValue: string): void => {
    fetch(
      `http://localhost:5050/api/todo/list/update?id=${id}&title=${newValue}`,
      { method: "PUT" }
    )
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setIsEditing(false);
        props.setIsTitleUpdating(!props.isTitleUpdating);
      });
  };

  return (
    <div className="flex justify-between items-center px-3 py-3">
      <div className="flex flex-row gap-3 items-center">
        {isEditing ? (
          <input
            className={props.h1TextStyling + " bg-gray-500 w-56"}
            type="text"
            autoFocus
            value={tempTitle}
            onChange={(e) => setTempTitle(e.currentTarget.value)}
            onKeyUp={(e) => {
              console.log(e.code);
              if (e.code === "Enter") {
                const newValue = e.currentTarget.value;
                updateTitle(props.todoLists[props.index]._id, newValue);
              }
            }}
          ></input>
        ) : (
          <h1 className={props.h1TextStyling}>{props.todoListDict.title}</h1>
        )}
        <span className="text-black dark:text-white bg-gray-200 dark:bg-slate-600 w-6 h-6 rounded-full flex justify-center items-center">
          {
            props.data?.filter((item) => item.type === props.todoListDict._id)
              .length
          }
        </span>
      </div>

      <div className="flex flex-row gap-2">
        <EditButton onClick={setIsEditing} />
        <DeleteButton
          item={props.todoListDict._id}
          onClick={props.deleteTodoItemList}
        />
      </div>
    </div>
  );
};

export default TodoListTitle;
