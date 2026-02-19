export interface ProductColor {
    name: string;
    hex: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    salePrice: number | null;
    currency: string;
    category: string;
    images: string[];
    colors: ProductColor[];
    sizes: string[];
    fabric: string;
    care: string;
    features: string[];
    sku: string;
    inStock: boolean;
    badge: string | null;
    rating: number;
    reviewCount: number;
    featured: boolean;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
}

export const categories: Category[] = [
    {
        id: "cat-001",
        name: "Agbada",
        slug: "agbada",
        description: "Traditional flowing robes for the distinguished gentleman",
        image: "/assets/images/IMG_9536.jpeg",
    },
    {
        id: "cat-002",
        name: "Senator",
        slug: "senator",
        description: "Modern senator wear for power and elegance",
        image: "/assets/images/IMG_9642.jpeg",
    },
    {
        id: "cat-003",
        name: "Kaftan",
        slug: "kaftan",
        description: "Cultural kaftan styles for every occasion",
        image: "/assets/images/IMG_9598.jpeg",
    },
];

export const products: Product[] = [
    {
        id: "prod-001",
        name: "Classic Agbada Set",
        slug: "classic-agbada-set",
        description:
            "Traditional agbada crafted from premium imported fabric. Features intricate hand-embroidery and authentic Nigerian patterns. Perfect for weddings, ceremonies, and special occasions.",
        price: 75000,
        salePrice: null,
        currency: "NGN",
        category: "Agbada",
        images: [
            "/assets/images/IMG_9536.jpeg",
            "/assets/images/IMG_9598.jpeg",
            "/assets/images/IMG_9642.jpeg",
            "/assets/images/IMG_9765.jpeg",
        ],
        colors: [
            { name: "Black", hex: "#000000" },
            { name: "White", hex: "#FFFFFF" },
            { name: "Gold", hex: "#D4AF37" },
        ],
        sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
        fabric: "100% Premium Cotton Blend",
        care: "Dry clean only",
        features: [
            "Hand-embroidered details",
            "Includes: Top, Trousers, Hat",
            "Available in custom sizes",
            "Traditional Nigerian craftsmanship",
        ],
        sku: "AG-001",
        inStock: true,
        badge: "New",
        rating: 4.8,
        reviewCount: 12,
        featured: true,
    },
    {
        id: "prod-002",
        name: "Modern Senator Wear",
        slug: "modern-senator-wear",
        description:
            "Contemporary senator design with slim-fit tailoring. Made from breathable fabric perfect for Nigeria's climate. Ideal for business meetings and formal events.",
        price: 45000,
        salePrice: 38000,
        currency: "NGN",
        category: "Senator",
        images: [
            "/assets/images/IMG_9642.jpeg",
            "/assets/images/IMG_9536.jpeg",
            "/assets/images/IMG_0006.JPG",
            "/assets/images/IMG_0008.JPG",
        ],
        colors: [
            { name: "Navy Blue", hex: "#000080" },
            { name: "Charcoal", hex: "#36454F" },
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        fabric: "Cotton-Polyester Blend",
        care: "Machine wash cold",
        features: [
            "Slim-fit design",
            "Breathable fabric",
            "Modern styling",
            "Available in multiple colors",
        ],
        sku: "SEN-001",
        inStock: true,
        badge: "Sale",
        rating: 4.5,
        reviewCount: 8,
        featured: true,
    },
    {
        id: "prod-003",
        name: "Royal Kaftan Supreme",
        slug: "royal-kaftan-supreme",
        description:
            "Hand-dyed kaftan featuring traditional Yoruba patterns. A perfect blend of heritage art and contemporary silhouette for the modern Nigerian man.",
        price: 55000,
        salePrice: null,
        currency: "NGN",
        category: "Kaftan",
        images: [
            "/assets/images/IMG_9598.jpeg",
            "/assets/images/IMG_9536.jpeg",
            "/assets/images/IMG_9642.jpeg",
            "/assets/images/IMG_9765.jpeg",
        ],
        colors: [
            { name: "Indigo", hex: "#4B0082" },
            { name: "Sky Blue", hex: "#87CEEB" },
        ],
        sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
        fabric: "Premium Silk Blend",
        care: "Dry clean recommended",
        features: [
            "Hand-dyed fabric",
            "Traditional Yoruba patterns",
            "Premium silk blend",
            "Comfortable fit",
        ],
        sku: "KAF-001",
        inStock: true,
        badge: null,
        rating: 4.9,
        reviewCount: 15,
        featured: true,
    },
    {
        id: "prod-004",
        name: "Grand Senator Suite",
        slug: "grand-senator-suite",
        description:
            "The ultimate power statement. This Senator suite features precision-tailored lines and subtle gold piping on the placket and cuffs.",
        price: 95000,
        salePrice: null,
        currency: "NGN",
        category: "Senator",
        images: [
            "/assets/images/IMG_0006.JPG",
            "/assets/images/IMG_9642.jpeg",
            "/assets/images/IMG_9536.jpeg",
            "/assets/images/IMG_0008.JPG",
        ],
        colors: [
            { name: "Charcoal Black", hex: "#1A1A1A" },
            { name: "Silver Gray", hex: "#C0C0C0" },
        ],
        sizes: ["M", "L", "XL", "XXL", "Custom"],
        fabric: "Italian Wool Blend",
        care: "Dry clean only",
        features: [
            "Precision-tailored lines",
            "Gold piping accents",
            "Italian wool blend",
            "Power silhouette",
        ],
        sku: "SEN-002",
        inStock: true,
        badge: "New",
        rating: 4.9,
        reviewCount: 22,
        featured: true,
    },
    {
        id: "prod-005",
        name: "Buba & Sokoto Essentials",
        slug: "buba-sokoto-essentials",
        description:
            "Essential Nigerian loungewear redefined. Soft, breathable cotton Buba and tailored Sokoto trousers for effortless style at home or casual outings.",
        price: 28000,
        salePrice: 22000,
        currency: "NGN",
        category: "Kaftan",
        images: [
            "/assets/images/IMG_0009.JPG",
            "/assets/images/IMG_0010.JPG",
            "/assets/images/IMG_9765.jpeg",
            "/assets/images/IMG_9598.jpeg",
        ],
        colors: [
            { name: "Black Sand", hex: "#2C2C2C" },
            { name: "Terracotta", hex: "#E2725B" },
        ],
        sizes: ["S", "M", "L", "XL"],
        fabric: "100% Organic Cotton",
        care: "Machine wash cold",
        features: [
            "Soft, breathable cotton",
            "Relaxed comfortable fit",
            "Includes Buba top and Sokoto trousers",
            "Perfect for casual occasions",
        ],
        sku: "KAF-002",
        inStock: true,
        badge: "Sale",
        rating: 4.6,
        reviewCount: 34,
        featured: false,
    },
    {
        id: "prod-006",
        name: "Imperial Agbada Royale",
        slug: "imperial-agbada-royale",
        description:
            "A signature three-piece Agbada set meticulously embroidered with premium metallic threads. Crafted from heavy-weight Aso-Oke fabric for the distinguished modern man.",
        price: 120000,
        salePrice: null,
        currency: "NGN",
        category: "Agbada",
        images: [
            "/assets/images/IMG_9765.jpeg",
            "/assets/images/IMG_9536.jpeg",
            "/assets/images/IMG_9598.jpeg",
            "/assets/images/IMG_9642.jpeg",
        ],
        colors: [
            { name: "Royal Purple", hex: "#7851A9" },
            { name: "Midnight Blue", hex: "#191970" },
            { name: "Forest Green", hex: "#228B22" },
        ],
        sizes: ["M", "L", "XL", "XXL", "Custom"],
        fabric: "Premium Aso-Oke Fabric",
        care: "Dry clean only",
        features: [
            "Metallic thread embroidery",
            "Heavy-weight Aso-Oke fabric",
            "Three-piece set",
            "Ceremony & wedding ready",
        ],
        sku: "AG-002",
        inStock: true,
        badge: null,
        rating: 5.0,
        reviewCount: 7,
        featured: true,
    },
    {
        id: "prod-007",
        name: "Lace Glamour Wrapper Set",
        slug: "lace-glamour-wrapper-set",
        description:
            "Intricately woven Swiss lace wrapper and blouse set. Designed for weddings and high-profile traditional ceremonies with an air of sophistication.",
        price: 85000,
        salePrice: null,
        currency: "NGN",
        category: "Accessories",
        images: [
            "/assets/images/IMG_0008.JPG",
            "/assets/images/IMG_7260.JPG",
            "/assets/images/IMG_7265.JPG",
            "/assets/images/IMG_7266.JPG",
        ],
        colors: [
            { name: "Champagne Gold", hex: "#F7E7CE" },
            { name: "Dusty Rose", hex: "#DCAE96" },
        ],
        sizes: ["S", "M", "L", "XL"],
        fabric: "Swiss Lace",
        care: "Hand wash with care",
        features: [
            "Swiss lace material",
            "Intricate woven pattern",
            "Wrapper and blouse set",
            "Perfect for ceremonies",
        ],
        sku: "ACC-001",
        inStock: true,
        badge: null,
        rating: 4.8,
        reviewCount: 18,
        featured: false,
    },
    {
        id: "prod-008",
        name: "Onyx Leather Chelsea Boots",
        slug: "onyx-leather-chelsea-boots",
        description:
            "Handcrafted Chelsea boots in black onyx leather. A timeless classic with a contemporary minimalist edge, perfect to complement any traditional outfit.",
        price: 42000,
        salePrice: 35000,
        currency: "NGN",
        category: "Accessories",
        images: [
            "/assets/images/IMG_9311.JPG",
            "/assets/images/IMG_9313.JPG",
            "/assets/images/IMG_0010.JPG",
            "/assets/images/IMG_0009.JPG",
        ],
        colors: [{ name: "Black", hex: "#000000" }],
        sizes: ["40", "41", "42", "43", "44", "45"],
        fabric: "Premium Leather",
        care: "Polish regularly, avoid water",
        features: [
            "Handcrafted leather",
            "Minimalist design",
            "Durable sole",
            "Comfortable fit",
        ],
        sku: "ACC-002",
        inStock: true,
        badge: "Sale",
        rating: 4.7,
        reviewCount: 28,
        featured: false,
    },
    {
        id: "prod-009",
        name: "Platinum Senator Classic",
        slug: "platinum-senator-classic",
        description:
            "A refined senator wear in platinum gray with elegant button detailing. Perfect for formal occasions and executive meetings.",
        price: 52000,
        salePrice: null,
        currency: "NGN",
        category: "Senator",
        images: [
            "/assets/images/IMG_7260.JPG",
            "/assets/images/IMG_7265.JPG",
            "/assets/images/IMG_9642.jpeg",
            "/assets/images/IMG_0006.JPG",
        ],
        colors: [
            { name: "Gray", hex: "#808080" },
            { name: "White", hex: "#FFFFFF" },
        ],
        sizes: ["S", "M", "L", "XL"],
        fabric: "Premium Cotton Blend",
        care: "Dry clean recommended",
        features: [
            "Elegant button detailing",
            "Premium cotton blend",
            "Classic fit",
            "Executive styling",
        ],
        sku: "SEN-003",
        inStock: true,
        badge: null,
        rating: 4.4,
        reviewCount: 11,
        featured: false,
    },
    {
        id: "prod-010",
        name: "Heritage Kaftan Deluxe",
        slug: "heritage-kaftan-deluxe",
        description:
            "A luxurious kaftan inspired by ancient Nigerian royalty. Features hand-stitched embroidery along the neckline and sleeves with premium Atiku fabric.",
        price: 68000,
        salePrice: null,
        currency: "NGN",
        category: "Kaftan",
        images: [
            "/assets/images/IMG_7265.JPG",
            "/assets/images/IMG_9598.jpeg",
            "/assets/images/IMG_7266.JPG",
            "/assets/images/IMG_9536.jpeg",
        ],
        colors: [
            { name: "Cream", hex: "#FFFDD0" },
            { name: "Brown", hex: "#8B4513" },
        ],
        sizes: ["M", "L", "XL", "XXL", "Custom"],
        fabric: "Premium Atiku Fabric",
        care: "Dry clean only",
        features: [
            "Hand-stitched embroidery",
            "Premium Atiku fabric",
            "Royalty-inspired design",
            "Comfortable and breathable",
        ],
        sku: "KAF-003",
        inStock: true,
        badge: "New",
        rating: 4.9,
        reviewCount: 6,
        featured: true,
    },
    {
        id: "prod-011",
        name: "Ceremonial Agbada Grand",
        slug: "ceremonial-agbada-grand",
        description:
            "An opulent ceremonial Agbada with extensive gold-thread embroidery. This statement piece is designed for the most important life celebrations.",
        price: 150000,
        salePrice: 125000,
        currency: "NGN",
        category: "Agbada",
        images: [
            "/assets/images/IMG_7266.JPG",
            "/assets/images/IMG_9536.jpeg",
            "/assets/images/IMG_9765.jpeg",
            "/assets/images/IMG_9598.jpeg",
        ],
        colors: [
            { name: "Gold", hex: "#D4AF37" },
            { name: "Ivory", hex: "#FFFFF0" },
        ],
        sizes: ["L", "XL", "XXL", "Custom"],
        fabric: "Premium Guinea Brocade",
        care: "Dry clean only",
        features: [
            "Extensive gold-thread embroidery",
            "Premium guinea brocade",
            "Statement ceremonial piece",
            "Includes cap and trousers",
        ],
        sku: "AG-003",
        inStock: true,
        badge: "Sale",
        rating: 5.0,
        reviewCount: 4,
        featured: true,
    },
    {
        id: "prod-012",
        name: "Fila Cap Collection",
        slug: "fila-cap-collection",
        description:
            "Handcrafted traditional Fila caps in premium Aso-Oke fabric. The perfect finishing touch for any traditional outfit.",
        price: 8000,
        salePrice: null,
        currency: "NGN",
        category: "Accessories",
        images: [
            "/assets/images/IMG_9313.JPG",
            "/assets/images/IMG_9311.JPG",
            "/assets/images/IMG_0009.JPG",
            "/assets/images/IMG_0010.JPG",
        ],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Black", hex: "#000000" },
            { name: "Gold", hex: "#D4AF37" },
        ],
        sizes: ["S", "M", "L"],
        fabric: "Aso-Oke Fabric",
        care: "Hand wash with care",
        features: [
            "Handcrafted Aso-Oke",
            "Traditional Fila style",
            "Multiple colors",
            "Comfortable fit",
        ],
        sku: "ACC-003",
        inStock: true,
        badge: null,
        rating: 4.6,
        reviewCount: 42,
        featured: false,
    },
];

// Helper to format Naira price
export const formatNaira = (amount: number): string => {
    return `₦${amount.toLocaleString()}`;
};
