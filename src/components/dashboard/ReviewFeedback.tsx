import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Star, ThumbsUp, MessageSquare, TrendingUp, Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function ReviewFeedback() {
  const { reviewsList } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews = reviewsList.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  const avgRating = (reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length).toFixed(1);
  const totalReviews = reviewsList.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviewsList.filter(r => r.rating === rating).length,
    percentage: (reviewsList.filter(r => r.rating === rating).length / totalReviews) * 100,
  }));

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b p-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <h1>Reviews & Feedback</h1>
          <p className="text-muted-foreground">Customer reviews and ratings</p>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <div className="flex items-center gap-2 mt-2">
                    <h2 className="text-3xl">{avgRating}</h2>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(parseFloat(avgRating))
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-yellow-500 rounded-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                  <h2 className="text-3xl">{totalReviews}</h2>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+23%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <h2 className="text-3xl">87%</h2>
                  <p className="text-sm text-muted-foreground mt-2">Within 24h</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Positive</p>
                  <h2 className="text-3xl">94%</h2>
                  <p className="text-sm text-muted-foreground mt-2">4-5 stars</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Rating Distribution */}
          <Card className="p-6">
            <h3 className="mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-24">
                    <span className="text-sm">{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-16 text-right">
                    {count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Filters */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Tabs value={filterRating.toString()} onValueChange={(v) => setFilterRating(v === 'all' ? 'all' : parseInt(v))}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="5">5⭐</TabsTrigger>
                  <TabsTrigger value="4">4⭐</TabsTrigger>
                  <TabsTrigger value="3">3⭐</TabsTrigger>
                  <TabsTrigger value="2">2⭐</TabsTrigger>
                  <TabsTrigger value="1">1⭐</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map(review => (
              <Card key={review.id} className="p-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center text-white">
                        {review.userName[0]}
                      </div>
                      <div>
                        <p>{review.userName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Order #{review.orderId.slice(-4)}</Badge>
                  </div>

                  {/* Review Content */}
                  <div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-wrap gap-2">
                    {review.menuItems.map((item, index) => (
                      <Badge key={index} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">💭</div>
              <h3>No reviews found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}