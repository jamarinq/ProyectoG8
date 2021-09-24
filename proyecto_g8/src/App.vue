<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo Planta Personal"
          class="shrink mr-2"
          contain
          src="../src/assets/logo2.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Control Planta de Personal </h1>

      </div>
    </v-app-bar>

    <v-main id="v_principal">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
#v_principal
{
  background-color: #385F73;
}
</style>