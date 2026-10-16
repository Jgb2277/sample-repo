import { DEMO_LATENCY_MS, DEMO_MODE } from '../config'

export type RouteQuery = { from: string; destination: string }

export type RestaurantResult = {
  id: string
  name: string
  cuisine: string
  offRouteKm: number
  nextSlot: string
  imageUri: string
  // true when the record is placeholder data, never real restaurant data
  isSample: boolean
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const SAMPLE_RESULTS: RestaurantResult[] = [
  {
    id: 'sample-1',
    name: 'Malabar Spice Kitchen',
    cuisine: 'Kerala',
    offRouteKm: 0.4,
    nextSlot: '7:00 PM',
    imageUri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop&auto=format',
    isSample: true,
  },
  {
    id: 'sample-2',
    name: 'Backwater Bites',
    cuisine: 'Seafood',
    offRouteKm: 0.2,
    nextSlot: '8:30 PM',
    imageUri: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=400&fit=crop&auto=format',
    isSample: true,
  },
  {
    id: 'sample-3',
    name: 'Highway Dhaba',
    cuisine: 'North Indian',
    offRouteKm: 0.8,
    nextSlot: '6:30 PM',
    imageUri: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=400&fit=crop&auto=format',
    isSample: true,
  },
]

// Replace with the FastAPI route-search call (Google Maps route + nearby restaurants).
export async function searchAlongRoute(_query: RouteQuery): Promise<RestaurantResult[]> {
  if (!DEMO_MODE) throw new Error('The restaurant search backend is not connected yet.')
  await wait(DEMO_LATENCY_MS)
  return SAMPLE_RESULTS
}
