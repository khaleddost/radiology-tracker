<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UContainer class="py-8">
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Radiology Tracker
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Diagnostic imaging request management
            </p>
          </div>
          <UButton
            color="primary"
            variant="outline"
            icon="i-heroicons-plus"
            @click="refreshData"
          >
            Refresh
          </UButton>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </UContainer>
  </div>
</template>

<script setup>
const refreshData = () => {
  // Implement refresh functionality
  refreshCookie('radiology-requests')
}
</script>