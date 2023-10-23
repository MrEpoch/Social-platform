
<script lang="ts">
  import guyWalking from "assets/NoUser.svg";
  import Twovay from "assets/TWOVAY.png";
	import HeaderMore from "components/Header_more.svelte";
  export let data: any;
  console.log(data.session);
  const image = data.session?.user?.profilePicture === "no-image" ? guyWalking : data.session?.user?.profilePicture;

  let shownMenu = false;
  function showMenu() {
    shownMenu = !shownMenu
  }

  function closeMore() {
    shownMenu = false;
  }

</script>

<header class="py-10 px-4 flex justify-between items-center dark:bg-stone-950">
  <a href="/" class="flex gap-3 items-center">
    <img class="w-16 h-16 contrast-150 bg-gray-400 p-2 rounded-lg" src={Twovay} alt="" />
    <h3 class="text-4xl pt-3 font-bayon">TwoVay</h3>
  </a>
  {#if data.session}
    <div class="relative">
    <button on:click={showMenu}>
      <img class="w-16 h-16 object-cover object-center rounded-full" src={image} alt="" />
    </button>
    {#if shownMenu}
      <HeaderMore {closeMore} />
    {/if}
    </div>
  {:else}
    <a class="w-16 dark:bg-gray-100 rounded-full p-4 flex items-center justify-center h-16" href="/signin">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>login</title><path d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z" /></svg>    
    </a>
  {/if}
</header>
