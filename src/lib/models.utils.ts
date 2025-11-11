
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';

// Models data structure
type ColorData = {
    name: string;
    colorImages: string
}
export interface ModelData {
    name: string;
    slug: string;
    image: string;
    galleryImages: string[];
    specifications: {
        upper: string;
        sole: string;
        weight: string;
        color: ColorData[]; // Array of ColorData
    };
}


export const MODELS_DATA: Record<string, ModelData> = {
    'endangered': {
        name: 'Endangered',
        slug: 'endangered',
        image: `${BASE_URL}/baby-shoe/models/endangered-animal/Couple_5.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/endangered-animal/Couple_5.webp`,
            `${BASE_URL}/baby-shoe/models/endangered-animal/Koala_5.webp`,
            `${BASE_URL}/baby-shoe/models/endangered-animal/Couple_4.webp`,
            `${BASE_URL}/baby-shoe/models/endangered-animal/Couple_6.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'gray',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/endangered-animal/Koala_1.webp`
                },
                {
                    name: 'pink',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/endangered-animal/Fox_1.webp`
                }
            ]
        }
    },
    'shooting-star': {
        name: 'Shooting Star',
        slug: 'shooting-star',
        image: `${BASE_URL}/baby-shoe/models/shooting-star/Couple_1.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/shooting-star/Couple_2.webp`,
            `${BASE_URL}/baby-shoe/models/shooting-star/Gray_1.webp`,
            `${BASE_URL}/baby-shoe/models/shooting-star/Couple_5.webp`,
            `${BASE_URL}/baby-shoe/models/shooting-star/Cream_5.webp`,
        ],
        specifications: {
            upper: 'Cotton, Nylon, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'gray',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/shooting-star/Gray_3.webp`
                }
            ]
        }
    },
    'see-through-bear': {
        name: 'See Through Bear',
        slug: 'see-through-bear',
        image: `${BASE_URL}/baby-shoe/models/see-through-bear-bamboo/Blue_7.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/see-through-bear-bamboo/Blue_7.webp`,
            `${BASE_URL}/baby-shoe/models/see-through-bear-bamboo/Blue_11.webp`,
            `${BASE_URL}/baby-shoe/models/see-through-bear-bamboo/Beige_1.webp`,
            `${BASE_URL}/baby-shoe/models/see-through-bear-bamboo/Beige_2.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'sky',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/see-through-bear-bamboo/Blue_2.webp`
                },
                {
                    name: 'beige',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/see-through-bear-bamboo/Beige_3.webp`
                }
            ]
        }
    },
    'gradation': {
        name: 'Gradation',
        slug: 'gradation',
        image: `${BASE_URL}/baby-shoe/models/gradation/gradation_pink_01.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/gradation/gradation_pink_01.webp`,
            `${BASE_URL}/baby-shoe/models/gradation/gradation_pink_02.webp`,
            `${BASE_URL}/baby-shoe/models/gradation/gradation_pink_03.webp`,
            `${BASE_URL}/baby-shoe/models/gradation/gradation_pink_04.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'pink',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/gradation/2022_SS_attipas_16642.webp`
                }
            ]
        }
    },
    'zootopia': {
        name: 'Zootopia',
        slug: 'zootopia',
        image: `${BASE_URL}/baby-shoe/models/zootopia/Gray-3.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/zootopia/Gray-3.webp`,
            `${BASE_URL}/baby-shoe/models/zootopia/Navy-4.webp`,
            `${BASE_URL}/baby-shoe/models/zootopia/Gray-5.webp`,
            `${BASE_URL}/baby-shoe/models/zootopia/Navy-6.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'gray',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/zootopia/Gray-2.webp`
                },
                {
                    name: 'navy',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/zootopia/Navy-2.webp`
                }
            ]
        }
    },

    'yacht': {
        name: 'Yacht',
        slug: 'yacht',
        image: `${BASE_URL}/baby-shoe/models/yacht/Sky-blue-4.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/yacht/Sky-blue-6.webp`,
            `${BASE_URL}/baby-shoe/models/yacht/Sky-blue-10.webp`,
            `${BASE_URL}/baby-shoe/models/yacht/Sky-blue-4.webp`,
        ],
        specifications: {
            upper: 'Rayon, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'sky blue',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/yacht/Yacht-Blue-2.webp`
                }
            ]
        }
    },
    'tulip': {
        name: 'Tulip',
        slug: 'tulip',
        image: `${BASE_URL}/baby-shoe/models/tulip/Pink-5.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/tulip/Pink-5.webp`,
            `${BASE_URL}/baby-shoe/models/tulip/Pink-22.webp`,
            `${BASE_URL}/baby-shoe/models/tulip/Pink-10.webp`,
            `${BASE_URL}/baby-shoe/models/tulip/Pink-12.webp`,
        ],
        specifications: {
            upper: 'Rayon, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'pink',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/tulip/Tulip-Pink-2.webp`
                }
            ]
        }
    },
    'baby-crab': {
        name: 'Baby-crab',
        slug: 'baby-crab',
        image: `${BASE_URL}/baby-shoe/models/baby-crab/A25BC-Baby-crab-2.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/baby-crab/A25BS-Baby-crab-4.webp`,
            `${BASE_URL}/baby-shoe/models/baby-crab/A25BS-Baby-crab-2.webp`,
            `${BASE_URL}/baby-shoe/models/baby-crab/A25BS-Baby-crab-5.webp`,
            `${BASE_URL}/baby-shoe/models/baby-crab/A25BS-Baby-crab-22.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'blue',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/baby-crab/A25BC-Baby-crab-4.webp`
                }
            ]
        }
    },
    'baby-shell': {
        name: 'Baby-shell',
        slug: 'baby-shell',
        image: `${BASE_URL}/baby-shoe/models/baby-shell/A25BS-Baby-shell-4.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/baby-shell/A25BS-Baby-shell-4.webp`,
            `${BASE_URL}/baby-shoe/models/baby-shell/A25BS-Baby-shell-32.webp`,
            `${BASE_URL}/baby-shoe/models/baby-shell/A25BS-Baby-shell-43.webp`,
            `${BASE_URL}/baby-shoe/models/baby-shell/A25BS-Baby-shell-31.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'pink',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/baby-shell/A25BS-Baby-shell-4.webp`
                }
            ]
        }
    },
    'submarine': {
        name: 'Submarine',
        slug: 'submarine',
        image: `${BASE_URL}/baby-shoe/models/submarine/A25SU-Surbmarin-5.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/submarine/A25SU-Surbmarin-6.webp`,
            `${BASE_URL}/baby-shoe/models/submarine/A25SU-Surbmarin-18.webp`,
            `${BASE_URL}/baby-shoe/models/submarine/A25SU-Surbmarin-22.webp`,
            `${BASE_URL}/baby-shoe/models/submarine/A25SU-Surbmarin-7.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'beige',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/submarine/A25SU-Submarin-4.webp`
                }
            ]
        }
    },
    'whale': {
        name: 'Whale',
        slug: 'whale',
        image: `${BASE_URL}/baby-shoe/models/whale/A25WH-Whale-4.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/whale/A25WH-Whale-6.webp`,
            `${BASE_URL}/baby-shoe/models/whale/A25WH-Whale-16.webp`,
            `${BASE_URL}/baby-shoe/models/whale/A25WH-Whale-17.webp`,
            `${BASE_URL}/baby-shoe/models/whale/A25WH-Whale-1.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'blue',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/whale/A25WH-Whale-4.webp`
                }
            ]
        }
    },
    'stripe': {
        name: 'Stripe',
        slug: 'stripe',
        image: `${BASE_URL}/baby-shoe/models/stripe/A25ST-Stripe-Brick-1.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/stripe/A25ST-Stripe-Brick-2.webp`,
            `${BASE_URL}/baby-shoe/models/stripe/A25ST-Stripe-Brick-10.webp`,
            `${BASE_URL}/baby-shoe/models/stripe/A25ST-Stripe-Olive-4.webp`,
            `${BASE_URL}/baby-shoe/models/stripe/A25ST-Stripe-Olive-6.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                //stripe mistakes
                {
                    name: 'blue',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/stripe/2022_SS_attipas_16550.webp`
                },
                {
                    name: 'mustard',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/stripe/2022_SS_attipas_16600.webp`
                }
            ]
        }
    },
    'tortoise': {
        name: 'Tortoise',
        slug: 'tortoise',
        image: `${BASE_URL}/baby-shoe/models/tortoise/A25TO-Tortoise-1.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/tortoise/A25TO-Tortoise-1.webp`,
            `${BASE_URL}/baby-shoe/models/tortoise/A25TO-Tortoise-3.webp`,
            `${BASE_URL}/baby-shoe/models/tortoise/A25TO-Tortoise-18.webp`,
            `${BASE_URL}/baby-shoe/models/tortoise/A25TO-Tortoise-27.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'green',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/tortoise/A25TO-Tortoise-4.webp`
                }
            ]
        }
    },
    'bee': {
        name: 'Bee',
        slug: 'bee',
        image: `${BASE_URL}/baby-shoe/models/bee/A25BE-BEE-1.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/bee/A25BE-BEE-1.webp`,
            `${BASE_URL}/baby-shoe/models/bee/A25BE-BEE-10.webp`,
            `${BASE_URL}/baby-shoe/models/bee/A25BE-BEE-30.webp`,
            `${BASE_URL}/baby-shoe/models/bee/A25BE-BEE-40.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'blue',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/bee/A25BE-Bee-4.webp`
                }
            ]
        }
    },
    'butterfly': {
        name: 'Butterfly',
        slug: 'butterfly',
        image: `${BASE_URL}/baby-shoe/models/butterfly/A25BU-Butterfly-6.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/butterfly/A25BU-Butterfly-6.webp`,
            `${BASE_URL}/baby-shoe/models/butterfly/A25BU-Butterfly-30.webp`,
            `${BASE_URL}/baby-shoe/models/butterfly/A25BU-Butterfly-40.webp`,
            `${BASE_URL}/baby-shoe/models/butterfly/A25BU-Butterfly-46.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'purple',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-4.webp`
                }
            ]
        }
    },
    'bird': {
        name: 'Bird',
        slug: 'bird',
        image: `${BASE_URL}/baby-shoe/models/bird/A25BI-Bird-6.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/bird/A25BI-Bird-1.webp`,
            `${BASE_URL}/baby-shoe/models/bird/A25BI-Bird-6.webp`,
            `${BASE_URL}/baby-shoe/models/bird/A25BI-Bird-10.webp`,
            `${BASE_URL}/baby-shoe/models/bird/A25BI-Bird-20.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'yellow',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/bird/A25BI-Bird-4.webp`
                }
            ]
        }
    },
    'cameleon': {
        name: 'Cameleon',
        slug: 'cameleon',
        image: `${BASE_URL}/baby-shoe/models/cameleon/A25CH-Cameleon-1.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/cameleon/A25CH-Cameleon-1.webp`,
            `${BASE_URL}/baby-shoe/models/cameleon/A25CH-Cameleon-10.webp`,
            `${BASE_URL}/baby-shoe/models/cameleon/A25CH-Cameleon-16.webp`,
            `${BASE_URL}/baby-shoe/models/cameleon/A25CH-Cameleon-26.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'orange',
                    // mistake 
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/cameleon/Cameleon-2.webp`
                }
            ]
        }
    },
    'ethnic': {
        name: 'Ethnic',
        slug: 'ethnic',
        image: `${BASE_URL}/baby-shoe/models/ethnic/Ethnic-(1).webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/ethnic/Ethnic-(1).webp`,
            `${BASE_URL}/baby-shoe/models/ethnic/Ethnic-(20).webp`,
            `${BASE_URL}/baby-shoe/models/ethnic/Ethnic-(44).webp`,
            `${BASE_URL}/baby-shoe/models/ethnic/Ethnic-(64).webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'navy',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/ethnic/2.webp`
                }
            ]
        }
    },
    'bear': {
        name: 'Bear',
        slug: 'bear',
        image: `${BASE_URL}/baby-shoe/models/bear/wine_2.webp`,
        galleryImages: [
            `${BASE_URL}/baby-shoe/models/bear/wine_2.webp`,
            `${BASE_URL}/baby-shoe/models/bear/wine_3.webp`,
            `${BASE_URL}/baby-shoe/models/bear/navy_1.webp`,
            `${BASE_URL}/baby-shoe/models/bear/navy_3.webp`,
        ],
        specifications: {
            upper: 'Cotton, Spandex, Elastane Yarn',
            sole: 'TPR(Tested non-toxic) 100%',
            weight: 'S-65g M-75g L-95g XL-105g',
            color: [
                {
                    name: 'beige',
                    colorImages: `${BASE_URL}/baby-shoe/shoe-details/bear/2.webp`
                }
            ]
        }
    }
};

export const MODELS_LIST = Object.values(MODELS_DATA).map(model => ({
    name: model.name,
    slug: model.slug
}));

export function getModelBySlug(slug: string): ModelData | null {
    return MODELS_DATA[slug] || null;
}

export function getAdjacentModels(currentSlug: string) {
    const modelsList = Object.keys(MODELS_DATA);
    const currentIndex = modelsList.indexOf(currentSlug);

    if (currentIndex === -1) return { prev: null, next: null };

    const prevSlug = currentIndex > 0 ? modelsList[currentIndex - 1] : null;
    const nextSlug = currentIndex < modelsList.length - 1 ? modelsList[currentIndex + 1] : null;

    return {
        prev: prevSlug ? MODELS_DATA[prevSlug] : null,
        next: nextSlug ? MODELS_DATA[nextSlug] : null
    };
}
