
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import ProductQuantityControl from "./ProductQuantityControl";
import { Product } from "@/types/product";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductQuickAddProps {
  product: Product;
  onClose: () => void;
}

const ProductQuickAdd: React.FC<ProductQuickAddProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<string>("Each");

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      toast.success(`Added ${quantity} ${product.name} (${selectedUnit}) to cart`);
      setIsAddingToCart(false);
      onClose();
    }, 500);
  };

  const totalPrice = quantity * product.price;

  return (
    <Card className="w-full max-w-3xl mx-auto relative">      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center bg-gray-50 p-4 rounded-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-60 object-contain"
            />
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">{product.name}</h2>
                {product.sku && (
                  <div className="text-sm text-gray-600 mt-1">
                    #{product.sku}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Quantity & Unit
                  </label>
                  <div className="flex items-center gap-2">
                    <div>
                      <ProductQuantityControl 
                        onQuantityChange={handleQuantityChange}
                        maxQuantity={999999}
                      />
                    </div>
                    <div className="w-32">
                      <Select 
                        value={selectedUnit} 
                        onValueChange={setSelectedUnit}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Each">Each</SelectItem>
                          <SelectItem value="Box">Box</SelectItem>
                          <SelectItem value="Case">Case</SelectItem>
                          <SelectItem value="Dozen">Dozen</SelectItem>
                          <SelectItem value="Pair">Pair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-700">Total Price</div>
                  <div className="font-semibold text-right">
                    <div className="text-sm text-gray-500">
                      {quantity} × ${product.price.toFixed(2)} per unit
                    </div>
                    <div className="text-xl text-slate-900">
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="w-1/2" onClick={onClose}>
                    View Details
                  </Button>
                  <Button 
                    className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductQuickAdd;
