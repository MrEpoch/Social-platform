<script lang="ts">
  export let shown: boolean;
  export let image: string;
  export let closeModal: () => void;

  let file;

  function handleFileInput(event: any) {
    file = event.target.files[0];
  }
</script>

{#if shown} 
  <div id="defaultModal" tabindex="-1" aria-hidden="true" class={
    `fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 
    h-[calc(100%-1rem)] max-h-full flex justify-center items-center`}>
      <button
			class="w-full max-h-full cursor-default bg-black/50 h-full z-[51] absolute"
      on:click={closeModal}
		/>
      <div class="relative w-full max-w-2xl z-[52] max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Profile picture
                  </h3>
                  <button type="button" on:click={closeModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <form action="?/upload" method="POST" enctype="multipart/form-data" class="p-6 flex flex-wrap gap-3 items-center justify-center">
                <button class="w-full flex justify-center items-center">
                  <label class="cursor-pointer transition aspect-square object-cover object-center rounded-full text-white relative  focus:ring-4 focus:outline-none h-full w-full font-medium  text-sm  text-center  flex items-center justify-center">
                      <input
                          name="profile_picture"
                          on:change={handleFileInput}
                          type="file" accept=".jpg, .jpeg, .png, .webp" class="hidden w-full h-full" />
                      {#if file}
                        <img class="w-[calc(100%-10rem)] hover:brightness-50 transition aspect-square object-cover object-center rounded-full" src={URL.createObjectURL(file)} alt="" />
                      {:else}
                        <img class="w-[calc(100%-10rem)] hover:brightness-50 transition aspect-square object-cover object-center rounded-full" src={image} alt="" />
                      {/if}
                  </label>
                </button>
                <button type="submit" class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                  Upload
                </button>
              </form>
          </div>
      </div>
  </div>
{/if}
