<script setup lang="ts">
import { useDatabaseStore } from '~/stores/database';

const database = useDatabaseStore();

const probePinAssignment = ref<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
probePinAssignment.value = await database.getSettings('probe_pin_assignment');

const saveSettings = async () => {
    await database.updateSettings('probe_pin_assignment', probePinAssignment.value);
    navigateTo('/');
}
</script>

<template>
    <div class="h-screen w-full">
        <Header title="Paramètres" />

        <!-- Mets le bloc au centre de la page-->
        <div class="flex items-center justify-center h-screen">
            <div class="flex flex-col items-center justify-center gap-3">
                <h1 class="text-2xl font-bold w-full text-center p-4">Modification de l'assignation des numéros de pin</h1>

                <div class="flex flex-col items-center justify-center gap-3 px-2">
                    <div class="flex flex-row items-center justify-center gap-3">
                        <div v-for="i in 14" class="flex flex-col items-center justify-center gap-3">
                            <label for="probe_pin_assignment">{{ i }}</label>
                            <input type="number" class="border-2 border-black-300 rounded-md w-[100%]" v-model="probePinAssignment[i - 1]" />     
                        </div>
                    </div>
                </div>

                <div class="flex flex-row justify-center gap-3 py-4">
                    <button class="bg-green-500 text-white p-2 rounded-md flex items-center gap-2" @click="saveSettings()">
                        <Icon name="mdi:check" />
                        Sauvegarder
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>