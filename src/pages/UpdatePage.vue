<template>
  <q-page padding>
		<pre>{{msg}}</pre>
	</q-page>
</template>

<script>
import { defineComponent } from "vue";


export default defineComponent({
  name: "UpdatePage",
	data() {
		return {
			msg : "Update Message"
		}
	},
	created() {
		window.myWinApi.updateStatus((event, obj)=>{
			// console.log("update", obj);
			this.msg += '\n' + obj.msg
		})
	},	
  mounted() {
		
  },
  methods: {
    setSize() {
      if (process.env.MODE === "electron") {
        window.myWinApi.setSize(1600, 1024);
      }
    },
  },
});
</script>

<style lang='scss' scoped>
</style>