<script lang="ts">
  import { goto } from '$app/navigation';
  import { homePageErr } from "lib/errTypes";

  export let data;
  export let form;
  let feeds = data.feeds;
  $: params_data = data.params_data;
  $: session_data = data.session;

  import { posts } from 'lib/stores';
 	import { onMount } from 'svelte';
 	import { browser } from '$app/environment';
	import MessagePanel from './MessagePanel.svelte';
	import Post from 'components/Post.svelte';
  const INITIAL_POSTS = 25;
  posts.set(feeds);
 	let limit = INITIAL_POSTS;
  let footer: any;

 onMount(() => {
		if (browser) {
			const handleIntersect = (entries, observer) => {
				entries.forEach((entry) => {
					showMorePosts();
				});
			};
			const options = { threshold: 0.5, rootMargin: '-100% 0% 100%' };
			const observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(footer);
		}
	});

  $: error = "";
	$: showMorePosts;
	async function showMorePosts() {
		try {
			const newLimit = limit + 25;
				const response = await fetch('/api/posts', {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ type: params_data, skip: limit, take: 25 }),
				});
        const newData = await response.json();
        if (newData.error) {
           error = homePageErr[newData.type as keyof typeof homePageErr] as string;
        }
				posts.set([...$posts, ...newData.posts]);
				limit = newLimit;	
		} catch (error) {
			console.error('Error fetching more posts in index');
		}
  }
</script>

<div class="w-full min-h-screen dark:bg-stone-950 text-black bg-gray-50 dark:text-white">
  <div class="max-w-screen-xl relative mx-auto p-4 flex flex-col gap-8">
    <div class="flex gap-3 justify-between">  
      <h3 class="text-2xl font-bold ">Feeds</h3>
      <div class="flex rounded-lg bg-gray-200 dark:bg-gray-700">
        <button on:click={() => goto("/?type=latest", {
            replaceState: true
          })} class={"bg-gray-200 rounded-l-lg dark:bg-gray-700 px-4 py-2 max-[380px]:px-2 max-[380px]:py-1 max-[380px]:text-[11px] sm:px-6 sm:text-base text-sm" + " " + (params_data === "latest" ? "bg-gray-300 dark:bg-gray-800 rounded-lg" : "")}>Latest</button>
        <button on:click={() => goto("/?type=popular", {
            replaceState: true
          })}  class={"bg-gray-200 dark:bg-gray-700 py-2 px-4 sm:px-6 text-sm max-[380px]:px-2 max-[380px]:py-1 max-[380px]:text-[11px] sm:text-base" + " " + (params_data === "popular" ? "bg-gray-300 dark:bg-gray-800 rounded-lg" : "")}>Popular</button>
        <button on:click={() => goto("/?type=random", {
          })}  class={"bg-gray-200 rounded-r-lg dark:bg-gray-700 sm:text-base max-[380px]:px-2 max-[380px]:py-1 max-[380px]:text-[11px] text-sm px-4 py-2 sm:px-6" + " " + (params_data === "random" ? "bg-gray-300 dark:bg-gray-800 rounded-lg" : "")}>Random</button>
      </div>
    </div>
    <div class="flex flex-col gap-4 items-center h-full w-full">
      {#if form?.error}
        <p class="text-red-500">{form?.type}</p>
      {/if}
      {#each $posts as feed}
        <Post {form} {feed} {session_data} />
      {/each}
      <MessagePanel />
    </div>
    <div bind:this={footer} />
  </div> 
</div>
