<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const isLoading = ref(false)

const loginWithGoogle = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get('http://localhost:3000/api/auth/login')
    window.location.href = data.authorizationUrl
  } catch (err) {
    console.error(err)
    isLoading.value = false
  }
}
</script>

<template>
  <button @click="loginWithGoogle" :disabled="isLoading">
    {{ isLoading ? "Loading..." : "Login with Google" }}
  </button>
</template>