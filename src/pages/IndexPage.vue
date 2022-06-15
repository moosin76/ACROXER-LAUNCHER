<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <!-- <q-card>
      <q-card-section>
        <q-input type="textarea" label="text" v-model="text" />
      </q-card-section>
			<q-card-actions>
				<q-btn label="저장" @click="save" />
			</q-card-actions>
    </q-card> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      text: "",
    };
  },
	methods : {
		// async save () {
		// 	const filename = await window.api.saveTextFile(this.text);
		// 	console.log(filename);
		// }
	}
});
</script>
