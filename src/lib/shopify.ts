//ALL STOREFRONT API Request
import { gql, GraphQLClient } from "graphql-request";

const storeFrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN!;
const endPointURL = process.env.NEXT_PUBLIC_SHOPIFY_URL!;

//create an instance of the GraphQL client
const graphQLClient = new GraphQLClient(endPointURL, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storeFrontAccessToken,
    "Content-Type": "application/json",
  },
});

//GraphQL queries
const GET_ALL_PRODUCTS = gql`
	query getAllProducts($first: Int!, $after: String) {
		products(first: $first, after: $after) {
			edges {
				node {
					id
					title
					handle
					description
					productType
					vendor
					tags
					createdAt
					updatedAt
					availableForSale
					totalInventory
					priceRange {
						minVariantPrice {
							amount
							currencyCode
						}
						maxVariantPrice {
							amount
							currencyCode
						}
					}
					compareAtPriceRange {
						minVariantPrice {
							amount
							currencyCode
						}
						maxVariantPrice {
							amount
							currencyCode
						}
					}
					images(first: 10) {
						edges {
							node {
								id
								url
								altText
								width
								height
							}
						}
					}
					variants(first: 100) {
						edges {
							node {
								id
								title
								sku
								availableForSale
								quantityAvailable
								price {
									amount
									currencyCode
								}
								compareAtPrice {
									amount
									currencyCode
								}
								selectedOptions {
									name
									value
								}
								image {
									id
									url
									altText
									width
									height
								}
								weight
								weightUnit
							}
						}
					}
					metafields(
						identifiers: [
							{ namespace: "custom", key: "upper_material" }
							{ namespace: "custom", key: "sole_material" }
							{ namespace: "custom", key: "weight" }
							{ namespace: "custom", key: "size_guide" }
						]
					) {
						key
						value
						type
						namespace
					}
				}
			}
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
		}
	}
`;

//get product by handle
const GET_PRODUCT_BY_HANDLE = gql`
	query getProductByHandle($handle: String!) {
		product(handle: $handle) {
			id
			title
			handle
			description
			descriptionHtml
			productType
			vendor
			tags
			createdAt
			updatedAt
			availableForSale
			totalInventory
			priceRange {
				minVariantPrice {
					amount
					currencyCode
				}
				maxVariantPrice {
					amount
					currencyCode
				}
			}
			compareAtPriceRange {
				minVariantPrice {
					amount
					currencyCode
				}
				maxVariantPrice {
					amount
					currencyCode
				}
			}
			images(first: 10) {
				edges {
					node {
						id
						url
						altText
						width
						height
					}
				}
			}
			variants(first: 20) {
				edges {
					node {
						id
						title
						sku
						availableForSale
						quantityAvailable
						price {
							amount
							currencyCode
						}
						compareAtPrice {
							amount
							currencyCode
						}
						selectedOptions {
							name
							value
						}
						image {
							id
							url
							altText
							width
							height
						}
						weight
						weightUnit
					}
				}
			}
			metafields(
				identifiers: [
					{ namespace: "custom", key: "upper_material" }
					{ namespace: "custom", key: "sole_material" }
					{ namespace: "custom", key: "weight" }
					{ namespace: "custom", key: "size_guide" }
				]
			) {
				key
				value
				type
				namespace
			}
		}
	}
`;

