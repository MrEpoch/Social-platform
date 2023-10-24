<script lang="ts">
  import Connect from "assets/connectAbout.jpg";

  let shown1 = false;
  let shown2 = false;
  let shown3 = false;

</script>

<div class="min-h-screen w-full dark:bg-stone-950 py-8">
  <div class="max-w-screen-xl mx-auto px-4 py-8 gap-2 flex flex-col items-center">
    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">We are TwoVay</h1>
    <p class="mb-8 text-lg font-normal text-gray-500 text-center pb-10 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
      Our goal is to connect people with their hobbies, goals, ideas and passions.
    </p>
    <img src={Connect} alt="Connect" class="mx-auto rounded-md max-w-3xl" />
    
<div id="accordion-collapse" data-accordion="collapse" class="w-full pt-16">
  <h2 id="accordion-collapse-heading-1">
    <button type="button" on:click={() => shown1 = !shown1}  class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span>Why we are?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  {#if shown1}
  <div id="accordion-collapse-body-1"  aria-labelledby="accordion-collapse-heading-1">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p class="mb-2 text-gray-500 dark:text-gray-400">We are group of happy people spreading goals and ideas.</p>
    </div>
  </div>
  {/if}
  <h2 id="accordion-collapse-heading-2">
    <button type="button" on:click={() => shown2 = !shown2}  class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
      <span>Where you can find us?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  {#if shown2}
  <div id="accordion-collapse-body-2" aria-labelledby="accordion-collapse-heading-2">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://stencukpage.com" class="text-blue-600 dark:text-blue-500 hover:underline">Portfolio</a></p>
    </div>
  </div>
  {/if}
  <h2 id="accordion-collapse-heading-3">
    <button type="button" on:click={() => shown3 = !shown3} class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
      <span>What we are?</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  {#if shown3}
  <div id="accordion-collapse-body-3" aria-labelledby="accordion-collapse-heading-3">
    <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
      <p class="mb-2 text-gray-500 dark:text-gray-400">We are most passionate about bringing your ideas, goals, news to the world!</p>
    </div>
  </div>
  {/if}
</div>

  </div>
</div>
