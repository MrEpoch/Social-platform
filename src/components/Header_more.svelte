<script lang="ts">
	import { theme } from "lib/localStorage";

  export let closeMore: any;

  function switchTheme() {
      theme.update((p) => {
          p.current = $theme.current === 'dark' ? 'light' : 'dark';
          return p;
      });
	}


</script>

<div id="dropdown" class="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="/account" on:click={closeMore} class="gap-2  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center">
          <svg class="w-8 h-8 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
          Account
        </a>
      </li>
      <li>
        <a href="/about" on:click={closeMore} class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>information</title><path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
          About
        </a>
      </li>
      <li>
        <button on:click={switchTheme} class="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>brightness-4</title><path fill="currentColor" d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z" /></svg>
          Theme
        </button>
      </li>
      <li>
        <a href="/logout" on:click={closeMore} class="px-4 py-2 items-center flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-8 h-8 pb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>logout</title><path fill="currentColor" d="M17 8L15.6 9.4L17.2 11H9V13H17.2L15.6 14.6L17 16L21 12L17 8M5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z" /></svg>
          Sign out
        </a>
      </li>
    </ul>
</div>

