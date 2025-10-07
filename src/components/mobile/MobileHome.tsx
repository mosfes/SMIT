import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Dices, CircleDollarSign, Bot, Users, Wallet, User as UserIcon, Clock, MapPin } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface MobileHomeProps {
  onNavigate: (screen: string) => void;
}

export function MobileHome({ onNavigate }: MobileHomeProps) {
  const { user } = useAppContext();

  const features = [
    {
      id: 'random-menu',
      icon: Dices,
      title: 'Random Menu',
      description: 'Let us pick your meal',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'spin-wheel',
      icon: CircleDollarSign,
      title: 'Who Pays?',
      description: 'Spin to decide',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'ai-chat',
      icon: Bot,
      title: 'AI Companion',
      description: 'Chat with your dining buddy',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'community',
      icon: Users,
      title: 'Community',
      description: 'Share food moments',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 pb-20">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white">🍜 Hiu Hiu Hiu</h1>
              <p className="text-white/90 text-sm">Your Thai Food Adventure</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => onNavigate('profile')}
            >
              <UserIcon className="w-6 h-6" />
            </Button>
          </div>

          {user && (
            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <p className="text-white">{user.name}</p>
                    <p className="text-white/80 text-sm">Member since 2024</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => onNavigate('wallet')}
                >
                  <Wallet className="w-4 h-4 mr-1" />
                  {user.coins}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Restaurant Info Card */}
      <div className="max-w-md mx-auto -mt-12 px-6 space-y-6">
        <Card className="p-6 bg-white shadow-lg">
          <div className="space-y-4">
            <div>
              <h2>Restaurant Info</h2>
              <p className="text-muted-foreground text-sm">Authentic Thai Cuisine</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Open Hours</p>
                  <p>11:00 - 22:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p>Bangkok, Thailand</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm">🎉 Special: Order via Cooking Game and earn extra coins!</p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div>
          <h3 className="mb-4">Fun Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className={`p-6 cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br ${feature.gradient} text-white border-0`}
                  onClick={() => onNavigate(feature.id)}
                >
                  <div className="space-y-3">
                    <div className="p-3 bg-white/20 rounded-lg w-fit">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white">{feature.title}</h4>
                      <p className="text-white/90 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        {user && (
          <Card className="p-6 bg-white">
            <h3 className="mb-4">Your Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl">💰</p>
                <p className="text-muted-foreground text-sm">Coins</p>
                <p>{user.coins}</p>
              </div>
              <div>
                <p className="text-2xl">🍽️</p>
                <p className="text-muted-foreground text-sm">Orders</p>
                <p>{user.totalOrders}</p>
              </div>
              <div>
                <p className="text-2xl">❤️</p>
                <p className="text-muted-foreground text-sm">Favorites</p>
                <p>{user.favoriteItems.length}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}