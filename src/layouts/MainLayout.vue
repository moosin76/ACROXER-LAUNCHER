<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-bar class="q-electron-drag bg-secondary">
        <q-space />
        <q-btn dense flat icon="mdi-window-minimize" @click="minimize" />
        <q-btn dense flat icon="mdi-window-maximize" @click="toggleMaximize" />
        <q-btn dense flat icon="mdi-close" @click="closeApp" />
      </q-bar>

      <div
        class="row items-center bg-secondary"
        style="height: 80px; padding: 0 16px 16px"
      >
        <!-- <q-btn
          flat
          dense
          round
          icon="mdi-menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <img
          alt="logo"
          src="~assets/logo.png"
          style="width: 400px; height: 50px"
					@click="$router.push('/')"
        />

        <div class="q-electron-drag col-grow full-height"></div>
        <q-btn flat padding="4px">
          <IconCodiAccount size="xs" left />
          <div class="text-body1" style="margin-left: -4px; font-size: 1.2em">
            MILLEINT
          </div>
        </q-btn>
        <q-btn icon="mdi-menu" flat padding="4px" class="q-ml-sm">
          <q-menu fit style="z-index: 10000">
            <q-list bordered class="bg-accent q-py-sm">
              <q-item to="/" dense>
                <q-item-section>LOG IN</q-item-section>
              </q-item>
              <q-item clickable dense>
                <q-item-section>QUIT</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn to="/" label="U"></q-btn>
        <q-btn to="/adm" label="A"></q-btn>
				<q-btn to="/update" label="up"></q-btn>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <left-pannel />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import IconCodiAccount from "components/icons/IconCodiAccount.vue";
import LeftPannel from "src/components/User/LeftPannel.vue";

export default defineComponent({
  components: { IconCodiAccount, LeftPannel },
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(true);

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
      leftDrawerOpen,
      minimize,
      toggleMaximize,
      closeApp,
    };
  },
});
</script>
