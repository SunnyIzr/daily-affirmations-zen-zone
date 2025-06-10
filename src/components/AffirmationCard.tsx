
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, DollarSign, Zap, Users, RotateCcw } from "lucide-react";
import { Affirmation } from "@/hooks/useAffirmations";
import { useState } from "react";

interface AffirmationCardProps {
  affirmation: Affirmation;
  onNext: () => void;
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

export const AffirmationCard = ({ affirmation, onNext }: AffirmationCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    onNext();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-48 perspective-1000">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Front of card - Topic only */}
        <Card className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 backface-hidden">
          <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="flex justify-center items-center gap-2 mb-4 flex-wrap">
              {affirmation.premium && (
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-2">
                  Premium
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`p-3 rounded-full ${getTopicColor(affirmation.topic).replace('text-', 'bg-').replace('border-', '').replace('bg-', 'bg-opacity-20 bg-')}`}>
                {getTopicIcon(affirmation.topic)}
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-800 capitalize">
              {affirmation.topic.replace('-', ' ')}
            </h3>
            
            <p className="text-gray-600 mt-2">Click to reveal affirmation</p>
          </CardContent>
        </Card>

        {/* Back of card - Affirmation text */}
        <Card className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg backface-hidden rotate-y-180">
          <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
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
            
            <blockquote className="text-lg font-medium text-gray-800 leading-relaxed italic mb-4 flex-1 flex items-center">
              "{affirmation.text}"
            </blockquote>
            
            <Button 
              onClick={handleNextClick}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Next Affirmation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
