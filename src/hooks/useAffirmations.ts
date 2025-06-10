
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Affirmation = {
  id: string;
  text: string;
  premium: boolean;
  topic: string;
  created_at: string;
  updated_at: string;
};

export const useAffirmations = () => {
  return useQuery({
    queryKey: ["affirmations"],
    queryFn: async (): Promise<Affirmation[]> => {
      console.log("Fetching affirmations from Supabase...");
      const { data, error } = await supabase
        .from("affirmations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching affirmations:", error);
        throw error;
      }

      console.log("Successfully fetched affirmations:", data);
      return data || [];
    },
  });
};
