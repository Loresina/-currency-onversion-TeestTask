<script lang="ts">
  import { onMount } from "svelte";

  import { makeConversion } from "./ makeConversion";

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

  let amountOne: number = 0;
  let amountTwo: number = 0;

  let currencyOne: string = "";
  let currencyTwo: string = "";

  // $: {
  //   console.log("Печатаю число amount", amount);
  // }

  const onChange = (e) => {
    const inputNum = e.target.id;

    switch (inputNum) {
      case "amount-one":
        amountTwo = makeConversion(amountOne, currencyOne, currencyTwo);
        break;
      default:
        amountOne = makeConversion(amountTwo, currencyTwo, currencyTwo);
        break;
    }
  };

  // const onFormChange = () => {
  //   amount;
  // };

  // $: total = makeConversion(amount, "USA", 0, "RUS");
</script>

{#if data}
  <div>
    <!-- <form on:input={onFormChange}> -->
    <label>
      Enter amount one:
      <input
        id="amount-one"
        bind:value={amountOne}
        on:input={onChange}
        type="number"
      />
    </label>

    <label for="currency-one">Select currency one:</label>
    <select bind:value={currencyOne} id="currency-one" name="currency-one">
      {#each Object.entries(data.rates) as [key]}
        <option value={key}>{key}</option>
      {/each}
    </select>

    <label>
      Enter amount two:
      <input
        id="amount-two"
        bind:value={amountTwo}
        on:input={onChange}
        type="number"
      />
    </label>

    <label for="currency-two">Select currency one:</label>
    <select bind:value={currencyTwo} id="currency-two" name="currency-two">
      {#each Object.entries(data.rates) as [key]}
        <option value={key}>{key}</option>
      {/each}
    </select>

    <!-- </form> -->

    <p>{data.result}</p>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<div>
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
</div>

<style>
  * {
    display: block;
    margin: 0 auto;
  }
</style>
