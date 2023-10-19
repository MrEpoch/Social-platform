<script lang="ts">
  export let data;
  import guyWalking from "assets/guyWalking.jpg";
	import ImageModal from "./ImageModal.svelte";

  let user = data.user;
  let shownImageModal = false;
  const image = user.profilePicture === "no-image" ? guyWalking : user.profilePicture;
</script>


<div class="min-h-screen w-full dark:bg-stone-950 dark:text-white">
  <div class="max-w-screen-xl mx-auto p-4">
    <h3 class="text-4xl font-bayon">Welcome {user.username}</h3>
    <a href="/logout" class="items-center py-4 flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
      <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>logout</title><path fill="currentColor" d="M17 8L15.6 9.4L17.2 11H9V13H17.2L15.6 14.6L17 16L21 12L17 8M5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z" /></svg>
      Sign out
    </a>
    <button on:click={() => shownImageModal = true}>
      <img class="w-16 h-16 object-cover object-center rounded-full" src={image} alt="" />
    </button>
    <ImageModal {image} shown={shownImageModal} closeModal={() => shownImageModal = false} />
  </div>
</div>
