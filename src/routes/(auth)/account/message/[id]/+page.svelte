
<script lang="ts">
	import CommentsModal from "components/CommentsModal.svelte";

  export let data;
  const post = data.post;
</script>

<div class="min-h-screen w-full dark:bg-stone-950">
  <div class="max-w-screen-xl flex flex-col gap-10 mx-auto p-4">
    <CommentsModal {post} /> 
  </div>
</div>
