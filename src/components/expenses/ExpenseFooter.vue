<template>
  <div class="expense-footer flex justify-between p-4 px-5 w-[100vw] fixed bottom-0 border-solid border-2 left-0">
    <BottomSheet
      title="Choose Date"
    >
      <template #trigger>
        <Button
          variant="outline"
          size="icon"
          class="mr-2 shadow-md p-2 w-[150px]"
        >
          <CalendarIcon class="w-4 h-4 mr-2" />
          {{ currentDate.toDateString() }}
        </Button>
      </template>
      <template #content>
        <div class="mt-8 centered-div w-[calc(100%)]  flex justify-center">
          <Calendar
            v-model="dateValue"
            :weekday-format="'short'"
            class="rounded-md border w-min"
          />
        </div>
      </template>
      <template #close>
        <div class="bg-background calendar-footer flex justify-between p-2 px-5 w-[100vw] fixed bottom-0 flex-row-reverse border-solid border-2 left-0">
          <Button
            variant="outline"
            size="icon"
            class="mr-2 shadow-md p-4 px-8"
            @click="emit('save:calendar', date)"
          >
            Save
          </Button>
        </div>
      </template>
    </BottomSheet>
    <Button
      variant="outline"
      size="icon"
      class="mr-2 shadow-md p-4 px-8"
      @click="saveExpense"
    >
      Save
    </Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import { BottomSheet } from "@/components/ui/sheet"
import { type Ref, ref } from 'vue'
import { type DateValue, parseDate } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'

const date = ref(new Date())

defineProps<{
  currentDate: Date
}>()

const emit = defineEmits<{
  'save:calendar': [value: Date]
  'save:data': []
}>()

const dateValue = computed((): DateValue => {
  // Convert DateValue to JavaScript Date
  return parseDate(date.value.toISOString().split('T')[0]);
})

function saveExpense() {
  emit('save:data')
}
</script>