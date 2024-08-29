<template>
  <Sheet>
    <SheetTrigger
      ref="triggerRef"
      as-child
    />
    <SheetContent
      class="w-[100vw] sm:w-[540px] h-[40vh] overflow-scroll"
      side="bottom"
    >
      <SheetHeader>
        <SheetTitle>{{ props.title }}</SheetTitle>
        <SheetDescription>
          {{ props.description }}
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <slot name="content" />
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <slot name="close" />
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
  
  <script setup lang="ts">
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter,
  } from '@/components/ui/sheet'
import { useErrors } from '@/composables/useErrors';
  const props = defineProps<{
    title: string
    description?: string
  }>()

  const { triggerRef, open } = useErrors()


// Expose the open method to parent components
defineExpose({ open })
  </script>