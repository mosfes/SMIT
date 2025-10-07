// src/components/qr/OrderQueue.tsx

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Star, Clock, Users, Coins, MessageSquare, Send } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Order } from '../../types';

interface OrderQueueProps {
  order: Order;
  onComplete: () => void;
}

export function OrderQueue({ order: initialOrder, onComplete }: OrderQueueProps) {
  const { user, setUser, skipQueue, orders } = useAppContext();
  
  // Always get the latest order info from the context
  const order = orders.find(o => o.id === initialOrder.id) || initialOrder;

  const [status, setStatus] = useState(order.status);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(15);

  useEffect(() => {
    // Sync local status with the global status from context
    setStatus(order.status);
  }, [order.status]);


  useEffect(() => {
    // Simulate order status changes for demo
    const timer = setTimeout(() => {
      if (status === 'pending') {
        setStatus('cooking');
        setEstimatedTime(10);
      } else if (status === 'cooking') {
        setStatus('ready');
        setShowReviewDialog(true);
      }
    }, 10000); // Change status every 10 seconds for demo

    return () => clearTimeout(timer);
  }, [status]);

  const handleSkipQueue = () => {
    if (user && user.coins >= 50) {
      setUser({ ...user, coins: user.coins - 50 });
      skipQueue(order.id);
      setEstimatedTime(5);
      setShowSkipDialog(false);
    }
  };

  const handleSubmitReview = () => {
    // In real app, would save review
    setShowReviewDialog(false);
    setTimeout(onComplete, 1000);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'cooking': return 'bg-orange-500';
      case 'ready': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending': return 'Waiting in Queue';
      case 'cooking': return 'Cooking Now! 🍳';
      case 'ready': return 'Ready for Pickup! 🛎️';
      default: return 'Processing';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getStatusColor()} text-white mb-4 animate-pulse`}>
            <div className="text-center">
              <div className="text-4xl">#{order.queueNumber}</div>
              <div className="text-sm">Queue</div>
            </div>
          </div>
          <h2>{getStatusText()}</h2>
          <p className="text-muted-foreground">
            Estimated time: ~{estimatedTime} minutes
          </p>
        </div>

        <Card className="p-6 bg-white space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <span className="text-muted-foreground">Order #{order.id.slice(-4)}</span>
            <Badge variant="secondary">
              {order.orderType === 'game' ? '🎮 Game' : '😴 Lazy Cook'}
            </Badge>
          </div>

          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.menuItem.name}</span>
                <span>฿{item.menuItem.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t flex justify-between">
            <span>Total</span>
            <span>฿{order.totalPrice}</span>
          </div>
        </Card>

        {user && status === 'pending' && (
          <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
            <div className="flex items-start gap-3">
              <Coins className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <h3>Skip the Queue!</h3>
                <p className="text-sm text-muted-foreground">
                  Use 50 Hiu Hiu Hiu coins to move your order to the front of the line
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your balance: {user.coins} coins</span>
                  <Button
                    onClick={() => setShowSkipDialog(true)}
                    disabled={user.coins < 50}
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    Skip Queue
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3 text-center text-sm">
          <Card className="p-4">
            <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-muted-foreground">Ahead of you</p>
            <p>{Math.max(0, 3 - (status === 'cooking' ? 3 : 0))}</p>
          </Card>
          <Card className="p-4">
            <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-muted-foreground">Wait time</p>
            <p>~{estimatedTime}m</p>
          </Card>
        </div>

        {status === 'ready' && (
          <Button onClick={() => setShowReviewDialog(true)} className="w-full" size="lg">
            <MessageSquare className="w-5 h-5 mr-2" />
            Leave a Review
          </Button>
        )}
      </div>

      {/* Skip Queue Dialog */}
      <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skip the Queue?</DialogTitle>
            <DialogDescription>
              This will cost 50 Hiu Hiu Hiu coins and move your order to the front of the line.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <span>Current balance:</span>
              <span>{user?.coins} coins</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <span>After skip:</span>
              <span>{(user?.coins || 0) - 50} coins</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSkipQueue} className="bg-yellow-500 hover:bg-yellow-600">
              Confirm Skip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎉 Your order is ready!</DialogTitle>
            <DialogDescription>
              How was your experience? Share your thoughts with us!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm">Rate your meal</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <Textarea
              placeholder="Share your recipe or leave a review... (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Skip
            </Button>
            <Button onClick={handleSubmitReview}>
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}