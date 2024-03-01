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
    "query GetCollections {\n  collections {\n    id\n    name\n    description\n  }\n}": types.GetCollectionsDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProdutListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n    slug\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    description\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        color\n        size\n      }\n    }\n  }\n}": types.ProductsGetByIdDocument,
    "query ProductGetList {\n  products(first: 10) {\n    ...ProdutListItem\n  }\n}": types.ProductGetListDocument,
    "fragment ProdutListItem on Product {\n  id\n  price\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n}": types.ProdutListItemFragmentDoc,
    "query ProductsGetByCollectionId($id: ID!) {\n  collection(where: {id: $id}) {\n    products(first: 10) {\n      ...ProdutListItem\n    }\n  }\n}": types.ProductsGetByCollectionIdDocument,
    "query ProductsGetByHighestRating($rate: Int!) {\n  products(where: {reviews_every: {rating: $rate}}) {\n    id\n    price\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    reviews {\n      id\n      rating\n    }\n  }\n}": types.ProductsGetByHighestRatingDocument,
    "query ProductsGetSizeColorVariants($id: ID!) {\n  productSizeColorVariants(where: {id: $id}) {\n    color\n    size\n    name\n  }\n}": types.ProductsGetSizeColorVariantsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollections {\n  collections {\n    id\n    name\n    description\n  }\n}"): typeof import('./graphql').GetCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProdutListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    price\n    slug\n    categories {\n      name\n    }\n    images {\n      url\n    }\n    description\n    variants {\n      ... on ProductSizeColorVariant {\n        id\n        name\n        color\n        size\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetList {\n  products(first: 10) {\n    ...ProdutListItem\n  }\n}"): typeof import('./graphql').ProductGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProdutListItem on Product {\n  id\n  price\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n}"): typeof import('./graphql').ProdutListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionId($id: ID!) {\n  collection(where: {id: $id}) {\n    products(first: 10) {\n      ...ProdutListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByHighestRating($rate: Int!) {\n  products(where: {reviews_every: {rating: $rate}}) {\n    id\n    price\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    reviews {\n      id\n      rating\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByHighestRatingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetSizeColorVariants($id: ID!) {\n  productSizeColorVariants(where: {id: $id}) {\n    color\n    size\n    name\n  }\n}"): typeof import('./graphql').ProductsGetSizeColorVariantsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
