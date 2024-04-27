<script lang="ts">
  import app from "./assets/app.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
</script>

<main>
  <div>
    <img src={app} class="logo" alt="App logo" />
  </div>
  <h1>Currency Converter</h1>

  <div class="card">
    <Counter />
  </div>
</main>

<style>
  .logo {
    height: 25em;
    /* padding: 1.5em; */
    /* will-change: filter;
    transition: filter 300ms; */
  }
  /* .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>
