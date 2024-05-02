<script lang="ts">
  import { onMount } from "svelte";
  import { makeConversion } from "./ makeConversion";
  import arrow from "../assets/arrow.svg";

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

      selected = data.rates;

      updateTime = data.time_next_update_utc.slice(0, -6);
      amountTwo = makeConversion(amountOne, currencyOne, currencyTwo, selected);

      console.log(selected);
    } catch (e) {
      console.error("it is fetch error", e);
    }
  });

  const onChange = (e) => {
    const eventType = e.target.id;

    if (eventType === "amount-one" || eventType === "currency-one") {
      console.log("кейс 1");
      amountTwo = makeConversion(amountOne, currencyOne, currencyTwo, selected);
    } else {
      console.log("кейс 2");
      amountOne = makeConversion(
        amountTwo,
        currencyOne,
        currencyTwo,
        selected,
        "flipped"
      );
    }
  };

  const turnCyrrency = () => {
    console.log("hello", currencyOne, currencyTwo, amountOne, amountTwo);
    const temporaryAmountTwo = amountTwo;
    const temporaryCurrencyTwo = currencyTwo;
    amountTwo = amountOne;
    amountOne = temporaryAmountTwo;

    currencyTwo = currencyOne;
    currencyOne = temporaryCurrencyTwo;
  };
</script>

{#if selected}
  <div class="converter">
    <div class="converter_item">
      <label for="amount-one">From</label>
      <div class="converter_options">
        <input
          id="amount-one"
          bind:value={amountOne}
          on:input={onChange}
          type="number"
        />

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

    <button on:click={turnCyrrency} class="button-arrow"
      ><img src={arrow} alt="arrow button" /></button
    >

    <div class="converter_item">
      <label for="amount-two">To</label>

      <div class="converter_options">
        <input
          id="amount-two"
          bind:value={amountTwo}
          on:input={onChange}
          type="number"
        />

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
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 100%;
  }

  .converter_item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    gap: 5px;
  }

  .converter_options {
    position: relative;
    display: flex;
    align-items: center;
  }

  label {
    font-weight: 700;
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

  .button-arrow {
    display: flex;
    align-items: center;
    width: 35px;
    height: 35px;
    border: none;
    background: none;
    overflow: hidden;
    padding: 0;
  }

  .button-arrow:hover {
    transform: scale(1.1);
  }

  .button-arrow:focus {
    outline: none;
  }

  .button-arrow img {
    width: 100%;
    object-fit: cover;
  }

  .information {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 900px) {
    .converter {
      flex-direction: column;
      gap: 5px;
    }
  }
</style>
