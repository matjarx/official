// Where each city is: province and approximate centre coordinates.
//
// Used for two things (decided 15 Oct):
// - "Other cities we work in" on a city page lists the nearest INDEXED
//   cities in the same province, instead of an alphabetical rotation.
// - /locations lists every indexed city, grouped by province.
//
// Coordinates are approximate city centres, good enough to rank
// neighbours. Islamabad is its own territory; for neighbours it is
// grouped with Punjab, where its twin city Rawalpindi is.

import { isNoindex } from './seo-indexing'
import { routes } from './routes'
import type { CityKey } from './location-data'

export type Province = 'Punjab' | 'Sindh' | 'Khyber Pakhtunkhwa' | 'Balochistan' | 'Islamabad Capital Territory'

export const PROVINCE_ORDER: Province[] = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad Capital Territory']

export const CITY_GEO: Record<CityKey, { province: Province; lat: number; lon: number }> = {
  // Punjab
  attock: { province: 'Punjab', lat: 33.77, lon: 72.36 },
  bahawalnagar: { province: 'Punjab', lat: 29.99, lon: 73.25 },
  bahawalpur: { province: 'Punjab', lat: 29.4, lon: 71.68 },
  burewala: { province: 'Punjab', lat: 30.17, lon: 72.65 },
  chichawatni: { province: 'Punjab', lat: 30.53, lon: 72.69 },
  chiniot: { province: 'Punjab', lat: 31.72, lon: 72.98 },
  daska: { province: 'Punjab', lat: 32.32, lon: 74.35 },
  'dera-ghazi-khan': { province: 'Punjab', lat: 30.06, lon: 70.63 },
  faisalabad: { province: 'Punjab', lat: 31.42, lon: 73.08 },
  gojra: { province: 'Punjab', lat: 31.15, lon: 72.69 },
  gujranwala: { province: 'Punjab', lat: 32.16, lon: 74.19 },
  gujrat: { province: 'Punjab', lat: 32.57, lon: 74.08 },
  hafizabad: { province: 'Punjab', lat: 32.07, lon: 73.69 },
  jhang: { province: 'Punjab', lat: 31.27, lon: 72.32 },
  jhelum: { province: 'Punjab', lat: 32.94, lon: 73.73 },
  kamoke: { province: 'Punjab', lat: 31.97, lon: 74.22 },
  khanewal: { province: 'Punjab', lat: 30.3, lon: 71.93 },
  khanpur: { province: 'Punjab', lat: 28.65, lon: 70.66 },
  'kot-adu': { province: 'Punjab', lat: 30.47, lon: 70.97 },
  lahore: { province: 'Punjab', lat: 31.55, lon: 74.34 },
  'mandi-bahauddin': { province: 'Punjab', lat: 32.59, lon: 73.49 },
  mianwali: { province: 'Punjab', lat: 32.58, lon: 71.54 },
  multan: { province: 'Punjab', lat: 30.2, lon: 71.47 },
  muridke: { province: 'Punjab', lat: 31.8, lon: 74.26 },
  murree: { province: 'Punjab', lat: 33.91, lon: 73.39 },
  muzaffargarh: { province: 'Punjab', lat: 30.07, lon: 71.19 },
  okara: { province: 'Punjab', lat: 30.81, lon: 73.45 },
  pakpattan: { province: 'Punjab', lat: 30.34, lon: 73.39 },
  'rahim-yar-khan': { province: 'Punjab', lat: 28.42, lon: 70.3 },
  rawalpindi: { province: 'Punjab', lat: 33.6, lon: 73.04 },
  sadiqabad: { province: 'Punjab', lat: 28.31, lon: 70.13 },
  sahiwal: { province: 'Punjab', lat: 30.66, lon: 73.11 },
  sargodha: { province: 'Punjab', lat: 32.08, lon: 72.67 },
  sheikhupura: { province: 'Punjab', lat: 31.71, lon: 73.98 },
  sialkot: { province: 'Punjab', lat: 32.49, lon: 74.52 },
  vehari: { province: 'Punjab', lat: 30.04, lon: 72.35 },
  'wah-cantonment': { province: 'Punjab', lat: 33.77, lon: 72.75 },
  // Sindh
  dadu: { province: 'Sindh', lat: 26.73, lon: 67.78 },
  hyderabad: { province: 'Sindh', lat: 25.4, lon: 68.37 },
  jacobabad: { province: 'Sindh', lat: 28.28, lon: 68.44 },
  kandhkot: { province: 'Sindh', lat: 28.24, lon: 69.18 },
  karachi: { province: 'Sindh', lat: 24.86, lon: 67.01 },
  khairpur: { province: 'Sindh', lat: 27.53, lon: 68.76 },
  larkana: { province: 'Sindh', lat: 27.56, lon: 68.21 },
  'mirpur-khas': { province: 'Sindh', lat: 25.53, lon: 69.01 },
  nawabshah: { province: 'Sindh', lat: 26.24, lon: 68.41 },
  shikarpur: { province: 'Sindh', lat: 27.96, lon: 68.64 },
  sukkur: { province: 'Sindh', lat: 27.71, lon: 68.85 },
  'tando-allahyar': { province: 'Sindh', lat: 25.46, lon: 68.72 },
  // Khyber Pakhtunkhwa
  abbottabad: { province: 'Khyber Pakhtunkhwa', lat: 34.15, lon: 73.21 },
  charsadda: { province: 'Khyber Pakhtunkhwa', lat: 34.15, lon: 71.73 },
  'dera-ismail-khan': { province: 'Khyber Pakhtunkhwa', lat: 31.83, lon: 70.9 },
  haripur: { province: 'Khyber Pakhtunkhwa', lat: 33.99, lon: 72.93 },
  kohat: { province: 'Khyber Pakhtunkhwa', lat: 33.58, lon: 71.44 },
  mansehra: { province: 'Khyber Pakhtunkhwa', lat: 34.33, lon: 73.2 },
  mardan: { province: 'Khyber Pakhtunkhwa', lat: 34.2, lon: 72.04 },
  nowshera: { province: 'Khyber Pakhtunkhwa', lat: 34.02, lon: 71.98 },
  peshawar: { province: 'Khyber Pakhtunkhwa', lat: 34.01, lon: 71.58 },
  swabi: { province: 'Khyber Pakhtunkhwa', lat: 34.12, lon: 72.47 },
  // Balochistan
  khuzdar: { province: 'Balochistan', lat: 27.81, lon: 66.61 },
  quetta: { province: 'Balochistan', lat: 30.18, lon: 67.0 },
  zhob: { province: 'Balochistan', lat: 31.34, lon: 69.45 },
  // Federal territory
  islamabad: { province: 'Islamabad Capital Territory', lat: 33.68, lon: 73.05 },
}

