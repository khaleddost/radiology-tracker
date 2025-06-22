<template>
  <div class="flex items-center space-x-2">
    <UIcon
      :name="getStatusIcon()"
      :class="getStatusColor()"
      class="w-4 h-4"
    />
    <span :class="getTextColor()" class="font-mono text-sm">
      {{ formattedTime }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  createdAt: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  }
})

const elapsedTime = ref(0)
const formattedTime = ref('')

// Time thresholds in minutes
const THRESHOLDS = {
  urgent: {
    warning: 15,
    critical: 30
  },
  priority: {
    warning: 60,
    critical: 120
  },
  routine: {
    warning: 240,
    critical: 480
  }
}

const updateElapsedTime = () => {
  const now = new Date()
  const created = new Date(props.createdAt)
  const diffMs = now - created
  const diffMinutes = Math.floor(diffMs / 60000)
  
  elapsedTime.value = diffMinutes
  
  // Format time display
  if (diffMinutes < 60) {
    formattedTime.value = `${diffMinutes}m`
  } else if (diffMinutes < 1440) {
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    formattedTime.value = `${hours}h ${minutes}m`
  } else {
    const days = Math.floor(diffMinutes / 1440)
    const hours = Math.floor((diffMinutes % 1440) / 60)
    formattedTime.value = `${days}d ${hours}h`
  }
}

const getStatusLevel = () => {
  const threshold = THRESHOLDS[props.priority]
  if (elapsedTime.value >= threshold.critical) return 'critical'
  if (elapsedTime.value >= threshold.warning) return 'warning'
  return 'normal'
}

const getStatusIcon = () => {
  const level = getStatusLevel()
  switch (level) {
    case 'critical': return 'i-heroicons-exclamation-triangle'
    case 'warning': return 'i-heroicons-clock'
    default: return 'i-heroicons-check-circle'
  }
}

const getStatusColor = () => {
  const level = getStatusLevel()
  switch (level) {
    case 'critical': return 'text-red-500'
    case 'warning': return 'text-yellow-500'
    default: return 'text-green-500'
  }
}

const getTextColor = () => {
  const level = getStatusLevel()
  switch (level) {
    case 'critical': return 'text-red-600 dark:text-red-400 font-semibold'
    case 'warning': return 'text-yellow-600 dark:text-yellow-400 font-medium'
    default: return 'text-gray-600 dark:text-gray-400'
  }
}

// Initialize and set up interval
onMounted(() => {
  updateElapsedTime()
  // Update every minute
  const interval = setInterval(updateElapsedTime, 60000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>