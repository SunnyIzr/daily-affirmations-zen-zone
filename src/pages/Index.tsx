
import { AffirmationCard } from "@/components/AffirmationCard";
import { useAffirmations } from "@/hooks/useAffirmations";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Heart } from "lucide-react";

const Index = () => {
  const { data: affirmations, isLoading, error } = useAffirmations();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
        <Alert className="max-w-md">
          <AlertDescription>
            Unable to load affirmations. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Get today's affirmation (using a simple method for now)
  const todayAffirmation = affirmations?.[new Date().getDate() % (affirmations?.length || 1)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Daily Affirmations
            </h1>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your day with positivity and intention. Each affirmation is crafted to inspire and uplift your spirit.
          </p>
        </div>

        {/* Today's Affirmation */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
            Today's Affirmation
          </h2>
          {isLoading ? (
            <div className="max-w-2xl mx-auto">
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          ) : todayAffirmation ? (
            <AffirmationCard affirmation={todayAffirmation} />
          ) : (
            <div className="text-center text-gray-500">No affirmation available</div>
          )}
        </div>

        {/* All Affirmations */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
            All Affirmations
          </h2>
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 max-w-4xl mx-auto">
              {affirmations?.map((affirmation) => (
                <AffirmationCard key={affirmation.id} affirmation={affirmation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
