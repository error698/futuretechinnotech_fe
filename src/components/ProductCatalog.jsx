import React, { useState, useMemo } from 'react';
import { Search, Eye, Car, Layers } from 'lucide-react';
import productsData from '../data/products.json';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ProductCatalog = ({ onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState('All Vehicles');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(productsData.map((p) => p.category))];
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Vehicle filter
      const matchesVehicle =
        selectedVehicle === 'All Vehicles' ||
        product.compatible_cars.some(
          (car) =>
            car.toLowerCase().includes(selectedVehicle.toLowerCase()) ||
            car.toLowerCase() === 'universal fit'
        );

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      // Search filter
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q);

      return matchesVehicle && matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedVehicle]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  return (
    <section id="catalog" className="transition-colors duration-300">
      <div className="container">
        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px] max-w-xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                id="catalog-search"
                type="text"
                placeholder="Search by part name, material, or car..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-11 pr-4 h-11 bg-card rounded-xl border-border/80 focus:border-primary text-sm shadow-sm w-full"
              />
            </div>

            {/* Active Filters Pill & Parts Count */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {selectedVehicle !== 'All Vehicles' && (
                <Badge variant="sky" className="gap-1.5 py-1 px-3">
                  <Car size={13} />
                  <span>{selectedVehicle}</span>
                  <button
                    onClick={() => setSelectedVehicle('All Vehicles')}
                    className="ml-1 hover:text-sky-900 dark:hover:text-white font-extrabold cursor-pointer"
                    aria-label="Clear vehicle filter"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== 'All' && (
                <Badge variant="outline" className="gap-1.5 py-1 px-3">
                  <span>Category: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="ml-1 hover:text-foreground font-extrabold cursor-pointer"
                    aria-label="Clear category filter"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                Showing <b className="text-foreground">{filteredProducts.length}</b> parts
              </span>
            </div>
          </div>

          {/* Category Tabs - Wraps gracefully across wide screens */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Button
                  key={cat}
                  variant={isSelected ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className="rounded-full shrink-0 h-9 px-4 text-xs font-semibold"
                >
                  {cat}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Product Grid - Automatically scales up to 5 and 6 columns on large / zoomed-out displays */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-card border border-dashed border-border/80">
            <p className="text-lg text-foreground font-bold mb-2">No matching products found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search query or vehicle filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 min-[1900px]:grid-cols-6 gap-5 sm:gap-6">
            {paginatedProducts.map((product) => {
              return (
                <Card
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="flex flex-col cursor-pointer overflow-hidden relative group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40"
                >
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="secondary" className="backdrop-blur-md bg-background/85 text-[11px] font-semibold border-border/80">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Image Container */}
                  <div className="h-52 bg-gradient-to-b from-[#1b2333] to-[#0c101a] flex items-center justify-center p-4 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                      className="max-h-40 max-w-[90%] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] transition-transform duration-400 group-hover:scale-105"
                    />
                    <div className="hidden flex-col items-center justify-center text-muted-foreground text-xs text-center p-2">
                      <Layers size={32} className="mb-2 text-primary" />
                      <span>{product.name}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="text-[11px] text-primary font-bold tracking-wider uppercase mb-1">
                        {product.id} • Tier-1 Spec
                      </div>

                      <h3 className="text-base font-bold text-foreground font-heading mb-2 leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div>
                      {/* Material Snippet */}
                      <div className="text-[11px] text-muted-foreground bg-muted/60 px-2.5 py-1.5 rounded-md border border-border/60 mb-4 truncate">
                        <b className="text-foreground">Material:</b> {product.material}
                      </div>

                      {/* Card Action */}
                      <div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="w-full rounded-xl gap-2 h-9 font-semibold text-xs border border-border/80 hover:border-primary/40 hover:text-primary transition-colors cursor-pointer"
                        >
                          <Eye size={14} />
                          <span>View Specifications</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-full"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentPage(page)}
                className="h-9 w-9 rounded-lg font-bold text-xs"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-full"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
