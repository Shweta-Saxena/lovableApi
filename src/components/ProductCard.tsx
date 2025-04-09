
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import ProductQuickAdd from "./ProductQuickAdd";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const handleQuickAddOpen = () => {
    setIsQuickAddOpen(true);
  };

  const handleQuickAddClose = () => {
    setIsQuickAddOpen(false);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardContent className="p-4 flex-grow">
          <div className="aspect-square relative mb-4 bg-gray-50 rounded-md flex items-center justify-center p-2">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10">
            {product.name}
          </h3>
          <div className="text-sm text-gray-500 mb-2">
            SKU: {product.sku || "N/A"}
          </div>
          <div className="font-semibold">${product.price.toFixed(2)}</div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-4">
          <Button 
            onClick={handleQuickAddOpen} 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative"
          >
            Quick Add
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isQuickAddOpen} onOpenChange={setIsQuickAddOpen}>
        <DialogContent className="max-w-3xl p-0">
          <ProductQuickAdd product={product} onClose={handleQuickAddClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
