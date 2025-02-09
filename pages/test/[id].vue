<script setup lang="ts">
import { useProbeStore } from '~/stores/probe';
import { useDatabaseStore } from '~/stores/database';
import { useRoute } from 'vue-router';
import type { Frame } from '~/utils/probe';

const route = useRoute();
const probe = useProbeStore();
const database = useDatabaseStore();

if (!probe.usedPort) {
    navigateTo('/probe');
}

const frame_number = ref(0);
const id = parseInt(route.params.id as string);
const chip_to_test = await database.getChipData(id);

const frames_received: Ref<Frame[]> = ref([]);
const isbroken: Ref<boolean> = ref(false);
const onerror: Ref<string> = ref('');

const previousFrame = () => {
    if (frame_number.value > 0) {
        frame_number.value--;
    }
}

const nextFrame = () => {
    if (chip_to_test && frame_number.value < chip_to_test.frames.length - 1) {
        frame_number.value++;
    }
}

const backToMain = () => {
    navigateTo('/');
}

const runTest = async (frames: Frame[]) => {
    const { frames_received: frames_received_result, error: error_result } = await probe.launch_test(frames);

    console.log(frames_received_result);
    return { frames: frames_received_result, isbroken: error_result };
}

const reloadTest = async (frames: Frame[]) => {
    frames_received.value = [];
    isbroken.value = false;
    runTest(frames).then(({ frames, isbroken: isbroken_result }) => {
        frames_received.value = frames;
        isbroken.value = isbroken_result;
    }).catch((error) => {
        onerror.value = error;
    });
}

// Départ du test
onMounted(() => {
    if (chip_to_test) {
        runTest(chip_to_test.frames).then(({ frames, isbroken: isbroken_result }) => {
            frames_received.value = frames;
            isbroken.value = isbroken_result;
        }).catch((error) => {
            onerror.value = error;
        });
    } else {
        onerror.value = "CI non trouvée";
    }
});
</script>

<template>

    <Header title="Test de la CI" />

    <div v-if="onerror">
        <div class="flex items-center flex-col justify-center h-screen">
            <p class="text-2xl font-bold text-center w-full text-red-500">{{ onerror }}</p>

            <div class="flex flex-row justify-center gap-3 py-4">
                <button class="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2" @click="backToMain()"><Icon name="mdi:home" /> Retour à l'accueil</button>
            </div>
        </div>
    </div>
    <div v-else-if="chip_to_test && frames_received.length > 0 && frames_received.length == chip_to_test.frames.length">
        <div class="absolute bottom-0 right-0 w-full">
            <h1 v-if="isbroken" class="text-2xl font-bold bg-red-500 text-white text-center p-2">KO</h1>
            <h1 v-else class="text-2xl font-bold bg-green-500 text-white text-center p-2">OK</h1>
        </div>
        
        <div class="flex items-center flex-col justify-center h-screen">
            <h2 class="text-2xl font-bold">Image {{ frame_number + 1 }}/{{ chip_to_test.frames.length }}</h2>

            <div class="flex flex-row justify-center gap-4 py-4">
                <div class="grid grid-cols-2 justify-center gap-4">
                    <div class="flex flex-col items-center justify-center">
                        <Chip :editable="false" :frame="chip_to_test.frames[frame_number]" />
                        <p class="text-xl">Attendue</p>
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <Chip :editable="false" :frame="frames_received[frame_number]" />
                        <p class="text-xl">Reçue</p>

                    </div>
                </div>
            </div>

            <div class="flex flex-row justify-center gap-3 py-4">
                <button class="bg-blue-500 text-white disabled:opacity-50 p-2 rounded-md flex items-center gap-2" @click="previousFrame()" :disabled="frame_number <= 0"><Icon name="mdi:arrow-left" /></button>
                <button class="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2" @click="reloadTest(chip_to_test.frames)"><Icon name="mdi:refresh" /> Re-lancer le test</button>
                <button class="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2" @click="backToMain()"><Icon name="mdi:home" /> Retour à l'accueil</button>
                <button class="bg-blue-500 text-white disabled:opacity-50 p-2 rounded-md flex items-center gap-2" @click="nextFrame()" :disabled="frame_number >= chip_to_test.frames.length - 1"><Icon name="mdi:arrow-right" /></button>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="flex items-center flex-col justify-center h-screen">
            <p v-if="chip_to_test" class="text-2xl font-bold text-center w-full">Test de la CI en cours...</p>
            <p v-else class="text-2xl font-bold text-center w-full text-red-500">CI non trouvée</p>
        </div>
    </div>
</template>