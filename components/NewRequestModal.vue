<template>
  <UModal v-model="isOpen" :prevent-close="isSubmitting">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-200 dark:divide-gray-700' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            New Radiology Request
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Patient Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="Patient Name" required>
            <UInput v-model="form.patient_name" placeholder="Enter patient name" />
          </UFormGroup>
          
          <UFormGroup label="Patient ID" required>
            <UInput v-model="form.patient_id" placeholder="Enter patient ID" />
          </UFormGroup>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="Date of Birth">
            <UInput v-model="form.patient_dob" type="date" />
          </UFormGroup>
          
          <UFormGroup label="Gender">
            <USelectMenu
              v-model="form.patient_gender"
              :options="genderOptions"
              placeholder="Select gender"
            />
          </UFormGroup>
        </div>

        <!-- Study Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="Modality" required>
            <USelectMenu
              v-model="form.modality"
              :options="modalityOptions"
              placeholder="Select modality"
              @change="onModalityChange"
            />
          </UFormGroup>
          
          <UFormGroup label="Study Type" required>
            <USelectMenu
              v-model="form.study_type"
              :options="filteredStudyTypes"
              placeholder="Select study type"
              :disabled="!form.modality"
            />
          </UFormGroup>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="Body Part">
            <UInput v-model="form.body_part" placeholder="Enter body part" />
          </UFormGroup>
          
          <UFormGroup label="Priority" required>
            <USelectMenu
              v-model="form.priority"
              :options="priorityOptions"
              placeholder="Select priority"
            />
          </UFormGroup>
        </div>

        <!-- Clinical Information -->
        <UFormGroup label="Clinical Indication" required>
          <UTextarea v-model="form.clinical_indication" placeholder="Enter clinical indication" rows="3" />
        </UFormGroup>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup label="Location">
            <UInput v-model="form.location" placeholder="Enter location" />
          </UFormGroup>
          
          <UFormGroup label="Referring Physician" required>
            <UInput v-model="form.referring_physician" placeholder="Enter referring physician" />
          </UFormGroup>
        </div>

        <!-- Additional Options -->
        <div class="flex items-center space-x-4">
          <UCheckbox v-model="form.contrast_required" label="Contrast Required" />
        </div>

        <UFormGroup label="Notes">
          <UTextarea v-model="form.notes" placeholder="Additional notes" rows="2" />
        </UFormGroup>

        <UFormGroup label="Preparation Instructions">
          <UTextarea v-model="form.preparation_instructions" placeholder="Patient preparation instructions" rows="2" />
        </UFormGroup>
      </form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <UButton variant="ghost" @click="isOpen = false" :disabled="isSubmitting">
            Cancel
          </UButton>
          <UButton color="primary" @click="handleSubmit" :loading="isSubmitting">
            Create Request
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { RadiologyRequestInsert } from '~/types/database'

const { createRequest } = useRadiologyRequests()

const isOpen = defineModel('modelValue', { type: Boolean, default: false })

const emit = defineEmits(['success'])

const isSubmitting = ref(false)

// Form data
const form = ref<Partial<RadiologyRequestInsert>>({
  patient_name: '',
  patient_id: '',
  patient_dob: '',
  patient_gender: '',
  modality: '',
  study_type: '',
  body_part: '',
  priority: 'routine',
  clinical_indication: '',
  location: '',
  referring_physician: '',
  contrast_required: false,
  notes: '',
  preparation_instructions: ''
})

// Options
const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }
]

const modalityOptions = [
  { label: 'CT', value: 'CT' },
  { label: 'MRI', value: 'MRI' },
  { label: 'X-Ray', value: 'X-Ray' },
  { label: 'Ultrasound', value: 'Ultrasound' },
  { label: 'Nuclear Medicine', value: 'Nuclear Medicine' },
  { label: 'Mammography', value: 'Mammography' },
  { label: 'Fluoroscopy', value: 'Fluoroscopy' }
]

const priorityOptions = [
  { label: 'Urgent', value: 'urgent' },
  { label: 'Priority', value: 'priority' },
  { label: 'Routine', value: 'routine' }
]

// Study types by modality
const studyTypesByModality = {
  'CT': [
    { label: 'CT Head', value: 'CT Head' },
    { label: 'CT Chest', value: 'CT Chest' },
    { label: 'CT Abdomen', value: 'CT Abdomen' },
    { label: 'CT Pelvis', value: 'CT Pelvis' },
    { label: 'CT Spine', value: 'CT Spine' }
  ],
  'MRI': [
    { label: 'Brain MRI', value: 'Brain MRI' },
    { label: 'Spine MRI', value: 'Spine MRI' },
    { label: 'Knee MRI', value: 'Knee MRI' },
    { label: 'Shoulder MRI', value: 'Shoulder MRI' },
    { label: 'Abdomen MRI', value: 'Abdomen MRI' }
  ],
  'X-Ray': [
    { label: 'Chest X-Ray', value: 'Chest X-Ray' },
    { label: 'Spine X-Ray', value: 'Spine X-Ray' },
    { label: 'Extremity X-Ray', value: 'Extremity X-Ray' },
    { label: 'Pelvis X-Ray', value: 'Pelvis X-Ray' }
  ],
  'Ultrasound': [
    { label: 'Abdominal Ultrasound', value: 'Abdominal Ultrasound' },
    { label: 'Pelvic Ultrasound', value: 'Pelvic Ultrasound' },
    { label: 'Cardiac Echo', value: 'Cardiac Echo' },
    { label: 'Vascular Ultrasound', value: 'Vascular Ultrasound' }
  ],
  'Nuclear Medicine': [
    { label: 'Bone Scan', value: 'Bone Scan' },
    { label: 'Cardiac Stress Test', value: 'Cardiac Stress Test' },
    { label: 'PET Scan', value: 'PET Scan' }
  ],
  'Mammography': [
    { label: 'Screening Mammogram', value: 'Screening Mammogram' },
    { label: 'Diagnostic Mammogram', value: 'Diagnostic Mammogram' }
  ],
  'Fluoroscopy': [
    { label: 'Upper GI Series', value: 'Upper GI Series' },
    { label: 'Barium Enema', value: 'Barium Enema' },
    { label: 'VCUG', value: 'VCUG' }
  ]
}

const filteredStudyTypes = computed(() => {
  if (!form.value.modality) return []
  return studyTypesByModality[form.value.modality] || []
})

const onModalityChange = () => {
  form.value.study_type = ''
}

const resetForm = () => {
  form.value = {
    patient_name: '',
    patient_id: '',
    patient_dob: '',
    patient_gender: '',
    modality: '',
    study_type: '',
    body_part: '',
    priority: 'routine',
    clinical_indication: '',
    location: '',
    referring_physician: '',
    contrast_required: false,
    notes: '',
    preparation_instructions: ''
  }
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  // Basic validation
  const requiredFields = ['patient_name', 'patient_id', 'modality', 'study_type', 'priority', 'clinical_indication', 'referring_physician']
  const missingFields = requiredFields.filter(field => !form.value[field])
  
  if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields)
    return
  }

  isSubmitting.value = true

  try {
    const requestData = {
      ...form.value,
      patient_dob: form.value.patient_dob || null,
      patient_gender: form.value.patient_gender || null,
      body_part: form.value.body_part || null,
      location: form.value.location || null,
      notes: form.value.notes || null,
      preparation_instructions: form.value.preparation_instructions || null
    } as RadiologyRequestInsert

    await createRequest(requestData)
    
    emit('success')
    isOpen.value = false
    resetForm()
  } catch (error) {
    console.error('Error creating request:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form when modal closes
watch(isOpen, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})
</script>