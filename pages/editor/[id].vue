<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '~/stores/database';
let route = useRoute();
let database = useDatabaseStore();

let id = parseInt(route.params.id as string);

let chip_data = await database.getChipData(id);
</script>

<template>
    <div>
      <Header title="Editer la CI" />

      <div class="flex items-center flex-col justify-center h-screen">
        <Editor v-if="chip_data" :id="id" :chip_name="chip_data.name" :frames="chip_data.frames" />
        <div v-else>
          <h1 class="text-2xl font-bold text-red-500 w-full text-center">CI non trouvée</h1>
        </div>
      </div>
    </div>
</template>