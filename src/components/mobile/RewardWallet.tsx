import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Coins, TrendingUp, Gift, Zap, Star, Trophy } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface RewardWalletProps {
  onBack: () => void;
}

export function RewardWallet({ onBack }: RewardWalletProps) {
  const { user } = useAppContext();

  const transactions = [
    { id: '1', type: 'earn', amount: 10, description: 'Played Cooking Game', date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: '2', type: 'earn', amount: 20, description: 'Daily Check-in', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { id: '3', type: 'spend', amount: -50, description: 'Skipped Queue', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: '4', type: 'earn', amount: 15, description: 'Left a Review', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { id: '5', type: 'earn', amount: 30, description: 'Member Bonus', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  ];

  const rewards = [
    { id: '1', name: 'Free Dessert', cost: 100, icon: '🍰', available: user && user.coins >= 100 },
    { id: '2', name: 'Skip Queue', cost: 50, icon: '⚡', available: user && user.coins >= 50 },
    { id: '3', name: '10% Off', cost: 80, icon: '💰', available: user && user.coins >= 80 },
    { id: '4', name: 'Free Drink', cost: 60, icon: '🥤', available: user && user.coins >= 60 },
    { id: '5', name: 'Priority Seating', cost: 120, icon: '🪑', available: user && user.coins >= 120 },
    { id: '6', name: 'Chef Special', cost: 200, icon: '👨‍🍳', available: user && user.coins >= 200 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>← Back</Button>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            <span>Hiu Hiu Hiu Wallet</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
          <div className="text-center space-y-3">
            <div className="text-5xl">💰</div>
            <div>
              <p className="text-white/80 text-sm">Your Balance</p>
              <h1 className="text-white text-4xl">{user?.coins || 0}</h1>
              <p className="text-white/80 text-sm">Hiu Hiu Hiu Coins</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm bg-white/20 px-4 py-2 rounded-full w-fit mx-auto">
              <TrendingUp className="w-4 h-4" />
              <span>+75 this month</span>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">⭐</div>
            <p className="text-sm text-muted-foreground">Level</p>
            <p>Gold</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-sm text-muted-foreground">Earned</p>
            <p>450</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🏆</div>
            <p className="text-sm text-muted-foreground">Rank</p>
            <p>#124</p>
          </Card>
        </div>

        {/* Earn More Section */}
        <Card className="p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3>Earn More Coins</h3>
            <Gift className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  🎮
                </div>
                <div>
                  <p className="text-sm">Play Cooking Game</p>
                  <p className="text-xs text-muted-foreground">+10 coins per game</p>
                </div>
              </div>
              <Badge variant="secondary">+10</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  ⭐
                </div>
                <div>
                  <p className="text-sm">Leave a Review</p>
                  <p className="text-xs text-muted-foreground">+15 coins per review</p>
                </div>
              </div>
              <Badge variant="secondary">+15</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                  📅
                </div>
                <div>
                  <p className="text-sm">Daily Check-in</p>
                  <p className="text-xs text-muted-foreground">+20 coins daily</p>
                </div>
              </div>
              <Badge variant="secondary">+20</Badge>
            </div>
          </div>
        </Card>

        {/* Redeem Rewards */}
        <Card className="p-4 bg-white">
          <h3 className="mb-4">Redeem Rewards</h3>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map(reward => (
              <Card
                key={reward.id}
                className={`p-4 text-center ${
                  reward.available
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200 cursor-pointer hover:scale-105 transition-transform'
                    : 'bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{reward.icon}</div>
                <p className="text-sm mb-1">{reward.name}</p>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Coins className="w-3 h-3" />
                  <span>{reward.cost}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="p-4 bg-white">
          <h3 className="mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'earn' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <Zap className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className={`${transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}