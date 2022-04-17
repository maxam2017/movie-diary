<script lang="ts">
  import { goto } from '$app/navigation';
  import Calendar from '$lib/components/calendar.svelte';
  import DiaryForm from '$lib/components/diary-form.svelte';
  import Header from '$lib/components/header.svelte';
  import MovieChip from '$lib/components/movie-chip.svelte';
  import { term, diaryList, selectDiary, diaryPage, insertDiary } from '$lib/stores/diary';
  import { listTrending } from '$lib/stores/movie';

  import { user } from '$lib/stores/user';
  import safeGetDate from '$lib/utils/safeGetDate';
  import { isSameDay } from 'date-fns';
  import { onMount } from 'svelte';

  onMount(() => {
    if (!$user) {
      return goto('/login');
    }
    listTrending({ page: 1 });
    selectDiary();
  });

  let diaryForm: DiaryForm;
</script>

<Header />
<Calendar
  let:selected
  on:month_change={(evt) => {
    selectDiary(evt.detail);
    term.set(evt.detail);
  }}
>
  <div class="panel">
    <button class="panel__button" on:click={diaryForm.open}>
      <img class="w-6 h-6" alt="add diary" src="/plus.svg" />
      Add
    </button>
    <div class="list">
      {#if $diaryPage.fetched && $diaryList.length === 0}
        <div class="empty">nothing</div>
      {/if}
      {#each $diaryList.filter((item) => isSameDay(safeGetDate(item.watched_at), selected)) as diary}
        <MovieChip id={diary.movie_id}>
          🍿️: {diary.review}
        </MovieChip>
      {/each}
    </div>
  </div>
  <DiaryForm
    bind:this={diaryForm}
    onSubmit={async (val) => {
      return insertDiary({
        user_id: $user.id,
        watched_at: selected.toISOString(),
        movie_id: val.movieId,
        review: val.review,
      });
    }}
  />
</Calendar>

<style lang="postcss">
  .panel {
    @apply relative flex-1 p-4 flex justify-center items-center;
    @apply bg-white text-slate-600;
  }

  .panel__button {
    @apply absolute right-4 top-4 flex p-2 items-center;
    @apply text-red-500;
  }

  .list {
    display: grid;
    width: 100%;
    grid-row-gap: 5px;
    align-self: flex-start;
    margin-top: 40px;
  }

  .empty {
    text-align: center;
  }
</style>
