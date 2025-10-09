import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ChefHat, Plus, Flame, Clock, Check } from 'lucide-react';
import { ingredients } from '../../data/mockData';
import { Ingredient } from '../../types';

interface CookingGameProps {
  onOrderComplete: (dishName: string, selectedIngredients: Ingredient[]) => void;
  onBack: () => void;
}

export function CookingGame({ onOrderComplete, onBack }: CookingGameProps) {
  const [gameStage, setGameStage] = useState<'select' | 'cook' | 'complete'>('select');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [cookingProgress, setCookingProgress] = useState(0);
  const [dishName, setDishName] = useState('');

  const toggleIngredient = (ingredient: Ingredient) => {
    if (selectedIngredients.find(i => i.id === ingredient.id)) {
      setSelectedIngredients(selectedIngredients.filter(i => i.id !== ingredient.id));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const startCooking = () => {
    setGameStage('cook');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setCookingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setGameStage('complete');
          generateDishName();
        }, 500);
      }
    }, 300);
  };

  const generateDishName = () => {
    const proteins = selectedIngredients.filter(i => i.category === 'protein');
    const veggies = selectedIngredients.filter(i => i.category === 'vegetable');
    
    const styles = ['ผัด', 'เผ็ด', 'หวาน', 'กรอบ', 'ไทย'];
    const style = styles[Math.floor(Math.random() * styles.length)];
    
    let name = style;
    if (proteins.length > 0) {
      name += ` ${proteins[0].name}`;
    }
    if (veggies.length > 0) {
      name += ` กับ ${veggies[0].name}`;
    }
    
    setDishName(name || 'เมนูลึกลับ');
  };

  if (gameStage === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack}>← กลับ</Button>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              <span>เกมทำอาหาร</span>
            </div>
          </div>

          <Card className="p-6 bg-white">
            <h2>🍳 เลือกวัตถุดิบของคุณ</h2>
            <p className="text-muted-foreground mt-2">
              เลือกวัตถุดิบเพื่อสร้างสรรค์เมนูของคุณ
            </p>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mt-2">
                เลือกแล้ว {selectedIngredients.length} อย่าง
              </p>
            </div>
          </Card>

          <div className="space-y-4">
            {['protein', 'vegetable', 'sauce', 'spice'].map(category => (
              <div key={category}>
                <h3 className="mb-3 capitalize">{category === 'protein' ? 'โปรตีน' : category === 'vegetable' ? 'ผัก' : category === 'sauce' ? 'ซอส' : 'เครื่องเทศ'}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ingredients
                    .filter(i => i.category === category)
                    .map(ingredient => {
                      const isSelected = selectedIngredients.find(i => i.id === ingredient.id);
                      return (
                        <Card
                          key={ingredient.id}
                          className={`p-4 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-orange-500 text-white border-orange-600'
                              : 'hover:bg-orange-50 hover:border-orange-200'
                          }`}
                          onClick={() => toggleIngredient(ingredient)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{ingredient.icon}</span>
                            <div className="flex-1">
                              <p className={isSelected ? 'text-white' : ''}>{ingredient.name}</p>
                            </div>
                            {isSelected && <Check className="w-5 h-5" />}
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={startCooking}
            disabled={selectedIngredients.length === 0}
            className="w-full py-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            <Flame className="w-5 h-5 mr-2" />
            เริ่มทำอาหาร! ({selectedIngredients.length} อย่าง)
          </Button>
        </div>
      </div>
    );
  }

  if (gameStage === 'cook') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-pink-500 p-6 flex items-center justify-center">
        <div className="max-w-md w-full space-y-6 text-center text-white">
          <div className="text-6xl animate-bounce">
            🍳
          </div>
          <h2 className="text-white">กำลังปรุงอาหาร...</h2>
          <div className="space-y-2">
            <Progress value={cookingProgress} className="h-4" />
            <p className="text-white/90">{cookingProgress}%</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/90">
            <Clock className="w-5 h-5 animate-spin" />
            <span>กำลังผสมวัตถุดิบและเครื่องปรุง...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl">✨</div>
          <h2>อาหารเสร็จแล้ว!</h2>
          <Card className="p-6 bg-white">
            <div className="aspect-video bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-6xl">{selectedIngredients[0]?.icon || '🍽️'}</div>
            </div>
            <h3>{dishName}</h3>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {selectedIngredients.map(ing => (
                <Badge key={ing.id} variant="secondary">
                  {ing.icon} {ing.name}
                </Badge>
              ))}
            </div>
          </Card>
          <p className="text-muted-foreground">
            🎉 โบนัส: +10 เหรียญ หิว หิว หิว สำหรับการเล่น!
          </p>
        </div>

        <Button
          onClick={() => onOrderComplete(dishName, selectedIngredients)}
          className="w-full py-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          ยืนยันออเดอร์
        </Button>

        <Button variant="outline" onClick={onBack} className="w-full">
          เริ่มใหม่
        </Button>
      </div>
    </div>
  );
}