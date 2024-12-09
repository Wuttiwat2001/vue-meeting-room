<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import { ref } from 'vue';


const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    username: yup.string()
      .min(3, 'กรุณากรอกชื่อผู้ใช้ที่มีความยาวอย่างน้อย 3 ตัวอักษร')
      .matches(/^[a-zA-Z0-9]+$/, 'กรุณาใส่เฉพาะตัวอักษรภาษาอังกฤษและตัวเลข')
      .required('กรุณากรอกชื่อผู้ใช้'),
    password: yup.string().min(6, 'กรุณากรอกรหัสผ่านที่มีความยาวอย่างน้อย 6 ตัวอักษร').required('กรุณากรอกรหัสผ่าน'),
    firstName: yup.string().required('กรุณากรอกชื่อจริง'),
    lastName: yup.string().required('กรุณากรอกนามสกุล'),
  }),
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');
const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const errorMessage = ref('');


const onSubmit = handleSubmit(values => {
  axios.post('http://localhost:8080/api/auth/register').then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error.response.data.message);
    errorMessage.value = error.response.data.message;
  });
});

</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <img src="/images/logo.svg" alt="Logo" class="img-logo">
        <div class="card">
          <h1 class="card-header">ลงทะเบียน</h1>
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <label for="username">ชื่อผู้ใช้งาน</label>
                <input v-bind="usernameAttrs" v-model.trim="username" type="text" :class="{
                  'is-invalid': errors.username
                }" class="form-control" id="username" />
                <span v-if="errors.username" class="invalid-feedback">{{ errors.username }}</span>
              </div>
              <div class="form-group">
                <label for="">รหัสผ่าน</label>
                <input v-bind="passwordAttrs" v-model.trim="password" type="password" :class="{
                  'is-invalid': errors.password
                }" class="form-control">
                <span v-if="errors.password" class="invalid-feedback">{{ errors.password }}</span>
              </div>
              <div class="form-group">
                <label for="">ชื่อ</label>
                <input v-bind="firstNameAttrs" v-model.trim="firstName" type="text" :class="{
                  'is-invalid': errors.firstName
                }" class="form-control">
                <span v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</span>
              </div>
              <div class="form-group">
                <label for="">นามสกุล</label>
                <input v-bind="lastNameAttrs" v-model.trim="lastName" type="text" :class="{
                  'is-invalid': errors.lastName
                }" class="form-control">
                <span v-if="errors.lastName" class="invalid-feedback">{{ errors.lastName }}</span>
              </div>
              <div v-if="errorMessage" class="alert alert-warning d-flex justify-content-between align-items-center" role="alert">
                <div>
                  {{ errorMessage }}
                </div>
                <button @click="errorMessage = ''" type="button" class="btn-close" aria-label="Close"></button>
              </div>
              <div class="form-group d-grid gap-3 mt-4  mb-5">
                <button class="btn btn-register" type="submit">ลงทะเบียน</button>
                <button class="btn btn-secondary" type="button">เข้าสู่ระบบ</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>
<style scoped>
.img-logo {
  width: 80%;
  display: block;
  margin: auto;
  margin-top: 10%;
  margin-bottom: 28px;
}

h1 {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 2px;
}

.form-group {
  margin-bottom: 16px;
}

.card-body {
  margin-top: 12px;
  padding-left: 20%;
  padding-right: 20%;
}

.btn-register {
  width: 100%;
  background-color: #17A2B8;
  border: 1px solid #17A2B8;
  color: #FFFFFF;
}

.btn-register:hover {
  background-color: #138496;
  border-color: #138496;
  color: #FFFFFF;
}

.btn-register:active {
  background-color: #117a8b;
  border-color: #117a8b;
  color: #FFFFFF;
  transform: scale(1);
}
</style>