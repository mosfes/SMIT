import { MenuItem, Order, User, CommunityPost, Review, SalesData, Ingredient } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'pad-thai',
    name: 'ผัดไทย',
    price: 120,
    image: 'https://images.unsplash.com/photo-1729708475167-71a6eb3cd741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwZm9vZCUyMHBhZCUyMHRoYWl8ZW58MXx8fHwxNzU5ODI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'เส้นจันท์ผัดกับกุ้ง เต้าหู้ และถั่วลิสง',
    category: 'main',
    spicyLevel: 1,
    isAvailable: true,
  },
  {
    id: 'fried-rice',
    name: 'ข้าวผัด',
    price: 90,
    image: 'https://images.unsplash.com/photo-1646340916384-9845d7686e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2UlMjBhc2lhbnxlbnwxfHx8fDE3NTk3MTE4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'ข้าวผัดสไตล์ไทยใส่ไข่และผัก',
    category: 'main',
    spicyLevel: 0,
    isAvailable: true,
  },
  {
    id: 'tom-yum',
    name: 'ต้มยำกุ้ง',
    price: 110,
    image: 'https://images.unsplash.com/photo-1628430043175-0e8820df47c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b20lMjB5dW0lMjBzb3VwfGVufDF8fHx8MTc1OTgyMDI3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'ซุปไทยรสเผ็ดเปรี้ยวใส่กุ้ง',
    category: 'main',
    spicyLevel: 3,
    isAvailable: true,
  },
  {
    id: 'green-curry',
    name: 'แกงเขียวหวาน',
    price: 130,
    image: 'https://images.unsplash.com/photo-1668665772043-bdd32e348998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGN1cnJ5JTIwdGhhaXxlbnwxfHx8fDE3NTk4MjAyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'แกงกะทิครีมข้นใส่ไก่และโหระพา',
    category: 'main',
    spicyLevel: 2,
    isAvailable: true,
  },
  {
    id: 'spring-rolls',
    name: 'ปอเปี๊ยะสด',
    price: 60,
    image: 'https://images.unsplash.com/photo-1679310290259-78d9eaa32700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xscyUyMGFzaWFufGVufDF8fHx8MTc1OTgzODQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'ผักสดห่อด้วยแผ่นแป้งข้าวเจ้า',
    category: 'appetizer',
    spicyLevel: 0,
    isAvailable: true,
  },
  {
    id: 'mango-sticky-rice',
    name: 'ข้าวเหนียวมะม่วง',
    price: 80,
    image: 'https://images.unsplash.com/photo-1711161988375-da7eff032e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMHN0aWNreSUyMHJpY2V8ZW58MXx8fHwxNzU5ODI0NTUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'ข้าวเหนียวมูนหวานกับมะม่วงสดและกะทิ',
    category: 'dessert',
    spicyLevel: 0,
    isAvailable: true,
  },
  {
    id: 'thai-tea',
    name: 'ชาไทยเย็น',
    price: 45,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
    description: 'ชาไทยหวานมันเสิร์ฟพร้อมน้ำแข็ง',
    category: 'drink',
    spicyLevel: 0,
    isAvailable: true,
  },
  {
    id: 'papaya-salad',
    name: 'ส้มตำ',
    price: 70,
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500',
    description: 'ส้มตำมะละกอใส่ถั่วลิสง',
    category: 'appetizer',
    spicyLevel: 3,
    isAvailable: true,
  },
];

export const ingredients: Ingredient[] = [
  { id: 'chicken', name: 'ไก่', icon: '🍗', category: 'protein' },
  { id: 'shrimp', name: 'กุ้ง', icon: '🦐', category: 'protein' },
  { id: 'tofu', name: 'เต้าหู้', icon: '🧈', category: 'protein' },
  { id: 'egg', name: 'ไข่', icon: '🥚', category: 'protein' },
  { id: 'broccoli', name: 'บรอกโคลี', icon: '🥦', category: 'vegetable' },
  { id: 'carrot', name: 'แครอท', icon: '🥕', category: 'vegetable' },
  { id: 'pepper', name: 'พริกหยวก', icon: '🫑', category: 'vegetable' },
  { id: 'mushroom', name: 'เห็ด', icon: '🍄', category: 'vegetable' },
  { id: 'soy-sauce', name: 'ซีอิ๊ว', icon: '🍶', category: 'sauce' },
  { id: 'fish-sauce', name: 'น้ำปลา', icon: '🐟', category: 'sauce' },
  { id: 'oyster-sauce', name: 'ซอสหอยนางรม', icon: '🦪', category: 'sauce' },
  { id: 'chili', name: 'พริก', icon: '🌶️', category: 'spice' },
  { id: 'garlic', name: 'กระเทียม', icon: '🧄', category: 'spice' },
  { id: 'basil', name: 'โหระพา', icon: '🌿', category: 'spice' },
];

