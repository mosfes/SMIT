// src/context/AppContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, User, CommunityPost, Review, MenuItem } from '../types';
import { mockOrders, mockUser, communityPosts, reviews, menuItems } from '../data/mockData';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  skipQueue: (orderId: string) => void; // Added skipQueue
  posts: CommunityPost[];
  addPost: (post: CommunityPost) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: { id: string; userId: string; userName: string; text: string; timestamp: Date }) => void;
  reviewsList: Review[];
  addReview: (review: Review) => void;
  menuItems: MenuItem[];
  currentQueueNumber: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [reviewsList, setReviewsList] = useState<Review[]>(reviews);
  const [currentQueueNumber, setCurrentQueueNumber] = useState(45);

  const addOrder = (order: Order) => {
    const newOrder = { ...order, queueNumber: currentQueueNumber };
    setOrders([...orders, newOrder]);
    setCurrentQueueNumber(currentQueueNumber + 1);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const skipQueue = (orderId: string) => {
    setOrders((currentOrders) => {
      const ordersCopy = [...currentOrders];
      const orderIndex = ordersCopy.findIndex((o) => o.id === orderId);

      // Ensure the order is found and it's not the first one
      if (orderIndex > 0) {
        const previousOrderIndex = orderIndex - 1;

        // Store the queue numbers
        const currentQueueNum = ordersCopy[orderIndex].queueNumber;
        const previousQueueNum = ordersCopy[previousOrderIndex].queueNumber;

        // Swap the queue numbers
        ordersCopy[orderIndex].queueNumber = previousQueueNum;
        ordersCopy[previousOrderIndex].queueNumber = currentQueueNum;
        
        // Update the status of the order that skipped
        ordersCopy[orderIndex].status = 'cooking';
      } else if (orderIndex === 0) {
        // If it's already the first order, just update its status
        ordersCopy[orderIndex].status = 'cooking';
      }
      
      // Return the modified array
      return ordersCopy;
    });
  };

  const addPost = (post: CommunityPost) => {
    setPosts([post, ...posts]);
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const addComment = (postId: string, comment: { id: string; userId: string; userName: string; text: string; timestamp: Date }) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ));
  };

  const addReview = (review: Review) => {
    setReviewsList([review, ...reviewsList]);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      orders,
      addOrder,
      updateOrderStatus,
      skipQueue,
      posts,
      addPost,
      likePost,
      addComment,
      reviewsList,
      addReview,
      menuItems,
      currentQueueNumber,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}