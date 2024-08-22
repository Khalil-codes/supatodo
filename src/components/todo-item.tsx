"use client";

import { deleteTodo, toggleCheck } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/custom";
import { Trash2 } from "lucide-react";

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <form>
      <TodoCard todo={todo} />
    </form>
  );
}

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <Card className={cn("w-full")} key={todo.id}>
      <CardContent className="flex items-start gap-3 p-3">
        <span className="flex size-10 items-center justify-center">
          <Checkbox
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
          formAction={async () => await deleteTodo(todo.id)}>
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  );
}
