
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Affirmation } from "@/hooks/useAffirmations";

interface AffirmationCardProps {
  affirmation: Affirmation;
}

export const AffirmationCard = ({ affirmation }: AffirmationCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-500" />
          {affirmation.premium && (
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Premium
            </Badge>
          )}
        </div>
        
        <blockquote className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed italic">
          "{affirmation.text}"
        </blockquote>
        
        <div className="mt-6 w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
      </CardContent>
    </Card>
  );
};
