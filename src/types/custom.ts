import { Database } from "./schema";

export type Todo = Database["public"]["Tables"]["todos"]["Row"];
