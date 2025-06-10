
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

  // Get random free and premium affirmations
  const freeAffirmations = affirmations?.filter(a => !a.premium) || [];
  const premiumAffirmations = affirmations?.filter(a => a.premium) || [];
  
  const randomFreeAffirmation = freeAffirmations.length > 0 
    ? freeAffirmations[Math.floor(Math.random() * freeAffirmations.length)]
    : null;
    
  const randomPremiumAffirmation = premiumAffirmations.length > 0 
    ? premiumAffirmations[Math.floor(Math.random() * premiumAffirmations.length)]
    : null;

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

        {/* Daily Affirmations Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Free Affirmation */}
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
              Free Affirmation
            </h2>
            {isLoading ? (
              <Skeleton className="h-48 w-full rounded-lg" />
            ) : randomFreeAffirmation ? (
              <AffirmationCard affirmation={randomFreeAffirmation} />
            ) : (
              <div className="text-center text-gray-500">No free affirmation available</div>
            )}
          </div>

          {/* Premium Affirmation */}
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
              Premium Affirmation
            </h2>
            {isLoading ? (
              <Skeleton className="h-48 w-full rounded-lg" />
            ) : randomPremiumAffirmation ? (
              <AffirmationCard affirmation={randomPremiumAffirmation} />
            ) : (
              <div className="text-center text-gray-500">No premium affirmation available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
