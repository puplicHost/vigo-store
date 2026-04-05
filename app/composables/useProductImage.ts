export function useProductImage(product: any): string {
  if (!product?.images) return '/placeholder-product.jpg'

  // If images is an array, return first image
  if (Array.isArray(product.images)) {
    return product.images[0] || '/placeholder-product.jpg'
  }

  // If images is a string (old format), return it
  if (typeof product.images === 'string') {
    return product.images
  }

  return '/placeholder-product.jpg'
}

export function useProductImages(product: any): string[] {
  if (!product?.images) return ['/placeholder-product.jpg']

  // If images is already an array
  if (Array.isArray(product.images)) {
    return product.images.length > 0 ? product.images : ['/placeholder-product.jpg']
  }

  // If images is a string (old format)
  if (typeof product.images === 'string') {
    return [product.images]
  }

  return ['/placeholder-product.jpg']
}
