<script lang="ts">
  import { fly } from "svelte/transition";
  import { comments } from "lib/stores";
  import guyWalking from "assets/guyWalking.jpg";
 	import { browser } from '$app/environment';
  export let post;
  let modalShown = false;

  function loadComments() {
    showMoreComments(); 
    modalShown = true;
  }

  const INITIAL_COMMENTS = 0;
 	let limit = INITIAL_COMMENTS;
  let footer2: any;

		if (browser && modalShown) {
			const handleIntersect = (entries, observer) => {
				entries.forEach((entry) => {
					showMoreComments();
				});
			};
			const options = { threshold: 0.5, rootMargin: '-100% 0% 100%' };
			const observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(footer2);
		}

  $: error = "";
	$: showMoreComments;
	async function showMoreComments() {
		try {
			const newLimit = limit + 50;
				const response = await fetch('/api/comments', {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ skip: limit, take: 50, postid: post.id }),
				});
        const newData = await response.json();
        if (newData.error) {
          error = "Error happened"
        }
        console.log(newData);
				comments.set([...$comments, ...newData.comments]);
				limit = newLimit;	
		} catch (error) {
			console.error('Error fetching more comments in index');
		}
  }
</script>

<button on:click={loadComments} class="pb-2">
  <svg class="w-6 h-6 dark:text-white/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>comment-text</title><path fill="currentColor" d="M5,3H18C19.66,3 21,4.34 21,6V15C21,16.66 19.66,18 18,18H13.41L9.71,21.71C9.53,21.89 9.28,22 9,22C8.45,22 8,21.55 8,21V18H5C3.34,18 2,16.66 2,15V6C2,4.34 3.34,3 5,3M18,4H5C3.9,4 3,4.9 3,6V15C3,16.1 3.9,17 5,17H9V21L13,17H18C19.1,17 20,16.1 20,15V6C20,4.9 19.1,4 18,4M5,7H18V8H5V7M5,10H17V11H5V10M5,13H13V14H5V13Z" /></svg>
</button>

{#if modalShown}
  <div in:fly={{ y: 200, duration: 500 }} out:fly={{ y: 200, duration: 500 }} tabindex="-1" aria-hidden="true" class="fixed bg-gray-100/40 
    top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden
    md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center">
    <button
      tabindex="-1"
			class="w-full max-h-full cursor-default bg-black/90 h-full z-[51] absolute"
			on:click={() => (modalShown = false)}
		/>
      <div class="relative w-full max-w-2xl z-[52] max-h-full">
          <div class="relative w-full bg-white rounded shadow dark:bg-gray-700">
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    By {post.user.username}
                  </h3>
                  <button on:click={() => modalShown = false} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <div class="overflow-y-auto p-6 space-y-6 max-h-[450px] sm:max-h-[600px]">
                {#each $comments as comment}
                  <div class="flex w-full items-center p-2 space-x-2">
                    <div id="toast-message-cta" class="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow 
                      dark:bg-gray-800 dark:text-gray-400" role="alert">
                        <div class="flex">
                          <img class="w-10 h-10 rounded-full object-center shadow-lg object-cover aspect-square" src={
                            comment.user.profilePicture === "no-image" ? guyWalking : comment.user.profilePicture} alt={comment.user.username}/>
                            <div class="ml-3 text-sm font-normal">
                              <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{comment.user.username}</span>
                              <div class="mb-2 text-sm break-words font-normal">{comment.content}</div> 
                            </div>
                        </div>
                    </div>
                  </div>
                {/each}
                <div bind:this={footer2} />
              </div>
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <form method="POST" action="?/comment" class="w-full">
                   <input type="hidden" name="post_id" value={post.id}>
                   <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                           <label for="comment" class="sr-only">Your comment</label>
                           <textarea maxlength="300" name="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                       </div>
                       <div class="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
                           <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-violet-700 rounded-lg focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900 hover:bg-violet-800">
                               Post comment
                           </button>
                       </div>
                   </div>
                </form>
              </div>
          </div>
      </div>
  </div>
{/if}
