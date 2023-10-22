<script lang="ts">
  export let data;
  import guyWalking from "assets/NoUser.svg";
	import ImageModal from "./ImageModal.svelte";
	import type { Comment, Post } from "@prisma/client";

  let user = data.session.user;
  let shownImageModal = false;
  const latest: Post[] = data.latest;
  const latestComments: Comment[] = data.latestComments;
  export let form;
  const image = user.profilePicture === "no-image" ? guyWalking : user.profilePicture;
</script>


<div class="min-h-screen w-full py-8 dark:bg-stone-950 dark:text-white">
  <div class="max-w-screen-xl flex flex-col gap-10 mx-auto p-4">
    {#if form?.error}
      {form?.message}
    {/if}
    <h3 class="text-4xl font-bayon">Welcome {user.username}</h3>
    <div class="flex items-center justify-between">
    <a href="/logout" class="items-center py-4 rounded-lg px-2 flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
      <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>logout</title><path fill="currentColor" d="M17 8L15.6 9.4L17.2 11H9V13H17.2L15.6 14.6L17 16L21 12L17 8M5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z" /></svg>
      Sign out
    </a>
    <button on:click={() => shownImageModal = true}>
      <img class="w-16 h-16 object-cover object-center rounded-full" src={image} alt="" />
    </button>
    </div>
    <ImageModal {image} shown={shownImageModal} closeModal={() => shownImageModal = false} />
  </div>
  <div class="max-w-screen-xl py-16 flex flex-col gap-10 pt-[8rem] mx-auto p-4">
    <h3 class="text-4xl font-bayon">Most recent Posts</h3>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-900 uppercase bg-violet-400 dark:bg-violet-500">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Author
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Image Count
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Like Count
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each latest as post}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div class="pl-3">
                          <div class="text-base font-semibold">{user.username}</div>
                          <div class="font-normal text-gray-500">{post.createdAt.toUTCString()}</div>
                        </div>  
                    </th>
                    <td class="px-6 py-4">
                        {post.images.length}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                          {post.likeCount}
                        </div>
                    </td>
                    <td class="px-6 py-4">
                      <a href={`/account/message/${post.id}`} class="font-medium text-violet-600 dark:text-violet-500 hover:underline">Edit</a>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <h3 class="text-4xl pt-8 font-bayon">Most recent Comments</h3>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-900 uppercase bg-violet-400 dark:bg-violet-500">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Author
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Shortened Content
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each latestComments as comment}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div class="pl-3">
                          <div class="text-base font-semibold">{user.username}</div>
                          <div class="font-normal text-gray-500">{comment.createdAt.toUTCString()}</div>
                        </div>
                    </th>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                          {comment.content.slice(0, 20)}
                        </div>
                    </td>
                    <td class="px-6 py-4">
                      <a href={`/account/comment/${comment.id}`} class="font-medium text-violet-600 dark:text-violet-500 hover:underline">Edit</a>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
  </div>
</div>
