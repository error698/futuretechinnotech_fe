
import * as Lucide from 'lucide-react';
const icons = [
  'ShoppingBag', 'Menu', 'X', 'Car', 'ShieldCheck', 'Sparkles',
  'ArrowRight', 'Award', 'Zap', 'ChevronRight', 'CheckCircle2',
  'Search', 'Plus', 'Eye', 'Check', 'Layers', 'Filter',
  'Shield', 'Droplets', 'Sun', 'Cpu', 'Cog', 'CheckCircle', 'ArrowUpRight',
  'Trash2', 'Minus', 'FileDown', 'Send', 'AlertCircle',
  'Phone', 'Mail', 'MapPin', 'Clock', 'Heart', 'TrendingUp', 'Users', 'Factory', 'Building2'
];

for (const icon of icons) {
  if (!Lucide[icon]) {
    console.log('MISSING ICON:', icon);
  }
}
console.log('Done checking icons.');
