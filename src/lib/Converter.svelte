<script lang="ts">
  import { onMount } from "svelte";
  import { makeConversion } from "./ makeConversion";

  // let data;

  type Rates = {
    [key: string]: number;
  };

  let selected: Rates;
  let updateTime: string = "";

  let amountOne: number = 1;
  let amountTwo: number = 0;

  let currencyOne: string = "USD";
  let currencyTwo: string = "RUB";

  onMount(async () => {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();

      localStorage.setItem("serverData", JSON.stringify(data.rates));

      selected = data.rates;
      amountTwo = makeConversion(amountOne, currencyOne, currencyTwo);
      updateTime = data.time_next_update_utc.slice(0, -6);

      console.log(selected);
    } catch (e) {
      console.error("it is fetch error", e.message);
    }
  });

  const onChange = (e) => {
    console.log("СОБЫТИЕ!!!!!!");
    const eventType = e.target.id;

    if (eventType === "amount-one" || eventType === "currency-one") {
      console.log("кейс 1");
      amountTwo = makeConversion(amountOne, currencyOne, currencyTwo);
    } else {
      console.log("кейс 2");
      amountOne = makeConversion(
        amountTwo,
        currencyOne,
        currencyTwo,
        "flipped"
      );
    }
  };

  // $: total = makeConversion(amount, "USA", 0, "RUS");
  // $: {
  //   console.log("Печатаю currencyOne", currencyOne);
  // }
</script>

{#if selected}
  <div class="converter">
    <div class="converter_item">
      <label for="amount-one">Enter amount and currency one:</label>
      <div class="converter_options">
        <input
          id="amount-one"
          bind:value={amountOne}
          on:input={onChange}
          type="number"
        />

        <!-- <label for="currency-one">Select currency one:</label> -->
        <select
          bind:value={currencyOne}
          on:change={onChange}
          id="currency-one"
          name="currency-one"
        >
          {#each Object.entries(selected) as [key]}
            <option value={key}>{key}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="converter_item">
      <label for="amount-two"> Enter amount and currency two:</label>

      <div class="converter_options">
        <input
          id="amount-two"
          bind:value={amountTwo}
          on:input={onChange}
          type="number"
        />

        <!-- <label for="currency-two">Select currency two:</label> -->
        <select
          bind:value={currencyTwo}
          on:change={onChange}
          id="currency-two"
          name="currency-two"
        >
          {#each Object.entries(selected) as [key]}
            <option value={key}>{key}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<div class="information">
  <div>
    <span>Exchange rates are updates once every 24 hours.</span>
    <span>Next update: {updateTime} UTC</span>
  </div>

  <div>
    <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
  </div>
</div>

<style>
  * {
    display: block;
    margin: 0 auto;
  }

  .converter {
    display: flex;
    justify-content: space-between, center;
    flex-wrap: wrap;
    gap: 15px;
    max-width: 100%;
  }

  .converter_item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start, flex-start;
    gap: 5px;
  }

  .converter_options {
    position: relative;
    display: flex;
    align-items: center;
  }

  label {
    font-size: 0.98em;
  }

  input {
    padding: 0.5em;
    font-size: 1rem;
    width: 100%;
  }

  select {
    position: absolute;
    right: 0px;
    height: 100%;
    padding: 0.5em;
    font-size: 16px;
  }

  .information {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
