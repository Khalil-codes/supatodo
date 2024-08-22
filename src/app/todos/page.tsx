import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";

export default async function TodosPage() {
  const supabase = createClient();

  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="container mx-auto flex w-full max-w-2xl flex-col gap-4 p-3 pt-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Todo's
      </h1>
      <Separator className="w-full" />
      <TodoList todos={todos ?? []} />
    </section>
  );
}
