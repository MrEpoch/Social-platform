
<script lang="ts">
  import guyWalking from "assets/guyWalking.jpg";
  import type { CommentWithUser } from "types/index";

  export let data;
  const comment: CommentWithUser = data.comment;
</script>
    <div class="min-h-screen w-full dark:bg-stone-950">
        <div class="relative w-full h-full">
            <div class="overflow-y-auto h-full p-6 space-y-8 w-full">
                <div class="flex w-full h-full justify-center  items-center p-4 space-x-2">
                  <div id="toast-message-cta" class="w-full max-w-screen-xl p-6 py-16 dark:bg-gray-800 text-gray-500 bg-white rounded-lg shadow 
                    dark:text-gray-400 flex justify-between h-full flex-col gap-4" role="alert">
                      <div class="flex items-center">
                        <img class="w-16 h-16 rounded-full object-center shadow-lg object-cover aspect-square" src={
                          comment?.user?.profilePicture === "no-image" ? guyWalking : comment.user.profilePicture} alt={comment.user.username}/>
                          <div class="ml-3 text-sm font-normal">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{comment.user.username}</span>
                          </div>
                      </div>
                      <div class="text-sm break-words h-full font-normal">{comment.content}</div> 
                  </div>
                </div>
            </div>
        </div>
  </div>
