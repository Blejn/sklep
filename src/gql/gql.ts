/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateReviewForProduct($headline: String!, $name: String!, $content: String!, $email: String!, $productId: ID!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, product: {connect: {id: $productId}}}\n  ) {\n    id\n    headline\n    content\n    email\n    name\n    rating\n  }\n}": types.CreateReviewForProductDocument,
    "mutation CartAddProduct($quantity: Int!, $total: Int!, $orderId: ID!, $productId: ID!) {\n  createOrderItem(\n    data: {quantity: $quantity, total: $total, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate($total: Int!, $email: String!, $stripeCheckoutId: String!) {\n  createOrder(\n    data: {total: $total, email: $email, stripeCheckoutId: $stripeCheckoutId}\n  ) {\n    id\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      product {\n        id\n        price\n        name\n        description\n        categories(first: 1) {\n          name\n          slug\n        }\n        images(first: 1) {\n          url\n        }\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "query GetCollections {\n  collections {\n    id\n    name\n    description\n  }\n}": types.GetCollectionsDocument,
    "query ProductsGetByCategorySlug($limit: Int!, $offset: Int!, $slug: String!, $search: String!) {\n  productsConnection(\n    first: $limit\n    skip: $offset\n    where: {categories_every: {slug: $slug}, _search: $search}\n  ) {\n    edges {\n      node {\n        ...ProdutListItem\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n    slug\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    description\n    reviews {\n      id\n      content\n      name\n      email\n      headline\n      rating\n    }\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        color\n        size\n      }\n    }\n  }\n}": types.ProductsGetByIdDocument,
    "query ProductsGetList($limit: Int!, $offset: Int!, $search: String!) {\n  productsConnection(first: $limit, skip: $offset, where: {_search: $search}) {\n    edges {\n      node {\n        ...ProdutListItem\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "fragment ProdutListItem on Product {\n  id\n  price\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n}": types.ProdutListItemFragmentDoc,
    "query ProductsGetByCollectionId($id: ID!) {\n  collection(where: {id: $id}) {\n    products(first: 10) {\n      ...ProdutListItem\n    }\n  }\n}": types.ProductsGetByCollectionIdDocument,
    "query ProductsGetByHighestRating($rate: Int!) {\n  products(where: {reviews_every: {rating: $rate}}) {\n    id\n    price\n    name\n    description\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n    reviews {\n      id\n      rating\n    }\n  }\n}": types.ProductsGetByHighestRatingDocument,
    "query ProductsGetSizeColorVariants($id: ID!) {\n  productSizeColorVariants(where: {id: $id}) {\n    color\n    size\n    name\n  }\n}": types.ProductsGetSizeColorVariantsDocument,
    "mutation PublishReviewForProduct($reviewId: ID!) {\n  publishReview(where: {id: $reviewId}) {\n    id\n  }\n}": types.PublishReviewForProductDocument,
    "mutation RemoveProductFromCart($id: ID!) {\n  deleteOrderItem(where: {id: $id}) {\n    id\n  }\n}": types.RemoveProductFromCartDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateReviewForProduct($headline: String!, $name: String!, $content: String!, $email: String!, $productId: ID!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, product: {connect: {id: $productId}}}\n  ) {\n    id\n    headline\n    content\n    email\n    name\n    rating\n  }\n}"): typeof import('./graphql').CreateReviewForProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($quantity: Int!, $total: Int!, $orderId: ID!, $productId: ID!) {\n  createOrderItem(\n    data: {quantity: $quantity, total: $total, order: {connect: {id: $orderId}}, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($total: Int!, $email: String!, $stripeCheckoutId: String!) {\n  createOrder(\n    data: {total: $total, email: $email, stripeCheckoutId: $stripeCheckoutId}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      product {\n        id\n        price\n        name\n        description\n        categories(first: 1) {\n          name\n          slug\n        }\n        images(first: 1) {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollections {\n  collections {\n    id\n    name\n    description\n  }\n}"): typeof import('./graphql').GetCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($limit: Int!, $offset: Int!, $slug: String!, $search: String!) {\n  productsConnection(\n    first: $limit\n    skip: $offset\n    where: {categories_every: {slug: $slug}, _search: $search}\n  ) {\n    edges {\n      node {\n        ...ProdutListItem\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n    slug\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    description\n    reviews {\n      id\n      content\n      name\n      email\n      headline\n      rating\n    }\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        color\n        size\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($limit: Int!, $offset: Int!, $search: String!) {\n  productsConnection(first: $limit, skip: $offset, where: {_search: $search}) {\n    edges {\n      node {\n        ...ProdutListItem\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      pageSize\n    }\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProdutListItem on Product {\n  id\n  price\n  name\n  description\n  categories(first: 1) {\n    name\n    slug\n  }\n  images(first: 1) {\n    url\n  }\n}"): typeof import('./graphql').ProdutListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionId($id: ID!) {\n  collection(where: {id: $id}) {\n    products(first: 10) {\n      ...ProdutListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByHighestRating($rate: Int!) {\n  products(where: {reviews_every: {rating: $rate}}) {\n    id\n    price\n    name\n    description\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n    reviews {\n      id\n      rating\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByHighestRatingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetSizeColorVariants($id: ID!) {\n  productSizeColorVariants(where: {id: $id}) {\n    color\n    size\n    name\n  }\n}"): typeof import('./graphql').ProductsGetSizeColorVariantsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PublishReviewForProduct($reviewId: ID!) {\n  publishReview(where: {id: $reviewId}) {\n    id\n  }\n}"): typeof import('./graphql').PublishReviewForProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveProductFromCart($id: ID!) {\n  deleteOrderItem(where: {id: $id}) {\n    id\n  }\n}"): typeof import('./graphql').RemoveProductFromCartDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
