<template>
  <div class="expense-footer flex justify-between p-4 px-5 w-[100vw] fixed bottom-0 border-solid border-2">
    <FullScreenModal
      title="Choose Date"
    >
      <template #trigger>
        <Button
          variant="outline"
          size="icon"
          class="mr-2 shadow-md p-2 w-[100px]"
        >
          <CalendarIcon class="w-4 h-4 mr-2" />
          Today
        </Button>
      </template>
      <template #content>
        <div class="mt-8 centered-div w-[calc(100%)]  flex justify-center">
          <Calendar
            v-model="value"
            :weekday-format="'short'"
            class="rounded-md border w-min"
          />
        </div>
        <div class="bg-background calendar-footer flex justify-between p-4 px-5 w-[100vw] fixed bottom-0 flex-row-reverse border-solid border-2 left-0">
          <Button
            variant="outline"
            size="icon"
            class="mr-2 shadow-md p-4 px-8"
            @click="saveCalendar"
          >
            Save
          </Button>
        </div>
      </template>
    </FullScreenModal>
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
import { FullScreenModal } from "@/components/ui/modal"
import { type Ref, ref } from 'vue'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>

function saveExpense() {

}

function saveCalendar() {

}
</script>