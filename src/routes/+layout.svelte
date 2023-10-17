<script lang="ts">
	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import Transition from './transition.svelte';
  import { theme } from "lib/localStorage";
  export let data;
</script>

<svelte:head>
	<meta name="color-scheme" content={$theme.current !== "dark" ? 'dark' : 'light'} />
  <title>Social Platform</title>
</svelte:head>

<div class="h-full dark w-full" class:dark={$theme.current !== 'dark'}>
    <Header {data} />
    <Transition url={data.url}>
        <slot />
    </Transition>
	<Footer />
</div>

<style lang="postcss">
</style>


