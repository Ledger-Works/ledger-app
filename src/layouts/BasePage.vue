<script setup lang="ts">
import Header from 'material/TopBar';
</script>

<template>
	<div class="base-page">
		<Header
			type="center-aligned"
			class="my-header"
			:traling-icons="['person', 'more_vert']">
			<template #headline> Ledger App </template>
			<div class="content">
				<router-view></router-view>
			</div>
		</Header>
	</div>
</template>
<style>
.material-header {
	background-color: beige;
}
</style>