//Get Product by collection
const GET_PRODUCTS_BY_COLLECTION = gql`
	query getProductsByCollection($collection: String!) {
		collection(handle: $collection) {
			id
			title
			handle
			description
			products(first: 50) {
				edges {
					node {
						id
						title
						handle
						description
						descriptionHtml
						productType
						vendor
						tags
						createdAt
						updatedAt
						availableForSale
						totalInventory
						priceRange {
							minVariantPrice {
								amount
								currencyCode
							}
							maxVariantPrice {
								amount
								currencyCode
							}
						}
						compareAtPriceRange {
							minVariantPrice {
								amount
								currencyCode
							}
							maxVariantPrice {
								amount
								currencyCode
							}
						}
						images(first: 10) {
							edges {
								node {
									id
									url
									altText
									width
									height
								}
							}
						}
						variants(first: 20) {
							edges {
								node {
									id
									title
									sku
									availableForSale
									quantityAvailable
									price {
										amount
										currencyCode
									}
									compareAtPrice {
										amount
										currencyCode
									}
									selectedOptions {
										name
										value
									}
									image {
										id
										url
										altText
										width
										height
									}
									weight
									weightUnit
								}
							}
						}
						metafields(
							identifiers: [
								{ namespace: "custom", key: "upper_material" }
								{ namespace: "custom", key: "sole_material" }
								{ namespace: "custom", key: "weight" }
								{ namespace: "custom", key: "size_guide" }
							]
						) {
							key
							value
							type
							namespace
						}
					}
				}
			}
		}
	}
`;
//Get all collections
const GET_ALL_COLLECTIONS = gql`
  query getAllCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
        }
      }
    }
  }
`;

// Cart mutations
const CREATE_CART = gql`
  mutation createCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
        buyerIdentity {
          email
          phone
          customer {
            id
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_TO_CART = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CART = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  featuredImage {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        email
        phone
        customer {
          id
        }
      }
    }
  }
`;

const UPDATE_CART = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`;

const RETRIEVE_CART = gql`
  query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  featuredImage {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
      estimatedCost {
        totalAmount {
          amount
        }
      }
    }
  }
`;

const GET_CHECKOUT_URL = gql`
  query checkoutURL($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
    }
  }
`;

// Customer Account Queries
const CUSTOMER_LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const CUSTOMER_LOGOUT = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

const GET_CUSTOMER = gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      createdAt
      updatedAt
      acceptsMarketing
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            orderNumber
            totalPrice {
              amount
              currencyCode
            }
            processedAt
            fulfillmentStatus
            financialStatus
          }
        }
      }
    }
  }
`;

