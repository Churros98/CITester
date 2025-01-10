<script setup lang="ts">
import { useProbeStore } from '~/stores/probe';
import { useDatabaseStore } from '~/stores/database';

const probe = useProbeStore();
const database = useDatabaseStore();
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