const CITY_KEYS = Object.keys(CITY_GEO) as CityKey[]

export const isIndexedCity = (k: CityKey) => !isNoindex(routes.location(k))

// Islamabad's neighbours come from Punjab, and it is one to Punjab's cities.
const neighbourGroup = (p: Province) => (p === 'Islamabad Capital Territory' ? 'Punjab' : p)

function distanceKm(a: CityKey, b: CityKey) {
  const r = Math.PI / 180
  const A = CITY_GEO[a], B = CITY_GEO[b]
  const x = (B.lon - A.lon) * r * Math.cos(((A.lat + B.lat) / 2) * r)
  const y = (B.lat - A.lat) * r
  return Math.sqrt(x * x + y * y) * 6371
}

/** The `count` nearest indexed cities in the same province, nearest first. */
export function nearestCities(key: CityKey, count = 5): CityKey[] {
  const group = neighbourGroup(CITY_GEO[key].province)
  return CITY_KEYS
    .filter((k) => k !== key && isIndexedCity(k) && neighbourGroup(CITY_GEO[k].province) === group)
    .sort((a, b) => distanceKm(key, a) - distanceKm(key, b))
    .slice(0, count)
}

/** Every indexed city, grouped by province in PROVINCE_ORDER, cities A–Z. */
export function indexedCitiesByProvince(): { province: Province; cities: CityKey[] }[] {
  return PROVINCE_ORDER.map((province) => ({
    province,
    cities: CITY_KEYS.filter((k) => CITY_GEO[k].province === province && isIndexedCity(k)).sort(),
  })).filter((g) => g.cities.length > 0)
}
