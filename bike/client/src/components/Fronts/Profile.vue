<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-user-edit"></i> แก้ไขโปรไฟล์</h3>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4><i class="far fa-address-card"></i> ข้อมูลส่วนตัวของคุณ</h4>
          <br />
          <span class="font2">
            <form v-on:submit.prevent="editUser">
              <div class="row">
                <div class="col">
                  <label for="input1">ชื่อ</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fas fa-user-alt"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      v-model="user.name"
                    />
                  </div>
                </div>
                <div class="col">
                  <label for="input1">นามสกุล</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fas fa-address-card"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Lastname"
                      v-model="user.lastname"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">อีเมล</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-envelope"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="email"
                    class="form-control"
                    placeholder="E-mail"
                    v-model="user.email"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">รหัสผ่าน</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-key"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="user.password"
                  />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col">
                  <button
                    type="submit"
                    class="btn btn-success"
                    style="width: 50%"
                  >
                    <i class="fas fa-save"></i> บันทึกข้อมูล
                  </button>
                </div>
                <div class="col">
                  <button
                    class="btn btn-danger"
                    type="button"
                    style="width: 50%"
                    v-on:click="navigateTo('/home')"
                  >
                    <i class="fas fa-times-circle"></i> ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          </span>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
      },
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push({
          name: "front",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.header {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  padding: 10px;
  position: relative;
  background-color: #ececec;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.1) inset;
  text-shadow: 1px 1px 1px #fff;
}
.categories {
  margin-top: 10px;
  padding: 0;
  width: 100%;
}
.blog-wrapper {
  margin-top: 20px;
  padding: 40px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.blog-tab {
  padding: 1px;
  background-color: #d3d3d3;
  text-align: left;
  text-indent: 0.5em;
}
.footer {
  margin-top: 50px;
}
</style>