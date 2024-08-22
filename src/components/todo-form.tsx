"use client";

import { createTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <Textarea
        disabled={pending}
        minLength={4}
        name="todo"
        required
        placeholder="Add a new todo"
      />
      <Button type="submit" disabled={pending} size="icon" className="min-w-10">
        <Send className="h-5 w-5" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className="p-3">
        <form
          ref={ref}
          action={async (data) => {
            await createTodo(data);
            ref.current?.reset();
          }}
          className="flex gap-4">
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}
