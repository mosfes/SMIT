import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Clock, CheckCircle, Flame, AlertCircle, Filter } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Order } from '../../types';

interface OrderQueueDashboardProps {
  onOrderSelect: (orderId: string) => void;
}

export function OrderQueueDashboard({ onOrderSelect }: OrderQueueDashboardProps) {
  const { orders, updateOrderStatus } = useAppContext();
  const [filterStatus, setFilterStatus] = useState<'all' | Order['status']>('all');

  const filteredOrders = (filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus)
  ).sort((a, b) => a.queueNumber - b.queueNumber);


  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    cooking: orders.filter(o => o.status === 'cooking').length,
    ready: orders.filter(o => o.status === 'ready').length,
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'cooking': return 'bg-orange-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cooking': return <Flame className="w-4 h-4" />;
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getTimeSince = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="max-w-7xl mx-auto">
          <h1>Order Queue</h1>
          <p className="text-muted-foreground">Real-time order management</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 bg-white border-b">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl">{statusCounts.pending}</p>
              </div>
              <div className="p-3 bg-yellow-500 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cooking</p>
                <p className="text-3xl">{statusCounts.cooking}</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-lg">
                <Flame className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-3xl">{statusCounts.ready}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Today</p>
                <p className="text-3xl">{orders.length}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cooking">Cooking</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map(order => (
              <Card
                key={order.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onOrderSelect(order.id)}
              >
                <div className="space-y-4">
                  {/* Order Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl">#{order.queueNumber}</p>
                        <Badge variant={order.orderType === 'game' ? 'default' : 'secondary'}>
                          {order.orderType === 'game' ? '🎮' : '😴'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Table {order.tableNumber || '-'}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.menuItem.name}</span>
                        <span className="text-muted-foreground">฿{item.menuItem.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="pt-3 border-t flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {getTimeSince(order.timestamp)}
                    </div>
                    <div>
                      <span>฿{order.totalPrice}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, 'cooking');
                        }}
                        className="flex-1"
                        size="sm"
                      >
                        Start Cooking
                      </Button>
                    )}
                    {order.status === 'cooking' && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, 'ready');
                        }}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                        size="sm"
                      >
                        Mark Ready
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, 'completed');
                        }}
                        className="flex-1 bg-gray-500 hover:bg-gray-600"
                        size="sm"
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h3>No orders</h3>
              <p className="text-muted-foreground">
                {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}