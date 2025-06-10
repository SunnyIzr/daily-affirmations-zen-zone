
import { Heart, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center gap-2">
          <Heart className="w-6 h-6 text-pink-500" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Daily Affirmations
          </h1>
          <Sparkles className="w-6 h-6 text-purple-500" />
        </div>
      </div>
    </header>
  );
};
