import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface SkinSet {
  id: number;
  name: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythic';
  price: number;
  weapons: string[];
  color: string;
  image: string;
  description: string;
}

const skinSets: SkinSet[] = [
  {
    id: 1,
    name: 'Cyber Neon',
    rarity: 'Legendary',
    price: 850,
    weapons: ['AK-47', 'AWP', 'M4A4'],
    color: 'Purple',
    image: 'https://cdn.poehali.dev/projects/4dc74478-7141-4336-87e2-473361912ab4/files/b010a2d2-337b-482e-8eb6-f6b246e8bb29.jpg',
    description: 'Футуристический набор с неоновой подсветкой'
  },
  {
    id: 2,
    name: 'Electric Storm',
    rarity: 'Mythic',
    price: 1200,
    weapons: ['AWP', 'Glock', 'Knife'],
    color: 'Blue',
    image: 'https://cdn.poehali.dev/projects/4dc74478-7141-4336-87e2-473361912ab4/files/efe00f35-2d74-41de-a2f7-37e94568a3d7.jpg',
    description: 'Редчайший набор с электрическими эффектами'
  },
  {
    id: 3,
    name: 'Golden Emperor',
    rarity: 'Legendary',
    price: 950,
    weapons: ['Knife', 'Desert Eagle', 'AK-47'],
    color: 'Gold',
    image: 'https://cdn.poehali.dev/projects/4dc74478-7141-4336-87e2-473361912ab4/files/29fb07d4-ec5f-40d6-afa5-4799e2c523eb.jpg',
    description: 'Роскошный набор с золотыми паттернами'
  },
  {
    id: 4,
    name: 'Crimson Rage',
    rarity: 'Rare',
    price: 450,
    weapons: ['M4A1-S', 'USP-S', 'Karambit'],
    color: 'Red',
    image: 'https://cdn.poehali.dev/projects/4dc74478-7141-4336-87e2-473361912ab4/files/b010a2d2-337b-482e-8eb6-f6b246e8bb29.jpg',
    description: 'Агрессивный дизайн для решительных игроков'
  },
  {
    id: 5,
    name: 'Arctic Frost',
    rarity: 'Uncommon',
    price: 280,
    weapons: ['M4A4', 'AWP', 'P250'],
    color: 'Blue',
    image: 'https://cdn.poehali.dev/projects/4dc74478-7141-4336-87e2-473361912ab4/files/efe00f35-2d74-41de-a2f7-37e94568a3d7.jpg',
    description: 'Холодный минималистичный стиль'
  },
  {
    id: 6,
    name: 'Neon Dreams',
    rarity: 'Legendary',
    price: 780,
    weapons: ['AK-47', 'Butterfly Knife', 'AWP'],
    color: 'Purple',
    image: 'https://cdn.poehali.dev/projects/4dc74478-7141-4336-87e2-473361912ab4/files/29fb07d4-ec5f-40d6-afa5-4799e2c523eb.jpg',
    description: 'Киберпанк вайб с яркими красками'
  }
];

const rarityColors = {
  Common: 'bg-gray-500',
  Uncommon: 'bg-green-500',
  Rare: 'bg-blue-500',
  Legendary: 'bg-purple-500',
  Mythic: 'bg-amber-500'
};

