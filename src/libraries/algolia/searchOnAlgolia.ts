import { client, productsIndex } from ".";
import { omit } from "lodash";
import { Category } from "~/applications/Product/Domain/Categories";

export class Product {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly brand: string,
    public readonly market: string,
    public readonly currency: "eur" | "dol",
    public readonly price: number,
    public readonly location: string,
    public readonly unity: "g" | "ml" | "unity" | "unities-g" | "unities-ml",
    public readonly category: string,
    public readonly quantity: number,
    public readonly image: string,
    public readonly weight: number
  ) {
    Object.freeze(this);
  }
}

export interface SearchResult<T> {
  type: string;
  hits: T[];
}

interface SearchOnAlgoliaInput<T = unknown> {
  index: string;
  query: string;
  filters?: string;
  hits?: T;
  aroundLatLng?: string;
  aroundRadius?: number;
  hitsPerPage?: number;
}

type Result = { results: { hits: Record<string, string>[] }[] };

export default async function searchOnAlgolia<T>(queries: SearchOnAlgoliaInput[]) {
  const query = queries.map((i) => {
    const { index, ...rest } = i;
    return {
      indexName: index,
      params: { ...rest, hitsPerPage: 2000 }
    };
  });
  const { results } = await client.multipleQueries(query);
  const res = results as unknown as SearchOnAlgoliaInput<T>[];

  return res.map((r) => r.hits).at(0);
}

export const searchProductsWithCategory = async (
  search: string
): Promise<{ categories: Category[]; data: Product[] }> => {
  const res = (await productsIndex.search(search, { hitsPerPage: 2000 })).hits.map(
    (r) =>
      ({
        ...omit(r, "_highlightResult", "objectID", "path"),
        productId: r.objectID
      }) as Product
  );

  // @ts-ignore
  const categories = !search?.length ? [""] : [...new Set(res.map((r) => r.category))];

  const result = (await client.multipleQueries(
    categories.map((category) => ({
      indexName: "prod_Categories",
      params: { query: category, hitsPerPage: 2000 }
    }))
  )) as unknown as Result;

  return {
    categories: result.results
      .flatMap((r) => r.hits)
      .map((r) => omit(r, "_highlightResult", "objectID", "path") as Category),
    data: res
  };
};
