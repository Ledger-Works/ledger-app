<script setup lang="ts">
import ShoppingBagIcon from '@/components/icons/ShoppingBagIcon.vue';
import {
  Card,
  CardContent,
} from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardContent class="flex p-2 justify-between items-center">
      <div class="flex gap-x-2">
        <div class="w-10 h-10 p-2 self-center bg-yellow-100 rounded-md">
          <ShoppingBagIcon class="text-primary-foreground" />
        </div>
        <div class="flex flex-col gap-y-1">
          <span class="text-sm">
            Shopping
          </span>
          <span class="text-xs">
            Buy some grocery
          </span>
        </div>
      </div>
      <div class="text-red-400">
        -$120
      </div>
    </CardContent>
  </Card>
</template>