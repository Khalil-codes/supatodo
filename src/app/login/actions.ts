"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const emailLogin = async (formData: FormData) => {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?message=Cannot authenticate user");
  }

  revalidatePath("/", "layout");
  redirect("/todos");
};

export const signup = async (formData: FormData) => {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/login?message=Error signing up the user");
  }

  revalidatePath("/", "layout");
  redirect("/todos");
};

export const logout = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
};
