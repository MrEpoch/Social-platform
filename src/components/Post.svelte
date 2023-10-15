<script lang="ts">
	import type { Post } from "@prisma/client";
  import guyWalking from "assets/guyWalking.jpg";
	import { enhance } from '$app/forms';
  import CommentsModal from 'components/CommentsModal.svelte';
	import type { Session } from "lucia";

  interface PostWithUser extends Post {
    user: {
      username: string;
      profilePicture: string;
      lastActive: Date;
    };
  }

  export let feed: PostWithUser;
  export let session_data: null | Session;
  let likeState = !session_data || !session_data?.user || !session_data?.user?.likedPostsId?.includes(feed.id);
  let loadingLike = false;

  if (!session_data || !session_data?.user || !session_data?.user?.likedPostsId?.includes(feed.id)) {
    likeState = false;
  }

  function buttonEvent() {
    likeState = !likeState;
    loadingLike = true;
  }

</script>


<div class="flex w-full p-4 rounded-lg dark:bg-slate-800 dark:text-white bg-gray-200 flex-col gap-2">
  <div class="flex gap-4">
    <img class="w-10 h-10 object-cover object-center rounded-full" src={
      feed.user.profilePicture === "no-image" ? guyWalking : feed.user.profilePicture} alt="" />
    <div class="flex flex-col">
      <h3 class="text-xl font-bold">{feed.user.username}</h3>
      <p class="text-sm">{feed.user.lastActive.toISOString().split("T")[0]}</p>
    </div>
  </div>
  <div class="flex p-6 flex-col gap-4">
    <p>{feed.content}</p>
    <div class="flex flex-wrap gap-2">
      {#each feed.images as image}
        <img src={image} class="object-cover aspect-square w-full max-w-[200px]" alt="" />
      {/each}
    </div>
  </div>
  <div class="flex gap-2 w-full justify-around">
    <form method="POST" use:enhance action="?/like">
      <input type="hidden" name="post_id" value={feed.id}>
      <button hidden={loadingLike.loading} type="submit" on:click={buttonEvent} class="">
        {#if likeState}
          <svg class="w-6 h-6 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>heart</title><path fill="currentColor" d="M4.24,12.25C3.47,11.5 3,10.42 3,9.25C3,6.9 4.9,5 7.25,5C8.83,5 10.21,5.86 10.94,7.14H12.06C12.79,5.86 14.17,5 15.75,5C18.1,5 20,6.9 20,9.25C20,10.42 19.5,11.5 18.76,12.25L11.5,19.5L4.24,12.25M19.46,12.96C20.41,12 21,10.7 21,9.25C21,6.35 18.65,4 15.75,4C14,4 12.45,4.85 11.5,6.17C10.55,4.85 9,4 7.25,4C4.35,4 2,6.35 2,9.25C2,10.7 2.59,12 3.54,12.96L11.5,20.92L19.46,12.96Z" /></svg>  
        {:else}
          <svg class="w-6 h-6 text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>heart</title><path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
        {/if}
        </button>
        <div hidden={!loadingLike.loading} class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
    </form>
    <CommentsModal post={feed} />
  </div>
</div>
