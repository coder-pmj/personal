<template>
  <el-card>
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="form"
      :label-position="labelPosition"
      size="mini"
    >
      <p align="center">请先登录</p>

      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user" placeholder="请输入您注册时的账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item>
        <el-button size="mini" type="warning" round @click="login('ruleForm')">登录</el-button>
        <span style="color:#999;margin-left:5px">登录将自动注册</span>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { loginRegist } from "../api/index";
import { setUser } from "../plugins/utils";
export default {
  data() {
    const validateUser = (r, v, cb) => {
      if (!v) {
        return cb(new Error("账号不能为空"));
      }

      if (!/^.{1,8}$/.test(v)) {
        return cb(new Error("用户名不能超过8位数"));
      }
      if (/^(\d|_)/.test(v)) {
        return cb(new Error("用户名不能以数字或下划线开头"));
      }
      cb();
    };
    const validatePass = (r, v, cb) => {
      if (!v) {
        return cb(new Error("密码不能为空"));
      }
      if (!/^.{1,10}$/.test(v)) {
        return cb(new Error("密码不能超过10位数"));
      }
      cb();
    };
    return {
      form: {
        user: "",
        password: ""
      },
      rules: {
        user: [{ validator: validateUser, trigger: ["blur","change"] }],
        password: [{ validator: validatePass, trigger: ["blur","change"] }]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          loginRegist(this.form).then(res => {
            if (res.data.flag) {
              let arr = [{ user: this.form.user }];
              setUser(arr);
              this.$store.commit("loginUser/setInfo", arr);
            } else {
              this.$message({
                type: "error",
                message: "密码错误",
                offset: 60
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.el-card {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
</style>