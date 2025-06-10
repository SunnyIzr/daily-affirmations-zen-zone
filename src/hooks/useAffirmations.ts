
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

export const useAffirmationTopics = () => {
  return useQuery({
    queryKey: ["affirmation-topics"],
    queryFn: async (): Promise<Pick<Affirmation, 'id' | 'topic' | 'premium'>[]> => {
      console.log("Fetching affirmation topics from Supabase...");
      const { data, error } = await supabase
        .from("affirmations")
        .select("id, topic, premium")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching affirmation topics:", error);
        throw error;
      }

      console.log("Successfully fetched affirmation topics:", data);
      return data || [];
    },
  });
};

export const useAffirmationById = (id: string | null) => {
  return useQuery({
    queryKey: ["affirmation", id],
    queryFn: async (): Promise<Affirmation> => {
      if (!id) throw new Error("No affirmation ID provided");
      
      console.log("Fetching affirmation by ID:", id);
      const { data, error } = await supabase
        .from("affirmations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching affirmation:", error);
        throw error;
      }

      console.log("Successfully fetched affirmation:", data);
      return data;
    },
    enabled: !!id,
  });
};
