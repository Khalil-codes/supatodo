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
