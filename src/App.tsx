import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Smartphone, Monitor, QrCode } from 'lucide-react';

// QR Platform
import { QRLanding } from './components/qr/QRLanding';
import { CookingGame } from './components/qr/CookingGame';
import { ManualOrder } from './components/qr/ManualOrder';
import { OrderQueue } from './components/qr/OrderQueue';

// Mobile App
import { MobileHome } from './components/mobile/MobileHome';
import { RandomMenu } from './components/mobile/RandomMenu';
import { SpinWheel } from './components/mobile/SpinWheel';
import { AIChat } from './components/mobile/AIChat';
import { CommunityFeed } from './components/mobile/CommunityFeed';
import { RewardWallet } from './components/mobile/RewardWallet';
import { UserProfile } from './components/mobile/UserProfile';

// Dashboard
import { OrderQueueDashboard } from './components/dashboard/OrderQueueDashboard';
import { SalesPerformance } from './components/dashboard/SalesPerformance';
import { ReviewFeedback } from './components/dashboard/ReviewFeedback';

import { Order, OrderItem, Ingredient } from './types';

function PlatformSelector({ onSelect }: { onSelect: (platform: string) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="text-6xl">🍜</div>
          <h1 className="text-5xl">Hiu Hiu Hiu</h1>
          <h2>Restaurant Ordering System</h2>
          <p className="text-muted-foreground">
            Select a platform to explore the demo
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card
            className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0"
            onClick={() => onSelect('qr')}
          >
            <div className="space-y-4 text-center">
              <div className="p-4 bg-white/20 rounded-xl w-fit mx-auto">
                <QrCode className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-white text-xl">QR Ordering</h3>
                <p className="text-white/90 text-sm mt-2">
                  Table-side ordering with Cooking Game or Lazy Cook mode
                </p>
              </div>
              <div className="pt-4">
                <Button className="w-full bg-white text-purple-600 hover:bg-white/90">
                  Launch Demo
                </Button>
              </div>
            </div>
          </Card>

          <Card
            className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0"
            onClick={() => onSelect('mobile')}
          >
            <div className="space-y-4 text-center">
              <div className="p-4 bg-white/20 rounded-xl w-fit mx-auto">
                <Smartphone className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-white text-xl">Customer App</h3>
                <p className="text-white/90 text-sm mt-2">
                  Engagement hub with games, AI chat, and community
                </p>
              </div>
              <div className="pt-4">
                <Button className="w-full bg-white text-blue-600 hover:bg-white/90">
                  Launch Demo
                </Button>
              </div>
            </div>
          </Card>

          <Card
            className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0"
            onClick={() => onSelect('dashboard')}
          >
            <div className="space-y-4 text-center">
              <div className="p-4 bg-white/20 rounded-xl w-fit mx-auto">
                <Monitor className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-white text-xl">iPad Dashboard</h3>
                <p className="text-white/90 text-sm mt-2">
                  Real-time order management and business analytics
                </p>
              </div>
              <div className="pt-4">
                <Button className="w-full bg-white text-orange-600 hover:bg-white/90">
                  Launch Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>💡 This is a complete prototype of all three integrated systems</p>
        </div>
      </div>
    </div>
  );
}

