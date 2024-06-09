<template>
  <Sheet>
    <SheetTrigger as-child>
      <slot name="trigger" />
    </SheetTrigger>
    <SheetContent class="w-[100vw] sm:w-[540px] h-[100vh] overflow-scroll" side="bottom">
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
const props = defineProps<{
  title: string
  description?: string
}>()
</script>