import { Product } from '../../types';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 min-[1100px]:grid-cols-2 xl:grid-cols-5 xl:gap-4 min-[1100px]:max-xl:[&>*:last-child:nth-child(odd)]:col-span-2 min-[1100px]:max-xl:[&>*:last-child:nth-child(odd)]:justify-self-center min-[1100px]:max-xl:[&>*:last-child:nth-child(odd)]:w-1/2">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
