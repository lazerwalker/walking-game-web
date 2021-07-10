export interface Player {
  id: string
  displayName?: string

  currency: number
  inventory: QuestInstance[] // Catalog item IDs, reference the catalog to look up
}

// I'm not super happy about this naming
export interface QuestInstance {
  id: string // corresponds with a CatalogItem.id
  expiration: Date
  displayName: string
  description: string
  price: number
}

export interface CatalogItem {
  id: string
  displayName: string
  description: string
  price: number
}