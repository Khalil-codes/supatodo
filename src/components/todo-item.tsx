"use client";

import { deleteTodo, toggleCheck } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/custom";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { OptimisticTodoAction } from "./todo-list";

export function TodoItem({
  todo,
  optimisticTodoAction,
}: {
  todo: Todo;
  optimisticTodoAction: OptimisticTodoAction;
}) {
  return (
    <form>
      <TodoCard todo={todo} optimisticTodoAction={optimisticTodoAction} />
    </form>
  );
}

export function TodoCard({
  todo,
  optimisticTodoAction,
}: {
  todo: Todo;
  optimisticTodoAction: OptimisticTodoAction;
}) {
  const { pending } = useFormStatus();
  return (
    <Card
      className={cn("w-full", {
        "bg-green-600/50 line-through": todo.is_completed,
        "bg-red-700/50": pending,
      })}
      key={todo.id}>
      <CardContent className="flex items-start gap-3 p-3">
        <span className="flex size-10 items-center justify-center">
          <Checkbox
            disabled={pending}
            defaultChecked={!!todo.is_completed}
            onCheckedChange={async (checked) => {
              await toggleCheck(todo.id, Boolean(checked));
            }}
          />
        </span>
        <p className={cn("min-w-0 flex-1 break-words pt-2")}>{todo.text}</p>
        <Button
          variant="ghost"
          size="icon"
          disabled={pending}
          formAction={async () => {
            optimisticTodoAction({ action: "delete", todo });
            await deleteTodo(todo.id);
          }}>
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  );
}
