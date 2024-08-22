"use client";

import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { Todo } from "@/types/custom";
import { useOptimistic } from "react";

export type Action = "create" | "update" | "delete";

export const todoReducer = (
  state: Array<Todo>,
  { action, todo }: { action: Action; todo: Todo }
) => {
  switch (action) {
    case "create":
      return [todo, ...state];
    case "update":
      return state.map((t) => (t.id === todo.id ? todo : t));
    case "delete":
      return state.filter((t) => t.id !== todo.id);
    default:
      return state;
  }
};

export type OptimisticTodoAction = (action: {
  action: Action;
  todo: Todo;
}) => void;

export function TodoList({ todos }: { todos: Array<Todo> }) {
  const [optimisticTodos, optimisticTodoAction] = useOptimistic(
    todos,
    todoReducer
  );
  return (
    <>
      <TodoForm optimisticTodoAction={optimisticTodoAction} />
      <div className="flex w-full flex-col gap-4">
        {optimisticTodos?.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              optimisticTodoAction={optimisticTodoAction}
            />
          );
        })}
      </div>
    </>
  );
}
