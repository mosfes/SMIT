import { Gamepad2, Coffee } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface QRLandingProps {
  onSelectMode: (mode: 'game' | 'lazy') => void;
}

export function QRLanding({ onSelectMode }: QRLandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl">🍜 Hiu Hiu Hiu</h1>
          <h2>Welcome to Table #5</h2>
          <p className="text-muted-foreground">Choose your ordering style</p>
        </div>

        <div className="grid gap-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0"
            onClick={() => onSelectMode('game')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-white">🎮 Cooking Game Mode</h3>
                <p className="text-sm text-white/90">
                  Play a fun mini cooking game! Mix ingredients, cook your dish, and submit it as your order.
                </p>
                <div className="inline-flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <span>✨</span>
                  <span>Earn extra coins!</span>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0"
            onClick={() => onSelectMode('lazy')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Coffee className="w-8 h-8" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-white">😴 Lazy Cook Mode</h3>
                <p className="text-sm text-white/90">
                  Just want to order? Browse the menu and place your order directly. Quick and easy!
                </p>
                <div className="inline-flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <span>⚡</span>
                  <span>Fast ordering</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>💡 First time here? Try the Cooking Game!</p>
        </div>
      </div>
    </div>
  );
}