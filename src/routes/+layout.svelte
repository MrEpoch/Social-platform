<script lang="ts">
	import '../app.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import Transition from './transition.svelte';
  import { theme } from "lib/localStorage";

  export let data;

  console.log($theme);
</script>

<svelte:head>
	<meta name="color-scheme" content={$theme === "dark" ? 'dark' : 'light'} />
</svelte:head>

<div class="h-full w-full" class:dark={$theme === 'dark'}>
    <Header />
    <Transition url={data.url}>
        <slot />
    </Transition>
	<Footer />
</div>

<style lang="postcss">
</style>


