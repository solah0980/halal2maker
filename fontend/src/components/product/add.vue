<template>
  <div>
    <div v-if="picture">
      <img :src="url + picture" alt="" class="picture" />
    </div>

    <div class="custom-file mb-3">
      <input
        type="file"
        class="custom-file-input"
        id="validatedCustomFile"
        required
        @change="onChange"
      />
      <label class="custom-file-label" for="validatedCustomFile"
        >อัพโหลดรูปสินค้า</label
      >
      <div class="invalid-feedback">Example invalid custom file feedback</div>
    </div>
    <form @submit.prevent="saveProduct">
      <div class="form-group">
        <label for="exampleInputEmail1">ชื่อสินค้า</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">รายละเอียด</label>
        <textarea
          v-model="description"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">ประเภท</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="type"
        >
          <option v-for="i in category" :key="i.id" :value="i.id">
            {{ i.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">ราคา</label>
        <input
          v-model="price"
          type="number"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">บันทึก</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: null,
      description: null,
      type: null,
      price: null,
      picture: null,
      file: null,
      url: "/api/assets/uploads/",
      category: null,
    };
  },
  created() {
    axios
      .get("/api/categorys")
      .then((result) => {
        this.category = result.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    saveProduct() {
      let product = {
        name: this.name,
        description: this.description,
        type: this.type,
        price: this.price,
        picture: this.picture,
      };
      /*   console.log(product); */
      axios
        .post("/api/item/add", product)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
    onChange(event) {
      this.file = event.target.files[0];
      this.uploadImage();
    },

    uploadImage() {
      const formData = new FormData();
      formData.append("file", this.file, this.file.name);
      axios
        .post("/api/upload", formData)
        .then((result) => {
          this.picture = this.file.name;
          this.file = null;
          console.log(result);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss" scoped>
.picture {
  width: 300px;
  margin-bottom: 20px;
}
</style>
