<script lang="ts">
	import Analytics from '$lib/analytics.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import { onMount } from 'svelte'
	import '../app.css'
	import 'iconify-icon'
	import { theme } from '../store'

	onMount(() => {
		let localTheme = localStorage.getItem('theme')

		$theme = localTheme ? localTheme : 'light'
		let root = document.getElementsByTagName('html')[0]
		if ($theme === 'light') {
			$theme = 'dark'
			root.classList.add('dark')
		} else {
			$theme = 'light'
			root.classList.remove('dark')
		}
	})
</script>

<Analytics />

<Navbar />

<main
	class="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-slate-100 dark:bg-slate-900 font-poppins"
>
	<slot />
</main>

<Footer />
