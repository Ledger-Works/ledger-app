<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const props = defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>{{ props.title }}</DrawerTitle>
          <DrawerDescription>{{ props.description }}</DrawerDescription>
        </DrawerHeader>
        <slot name="content" />
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose as-child>
            <slot name="close" />
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>