<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center mb-4">Update Student</h3>
      <form @submit.prevent="handleUpdateForm">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
            required
          />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input
            type="number"
            class="form-control"
            v-model.number="student.phone"
            required
          />
        </div>
        <div class="form-group mt-3">
          <button class="btn btn-danger btn-block">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {},
    };
  },
  created() {
    let apiURL = `${import.meta.env.VITE_API_BASE_URL}/api/edit-student/${this.$route.params.id}`;
    axios
      .get(apiURL)
      .then((res) => {
        this.student = res.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `${import.meta.env.VITE_API_BASE_URL}/api/update-student/${this.$route.params.id}`;
      axios
        .put(apiURL, this.student)
        .then(() => {
          this.$router.push("/view");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
