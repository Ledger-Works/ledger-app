<template>
  <BottomSheet
    :title="`Create ${personalSpace ? 'Personal Space' : 'Group'}`"
    :description="`Create a new ${personalSpace ? 'personal space' : 'group'} for organizing your content.`"
  >
    <template #trigger>
      <Button
        variant="outline"
        size="icon"
        class="shadow-md w-[180px] mb-4"
      >
        Create {{ personalSpace ? 'Personal Space' : 'Group' }}
      </Button>
    </template>
    <template #content>
      <form
        class="space-y-6 mb-10 m-4"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-2">
          <Label :for="personalSpace ? 'spaceName' : 'groupName'">
            {{ personalSpace ? 'Personal Space' : 'Group' }} Name
          </Label>
          <Input 
            :id="personalSpace ? 'spaceName' : 'groupName'" 
            v-model="name" 
            :placeholder="`Enter ${personalSpace ? 'personal space' : 'group'} name`" 
          />
        </div>
          
        <div
          v-if="!personalSpace"
          class="space-y-2"
        >
          <Label for="userSearch">Add Members</Label>
          <div class="flex space-x-2">
            <Input 
              id="userSearch" 
              v-model="userSearch" 
              placeholder="Search users" 
              @input="handleUserSearch"
            />
            <Button
              type="button"
              @click="handleAddUser"
            >
              Add
            </Button>
          </div>
        </div>
  
        <!-- Placeholder for user search results (only for groups) -->
        <div
          v-if="!personalSpace && searchResults.length > 0"
          class="border p-2 rounded-md"
        >
          <p class="text-sm text-gray-500 mb-2">
            Search Results:
          </p>
          <ul class="space-y-1">
            <li
              v-for="user in searchResults"
              :key="user.id"
              class="flex justify-between items-center"
            >
              <span>{{ user.name }}</span>
              <Button
                size="sm"
                variant="outline"
                @click="selectUser(user)"
              >
                Select
              </Button>
            </li>
          </ul>
        </div>
  
        <!-- Selected users (only for groups) -->
        <div
          v-if="!personalSpace && selectedUsers.length > 0"
          class="border p-2 rounded-md"
        >
          <p class="text-sm text-gray-500 mb-2">
            Selected Users:
          </p>
          <ul class="space-y-1">
            <li
              v-for="user in selectedUsers"
              :key="user.id"
              class="flex justify-between items-center"
            >
              <span>{{ user.name }}</span>
              <Button
                size="sm"
                variant="outline"
                @click="removeUser(user)"
              >
                Remove
              </Button>
            </li>
          </ul>
        </div>
      </form>
    </template>
    <template #close>
      <div class="bg-background footer-bar p-4 px-5 w-[100vw] fixed bottom-0 left-0 border-solid border-2 flex flex-col-reverse">
        <Button
          type="submit"
          @click="handleSubmit"
        >
          Create {{ personalSpace ? 'Personal Space' : 'Group' }}
        </Button>
      </div>
    </template>
  </BottomSheet>
</template>
  
  <script setup lang="ts">
import { ref } from 'vue'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BottomSheet from '../ui/sheet/BottomSheet.vue'

const props = defineProps<{
    personalSpace: boolean
}>()

const emit = defineEmits<{
    (e: 'create', payload: { name: string; isPersonalSpace: boolean; members?: User[] }): void
}>()

interface User {
    id: string;
    name: string;
}

const name = ref('')
const userSearch = ref('')
const searchResults = ref<User[]>([])
const selectedUsers = ref<User[]>([])

const handleUserSearch = () => {
    // Placeholder for API call
    // In a real implementation, you would make an API call here
    // and update the searchResults based on the response
    searchResults.value = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        // ... more results
    ]
}

const handleAddUser = () => {
    // This function would typically be used to add a custom user
    // or trigger the search. For now, it's just a placeholder.
    console.log('Add user clicked')
}

const selectUser = (user: User) => {
    selectedUsers.value.push(user)
    searchResults.value = searchResults.value.filter(u => u.id !== user.id)
}

const removeUser = (user: User) => {
    selectedUsers.value = selectedUsers.value.filter(u => u.id !== user.id)
}

const handleSubmit = () => {
    const payload = {
        name: name.value,
        isPersonalSpace: props.personalSpace,
        members: [],
    }

    emit('create', payload)

    // Reset form fields
    name.value = ''
    userSearch.value = ''
    searchResults.value = []
    selectedUsers.value = []
}
</script>
  
  <style scoped>
:root {
    --background: 240 10% 3.9%;
}
</style>