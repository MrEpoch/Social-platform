<script lang="ts">
  let shownModal = false;

  async function handleFileInput(event: any) {
    const newImage = await event.target.files[0].arrayBuffer();
    files = [...files, newImage];
    showing = [...showing, URL.createObjectURL(event.target.files[0])];
  }
	$: files = [] as any[];
  $: showing = [] as any[];
</script>

<form enctype="multipart/form-data" action="?/newPost" method="POST" class="w-full fixed dark:text-white bottom-5 left-0 flex justify-center">
  <div class="max-w-screen-xl flex flex-col w-full p-3 dark:bg-gray-800 bg-gray-200 h-full rounded-lg">
  <input type="hidden" name="post_images" value={JSON.stringify(files)}>
  <div class="mb-6">
    <input name="post_content" placeholder="My thoughs..." type="text" id="default-input" class="block
                w-full p-3 bg-transparent text-[9px] sm:text-sm rounded-full
                text-gray-900 border-[2px] border-gray-300 focus:ring-gray-500
                focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-499">
  </div>
  <button type="button" on:click={() => shownModal = true} class="bg-violet-500 text-white font-medium rounded-lg text-sm px-5 w-fit py-2 text-center">Add Image</button>
  <button type="submit" class="bg-violet-800 text-white font-medium rounded-lg text-sm px-5 py-2 text-center">Submit</button>
  </div>
</form>

{#if shownModal}
  <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Images
                  </h3>
                  <button type="button" on:click={() => shownModal = false} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <div class="p-6 flex flex-wrap gap-3">
                {#each showing as file}
                  <img
                    class="w-32 aspect-square object-cover"
                    src={file}
                    alt="img"
                  />
                {/each}
              </div>
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <label class="cursor-pointer text-white bg-violet-700 relative hover:bg-violet-800 focus:ring-4 focus:outline-none h-full w-full focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 flex items-center justify-center">
                  Choose image
                  <input
                      on:change={handleFileInput}
                      type="file" multiple accept=".jpg, .jpeg, .png, .webp" class="hidden w-full h-full" />
                </label>
              </div>
          </div>
      </div>
  </div>
{/if}

