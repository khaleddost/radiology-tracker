<template>
  <div>
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <UCard>
        <div class="flex items-center">
          <div class="p-2 bg-red-100 dark:bg-red-900 rounded-lg mr-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Urgent</p>
            <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ stats.urgent }}</p>
          </div>
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-3">
            <UIcon name="i-heroicons-clock" class="text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Priority</p>
            <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ stats.priority }}</p>
          </div>
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
            <UIcon name="i-heroicons-document-text" class="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Routine</p>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.routine }}</p>
          </div>
        </div>
      </UCard>
      
      <UCard>
        <div class="flex items-center">
          <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
            <UIcon name="i-heroicons-check-circle" class="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.total }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Filters and Actions -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <USelectMenu
        v-model="selectedPriority"
        :options="priorityOptions"
        placeholder="Filter by priority"
        class="w-full sm:w-48"
      />
      <USelectMenu
        v-model="selectedModality"
        :options="modalityOptions"
        placeholder="Filter by modality"
        class="w-full sm:w-48"
      />
      <UInput
        v-model="searchQuery"
        placeholder="Search patients..."
        icon="i-heroicons-magnifying-glass"
        class="flex-1"
      />
      <UButton color="primary" @click="addNewRequest">
        Add Request
      </UButton>
    </div>

    <!-- Requests Table -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">Pending Requests</h2>
      </template>
      
      <UTable
        :rows="filteredRequests"
        :columns="columns"
        :loading="pending"
        :empty-state="{ icon: 'i-heroicons-inbox', label: 'No pending requests' }"
      >
        <template #priority-data="{ row }">
          <UBadge
            :color="getPriorityColor(row.priority)"
            :variant="row.priority === 'urgent' ? 'solid' : 'subtle'"
          >
            {{ row.priority }}
          </UBadge>
        </template>
        
        <template #countdown-data="{ row }">
          <RequestCountdown :created-at="row.created_at" :priority="row.priority" />
        </template>
        
        <template #actions-data="{ row }">
          <UDropdown :items="getActionItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

// Reactive data
const selectedPriority = ref('')
const selectedModality = ref('')
const searchQuery = ref('')

// Sample data (replace with real Supabase queries)
const { data: requests, pending, refresh } = await useLazyAsyncData('radiology-requests', async () => {
  // This will be replaced with actual Supabase query
  return [
    {
      id: 1,
      patient_name: 'John Doe',
      patient_id: 'P001',
      modality: 'CT',
      study_type: 'Chest CT',
      priority: 'urgent',
      created_at: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
      location: 'ER',
      referring_physician: 'Dr. Smith'
    },
    {
      id: 2,
      patient_name: 'Jane Smith',
      patient_id: 'P002',
      modality: 'MRI',
      study_type: 'Brain MRI',
      priority: 'priority',
      created_at: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
      location: 'ICU',
      referring_physician: 'Dr. Johnson'
    },
    {
      id: 3,
      patient_name: 'Robert Brown',
      patient_id: 'P003',
      modality: 'X-Ray',
      study_type: 'Chest X-Ray',
      priority: 'routine',
      created_at: new Date(Date.now() - 240 * 60000).toISOString(), // 4 hours ago
      location: 'Ward A',
      referring_physician: 'Dr. Davis'
    }
  ]
})

// Table columns
const columns = [
  { key: 'patient_name', label: 'Patient' },
  { key: 'patient_id', label: 'ID' },
  { key: 'modality', label: 'Modality' },
  { key: 'study_type', label: 'Study' },
  { key: 'priority', label: 'Priority' },
  { key: 'countdown', label: 'Time Elapsed' },
  { key: 'location', label: 'Location' },
  { key: 'referring_physician', label: 'Referring MD' },
  { key: 'actions', label: 'Actions' }
]

// Filter options
const priorityOptions = [
  { label: 'All Priorities', value: '' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'Priority', value: 'priority' },
  { label: 'Routine', value: 'routine' }
]

const modalityOptions = [
  { label: 'All Modalities', value: '' },
  { label: 'CT', value: 'CT' },
  { label: 'MRI', value: 'MRI' },
  { label: 'X-Ray', value: 'X-Ray' },
  { label: 'Ultrasound', value: 'US' },
  { label: 'Nuclear Medicine', value: 'NM' }
]

// Computed properties
const filteredRequests = computed(() => {
  if (!requests.value) return []
  
  return requests.value.filter(request => {
    const matchesPriority = !selectedPriority.value || request.priority === selectedPriority.value
    const matchesModality = !selectedModality.value || request.modality === selectedModality.value
    const matchesSearch = !searchQuery.value || 
      request.patient_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      request.patient_id.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesPriority && matchesModality && matchesSearch
  })
})

const stats = computed(() => {
  if (!requests.value) return { urgent: 0, priority: 0, routine: 0, total: 0 }
  
  const counts = requests.value.reduce((acc, request) => {
    acc[request.priority] = (acc[request.priority] || 0) + 1
    acc.total = (acc.total || 0) + 1
    return acc
  }, {})
  
  return {
    urgent: counts.urgent || 0,
    priority: counts.priority || 0,
    routine: counts.routine || 0,
    total: counts.total || 0
  }
})

// Methods
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent': return 'red'
    case 'priority': return 'yellow'
    case 'routine': return 'blue'
    default: return 'gray'
  }
}

const getActionItems = (row) => [
  [{
    label: 'View Images',
    icon: 'i-heroicons-eye',
    click: () => viewImages(row.id)
  }],
  [{
    label: 'Mark as Read',
    icon: 'i-heroicons-check',
    click: () => markAsRead(row.id)
  }, {
    label: 'Assign to Me',
    icon: 'i-heroicons-user',
    click: () => assignToMe(row.id)
  }],
  [{
    label: 'Edit Request',
    icon: 'i-heroicons-pencil',
    click: () => editRequest(row.id)
  }]
]

const viewImages = (id) => {
  // Implement image viewing
  console.log('Viewing images for request:', id)
}

const markAsRead = (id) => {
  // Implement mark as read
  console.log('Marking as read:', id)
}

const assignToMe = (id) => {
  // Implement assignment
  console.log('Assigning to current user:', id)
}

const editRequest = (id) => {
  // Implement edit functionality
  console.log('Editing request:', id)
}

const addNewRequest = () => {
  // Implement add new request
  console.log('Adding new request')
}

// Set page meta
useHead({
  title: 'Dashboard - Radiology Tracker'
})
</script>