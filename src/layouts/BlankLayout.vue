<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-bar class="q-electron-drag justify-center bg-secondary">
        <q-btn to="/">Update</q-btn>

        <div style="position: absolute; right: 12px" class="q-gutter-x-xs">
          <q-btn dense flat icon="mdi-window-minimize" @click="minimize" />
          <q-btn
            dense
            flat
            icon="mdi-window-maximize"
            @click="toggleMaximize"
          />
          <q-btn dense flat icon="mdi-close" @click="closeApp" />
        </div>
      </q-bar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  name: "BlankLayout",
  setup() {
    function minimize() {
      if (process.env.MODE === "electron") {
        console.log(window.myWinApi);
        window.myWinApi.minimize();
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === "electron") {
        window.myWinApi.toggleMaximize();
      }
    }

    function closeApp() {
      if (process.env.MODE === "electron") {
        window.myWinApi.close();
      }
    }

    return {
      minimize,
      toggleMaximize,
      closeApp,
    };
  },
});
</script>