function QRPlatform() {
  const { menuItems, addOrder, currentQueueNumber } = useAppContext();
  const [screen, setScreen] = useState<'landing' | 'game' | 'manual' | 'queue'>('landing');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const handleGameComplete = (dishName: string, ingredients: Ingredient[]) => {
    const order: Order = {
      id: `order-${Date.now()}`,
      queueNumber: currentQueueNumber,
      items: [
        {
          menuItem: {
            id: `custom-${Date.now()}`,
            name: dishName,
            price: 150,
            image: 'https://images.unsplash.com/photo-1665088127661-83aeff6104c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwaW5ncmVkaWVudHMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1OTc0ODIyMHww&ixlib=rb-4.1.0&q=80&w=1080',
            description: `Custom dish with ${ingredients.map(i => i.name).join(', ')}`,
            category: 'main',
            spicyLevel: 1,
            isAvailable: true,
          },
          quantity: 1,
        },
      ],
      totalPrice: 150,
      status: 'pending',
      timestamp: new Date(),
      tableNumber: 5,
      orderType: 'game',
    };
    
    addOrder(order);
    setCurrentOrder(order);
    setScreen('queue');
  };

  const handleManualOrderComplete = (items: OrderItem[]) => {
    const order: Order = {
      id: `order-${Date.now()}`,
      queueNumber: currentQueueNumber,
      items,
      totalPrice: items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
      status: 'pending',
      timestamp: new Date(),
      tableNumber: 5,
      orderType: 'lazy',
    };
    
    addOrder(order);
    setCurrentOrder(order);
    setScreen('queue');
  };

  if (screen === 'landing') {
    return <QRLanding onSelectMode={(mode) => setScreen(mode === 'game' ? 'game' : 'manual')} />;
  }

  if (screen === 'game') {
    return <CookingGame onOrderComplete={handleGameComplete} onBack={() => setScreen('landing')} />;
  }

  if (screen === 'manual') {
    return (
      <ManualOrder
        menuItems={menuItems}
        onOrderComplete={handleManualOrderComplete}
        onBack={() => setScreen('landing')}
      />
    );
  }

  if (screen === 'queue' && currentOrder) {
    return <OrderQueue order={currentOrder} onComplete={() => setScreen('landing')} />;
  }

  return null;
}

function MobilePlatform() {
  const { menuItems } = useAppContext();
  const [screen, setScreen] = useState<string>('home');

  if (screen === 'home') {
    return <MobileHome onNavigate={setScreen} />;
  }

  if (screen === 'random-menu') {
    return <RandomMenu menuItems={menuItems} onBack={() => setScreen('home')} />;
  }

  if (screen === 'spin-wheel') {
    return <SpinWheel onBack={() => setScreen('home')} />;
  }

  if (screen === 'ai-chat') {
    return <AIChat onBack={() => setScreen('home')} />;
  }

  if (screen === 'community') {
    return <CommunityFeed onBack={() => setScreen('home')} />;
  }

  if (screen === 'wallet') {
    return <RewardWallet onBack={() => setScreen('home')} />;
  }

  if (screen === 'profile') {
    return <UserProfile onBack={() => setScreen('home')} />;
  }

  return null;
}

function DashboardPlatform() {
  const [screen, setScreen] = useState<'orders' | 'sales' | 'reviews'>('orders');

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4 space-y-2">
        <div className="p-4 mb-6">
          <h2 className="text-xl">🍜 Dashboard</h2>
          <p className="text-sm text-muted-foreground">Restaurant Admin</p>
        </div>
        
        <Button
          variant={screen === 'orders' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setScreen('orders')}
        >
          📋 Order Queue
        </Button>
        <Button
          variant={screen === 'sales' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setScreen('sales')}
        >
          📊 Sales Performance
        </Button>
        <Button
          variant={screen === 'reviews' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setScreen('reviews')}
        >
          ⭐ Reviews
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {screen === 'orders' && <OrderQueueDashboard onOrderSelect={(id) => console.log('Order selected:', id)} />}
        {screen === 'sales' && <SalesPerformance />}
        {screen === 'reviews' && <ReviewFeedback />}
      </div>
    </div>
  );
}

function AppContent() {
  const [platform, setPlatform] = useState<string | null>(null);

  if (!platform) {
    return <PlatformSelector onSelect={setPlatform} />;
  }

  return (
    <div className="relative">
      {/* Back to selector button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setPlatform(null)}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          ← Back to Selector
        </Button>
      </div>

      {platform === 'qr' && <QRPlatform />}
      {platform === 'mobile' && <MobilePlatform />}
      {platform === 'dashboard' && <DashboardPlatform />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}