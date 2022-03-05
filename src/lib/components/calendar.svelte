<script lang="ts">
  import { getDaysInMonth, endOfMonth, startOfMonth, format, addMonths, isSameDay, addDays } from 'date-fns';
  import { range } from 'lodash-es';

  const now = new Date();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  let offset = 0;
  $: watchDay = addMonths(new Date(), offset);
  $: startDayOfMonth = startOfMonth(watchDay);
  $: endDayOfMonth = endOfMonth(watchDay);

  $: selected = offset ? startDayOfMonth : now;

  $: head = startDayOfMonth.getDay();
  $: count = getDaysInMonth(watchDay);
  $: tail = 6 - endDayOfMonth.getDay();
  $: days = [...new Array(head).fill(''), ...range(1, count), ...new Array(tail).fill('')];
  $: title = format(watchDay, 'yyyy 年 MM 月');
</script>

<div class="header">
  <img class="header__arrow" alt="goto last month" src="/arrow-left.svg" on:click={() => (offset -= 1)} />
  {title}
  <img class="header__arrow" alt="goto next month" src="/arrow-right.svg" on:click={() => (offset += 1)} />
</div>
<div class="calendar">
  {#each weekdays as day}
    <div class="calendar__head">{day}</div>
  {/each}
  {#each days as day}
    {@const date = days ? addDays(startDayOfMonth, day - 1) : null}
    <div
      class="calendar__item"
      class:calendar__item--active={isSameDay(now, date)}
      class:calendar__item--selected={isSameDay(selected, date)}
      on:click={() => {
        if (date) selected = date;
      }}
    >
      {day}
    </div>
  {/each}
</div>
<slot {selected} />

<style lang="postcss">
  .header {
    @apply flex justify-between text-center py-2 px-4 text-slate-800;
  }

  .header__arrow {
    @apply w-6 h-6;
  }

  .calendar {
    @apply grid grid-cols-7 gap-4 m-4;
  }

  .calendar__head {
    @apply font-bold text-sm text-center text-slate-700;
  }

  .calendar__item {
    @apply flex justify-center items-center self-center justify-self-center w-8 h-8;
    @apply rounded-full font-medium text-xl text-slate-600;
  }

  .calendar__item--active {
    @apply text-red-500;
  }

  .calendar__item--selected {
    @apply bg-black text-white;
  }

  .calendar__item--selected.calendar__item--active {
    @apply bg-red-500 text-white;
  }
</style>
