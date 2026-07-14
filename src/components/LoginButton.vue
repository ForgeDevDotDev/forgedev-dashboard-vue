<script setup lang="ts">
import { ref } from "vue"

const isLoading = ref(false)

const loginWithGoogle = () => {
  isLoading.value = true

  window.location.href =
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/login` //direct redirect without axios
}
</script>

<template>
  <button
    @click="loginWithGoogle"
    :disabled="isLoading"
  >
    {{ isLoading
      ? "Loading..."
      : "Login with Google" }}
  </button>
</template>