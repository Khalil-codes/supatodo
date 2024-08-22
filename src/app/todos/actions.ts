"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const createTodo = async (formData: FormData) => {
  const text = formData.get("todo") as string;
  if (!text || text.trim().length <= 1) {
    throw Error("Text should be atleast 1 character");
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("todos")
    .insert({ text, user_id: user?.id });

  if (error) {
    console.log("Error occurred whild adding todo", error);
    throw Error("Insertion Failed");
  }

  revalidatePath("/todos");
};

export const deleteTodo = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    console.log("Error occurred whild deleting todo", error);
    throw Error("Deletion Failed");
  }

  revalidatePath("/todos");
};

export const updateTodo = async (id: string, text: string) => {
  const supabase = createClient();

  const { error } = await supabase.from("todos").update({ text }).eq("id", id);

  if (error) {
    console.log("Error occurred whild updating todo", error);
    throw Error("Update Failed");
  }

  revalidatePath("/todos");
};

export const toggleCheck = async (id: string, checked: boolean) => {
  console.log("Running the server action");
  const supabase = createClient();
  const { error } = await supabase
    .from("todos")
    .update({ is_completed: checked })
    .eq("id", id);
  if (error) {
    console.log("Error occurred whild updating todo", error);
    throw Error("Update Failed");
  }
  revalidatePath("/todos");
};
