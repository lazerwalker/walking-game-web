export interface Player {
  id: string
  displayName?: string

  currency: number
  inventory: string[] // Catalog item IDs, reference the catalog to look up
}

export interface CatalogItem {
  id: string
  displayName: string
  description: string
  price: number
}