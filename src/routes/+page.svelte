<script lang="ts">
	import { enhance } from '$app/forms';
	import CommentsModal from 'components/CommentsModal.svelte';
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
        <div class="flex p-4 rounded-lg dark:bg-slate-800 dark:text-white bg-gray-200 flex-col gap-2">
          <div class="flex gap-4">
            <img class="w-10 h-10 object-cover object-center rounded-full" src={feed.user.image} alt="" />
            <div class="flex flex-col">
              <h3 class="text-xl font-bold">{feed.user.username}</h3>
              <p class="text-sm">{feed.user.lastActive}</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <p>{feed.content}</p>
            <div class="flex flex-wrap gap-2">
              {#each feed.images as image}
                <img src={image} class="object-cover aspect-square w-full max-w-[200px]" alt="" />
              {/each}
            </div>
          </div>
          <div class="flex gap-2 w-full justify-around">
            <form method="POST" use:enhance action="?/like">
              <button type="submit" class="bg-gray-200 dark:bg-gray-700 hover">
                {#if !session_data || !session_data.user || !session_data.user.likedPostsId.contains(feed.id)}
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>heart</title><path d="M4.24,12.25C3.47,11.5 3,10.42 3,9.25C3,6.9 4.9,5 7.25,5C8.83,5 10.21,5.86 10.94,7.14H12.06C12.79,5.86 14.17,5 15.75,5C18.1,5 20,6.9 20,9.25C20,10.42 19.5,11.5 18.76,12.25L11.5,19.5L4.24,12.25M19.46,12.96C20.41,12 21,10.7 21,9.25C21,6.35 18.65,4 15.75,4C14,4 12.45,4.85 11.5,6.17C10.55,4.85 9,4 7.25,4C4.35,4 2,6.35 2,9.25C2,10.7 2.59,12 3.54,12.96L11.5,20.92L19.46,12.96Z" /></svg>  
                {:else}
                  <svg class="w-6 h-6 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>heart</title><path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
                {/if}
              </button>
            </form>
            <CommentsModal post={feed} />
          </div>
        </div>
      {/each}
      <MessagePanel />
    </div>
    <div bind:this={footer} />
  </div> 
</div>
