import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { Settings, Heart, Calendar, Trophy, TrendingUp, Award } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { menuItems } from '../../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface UserProfileProps {
  onBack: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  const { user } = useAppContext();

  if (!user) return null;

  const favoriteItems = menuItems.filter(item => user.favoriteItems.includes(item.id));

  const achievements = [
    { id: '1', icon: '🎮', name: 'Game Master', description: 'Played 10 cooking games', unlocked: true },
    { id: '2', icon: '⭐', name: 'Reviewer', description: 'Left 5 reviews', unlocked: true },
    { id: '3', icon: '🔥', name: 'Spice King', description: 'Ordered 5 spicy dishes', unlocked: true },
    { id: '4', icon: '💰', name: 'Coin Collector', description: 'Earned 500 coins', unlocked: false },
    { id: '5', icon: '👑', name: 'VIP Member', description: 'Member for 1 year', unlocked: false },
    { id: '6', icon: '🎯', name: 'Foodie', description: 'Tried all menu items', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>← Back</Button>
          <span>Profile</span>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-white/20 mx-auto flex items-center justify-center text-4xl">
              👤
            </div>
            <div>
              <h2 className="text-white">{user.name}</h2>
              <p className="text-white/80 text-sm">Gold Member</p>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <div className="text-center">
                <p className="text-2xl text-white">{user.totalOrders}</p>
                <p className="text-white/80 text-xs">Orders</p>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl text-white">{user.coins}</p>
                <p className="text-white/80 text-xs">Coins</p>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl text-white">{favoriteItems.length}</p>
                <p className="text-white/80 text-xs">Favorites</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Member Since */}
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p>{user.memberSince.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
            <Badge variant="secondary">
              {Math.floor((Date.now() - user.memberSince.getTime()) / (1000 * 60 * 60 * 24))} days
            </Badge>
          </div>
        </Card>

        {/* Favorite Items */}
        <Card className="p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3>Favorite Dishes</h3>
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {favoriteItems.slice(0, 4).map(item => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">฿{item.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3>Achievements</h3>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`text-center p-3 rounded-lg ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50'
                    : 'bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{achievement.icon}</div>
                <p className="text-xs">{achievement.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
            <p className="text-sm">
              🎯 {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
            </p>
          </div>
        </Card>

        {/* Activity Stats */}
        <Card className="p-4 bg-white">
          <h3 className="mb-4">Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm">This Month</p>
                  <p className="text-xs text-muted-foreground">5 orders</p>
                </div>
              </div>
              <span className="text-blue-600">+75 coins</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm">Reviews Given</p>
                  <p className="text-xs text-muted-foreground">Total reviews</p>
                </div>
              </div>
              <span className="text-green-600">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm">Community Posts</p>
                  <p className="text-xs text-muted-foreground">Your posts</p>
                </div>
              </div>
              <span className="text-purple-600">12</span>
            </div>
          </div>
        </Card>

        {/* Edit Profile Button */}
        <Button className="w-full" variant="outline">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}