<template>
  <q-page padding>
    <pre>{{ msg }}</pre>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UpdatePage",
  data() {
    return {
      msg: "Update Message",
    };
  },
  created() {
    window.myWinApi.updateStatus((event, obj) => {
      // console.log("update", obj);
      switch (obj.type) {
        case "routerTo":
          this.$router.push(obj.path);
          break;
        default:
          this.msg += "\n" + obj.msg;
          break;
      }
    });
  },
  mounted() {
		this.checkUpdate();
	},
	beforeUnmount() {
		this.setSize(1600, 1024);
	},
  methods: {
    setSize(w, h) {
      if (process.env.MODE === "electron") {
        window.myWinApi.setSize(w, h);
      }
    },
    async checkUpdate() {
      if (process.env.MODE === "electron") {
        const result =  await window.myWinApi.checkUpdate();
				console.log("checkUpdate", result);
				if(result) {
					this.$router.push('/');
				}
      }
    },
  },

});
</script>

<style lang='scss' scoped>
</style>