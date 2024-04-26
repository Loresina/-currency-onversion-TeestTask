<script lang="ts">
  import { onMount } from "svelte";

  let data;

  onMount(async () => {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      data = await response.json();

      // localStorage.setItem("serverData", JSON.stringify(data));

      console.log(data);
    } catch (e) {
      console.error("Я ошибка запроса", e.message);
    }
  });

  let amount: number = 0;

  console.log("Печатаю число amount", amount);

  let count: number = 0;
  const increment = () => {
    count += 1;
  };
</script>

{#if data}
  <div>
    <h1>Data Loaded</h1>

    <form>
      <label>
        Enter amount:
        <input
          bind:value={amount}
          type="number"
          placeholder="enter your name"
        />
      </label>

      <p>Your amount is {amount || "null"}!</p>

      <label for="currency-one">Select currency one:</label>
      <select id="currency-one" name="currency-one">
        {#each Object.entries(data.rates) as [key]}
          <option value={key}>{key}</option>
        {/each}
      </select>
    </form>

    <p>{data.result}</p>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<button on:click={increment}>
  count is {count}
</button>

<div>
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
</div>

<!-- import { mkdirSync, openSync, appendFileSync } from 'fs';

<script lang="ts">

import { onMount } from 'svelte';

let data;

onMount(async () => {
  try {
  const response = await fetch('https://www.googleapis.com/books/v1/volumes/GZviEAAAQBAJ');
  data = await response.json();

  mkdirSync(cacheDir, { recursive: true });
  openSync('cacheDir/mail.log', 'a');
  appendFileSync('cacheDir/mail.log', `${data}`);
  console.log(data.kind)

  } catch {
    console.error('Привет, я ошибка')
  }

});

  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>

<div>{data}</div>

<div><a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a></div> -->
