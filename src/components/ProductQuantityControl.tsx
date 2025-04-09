
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductQuantityControlProps {
  initialQuantity?: number;
  maxQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const ProductQuantityControl: React.FC<ProductQuantityControlProps> = ({
  initialQuantity = 1,
  maxQuantity = 999999,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    } else {
      toast.error(`Maximum quantity is ${maxQuantity}`);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    } else {
      toast.info("Minimum quantity is 1");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < 1) {
        setQuantity(1);
        onQuantityChange?.(1);
      } else if (value > maxQuantity) {
        setQuantity(maxQuantity);
        onQuantityChange?.(maxQuantity);
      } else {
        setQuantity(value);
        onQuantityChange?.(value);
      }
    }
  };

  return (
    <div className="flex items-center h-10 border rounded-md overflow-hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDecrement} 
        className="h-full rounded-none border-r"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        className="h-full w-20 text-center focus:outline-none"
        min={1}
        max={maxQuantity}
      />
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleIncrement} 
        className="h-full rounded-none border-l"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductQuantityControl;
