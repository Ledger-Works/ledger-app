<template>
  <div class="list-sheets m-4">
    <div class="text-2xl mb-4">
      Choose Sheet from your Drive
    </div>

    <Button
      variant="outline"
      class="w-full mb-4"
      @click="createSheet()"
    >
      Create a new sheet
    </Button>
    <Button
      v-for="(sheet, index) in sheets"
      :key="index"
      type="submit"
      class="m-1"
      variant="outline"
      @click="onSheetClick(sheet)"
    >
      <div class="flex justify-between w-[100%]">
        <div class="sheet-name max-w-[200px] text-ellipsis overflow-hidden">
          {{ sheet?.name }})
        </div>
      </div>
    </Button>
  </div>
</template>
    
    
<script setup lang="ts">
import useGoogleSheets from '@/composables/useGoogleSheets';
import { Button } from '@/components/ui/button';
import { ROUTE_NAMES } from '@/constants';

const { listSheets } = useGoogleSheets()
const sheets = ref()
const router = useRouter()
async function init() {
  try {

  sheets.value = await listSheets()
  console.log(sheets.value)
  }
  catch(error: any) {
    console.error(error)
  }
}
const onSheetClick = (sheet: {name: string, id: string}) => {
  router.push({ name: ROUTE_NAMES.EXPENSES, query: {
    id: sheet.id
  } })
}
init()
</script>
