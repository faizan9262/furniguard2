import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const popIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 },
};

const ProductSelectorCard = ({
  selectedCategory,
  filteredProducts,
  tempSelectedProduct,
  setTempSelectedProduct,
  addProductToList,
  selectedProducts,
  removeProductFromList,
}) => {
  // Handle product selection with duplicate check
  const handleAddProduct = (prod) => {
    const alreadyAdded = selectedProducts.some((p) => p._id === prod._id);
    if (alreadyAdded) {
      toast.error("Product already added");
      return;
    }
    addProductToList(prod);
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select Product</CardTitle>
        </CardHeader>
        <CardContent>
          {tempSelectedProduct && (
            <motion.div
              {...popIn}
              className="border my-4 p-4 rounded-xl bg-muted space-y-4"
            >
              <h2 className="text-center text-lg font-semibold text-primary sm:text-xl">
                Product Preview
              </h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6">
                <img
                  src={tempSelectedProduct.image}
                  alt={tempSelectedProduct.name}
                  className="w-28 h-28 sm:w-48 sm:h-48 rounded-lg object-cover"
                />
                <div className="flex-1 flex flex-col gap-2 text-xs sm:text-sm">
                  <div className="text-base sm:text-xl font-bold text-primary">
                    {tempSelectedProduct.name}
                  </div>
                  <p className="text-muted-foreground line-clamp-3">
                    {tempSelectedProduct.description}
                  </p>
                  <div className="text-sm sm:text-lg font-semibold text-primary">
                    ₹{tempSelectedProduct.price || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      className="text-[10px] sm:text-xs px-2 py-1"
                      onClick={() =>
                        window.location.assign(
                          `/products/${tempSelectedProduct.category}/${tempSelectedProduct.id}`
                        )
                      }
                    >
                      View Full Product
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedCategory ? (
            <div className="flex flex-col gap-3">
              {filteredProducts.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                  No products available in this category.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {filteredProducts.map((prod) => (
                    <motion.div
                      key={prod._id}
                      {...popIn}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer hover:shadow-sm hover:bg-muted text-center transition ${
                        tempSelectedProduct?._id === prod._id
                          ? "border-primary border-2 bg-secondary/10"
                          : "border-border"
                      }`}
                      onClick={() => setTempSelectedProduct(prod)}
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-24 h-24 object-cover rounded-xl mb-2"
                      />
                      <div className="text-xs font-medium">{prod.name}</div>
                      <div className="text-xs font-medium">
                        Starting: ₹{prod.price}
                      </div>
                      <button
                        className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full hover:bg-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddProduct(prod);
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedProducts.length > 0 && (
                <motion.div {...popIn}>
                  <Card className="w-full mt-6">
                    <CardHeader>
                      <CardTitle>Added Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProducts.map((product) => (
                          <motion.div
                            key={product._id}
                            {...popIn}
                            className="relative border p-3 rounded-xl bg-muted text-xs sm:text-sm"
                          >
                            <button
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                              onClick={() => removeProductFromList(product._id)}
                            >
                              <Minus size={14} />
                            </button>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                              />
                              <div className="flex-1 flex flex-col gap-1 sm:gap-2">
                                <div className="font-bold text-primary">
                                  {product.name}
                                </div>
                                <p className="text-muted-foreground line-clamp-3">
                                  {product.description}
                                </p>
                                <div className="font-semibold text-primary">
                                  ₹{product.price?.toLocaleString() || "N/A"}
                                </div>
                                <Button
                                  variant="outline"
                                  className="w-fit mt-1 text-[10px] sm:text-xs px-2 py-1"
                                  onClick={() =>
                                    window.location.assign(
                                      `/products/${product.category}/${product.id}`
                                    )
                                  }
                                >
                                  View Full Product
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">
              Select a category to view products
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSelectorCard;
