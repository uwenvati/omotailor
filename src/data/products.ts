export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    colors: string[];
    sizes: string[];
    description: string;
    category: "Men" | "Women" | "Unisex";
    model3D?: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Imperial Agbada Royale",
        price: 289.99,
        image: "/assets/images/IMG_9536.jpeg",
        rating: 4.9,
        reviews: 156,
        colors: ["midnight-blue", "forest-green", "royal-purple"],
        sizes: ["M", "L", "XL", "XXL"],
        description: "A signature three-piece Agbada set meticulously embroidered with premium metallic threads. Crafted from heavy-weight Aso-Oke fabric for the distinguished modern man.",
        category: "Men",
        model3D: "/assets/models/shirt.glb"
    },
    {
        id: "2",
        name: "Indigo Adire Kaftan",
        price: 145.00,
        image: "/assets/images/IMG_9598.jpeg",
        rating: 4.8,
        reviews: 112,
        colors: ["indigo", "sky-blue"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Hand-dyed Adire silk kaftan featuring traditional Yoruba resist-dye patterns. A perfect blend of heritage art and contemporary silhouette.",
        category: "Men",
        model3D: "/assets/models/shirt.glb"
    },
    {
        id: "3",
        name: "Grand Senator Suite",
        price: 195.00,
        image: "/assets/images/IMG_9642.jpeg",
        rating: 4.9,
        reviews: 84,
        colors: ["charcoal-black", "silver-gray"],
        sizes: ["M", "L", "XL", "XXL"],
        description: "The ultimate power statement. This Senator suite features precision-tailored lines and subtle gold piping on the placket and cuffs.",
        category: "Men"
    },
    {
        id: "4",
        name: "Ankara Peak Dress",
        price: 160.00,
        image: "/assets/images/IMG_9765.jpeg",
        rating: 4.7,
        reviews: 92,
        colors: ["multi/gold", "multi/blue"],
        sizes: ["S", "M", "L"],
        description: "Vibrant Ankara wax print dress with a modern asymmetrical hem. AI-powered fit ensures every curve is perfectly complemented.",
        category: "Women"
    },
    {
        id: "5",
        name: "Buba & Sokoto Essentials",
        price: 110.00,
        image: "/assets/images/IMG_0006.JPG",
        rating: 4.6,
        reviews: 143,
        colors: ["black-sand", "terracotta"],
        sizes: ["30", "32", "34", "36"],
        description: "Essential Nigerian loungewear redefined. Soft, breathable cotton Buba and tailored Sokoto trousers for effortless style.",
        category: "Men"
    },
    {
        id: "6",
        name: "Lace Glamour Wrapper Set",
        price: 220.00,
        image: "/assets/images/IMG_0008.JPG",
        rating: 4.8,
        reviews: 78,
        colors: ["champagne-gold", "dusty-rose"],
        sizes: ["S", "M", "L", "XL"],
        description: "Intricately woven Swiss lace wrapper and blouse set. Designed for weddings and high-profile traditional ceremonies.",
        category: "Women"
    },
    {
        id: "7",
        name: "Urban Nomad Parka",
        price: 240.00,
        image: "/assets/images/IMG_0009.JPG",
        rating: 5.0,
        reviews: 34,
        colors: ["black", "charcoal"],
        sizes: ["M", "L", "XL", "XXL"],
        description: "Heavy-duty yet lightweight parka for the modern urban explorer. Weather-resistant with sleek aesthetic lines.",
        category: "Unisex"
    },
    {
        id: "8",
        name: "Obsidian Slim Fit Jeans",
        price: 135.00,
        image: "/assets/images/IMG_0010.JPG",
        rating: 4.7,
        reviews: 210,
        colors: ["black"],
        sizes: ["28", "30", "32", "34", "36"],
        description: "Tailored slim-fit jeans in deep obsidian. Features a hint of stretch for maximum comfort and perfect fit.",
        category: "Men"
    },
    {
        id: "9",
        name: "Platinum Ribbed Dress",
        price: 160.00,
        rating: 4.9,
        reviews: 45,
        image: "/assets/images/IMG_7260.JPG",
        colors: ["gray", "white"],
        sizes: ["XS", "S", "M", "L"],
        description: "A sophisticated ribbed dress in platinum gray. Designed to focus on the body with AI-modeled precision.",
        category: "Women"
    },
    {
        id: "10",
        name: "Shadow Tech Joggers",
        price: 85.00,
        image: "/assets/images/IMG_7265.JPG",
        rating: 4.6,
        reviews: 167,
        colors: ["black", "gray"],
        sizes: ["S", "M", "L", "XL"],
        description: "High-performance tech joggers for the active lifestyle. breathable, lightweight, and impeccably styled.",
        category: "Unisex"
    },
    {
        id: "11",
        name: "Ivory Zen Cardigan",
        price: 125.00,
        image: "/assets/images/IMG_7266.JPG",
        rating: 4.8,
        reviews: 89,
        colors: ["white", "gray"],
        sizes: ["S", "M", "L"],
        description: "An oversized ivory cardigan that brings together comfort and high-end fashion. The ultimate layering piece.",
        category: "Women"
    },
    {
        id: "12",
        name: "Onyx Leather Chelsea Boots",
        price: 210.00,
        image: "/assets/images/IMG_9311.JPG",
        rating: 4.9,
        reviews: 112,
        colors: ["black"],
        sizes: ["40", "41", "42", "43", "44", "45"],
        description: "Handcrafted Chelsea boots in black onyx leather. A timeless classic with a contemporary minimalist edge.",
        category: "Men"
    }
];
