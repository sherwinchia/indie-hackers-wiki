<script lang="ts">
	import { browser } from '$app/environment'
	import { onDestroy, onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	let showModal = false,
		bodyElement = browser ?? document.getElementsByTagName('BODY')[0]

	export const handleToggleModal = () => {
		showModal = !showModal
	}

	const handleScrollBar = () => {
		if (browser) {
			let body = document.getElementsByTagName('BODY')[0] as HTMLElement
			if (showModal) {
				body.style.overflowY = 'hidden'
			} else {
				body.style.overflowY = 'auto'
			}
		}
		return true
	}

	$: showModal, handleScrollBar()
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="fixed inset-0 z-20 flex flex-col justify-center p-6 bg-black/10 backdrop-blur"
		transition:fade|local
		on:click={handleToggleModal}
	>
		<slot {handleToggleModal} />
	</div>
{/if}

<style>
</style>
