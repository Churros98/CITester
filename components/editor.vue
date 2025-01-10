<script setup lang="ts">
import Chip from '~/components/chip.vue';
import { useDatabaseStore } from '~/stores/database';
import type { Frame } from '~/utils/probe';

let database = useDatabaseStore();

let chip_name = ref<string>("New chip");
let frame_number = ref<number>(0);
let frames = ref<Frame[]>([]);

const props = defineProps<{
  id?: number;
  chip_name?: string;
  frames?: Frame[];
}>();

const addFrame = () => {
  if (frames.value.length < 50) {
    let pin = [];
    let ios = [];

    for (let i = 0; i < 14; i++) {
      pin.push(false);
      ios.push(false);
    }

    frames.value.push({ pins: pin, ios: ios });
  }
}

const removeFrame = () => {
  // Ne pas supprimer le dernier frame
  if (frames.value.length <= 1) {
    return;
  }

  let delete_frame = frame_number.value;

  // Change vers la frame précédente
  if (delete_frame + 1 < frames.value.length) {
    frame_number.value = delete_frame;
  } else {
    frame_number.value = delete_frame - 1;
  }

  // Supprime la frame
  frames.value.splice(delete_frame, 1);
}

const nextFrame = () => {
  if (frame_number.value < frames.value.length - 1) {
    frame_number.value++;
  }
}

const previousFrame = () => {
  if (frame_number.value > 0) {
    frame_number.value--;
  }
}

const saveChip = async () => {
  if (props.id === undefined) {
    await database.createChip(chip_name.value, frames.value);
  } else {
    await database.updateChip(props.id, chip_name.value, frames.value);
  }

  await navigateTo(`/`);
}

if (props.chip_name) {
  chip_name.value = props.chip_name;
}

if (props.frames) {
  frames.value = props.frames;
} else {
  addFrame();
}
</script>

<template>
  <h2 class="text-2xl font-bold">Image {{ frame_number + 1 }}/{{ frames.length }}</h2>
  <Chip class="h-1/2 w-1/2" :editable="true" :frame="frames[frame_number]" />

  <div class="flex flex-row justify-center gap-3 py-4 items-center">
    <p class="font-bold">Nom de la CI:</p>
    <input type="text" v-model="chip_name" class="bg-white border-2 border-black text-black p-2 rounded-md flex items-center gap-2" />
  </div>

  <div class="flex flex-row justify-center gap-3 py-4">
    <button class="bg-blue-500 text-white disabled:opacity-50 p-2 rounded-md flex items-center gap-2" @click="previousFrame()" :disabled="frame_number <= 0"><Icon name="mdi:arrow-left" /></button>
    <button class="bg-yellow-500 text-black disabled:opacity-50 p-2 rounded-md flex items-center gap-2" @click="addFrame()" :disabled="frames.length >= 50"><Icon name="mdi:plus" />Ajouter une image</button>
    <button class="bg-red-500 text-white disabled:opacity-50 p-2 rounded-md flex items-center gap-2" @click="removeFrame()" :disabled="frames.length <= 1"><Icon name="mdi:minus" />Supprimer une image</button>
    <button class="bg-blue-500 text-white disabled:opacity-50 p-2 rounded-md flex items-center gap-2" @click="nextFrame()" :disabled="frame_number >= frames.length - 1"><Icon name="mdi:arrow-right" /></button>
  </div>

  <div class="flex flex-row justify-center gap-3">
    <button class="bg-green-500 text-white p-2 rounded-md flex items-center gap-2" @click="saveChip()"><Icon name="material-symbols:save-as-rounded" />Enregistrer la CI</button>
  </div>
</template>
