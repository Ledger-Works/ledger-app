<template>
  Expense Types
</template>
  
  <script setup lang="ts">
const categories = {
    utilities: [
        {
            type: 'cleaning',
            label: "Cleaning",
            icon: "clean",
        },
        {
            type: 'electricity',
            label: "Electricity",
            icon: "electricity",
        },
        {
            type: 'gas',
            label: "Heat/has",
            icon: "fire",
        },
        {
            type: 'other',
            label: "Other",
            icon: "other",
        },
        {
            type: 'trash',
            label: "Trash",
            icon: "trash",
        },
    
    ],
    entertainment: [
        {
            type: 'games',
            label: "Games",
            icon: "clean",
        },
        {
            type: 'movies',
            label: "Movies",
            icon: "electricity",
        },
        {
            type: 'music',
            label: "Music",
            icon: "fire",
        },
        {
            type: 'sports',
            label: "Sports",
            icon: "other",
        },
        {
            type: 'other',
            label: "Other",
            icon: "trash",
        }]
}
  </script>