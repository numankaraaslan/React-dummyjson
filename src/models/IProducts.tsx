export interface IProducts {
    total: number
    skip: number
    limit: number
    products: Product[]
  }

export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    returnPolicy: string
    minimumOrderQuantity: number
    thumbnail: string
    images: string[]
    dimensions: Dimensions
    reviews: Review[]
    meta: Meta
  }
  
  export interface Dimensions {
    width: number
    height: number
    depth: number
  }
  
  export interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }
  
  export interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  