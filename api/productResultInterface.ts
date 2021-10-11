export interface ResultInterface {
    error: boolean;
    errorMessage: string| null;
}

export interface RatingInterface {
    number: number
    total: number
}

export interface AvailabilityInterface {
    stockFrom?: string
    stock: boolean
    stockCount?: number
}

export interface PictureInterface {
    alt?: string
    src: string
}

export interface PricesInterface {
    price: number
    list_price: number|undefined
    percentage: number|undefined
}

export interface DeliveryDataInterface {
    fulfillBy: any
    vendorDeliveryDay: string
}

export interface VariationOptionInterface {
    image: string|undefined
    label: string
    sku: string
    optionCode: string
    selected: boolean
    available: boolean
    prices: PricesInterface|undefined
    deliveryData: DeliveryDataInterface
    availability: AvailabilityInterface,
    images: PictureInterface[];
    variationAvailabilityMap?: {
        [key: string]: string[]
    }
}

export interface VariationCombinationInterface {
    [key: string]: {
        availability: AvailabilityInterface,
        prices: PricesInterface| undefined,
        deliveryData: DeliveryDataInterface
    }
}

export interface VariationInterface {
    variation_label: string
    options: VariationOptionInterface[]
    variation_code: string
    variation_display_type: 'select' | 'image' | 'plain_text' | 'background'
    variation_action: 'scrap' | 'option'
}

export interface SliderItemInterface {
    name: string
    price: number
    percentage: number
    listPrice: number
    sku: string
    image: string
    rating: RatingInterface
}

export interface SliderInterface {
    title: string
    items: SliderItemInterface[]
}

export interface ProductInterface {
    sku: string
    vendor_url: string
    merchantUrl: string;
    name: string
    short_description: string
    large_description: string
    category: string[]
    brand: string
    newProductUrl: any
    productStatus: string
    weight: number
    rating: RatingInterface | null
    dimension: string
    isbn: string
    availability: AvailabilityInterface
    images: PictureInterface[]
    prices: PricesInterface
    variations: VariationInterface[]
    deliveryData: DeliveryDataInterface
    sliders: SliderInterface[],
    variationsCombination?: VariationCombinationInterface[],
    merchant_returns: boolean;
    is_digital_product: boolean;
}

export interface ProductResultInterface extends ResultInterface{
    product: ProductInterface,
    merchantName: string
}
