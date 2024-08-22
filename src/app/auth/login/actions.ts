"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/utils/helpers";

export const emailLogin = async (formData: FormData) => {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/auth/login?message=Cannot authenticate user");
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
    redirect("/auth/login?message=Error signing up the user");
  }

  revalidatePath("/", "layout");
  redirect("/todos");
};

export const logout = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/auth/login");
};

export const oauthLogin = async (provider: Provider) => {
  if (!provider) {
    redirect("/auth/login?message=Provider not found");
  }
  const supabase = createClient();
  const redirectURL = getURL("/auth/callback");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo: redirectURL },
  });

  if (error) {
    redirect("/auth/login?message=Error signing in the user");
  }
  redirect(data.url);
};
