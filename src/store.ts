import { writable } from 'svelte/store'
import type { Resource } from './type'

export const theme = writable('light')
export const resources = writable<Array<Resource>>([])
export const filteredResources = writable<Array<Resource>>([])