const GET_ORDER_DETAILS = gql`
  query getOrder($customerAccessToken: String!, $orderId: ID!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 1, query: $orderId) {
        edges {
          node {
            id
            orderNumber
            name
            email
            phone
            processedAt
            fulfillmentStatus
            financialStatus
            cancelReason
            cancelledAt
            totalPrice {
              amount
              currencyCode
            }
            subtotalPrice {
              amount
              currencyCode
            }
            totalTax {
              amount
              currencyCode
            }
            totalShippingPrice {
              amount
              currencyCode
            }
            shippingAddress {
              firstName
              lastName
              company
              address1
              address2
              city
              province
              country
              zip
              phone
            }
            billingAddress {
              firstName
              lastName
              company
              address1
              address2
              city
              province
              country
              zip
              phone
            }
            lineItems(first: 50) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      id
                      title
                      handle
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
            fulfillments(first: 10) {
              trackingCompany
              trackingInfo {
                number
                url
              }
              trackingUrls
              status
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_CREATE = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_CART_LINES = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

//Types for Shopify responses
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  availableForSale: boolean;
  totalInventory: number;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText?: string;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        sku?: string;
        availableForSale: boolean;
        quantityAvailable: number;
        price: {
          amount: string;
          currencyCode: string;
        };
        compareAtPrice?: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
        image?: {
          id: string;
          url: string;
          altText?: string;
          width: number;
          height: number;
        };
        weight?: number;
        weightUnit?: string;
      };
    }>;
  };
  metafields: Array<{
    key: string;
    value: string;
    type: string;
    namespace: string;
  }>;
}

export interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
      };
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface ShopifyCollectionProductsResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
    description: string;
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct | null;
}

//Functions

/**
 * Get all products from Shopify store
 * @param limit - Number of products to fetch per request (max 250)
 * @param cursor - Pagination cursor for fetching next page
 * @returns Promise<ShopifyProduct[]>
 */
export async function getAllProducts(
  limit: number = 50,
  cursor?: string
): Promise<ShopifyProduct[]> {
  try {
    const variables = {
      first: Math.min(limit, 250), // Shopify max is 250
      after: cursor || null,
    };

    const response: ShopifyProductsResponse = await graphQLClient.request(
      GET_ALL_PRODUCTS,
      variables
    );

    let products = response.products.edges.map((edge) => edge.node);

    // If there are more pages and we want to fetch all products
    if (response.products.pageInfo.hasNextPage && !cursor) {
      const nextPageProducts = await getAllProducts(limit, response.products.pageInfo.endCursor);
      products = [...products, ...nextPageProducts];
    }

    return products;
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    throw new Error(`Failed to fetch products: ${error}`);
  }
}

/**
 * Get products with pagination support
 * @param limit - Number of products to fetch (max 250)
 * @param cursor - Pagination cursor
 * @returns Promise with products and pagination info
 */
export async function getProductsPaginated(limit: number = 50, cursor?: string) {
  try {
    const variables = {
      first: Math.min(limit, 250),
      after: cursor || null,
    };

    const response: ShopifyProductsResponse = await graphQLClient.request(
      GET_ALL_PRODUCTS,
      variables
    );

    return {
      products: response.products.edges.map((edge) => edge.node),
      pageInfo: response.products.pageInfo,
      totalCount: response.products.edges.length,
    };
  } catch (error) {
    console.error("Error fetching paginated products from Shopify:", error);
    throw new Error(`Failed to fetch paginated products: ${error}`);
  }
}

/**
 * Get a single product by its handle
 * @param handle - The product handle (slug)
 * @returns Promise<ShopifyProduct | null>
 */
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const variables = { handle };

    const response: ShopifyProductResponse = await graphQLClient.request(
      GET_PRODUCT_BY_HANDLE,
      variables
    );

    return response.product;
  } catch (error) {
    console.error(`Error fetching product with handle "${handle}":`, error);
    throw new Error(`Failed to fetch product: ${error}`);
  }
}

/**
 * Get products by collection
 * @param collection - The collection handle
 * @returns Promise<ShopifyProduct[]>
 */
export async function getProductsByCollection(collection: string): Promise<ShopifyProduct[]> {
  try {
    const variables = { collection };

    const response: ShopifyCollectionProductsResponse = await graphQLClient.request(
      GET_PRODUCTS_BY_COLLECTION,
      variables
    );

    console.log("This is product by collection", response)

    return response.collection.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error(`Error fetching products by collection "${collection}":`, error);
    throw new Error(`Failed to fetch products by collection: ${error}`);
  }
}



export async function getAllCollections() {
  try {
    const response: ShopifyCollectionsResponse = await graphQLClient.request(GET_ALL_COLLECTIONS);
    // console.log(response)
    return response.collections.edges.map((edge) => edge.node)
  } catch (error) {
    console.error("Error fetching all collections from Shopify:", error);
    throw new Error(`Failed to fetch all collections: ${error}`);
  }
}

// Cart types
export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage?: {
        id: string;
        url: string;
        altText?: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface ShopifyCart {
  id: string;
  createdAt: string;
  updatedAt: string;
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
    totalDutyAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  buyerIdentity?: {
    email?: string;
    phone?: string;
    customer?: {
      id: string;
    };
  };
}

export interface ShopifyCartResponse {
  cartCreate: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface ShopifyCartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface ShopifyGetCartResponse {
  cart: ShopifyCart | null;
}

export interface ShopifyUpdateCartResponse {
  cartLinesAdd: {
    cart: {
      id: string;
    };
  };
}

export interface ShopifyRetrieveCartResponse {
  cart: {
    id: string;
    createdAt: string;
    updatedAt: string;
    lines: {
      edges: Array<{
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            price: {
              amount: string;
              currencyCode: string;
            };
            product: {
              id: string;
              title: string;
              handle: string;
              featuredImage?: {
                id: string;
                url: string;
                altText?: string;
                width: number;
                height: number;
              };
            };
          };
        };
      }>;
    };
    estimatedCost: {
      totalAmount: {
        amount: string;
      };
    };
  } | null;
}

export interface ShopifyCheckoutUrlResponse {
  cart: {
    checkoutUrl: string;
  } | null;
}

export interface ShopifyRemoveFromCartResponse {
  cartLinesRemove: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface ShopifyUpdateCartLinesResponse {
  cartLinesUpdate: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

// Customer Account Interfaces
export interface ShopifyCustomer {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  acceptsMarketing: boolean;
  addresses: {
    edges: Array<{
      node: {
        id: string;
        firstName?: string;
        lastName?: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        province: string;
        country: string;
        zip: string;
        phone?: string;
      };
    }>;
  };
  orders: {
    edges: Array<{
      node: {
        id: string;
        orderNumber: number;
        totalPrice: {
          amount: string;
          currencyCode: string;
        };
        processedAt: string;
        fulfillmentStatus?: string;
        financialStatus: string;
      };
    }>;
  };
}

export interface ShopifyOrderDetails {
  id: string;
  orderNumber: number;
  name: string;
  email: string;
  phone?: string;
  processedAt: string;
  fulfillmentStatus?: string;
  financialStatus: string;
  cancelReason?: string;
  cancelledAt?: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalTax: {
    amount: string;
    currencyCode: string;
  };
  totalShippingPrice: {
    amount: string;
    currencyCode: string;
  };
  shippingAddress?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  };
  billingAddress?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
  };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          product: {
            id: string;
            title: string;
            handle: string;
            featuredImage?: {
              url: string;
              altText?: string;
            };
          };
        };
      };
    }>;
  };
  fulfillments: Array<{
    trackingCompany?: string;
    trackingInfo?: Array<{
      number: string;
      url: string;
    }>;
    trackingUrls: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface ShopifyOrderDetailsResponse {
  customer: {
    orders: {
      edges: Array<{
        node: ShopifyOrderDetails;
      }>;
    };
  } | null;
}

export interface ShopifyCustomerLoginResponse {
  customerAccessTokenCreate: {
    customerAccessToken?: {
      accessToken: string;
      expiresAt: string;
    };
    customerUserErrors: Array<{
      field: string[];
      message: string;
      code: string;
    }>;
  };
}

export interface ShopifyCustomerResponse {
  customer: ShopifyCustomer | null;
}

export interface ShopifyCustomerCreateResponse {
  customerCreate: {
    customer?: {
      id: string;
      firstName?: string;
      lastName?: string;
      email: string;
    };
    customerUserErrors: Array<{
      field: string[];
      message: string;
      code: string;
    }>;
  };
}

// Cart functions
/**
 * Create a new cart with initial items
 * @param itemId - The variant ID to add to cart
 * @param quantity - Quantity of the item
 * @returns Promise<ShopifyCart>
 */
export async function createCart(itemId: string, quantity: number): Promise<ShopifyCart> {
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity.toString()),
          merchandiseId: itemId,
        },
      ],
    },
  };

  try {
    const response: ShopifyCartResponse = await graphQLClient.request(CREATE_CART, variables);

    if (response.cartCreate.userErrors.length > 0) {
      throw new Error(response.cartCreate.userErrors[0].message);
    }

    return response.cartCreate.cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw new Error(`Failed to create cart: ${error}`);
  }
}

/**
 * Add items to an existing cart
 * @param cartId - The cart ID
 * @param itemId - The variant ID to add
 * @param quantity - Quantity of the item
 * @returns Promise<ShopifyCart>
 */
export async function addToCart(cartId: string, itemId: string, quantity: number): Promise<ShopifyCart> {
  const variables = {
    cartId,
    lines: [
      {
        quantity: parseInt(quantity.toString()),
        merchandiseId: itemId,
      },
    ],
  };

  try {
    const response: ShopifyCartLinesAddResponse = await graphQLClient.request(ADD_TO_CART, variables);

    if (response.cartLinesAdd.userErrors.length > 0) {
      throw new Error(response.cartLinesAdd.userErrors[0].message);
    }

    return response.cartLinesAdd.cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error(`Failed to add to cart: ${error}`);
  }
}

/**
 * Get cart by ID
 * @param cartId - The cart ID
 * @returns Promise<ShopifyCart | null>
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const variables = { cartId };

  try {
    const response: ShopifyGetCartResponse = await graphQLClient.request(GET_CART, variables);
    return response.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw new Error(`Failed to fetch cart: ${error}`);
  }
}

/**
 * Add item to cart or create new cart if none exists
 * @param itemId - The variant ID to add
 * @param quantity - Quantity of the item
 * @param existingCartId - Optional existing cart ID
 * @returns Promise<ShopifyCart>
 */
export async function addToCartOrCreate(itemId: string, quantity: number, existingCartId?: string): Promise<ShopifyCart> {
  try {
    if (existingCartId) {
      try {
        // Try to add to existing cart
        return await addToCart(existingCartId, itemId, quantity);
      } catch (addError) {
        // If adding to existing cart fails (cart doesn't exist, expired, etc.)
        console.warn("Failed to add to existing cart, creating new cart:", addError);
        // Create new cart as fallback
        return await createCart(itemId, quantity);
      }
    } else {
      // Create new cart
      return await createCart(itemId, quantity);
    }
  } catch (error) {
    console.error("Error adding to cart or creating cart:", error);
    throw new Error(`Failed to add to cart: ${error}`);
  }
}

/**
 * Remove items from cart
 * @param cartId - The cart ID
 * @param lineIds - Array of line IDs to remove
 * @returns Promise<ShopifyCart>
 */
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const variables = {
    cartId,
    lineIds,
  };

  try {
    const response: ShopifyRemoveFromCartResponse = await graphQLClient.request(REMOVE_FROM_CART, variables);

    if (response.cartLinesRemove.userErrors.length > 0) {
      throw new Error(response.cartLinesRemove.userErrors[0].message);
    }

    return response.cartLinesRemove.cart;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error(`Failed to remove from cart: ${error}`);
  }
}

/**
 * Update cart line quantities
 * @param cartId - The cart ID
 * @param lines - Array of line updates with id and quantity
 * @returns Promise<ShopifyCart>
 */
export async function updateCartLines(cartId: string, lines: Array<{ id: string, quantity: number }>): Promise<ShopifyCart> {
  const variables = {
    cartId,
    lines: lines.map(line => ({
      id: line.id,
      quantity: line.quantity
    })),
  };

  try {
    const response: ShopifyUpdateCartLinesResponse = await graphQLClient.request(UPDATE_CART_LINES, variables);

    if (response.cartLinesUpdate.userErrors.length > 0) {
      throw new Error(response.cartLinesUpdate.userErrors[0].message);
    }

    return response.cartLinesUpdate.cart;
  } catch (error) {
    console.error("Error updating cart lines:", error);
    throw new Error(`Failed to update cart lines: ${error}`);
  }
}

/**
 * Update cart by adding items (using cartLinesAdd mutation)
 * @param cartId - The cart ID
 * @param itemId - The variant ID to add
 * @param quantity - Quantity of the item
 * @returns Promise<string> - Returns the cart ID
 */
export async function updateCart(cartId: string, itemId: string, quantity: number): Promise<string> {
  const variables = {
    cartId,
    lines: [
      {
        quantity: parseInt(quantity.toString()),
        merchandiseId: itemId,
      },
    ],
  };

  try {
    const response: ShopifyUpdateCartResponse = await graphQLClient.request(UPDATE_CART, variables);
    return response.cartLinesAdd.cart.id;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw new Error(`Failed to update cart: ${error}`);
  }
}

/**
 * Retrieve cart with basic information
 * @param cartId - The cart ID
 * @returns Promise<ShopifyRetrieveCartResponse['cart']>
 */
export async function retrieveCart(cartId: string): Promise<ShopifyRetrieveCartResponse['cart']> {
  const variables = {
    cartId,
  };

  try {
    const data: ShopifyRetrieveCartResponse = await graphQLClient.request(RETRIEVE_CART, variables);
    return data.cart;
  } catch (error) {
    console.error("Error retrieving cart:", error);
    throw new Error(`Failed to retrieve cart: ${error}`);
  }
}

/**
 * Get checkout URL for a cart
 * @param cartId - The cart ID
 * @returns Promise<string | null> - Returns the checkout URL or null
 */
export async function getCheckoutUrl(cartId: string): Promise<string | null> {
  const variables = {
    cartId: cartId,
  };

  try {
    const response: ShopifyCheckoutUrlResponse = await graphQLClient.request(GET_CHECKOUT_URL, variables);
    return response.cart?.checkoutUrl || null;
  } catch (error) {
    console.error("Error getting checkout URL:", error);
    throw new Error(`Failed to get checkout URL: ${error}`);
  }
}

// Customer Account Functions
/**
 * Login customer and get access token
 * @param email - Customer email
 * @param password - Customer password
 * @returns Promise<{accessToken: string, expiresAt: string} | null>
 */
export async function loginCustomer(email: string, password: string): Promise<{accessToken: string, expiresAt: string} | null> {
  const variables = {
    input: {
      email,
      password,
    },
  };

  try {
    const response: ShopifyCustomerLoginResponse = await graphQLClient.request(CUSTOMER_LOGIN, variables);
    
    if (response.customerAccessTokenCreate.customerUserErrors.length > 0) {
      throw new Error(response.customerAccessTokenCreate.customerUserErrors[0].message);
    }
    
    return response.customerAccessTokenCreate.customerAccessToken || null;
  } catch (error) {
    console.error("Error logging in customer:", error);
    throw new Error(`Failed to login: ${error}`);
  }
}

/**
 * Logout customer by deleting access token
 * @param accessToken - Customer access token
 * @returns Promise<boolean>
 */
export async function logoutCustomer(accessToken: string): Promise<boolean> {
  const variables = {
    customerAccessToken: accessToken,
  };

  try {
    const response = await graphQLClient.request(CUSTOMER_LOGOUT, variables);
    return !!response.customerAccessTokenDelete.deletedAccessToken;
  } catch (error) {
    console.error("Error logging out customer:", error);
    throw new Error(`Failed to logout: ${error}`);
  }
}

/**
 * Get customer data using access token
 * @param accessToken - Customer access token
 * @returns Promise<ShopifyCustomer | null>
 */
export async function getCustomer(accessToken: string): Promise<ShopifyCustomer | null> {
  const variables = {
    customerAccessToken: accessToken,
  };

  try {
    const response: ShopifyCustomerResponse = await graphQLClient.request(GET_CUSTOMER, variables);
    return response.customer;
  } catch (error) {
    console.error("Error getting customer:", error);
    throw new Error(`Failed to get customer: ${error}`);
  }
}

/**
 * Create new customer account
 * @param email - Customer email
 * @param password - Customer password
 * @param firstName - Customer first name (optional)
 * @param lastName - Customer last name (optional)
 * @returns Promise<{id: string, email: string} | null>
 */
export async function createCustomer(
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string
): Promise<{id: string, email: string} | null> {
  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
    },
  };

  try {
    const response: ShopifyCustomerCreateResponse = await graphQLClient.request(CUSTOMER_CREATE, variables);
    
    if (response.customerCreate.customerUserErrors.length > 0) {
      const error = response.customerCreate.customerUserErrors[0];
      
      // Check if this is an email verification message (not an actual error)
      if (error.message.includes('email') && error.message.includes('verify')) {
        // This is actually a success - customer was created but needs email verification
        return { id: 'pending-verification', email: email };
      }
      
      throw new Error(error.message);
    }
    
    return response.customerCreate.customer || null;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error(`Failed to create customer: ${error}`);
  }
}

/**
 * Get detailed order information
 * @param accessToken - Customer access token
 * @param orderId - Order ID
 * @returns Promise<ShopifyOrderDetails | null>
 */
export async function getOrderDetails(accessToken: string, orderId: string): Promise<ShopifyOrderDetails | null> {
  const variables = {
    customerAccessToken: accessToken,
    orderId: `gid://shopify/Order/${orderId}`,
  };

  try {
    const response: ShopifyOrderDetailsResponse = await graphQLClient.request(GET_ORDER_DETAILS, variables);
    
    if (response.customer && response.customer.orders.edges.length > 0) {
      return response.customer.orders.edges[0].node;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting order details:", error);
    throw new Error(`Failed to get order details: ${error}`);
  }
}