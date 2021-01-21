<template>
  <div>
    <form @submit.prevent="addCategory">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >ชื่อหมวดหมู่</label
        >
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="เสื้อผ้า,ของใช้,..."
        />
      </div>
      <button type="submit" class="btn btn-success w-100">Success</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: null,
    };
  },
  methods: {
    addCategory() {
      let data = {
        name: this.name,
      };
      axios
        .post("http://localhost:8081/category/add", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
