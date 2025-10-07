import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ShoppingCart, Plus, Minus, Utensils, Popcorn } from 'lucide-react';
import { OrderItem } from '../../types';
import { dishTypes, meats, toppings, snacks, seasonings, sizes } from '../../data/mockData';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface ManualOrderProps {
  onOrderComplete: (items: OrderItem[]) => void;
  onBack: () => void;
}

export function ManualOrder({ onOrderComplete, onBack }: ManualOrderProps) {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [activeTab, setActiveTab] = useState('main');

  // State for Main Dish Builder
  const [selectedDishTypeId, setSelectedDishTypeId] = useState<string | null>(null);
  const [selectedMeatIds, setSelectedMeatIds] = useState<string[]>([]);
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);
  const [selectedSizeId, setSelectedSizeId] = useState<string>('regular');
  
  // State for Snack Builder
  const [selectedSnackId, setSelectedSnackId] = useState<string | null>(null);
  const [selectedSeasoningId, setSelectedSeasoningId] = useState<string | null>(null);

  const resetMainDishBuilder = () => {
    setSelectedDishTypeId(null);
    setSelectedMeatIds([]);
    setSelectedToppingIds([]);
    setSelectedSizeId('regular');
  }

  const resetSnackBuilder = () => {
    setSelectedSnackId(null);
    setSelectedSeasoningId(null);
  }

  const handleMeatSelection = (meatId: string) => {
    setSelectedMeatIds(prev => {
        if(prev.includes(meatId)) {
            return prev.filter(id => id !== meatId);
        } else {
            if(prev.length < 3) {
                return [...prev, meatId];
            }
            return prev;
        }
    })
  }

  const addCustomDishToCart = () => {
    if (!selectedDishTypeId || selectedMeatIds.length === 0) {
      alert("กรุณาเลือกประเภทเมนูและเนื้อสัตว์อย่างน้อย 1 อย่าง");
      return;
    }

    const dishType = dishTypes.find(d => d.id === selectedDishTypeId);
    const selectedMeats = meats.filter(m => selectedMeatIds.includes(m.id));
    const selectedToppings = toppings.filter(t => selectedToppingIds.includes(t.id));
    const size = sizes.find(s => s.id === selectedSizeId);

    if (!dishType || selectedMeats.length === 0 || !size) return;

    let totalPrice = dishType.basePrice + size.price;
    const meatNames = selectedMeats.map(m => m.name).join(', ');
    let name = `${dishType.name} ${meatNames} (${size.name})`;
    let customizations = [];

    if (selectedToppings.length > 0) {
      selectedToppings.forEach(t => totalPrice += t.price);
      const toppingNames = selectedToppings.map(t => t.name).join(', ');
      customizations.push(`เพิ่ม: ${toppingNames}`);
    }

    const newItem: OrderItem = {
      menuItem: {
        id: `custom-${Date.now()}`,
        name: name,
        price: totalPrice,
        category: 'main',
        description: `${dishType.name} ${meatNames}, ${customizations.join(', ')}`,
        image: '', // No image for custom items
        spicyLevel: 0,
        isAvailable: true,
      },
      quantity: 1,
      customizations: customizations.join(', '),
    };

    setCart([...cart, newItem]);
    resetMainDishBuilder();
  };
  
  const addSnackToCart = () => {
    if(!selectedSnackId) {
        alert("กรุณาเลือกของทานเล่น");
        return;
    }

    const snack = snacks.find(s => s.id === selectedSnackId);
    const seasoning = seasonings.find(s => s.id === selectedSeasoningId);
    
    if(!snack) return;

    let name = snack.name;
    if(seasoning) {
        name += ` (ผงคลุก: ${seasoning.name})`;
    }

    const newItem: OrderItem = {
        menuItem: {
            id: `snack-${Date.now()}`,
            name: name,
            price: snack.price,
            category: 'appetizer',
            description: name,
            image: snack.image,
            spicyLevel: 0,
            isAvailable: true,
        },
        quantity: 1,
    }

    setCart([...cart, newItem]);
    resetSnackBuilder();
  }

  const updateQuantity = (itemId: string, delta: number) => {
    const updatedCart = cart.map(item => {
      if (item.menuItem.id === itemId) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>← กลับ</Button>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>{totalItems} ชิ้น</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 pb-48">
        <div className="mb-6">
          <h2>สร้างเมนูของคุณเอง</h2>
          <p className="text-muted-foreground">เลือกส่วนประกอบต่างๆ เพื่อสร้างเมนูจานโปรด</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="main" className="flex-1"><Utensils className="w-4 h-4 mr-2"/>เมนูหลัก</TabsTrigger>
            <TabsTrigger value="snack" className="flex-1"><Popcorn className="w-4 h-4 mr-2"/>ของทานเล่น</TabsTrigger>
          </TabsList>
          
          <TabsContent value="main" className="mt-6">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="mb-4">1. เลือกประเภทเมนู</h3>
                <RadioGroup value={selectedDishTypeId ?? ''} onValueChange={setSelectedDishTypeId} className="grid grid-cols-2 gap-4">
                  {dishTypes.map(dish => (
                    <Label key={dish.id} htmlFor={dish.id} className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-300">
                      <div>
                        <p>{dish.name}</p>
                        <p className="text-sm text-muted-foreground">เริ่มต้น {dish.basePrice} บาท</p>
                      </div>
                      <RadioGroupItem value={dish.id} id={dish.id} />
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-4">2. เลือกขนาด</h3>
                <RadioGroup value={selectedSizeId} onValueChange={setSelectedSizeId} className="grid grid-cols-3 gap-4">
                    {sizes.map(size => (
                         <Label key={size.id} htmlFor={size.id} className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-300">
                            <span>{size.name} (+{size.price} บาท)</span>
                            <RadioGroupItem value={size.id} id={size.id} />
                        </Label>
                    ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-4">3. เลือกเนื้อสัตว์ (เลือกได้สูงสุด 3 อย่าง)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {meats.map(meat => (
                    <div key={meat.id} className="flex items-center space-x-2 border rounded-md p-4 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-300">
                        <Checkbox 
                            id={`meat-${meat.id}`} 
                            checked={selectedMeatIds.includes(meat.id)}
                            onCheckedChange={() => handleMeatSelection(meat.id)}
                            disabled={!selectedMeatIds.includes(meat.id) && selectedMeatIds.length >= 3}
                        />
                        <Label htmlFor={`meat-${meat.id}`} className="cursor-pointer">{meat.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4">4. เลือกท๊อปปิ้ง (เลือกได้หลายอย่าง)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {toppings.map(topping => (
                     <div key={topping.id} className="flex items-center space-x-2 border rounded-md p-4 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-300">
                        <Checkbox 
                          id={`topping-${topping.id}`} 
                          checked={selectedToppingIds.includes(topping.id)}
                          onCheckedChange={(checked) => {
                            setSelectedToppingIds(prev => checked ? [...prev, topping.id] : prev.filter(id => id !== topping.id))
                          }}
                        />
                        <Label htmlFor={`topping-${topping.id}`} className="cursor-pointer">{topping.name} {topping.price > 0 ? `(+${topping.price} บาท)` : ''}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={addCustomDishToCart} className="w-full mt-6" disabled={!selectedDishTypeId || selectedMeatIds.length === 0}>
                <Plus className="w-4 h-4 mr-2"/>เพิ่มเมนูหลักลงตะกร้า
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="snack" className="mt-6">
             <Card className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4">1. เลือกของทานเล่น</h3>
                  <RadioGroup value={selectedSnackId ?? ''} onValueChange={setSelectedSnackId} className="grid grid-cols-2 gap-4">
                      {snacks.map(snack => (
                        <Label key={snack.id} htmlFor={`snack-${snack.id}`} className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-300">
                          <div>
                            <p>{snack.name}</p>
                            <p className="text-sm text-muted-foreground">{snack.price} บาท</p>
                          </div>
                          <RadioGroupItem value={snack.id} id={`snack-${snack.id}`} />
                        </Label>
                      ))}
                  </RadioGroup>
                </div>

                {selectedSnackId && (
                  <div>
                    <h3 className="mb-4">2. เลือกผงคลุก (เลือกได้ 1 อย่าง)</h3>
                    <RadioGroup value={selectedSeasoningId ?? ''} onValueChange={setSelectedSeasoningId} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {seasonings.map(s => (
                          <Label key={s.id} htmlFor={`seasoning-${s.id}`} className="border rounded-md p-4 flex justify-between items-center cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-300">
                              <span>{s.name}</span>
                              <RadioGroupItem value={s.id} id={`seasoning-${s.id}`} />
                          </Label>
                        ))}
                    </RadioGroup>
                  </div>
                )}
                <Button onClick={addSnackToCart} className="w-full mt-6" disabled={!selectedSnackId}>
                    <Plus className="w-4 h-4 mr-2"/>เพิ่มของทานเล่นลงตะกร้า
                </Button>
             </Card>
          </TabsContent>
        </Tabs>
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="max-w-4xl mx-auto space-y-3">
            <Card className="p-4 max-h-48 overflow-y-auto">
                {cart.map(item => (
                    <div key={item.menuItem.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <span className="text-sm flex-1">{item.menuItem.name}</span>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.menuItem.id, -1)}><Minus className="w-3 h-3"/></Button>
                            <span>{item.quantity}</span>
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.menuItem.id, 1)}><Plus className="w-3 h-3"/></Button>
                        </div>
                        <span className="w-16 text-right text-sm">฿{item.menuItem.price * item.quantity}</span>
                    </div>
                ))}
            </Card>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm text-muted-foreground">{totalItems} ชิ้น</p>
                <p className="font-bold text-lg">รวม: ฿{totalPrice}</p>
              </div>
              <Button
                onClick={() => onOrderComplete(cart)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-6 text-lg"
              >
                สั่งอาหาร
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}