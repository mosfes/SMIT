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
          <h1 className="text-4xl">🍜 หิว หิว หิว</h1>
          <h2>ยินดีต้อนรับสู่โต๊ะ #5</h2>
          <p className="text-muted-foreground">เลือกสไตล์การสั่งอาหารของคุณ</p>
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
                <h3 className="text-white">🎮 โหมดเกมทำอาหาร</h3>
                <p className="text-sm text-white/90">
                  เล่นมินิเกมทำอาหารสนุกๆ! ผสมส่วนผสม ปรุงอาหาร และส่งเป็นออเดอร์ของคุณ
                </p>
                <div className="inline-flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <span>✨</span>
                  <span>รับเหรียญพิเศษ!</span>
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
                <h3 className="text-white">😴 โหมด Lazy Cook</h3>
                <p className="text-sm text-white/90">
                  แค่อยากสั่งอาหาร? เลือกดูเมนูและสั่งอาหารได้โดยตรง รวดเร็วและง่ายดาย!
                </p>
                <div className="inline-flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                  <span>⚡</span>
                  <span>สั่งอาหารรวดเร็ว</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>💡 มาครั้งแรก? ลองเล่นเกมทำอาหารสิ!</p>
        </div>
      </div>
    </div>
  );
}