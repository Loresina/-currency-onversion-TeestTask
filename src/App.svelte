<script lang="ts">
  import app from "./assets/app.svg";
  import Converter from "./lib/Converter.svelte";
</script>

<main>
  <div>
    <img src={app} class="logo" alt="App logo" />
  </div>
  <h1>Currency Converter</h1>

  <div class="card">
    <Converter />
  </div>
</main>

<style>
  .logo {
    height: 22em;
  }

  @media (max-width: 900px) {
    .logo {
      height: 18em;
    }

    h1 {
      font-size: 2.5em;
      max-width: 370px;
    }
  }
</style>
