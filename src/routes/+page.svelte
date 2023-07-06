<script lang="ts">
	import { onMount } from 'svelte'
	import { filteredResources, resources } from '../store'
	import data from '../data/db.json'
	import {
		getCapitalizeFirstLetter,
		getCategoryEmoji,
		getRefExternalLink
	} from '../utils'
	import { fade, slide } from 'svelte/transition'

	let activeFilter = 'all'
	let availableCategories: any

	const handleFilterData = (category: string) => {
		activeFilter = category.toLowerCase()

		if (activeFilter.toLowerCase() === 'all') {
			return ($filteredResources = data)
		}

		$filteredResources = $resources.filter((resource) => {
			let tempCategories = resource.categories.map((element) => {
				return element.toLowerCase()
			})
			if (tempCategories.includes(activeFilter)) {
				return resource
			}
		})
	}

	onMount(() => {
		$resources = data

		availableCategories = $resources.map((resource) => resource.categories)
		availableCategories = availableCategories.flat(1)
		availableCategories = availableCategories.map((item: string) =>
			item.toLowerCase()
		)
		availableCategories = availableCategories.sort((a: string, b: string) =>
			a.localeCompare(b)
		)

		availableCategories = [...new Set(availableCategories)]

		handleFilterData(activeFilter)
	})
</script>

<div
	class="relative flex flex-col flex-1 w-full gap-4 md:pt-8 md:flex-row max-w-7xl"
>
	<!-- sidebar -->
	<div class="text-black dark:text-white md:h-screen md:max-h-screen">
		<div
			class="sticky flex flex-row flex-wrap gap-2 text-xs md:gap-4 md:w-40 md:flex-col top-4 md:text-sm"
		>
			<button
				on:click={() => {
					handleFilterData('all')
				}}
				class={` rounded-lg md:px-4 md:py-2 px-2 py-1 text-left ${
					activeFilter === 'all'
						? 'border-slate-300 dark:border-slate-600 border rounded-xl bg-slate-50 dark:bg-slate-800'
						: ''
				}`}>🌍 All</button
			>
			{#if availableCategories}
				{#each availableCategories as category}
					<button
						on:click={() => {
							handleFilterData(category)
						}}
						class={` rounded-lg md:px-4 md:py-2 px-2 py-1 text-left ${
							activeFilter === category
								? 'border-slate-300 dark:border-slate-600 border rounded-xl bg-slate-50 dark:bg-slate-800'
								: ''
						}`}
					>
						{getCategoryEmoji(category)}
						{getCapitalizeFirstLetter(category)}
					</button>
				{/each}
			{/if}
		</div>
	</div>
	<div
		class="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min auto-cols-min"
	>
		{#each $filteredResources as resource}
			<div
				in:fade
				class="relative flex flex-col col-span-1 gap-2 p-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800"
			>
				<div class="flex flex-col flex-1 gap-2">
					<h4 class="font-medium text-black dark:text-white">
						{resource.name}
					</h4>
					<p class="flex-1 text-xs">
						{resource.description}
					</p>
					<div class="flex items-center justify-between gap-2">
						<div class="flex flex-wrap gap-2">
							{#each resource.categories as category}
								<span
									class="flex border border-slate-300 dark:border-slate-600 px-2 py-1 text-[.6rem] rounded-lg items-center justify-center"
								>
									{getCategoryEmoji(category.toLowerCase())}
								</span>
							{/each}
							{#if resource.pricing}
								<span
									class="flex border border-slate-300 dark:border-slate-600 px-2 py-1 text-[.6rem] rounded-lg items-center justify-center"
								>
									{resource.pricing}
								</span>
							{/if}
						</div>
						<a
							href={getRefExternalLink(resource.external_link)}
							target="_blank"
							class=""
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-4 h-4"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
