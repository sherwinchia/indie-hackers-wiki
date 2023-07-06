<script lang="ts">
	import Analytics from '$lib/analytics.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import '../app.css'
	import 'iconify-icon'
</script>

<Analytics />

<Navbar />

<main
	class="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-slate-100 dark:bg-slate-900 font-poppins"
>
	<slot />
</main>

<Footer />
