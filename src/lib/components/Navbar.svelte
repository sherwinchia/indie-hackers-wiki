<script lang="ts">
	import { browser } from '$app/environment'
	import { onDestroy, onMount } from 'svelte'
	import { fade, fly } from 'svelte/transition'
	import { theme } from '../../store'
	let showMobileNavbar = false,
		showNavbarStyle = false,
		showNavbar = true,
		lastScrollTop = 0
	const handleToggleMobileNavbar = () => {
		showMobileNavbar = !showMobileNavbar
	}
	const handleScroll = () => {
		let screenViewHeight = Math.round(window.innerHeight / 100) * 100
		var st = window.pageYOffset || document.documentElement.scrollTop
		if (st > lastScrollTop && window.pageYOffset > screenViewHeight) {
			showNavbar = false
		} else {
			showNavbar = true
		}
		if (window.pageYOffset > screenViewHeight) {
			showNavbarStyle = true
		} else {
			showNavbarStyle = false
		}
		lastScrollTop = st <= 0 ? 0 : st
	}
	const handleToggleTheme = () => {
		let root = document.getElementsByTagName('html')[0]
		if ($theme === 'light') {
			$theme = 'dark'
			root.classList.add('dark')
		} else {
			$theme = 'light'
			root.classList.remove('dark')
		}
		localStorage.setItem('theme', $theme)
	}
	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll)
		}

		let localTheme = localStorage.getItem('theme')
		$theme = localTheme ? localTheme : 'light'
		let root = document.getElementsByTagName('html')[0]

		if ($theme === 'dark') {
			$theme = 'dark'
			root.classList.add('dark')
		} else {
			$theme = 'light'
			root.classList.remove('dark')
		}
	})
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll)
		}
	})
</script>

{#if showNavbar}
	<div
		class="z-50 px-4 border-b top-4 bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600"
	>
		<nav
			class={` flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto inset-x-0  py-4 `}
		>
			<div class="flex items-center justify-between w-full">
				<div class="flex items-center gap-8">
					<a href="/" class="w-8">
						<img src="/logo.png" alt="Indiehacker.wiki Logo" class="w-full" />
					</a>
					<ul
						class="flex items-center gap-8 text-sm font-medium text-black dark:text-white"
					>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/about">About</a>
						</li>
					</ul>

					<!-- <button class="block md:hidden" on:click={handleToggleMobileNavbar}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button> -->
				</div>

				<div class="flex gap-2">
					<a
						href="https://github.com/sherwinchia/indie-hackers-wiki"
						target="_blank"
						class="p-[.35rem] border pointer-events-auto rounded-xl w-10 h-10 flex justify-center items-center border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
					>
						<iconify-icon icon="mdi:github" style="font-size: 1.5rem" />
					</a>

					<button
						on:click={handleToggleTheme}
						class="w-10 h-10 flex justify-center items-center p-[.35rem] border pointer-events-auto rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
					>
						{#if $theme === 'light'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-full"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
								/>
							</svg>
						{/if}
					</button>
				</div>
			</div>

			{#if showMobileNavbar}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					in:fade
					class="fixed inset-0 z-50 bg-black/60"
					on:click|self={handleToggleMobileNavbar}
				>
					<div
						in:fly={{
							x: 200
						}}
						class={`absolute right-0 w-1/2 inset-y-0 bg-black p-4 flex flex-col justify-center items-center text-black dark:text-white transition-all duration-300 ${
							!showMobileNavbar ? 'translate-x-full' : ' translate-x-0'
						}`}
					>
						<button
							on:click={handleToggleMobileNavbar}
							class="absolute top-6 right-4"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>

						<ul class="w-full space-y-2 text-right">
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/about">About</a>
							</li>
						</ul>
					</div>
				</div>
			{/if}
		</nav>
	</div>
{/if}
