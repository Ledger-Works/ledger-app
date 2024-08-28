<template>
  <div class="expense-list m-4">
    <div class="flex gap-2 mb-6">
      <GroupModal :personal-space="false" />
      <GroupModal :personal-space="true" />
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-bold">
        Groups and Personal Spaces
      </h2>
      
      <!-- Personal Space (if exists) -->
      <div
        v-if="personalSpace"
        class="group bg-purple-50 dark:bg-purple-900 rounded-lg border border-purple-200 dark:border-purple-700 transition-all duration-300 ease-in-out hover:border-purple-500 dark:hover:border-purple-400 cursor-pointer shadow-sm hover:shadow-md active:shadow-inner"
        @click="openGroup(personalSpace.id)"
      >
        <div class="p-4 flex items-start">
          <UserCircleIcon class="h-6 w-6 text-purple-500 mr-3 flex-shrink-0" />
          <div class="flex-grow">
            <h3 class="text-lg font-medium text-purple-700 dark:text-purple-300 mb-2 group-hover:text-purple-800 dark:group-hover:text-purple-200 transition-colors duration-300">
              {{ personalSpace.name }}
              <span class="text-sm font-normal text-purple-600 dark:text-purple-400 ml-2">
                (Personal Space)
              </span>
            </h3>
            <p class="text-sm text-purple-600 dark:text-purple-400">
              {{ personalSpace.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Regular Groups -->
      <div
        v-for="group in regularGroups"
        :key="group.id"
        class="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer shadow-sm hover:shadow-md active:shadow-inner"
        @click="openGroup(group.id)"
      >
        <div class="p-4">
          <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {{ group.name }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ group.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useExpenses } from '@/composables/useExpenses'
import { ROUTE_NAMES } from '@/constants'
import GroupModal from "@/components/modals/GroupModal.vue"
import type { Group } from '@/types'

const groups = ref<Group[]>()
const router = useRouter()

const personalSpace = computed(() => groups.value?.find(group => group.isPersonalSpace))
const regularGroups = computed(() => groups.value?.filter(group => !group.isPersonalSpace))

onMounted(async () => {
  groups.value = await useExpenses().fetchGroups()
})

function openGroup(groupId: boolean): void {
  router.push({
    name: ROUTE_NAMES.ADD_GROUP,
    query: {
      personal: groupId
    }
  })
}
</script>

<style scoped>
/* .group {
  @apply transform transition-transform duration-150 ease-in-out;
}

.group:active {
  @apply scale-98;
} */
</style>