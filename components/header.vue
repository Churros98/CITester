<script setup lang="ts">
import { useProbeStore } from '~/stores/probe';

let probe = useProbeStore();

const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="box absolute top-0 left-0 bg-[#000B58] text-white p-2 h-16 w-full flex justify-between items-center">
    <!-- Nom de l'application à gauche-->
    <div class="flex justify-start items-center px-5">
      <h2 class="text-2xl font-bold flex items-center gap-1 cursor-pointer" @click="navigateTo('/')" :class="{ 'text-white': $route.path === '/' }">
        <Icon name="mdi:cisco-webex" />
        CITester - {{ title }}
      </h2>
    </div>

    <!-- Bouton à droite-->
    <div class="gap-2 flex justify-end px-5">
      <button class="flex items-center" @click="navigateTo('/probe')">
        <Icon v-if="(probe.usedPort?.port_type.toString() === 'UsbPort')" name="mdi:usb" />
        <Icon v-else-if="(probe.usedPort?.port_type.toString() === 'BluetoothPort')" name="mdi:bluetooth" />
        <Icon v-else name="mdi:serial-port" />

        {{ probe.usedPort ? probe.usedPort.port_name : 'Connect' }}
      </button>
    </div>
  </div>
</template>
