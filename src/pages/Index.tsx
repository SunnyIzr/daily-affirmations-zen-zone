import { AffirmationCard } from "@/components/AffirmationCard";
import { Header } from "@/components/Header";
import { useAffirmationTopics } from "@/hooks/useAffirmations";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const { data: affirmationTopics, isLoading, error } = useAffirmationTopics();
  const [currentFreeIndex, setCurrentFreeIndex] = useState(0);
  const [currentPremiumIndex, setCurrentPremiumIndex] = useState(0);

  // Get filtered affirmation topics
  const freeTopics = affirmationTopics?.filter(a => !a.premium) || [];
  const premiumTopics = affirmationTopics?.filter(a => a.premium) || [];

  // Initialize random indices when data loads
  useEffect(() => {
    if (freeTopics.length > 0) {
      setCurrentFreeIndex(Math.floor(Math.random() * freeTopics.length));
    }
    if (premiumTopics.length > 0) {
      setCurrentPremiumIndex(Math.floor(Math.random() * premiumTopics.length));
    }
  }, [affirmationTopics]);

  const handleNextFree = () => {
    if (freeTopics.length > 0) {
      setCurrentFreeIndex((prev) => (prev + 1) % freeTopics.length);
    }
  };

  const handleNextPremium = () => {
    if (premiumTopics.length > 0) {
      setCurrentPremiumIndex((prev) => (prev + 1) % premiumTopics.length);
    }
  };

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4 pt-20">
          <Alert className="max-w-md">
            <AlertDescription>
              Unable to load affirmations. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
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
              ) : freeTopics[currentFreeIndex] ? (
                <AffirmationCard 
                  affirmationTopic={freeTopics[currentFreeIndex]} 
                  onNext={handleNextFree}
                />
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
              ) : premiumTopics[currentPremiumIndex] ? (
                <AffirmationCard 
                  affirmationTopic={premiumTopics[currentPremiumIndex]} 
                  onNext={handleNextPremium}
                />
              ) : (
                <div className="text-center text-gray-500">No premium affirmation available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
