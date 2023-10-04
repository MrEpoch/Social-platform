<script lang="ts">
  export let data;

  $: feeds = data.feeds;
</script>

<div class="w-full min-h-screen bg-stone-950">
  <div class="max-w-screen-xl mx-auto p-4">
    <div class="flex gap-3">  
      <h3 class="text-2xl font-bold">Feeds</h3>
      <div class="flex">
        <button class="bg-gray-200 dark:bg-gray-700 py-2 px-6">Latest</button>
        <button class="bg-gray-200 dark:bg-gray-700 py-2 px-6">Popular</button>
        <button class="bg-gray-200 dark:bg-gray-700 py-2 px-6">Random</button>
      </div>
    </div>
    <div class="flex flex-col gap-4 items-center h-full w-full">
      {#each feeds as feed}
        <div class="flex p-4 rounded-lg dark:bg-slate-800 dark:text-white bg-gray-200 flex-col gap-2">
          <div class="flex gap-4">
            <img class="w-10 h-10 rounded-full" src="https://picsum.photos/200/300" alt="" />
            <div class="flex flex-col">
              <h3 class="text-xl font-bold">"Username"</h3>
              <p class="text-sm">3 hours ago</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <p>{feed.content}</p>
            <div class="flex flex-wrap gap-2">
              {#each feed.images as image}
                <img src={image} class="object-cover aspect-square w-full max-w-[250px]" alt="" />
              {/each}
            </div>
          </div>
          <div class="flex gap-2">
            <button class="bg-gray-200 dark:bg-gray-700">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>heart</title><path d="M4.24,12.25C3.47,11.5 3,10.42 3,9.25C3,6.9 4.9,5 7.25,5C8.83,5 10.21,5.86 10.94,7.14H12.06C12.79,5.86 14.17,5 15.75,5C18.1,5 20,6.9 20,9.25C20,10.42 19.5,11.5 18.76,12.25L11.5,19.5L4.24,12.25M19.46,12.96C20.41,12 21,10.7 21,9.25C21,6.35 18.65,4 15.75,4C14,4 12.45,4.85 11.5,6.17C10.55,4.85 9,4 7.25,4C4.35,4 2,6.35 2,9.25C2,10.7 2.59,12 3.54,12.96L11.5,20.92L19.46,12.96Z" /></svg>  
            </button>
            <button class="bg-gray-200 dark:bg-gray-700">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye</title><path d="M11.5,18C15.5,18 18.96,15.78 20.74,12.5C18.96,9.22 15.5,7 11.5,7C7.5,7 4.04,9.22 2.26,12.5C4.04,15.78 7.5,18 11.5,18M11.5,6C16.06,6 20,8.65 21.86,12.5C20,16.35 16.06,19 11.5,19C6.94,19 3,16.35 1.14,12.5C3,8.65 6.94,6 11.5,6M11.5,8C14,8 16,10 16,12.5C16,15 14,17 11.5,17C9,17 7,15 7,12.5C7,10 9,8 11.5,8M11.5,9C9.57,9 8,10.57 8,12.5C8,14.43 9.57,16 11.5,16C13.43,16 15,14.43 15,12.5C15,10.57 13.43,9 11.5,9Z" /></svg>
            </button>
            <button class="bg-gray-200 dark:bg-gray-700">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>comment-text</title><path d="M5,3H18C19.66,3 21,4.34 21,6V15C21,16.66 19.66,18 18,18H13.41L9.71,21.71C9.53,21.89 9.28,22 9,22C8.45,22 8,21.55 8,21V18H5C3.34,18 2,16.66 2,15V6C2,4.34 3.34,3 5,3M18,4H5C3.9,4 3,4.9 3,6V15C3,16.1 3.9,17 5,17H9V21L13,17H18C19.1,17 20,16.1 20,15V6C20,4.9 19.1,4 18,4M5,7H18V8H5V7M5,10H17V11H5V10M5,13H13V14H5V13Z" /></svg>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div> 
</div>