export const mockUser: User = {
  id: 'user-1',
  name: 'สมชาย',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Somchai',
  coins: 150000000000000000,
  memberSince: new Date('2024-01-15'),
  favoriteItems: ['pad-thai', 'tom-yum'],
  totalOrders: 23,
};

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    queueNumber: 42,
    items: [
      { menuItem: menuItems[0], quantity: 2, customizations: 'เผ็ดพิเศษ' },
      { menuItem: menuItems[4], quantity: 1 },
    ],
    totalPrice: 300,
    status: 'cooking',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    tableNumber: 5,
    orderType: 'game',
  },
  {
    id: 'order-2',
    queueNumber: 43,
    items: [
      { menuItem: menuItems[2], quantity: 1 },
      { menuItem: menuItems[6], quantity: 2 },
    ],
    totalPrice: 200,
    status: 'pending',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    tableNumber: 8,
    orderType: 'lazy',
  },
  {
    id: 'order-3',
    queueNumber: 44,
    items: [
      { menuItem: menuItems[3], quantity: 1 },
      { menuItem: menuItems[5], quantity: 1 },
    ],
    totalPrice: 210,
    status: 'ready',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    tableNumber: 3,
    userId: 'user-1',
    orderType: 'lazy',
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    userId: 'user-2',
    userName: 'นริศา',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Narisa',
    image: menuItems[0].image,
    caption: 'ผัดไทยอร่อยที่สุดในเมือง! 🍜✨ รสชาติกลมกล่อมลงตัว!',
    likes: 24,
    comments: [
      {
        id: 'comment-1',
        userId: 'user-3',
        userName: 'ประยุทธ์',
        text: 'ดูน่าอร่อยมาก! ต้องลอง!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ],
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    menuType: 'main',
  },
  {
    id: 'post-2',
    userId: 'user-3',
    userName: 'ประยุทธ์',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prayut',
    image: menuItems[2].image,
    caption: 'ท้าทายต้มยำสำเร็จ! 🔥🌶️ ปากแทบไหม้แต่คุ้ม!',
    likes: 31,
    comments: [],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    menuType: 'main',
  },
  {
    id: 'post-3',
    userId: 'user-4',
    userName: 'ศิริพร',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siriporn',
    image: menuItems[5].image,
    caption: 'ปิดท้ายมื้ออาหารที่สมบูรณ์แบบ 🥭 ข้าวเหนียวมะม่วงชนะเสมอ!',
    likes: 18,
    comments: [
      {
        id: 'comment-2',
        userId: 'user-1',
        userName: 'สมชาย',
        text: 'ดูดีมาก!',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    menuType: 'dessert',
  },
];

export const reviews: Review[] = [
  {
    id: 'review-1',
    orderId: 'order-1',
    userId: 'user-2',
    userName: 'นริศา',
    rating: 5,
    comment: 'อร่อยมาก! เกมทำอาหารทำให้การสั่งอาหารสนุกขึ้นเยอะ!',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    menuItems: ['ผัดไทย', 'ปอเปี๊ยะสด'],
  },
  {
    id: 'review-2',
    orderId: 'order-2',
    userId: 'user-3',
    userName: 'ประยุทธ์',
    rating: 4,
    comment: 'อาหารอร่อย แต่รอนานไปหน่อยช่วงเวลาเร่งด่วน',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    menuItems: ['ต้มยำกุ้ง', 'ชาไทยเย็น'],
  },
  {
    id: 'review-3',
    orderId: 'order-3',
    userId: 'user-4',
    userName: 'ศิริพร',
    rating: 5,
    comment: 'ชอบระบบเหรียญ หิว หิว หิว มาก! แซงคิวได้อาหารเร็วเลย!',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    menuItems: ['แกงเขียวหวาน'],
  },
];

export const salesData: SalesData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  revenue: Math.floor(Math.random() * 15000) + 8000,
  orders: Math.floor(Math.random() * 50) + 30,
}));

export const dishTypes = [
  { id: 'krapow', name: 'ผัดกระเพรา', basePrice: 50 },
  { id: 'chili-salt', name: 'คั่วพริกเกลือ', basePrice: 60 },
  { id: 'fried-rice', name: 'ข้าวผัด', basePrice: 50 },
  { id: 'yum-rice', name: 'ข้าวยำ', basePrice: 50 },
];

export const meats = [
  { id: 'pork-neck', name: 'สันคอหมูอบโอ่ง', price: 0 },
  { id: 'crispy-pork', name: 'หมูกรอบอบโอ่ง', price: 0 },
  { id: 'dolly-fish', name: 'ปลาดอลลี่', price: 0 },
  { id: 'chicken', name: 'ไก่', price: 0 },
  { id: 'minced-pork', name: 'หมูสับ', price: 0 },
  { id: 'pupa', name: 'ดักแด้', price: 0 },
  { id: 'pork-belly', name: 'สามชั้นสไลด์', price: 0 },
];

export const toppings = [
  { id: 'mushroom', name: 'เห็ด', price: 0 },
  { id: 'mala', name: 'หมาล่า', price: 0 },
  { id: 'fried-egg', name: 'ไข่ดาว', price: 10 },
  { id: 'omelette', name: 'ไข่เจียว', price: 10 },
  { id: 'creamy-omelette', name: 'ไข่ข้น', price: 10 },
];

export const sizes = [
    { id: 'regular', name: 'ธรรมดา', price: 0 },
    { id: 'special', name: 'พิเศษ', price: 10 },
    { id: 'extra-special', name: 'พิเศษตะโกน', price: 20 },
]

export const snacks = [
  { id: 'french-fries', name: 'เฟรนฟรายทอด', price: 50, image: 'https://images.unsplash.com/photo-1576107232684-827a33c242a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NTk4MjY2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'fried-mushroom', name: 'เห็ดทอด', price: 60, image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMG11c2hyb29tc3xlbnwxfHx8fDE3NTk4MjY2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'fried-potato', name: 'มันฝรั่งทอด', price: 50, image: 'https://images.unsplash.com/photo-1599490659213-e2b35678627b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjaGlwc3xlbnwxfHx8fDE3NTk4MjY2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export const seasonings = [
  { id: 'wing-zaap', name: 'วิ้งแซ่บ' },
  { id: 'paprika', name: 'ปาปริก้า' },
  { id: 'corn', name: 'ข้าวโพด' },
  { id: 'smoked-salmon', name: 'แซลมอนรมควัน' },
  { id: 'wasabi', name: 'วาซาบิ' },
];