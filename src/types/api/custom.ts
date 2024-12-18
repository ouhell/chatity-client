import { DefinedInitialDataOptions, QueryKey } from "@tanstack/react-query";

export type CQueryOptions<FnD, D = FnD, E = Error> = Omit<
  DefinedInitialDataOptions<FnD, E, D, QueryKey>,
  "queryKey" | "queryFn" | "select" | "initialData"
>;
