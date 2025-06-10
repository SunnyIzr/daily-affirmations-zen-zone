
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, DollarSign, Zap, Users } from "lucide-react";
import { Affirmation } from "@/hooks/useAffirmations";

interface AffirmationCardProps {
  affirmation: Affirmation;
}

const getTopicIcon = (topic: string) => {
  switch (topic) {
    case 'self-love':
      return <Heart className="w-4 h-4" />;
    case 'abundance':
      return <DollarSign className="w-4 h-4" />;
    case 'health':
      return <Sparkles className="w-4 h-4" />;
    case 'success':
      return <Zap className="w-4 h-4" />;
    case 'relationships':
      return <Users className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

const getTopicColor = (topic: string) => {
  switch (topic) {
    case 'self-love':
      return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'abundance':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'health':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'success':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'relationships':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const AffirmationCard = ({ affirmation }: AffirmationCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-4 flex-wrap">
          <Badge 
            variant="outline" 
            className={`flex items-center gap-1 ${getTopicColor(affirmation.topic)}`}
          >
            {getTopicIcon(affirmation.topic)}
            {affirmation.topic.charAt(0).toUpperCase() + affirmation.topic.slice(1)}
          </Badge>
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
