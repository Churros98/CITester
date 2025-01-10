<script setup lang="ts">
import { useDatabaseStore } from '~/stores/database';

const database = useDatabaseStore();

const available_chips: Ref<{id: number, name: string}[]> = ref([]);

async function deleteChip(id: number) {
  await database.deleteChip(id);
  available_chips.value = await database.getChips() ?? [];
}

onMounted(async () => {
  let chips = await database.getChips();
  if (chips === undefined) {
    setTimeout(async () => {
      chips = await database.getChips();
      available_chips.value = chips ?? [];
    }, 500);
  } else {
    available_chips.value = chips;
  }
});
</script>

<template>
  <Header title="Sélectionner une CI" />

  <div class="bg-[#003161] text-white h-screen py-16">
    
    <h1 class="text-2xl font-bold p-4">CI Disponibles</h1>
      <div class="grid gap-4 grid-cols-1 overflow-y-auto h-full p-4">
        <div v-for="chip in available_chips" :key="chip.id" class="bg-white text-black p-4 rounded-md flex items-center justify-between">
          {{ chip.name }}
          <div class="flex flex-row gap-2">
            <button @click="deleteChip(chip.id)" class="bg-red-500 text-white p-2 rounded-md flex items-center hover:cursor-pointer hover:bg-red-600 gap-2"><Icon name="mdi:delete" /></button>
            <button @click="navigateTo(`/editor/${chip.id}`)" class="bg-blue-500 text-white p-2 rounded-md flex items-center hover:cursor-pointer hover:bg-blue-600 gap-2"><Icon name="mdi:pencil" /></button>
            <button @click="navigateTo(`/test/${chip.id}`)" class="bg-green-500 text-white p-2 rounded-md flex items-center hover:cursor-pointer hover:bg-green-600 gap-2"><Icon name="mdi:play" /></button>
          </div>
        </div>

        <div @click="navigateTo('/editor/new')" class="bg-[#FFF4B7] text-black p-2 rounded-md flex hover:cursor-pointer hover:bg-[#F0F0B0] items-center justify-center gap-2">
          <Icon name="mdi:plus" />
          Créer une nouvelle CI
        </div>
      </div>
  </div>
</template>