export default function Index() {
  const [selectedSet, setSelectedSet] = useState<SkinSet | null>(null);
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [weaponFilter, setWeaponFilter] = useState<string>('all');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1500]);

  const allWeapons = Array.from(new Set(skinSets.flatMap(set => set.weapons)));
  const allColors = Array.from(new Set(skinSets.map(set => set.color)));

  const filteredSets = skinSets.filter(set => {
    if (rarityFilter !== 'all' && set.rarity !== rarityFilter) return false;
    if (weaponFilter !== 'all' && !set.weapons.includes(weaponFilter)) return false;
    if (colorFilter !== 'all' && set.color !== colorFilter) return false;
    if (set.price < priceRange[0] || set.price > priceRange[1]) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(155, 135, 245, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 text-glow">
              CS2 SKIN SETS
            </h1>
            <p className="text-xl text-muted-foreground">
              Коллекция эксклюзивных сетов скинов для Counter-Strike 2
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Shield" className="text-primary" size={24} />
                <h3 className="font-semibold">Редкость</h3>
              </div>
              <Select value={rarityFilter} onValueChange={setRarityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все редкости" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все редкости</SelectItem>
                  <SelectItem value="Mythic">Mythic</SelectItem>
                  <SelectItem value="Legendary">Legendary</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Uncommon">Uncommon</SelectItem>
                  <SelectItem value="Common">Common</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Crosshair" className="text-secondary" size={24} />
                <h3 className="font-semibold">Оружие</h3>
              </div>
              <Select value={weaponFilter} onValueChange={setWeaponFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все оружия" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все оружия</SelectItem>
                  {allWeapons.map(weapon => (
                    <SelectItem key={weapon} value={weapon}>{weapon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Palette" className="text-accent" size={24} />
                <h3 className="font-semibold">Цвет</h3>
              </div>
              <Select value={colorFilter} onValueChange={setColorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все цвета" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все цвета</SelectItem>
                  {allColors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="DollarSign" className="text-primary" size={24} />
                <h3 className="font-semibold">Цена: ${priceRange[0]} - ${priceRange[1]}</h3>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1500}
                step={50}
                className="mt-4"
              />
            </Card>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Найдено сетов: <span className="text-primary font-semibold">{filteredSets.length}</span>
            </p>
            <Button variant="outline" onClick={() => {
              setRarityFilter('all');
              setWeaponFilter('all');
              setColorFilter('all');
              setPriceRange([0, 1500]);
            }}>
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Сбросить фильтры
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set, index) => (
              <Card
                key={set.id}
                className="group overflow-hidden bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary transition-all cursor-pointer hover:scale-105 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedSet(set)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={set.image}
                    alt={set.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <Badge className={`absolute top-4 right-4 ${rarityColors[set.rarity]} ${set.rarity === 'Mythic' ? 'animate-pulse-glow' : ''}`}>
                    {set.rarity}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{set.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{set.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {set.weapons.map(weapon => (
                      <Badge key={weapon} variant="outline" className="border-primary/40">
                        {weapon}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="DollarSign" className="text-accent" size={20} />
                      <span className="text-2xl font-bold text-accent">{set.price}</span>
                    </div>
                    <Button className="glow-primary">
                      Подробнее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredSets.length === 0 && (
            <div className="text-center py-16">
              <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Сеты не найдены</h3>
              <p className="text-muted-foreground mb-6">Попробуйте изменить параметры фильтров</p>
              <Button onClick={() => {
                setRarityFilter('all');
                setWeaponFilter('all');
                setColorFilter('all');
                setPriceRange([0, 1500]);
              }}>
                Сбросить все фильтры
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedSet} onOpenChange={() => setSelectedSet(null)}>
        <DialogContent className="max-w-3xl bg-card border-primary/20">
          {selectedSet && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                  {selectedSet.name}
                  <Badge className={`${rarityColors[selectedSet.rarity]}`}>
                    {selectedSet.rarity}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedSet.image}
                    alt={selectedSet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Описание</h4>
                    <p className="text-lg">{selectedSet.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Оружие в наборе</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSet.weapons.map(weapon => (
                        <Badge key={weapon} variant="outline" className="border-primary/40 text-base px-3 py-1">
                          {weapon}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Цветовая гамма</h4>
                    <Badge className="text-base px-3 py-1">{selectedSet.color}</Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Цена набора</p>
                      <p className="text-3xl font-bold text-accent flex items-center gap-1">
                        <Icon name="DollarSign" size={28} />
                        {selectedSet.price}
                      </p>
                    </div>
                    <Button size="lg" className="glow-primary">
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Купить сет
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
