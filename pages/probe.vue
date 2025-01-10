<script setup lang="ts">
import { useProbeStore } from '~/stores/probe';
import type { SerialPortInfo } from '~/utils/probe';

const probe = useProbeStore();

const availablePorts = ref<SerialPortInfo[]>([]);

const disconnectProbe = async () => {
    await probe.close_port();
    navigateTo('/');
}

const changeProbe = async (port: SerialPortInfo) => {
    if (await probe.is_serial_port_open()) {
        await probe.close_port();
    }

    await probe.open_port(port);
    navigateTo('/');
}

const refreshAvailablePorts = async () => {
    availablePorts.value = await probe.available_ports();
}

onMounted(async () => {
    availablePorts.value = await probe.available_ports();
});
</script>

<template>
    <div class="bg-[#003161] h-screen text-white w-full">
        <Header title="Select probe" />

        <!-- Mets le bloc au centre de la page-->
        <div class="flex items-center justify-center h-screen">
            <div class="flex flex-col items-center justify-center gap-3">
                <h1 class="text-2xl font-bold w-full text-center p-4">Sondes disponibles</h1>

                <div v-if="availablePorts.length > 0" class="flex flex-col items-center justify-center gap-3">
                    <button v-for="port in availablePorts" :key="port.port_name" class="bg-white text-black p-2 rounded-md flex items-center gap-2" @click="changeProbe(port)"><Icon name="mdi:usb" />{{ port.port_name }}</button>
                </div>
                <h2 v-else class="text-2xl font-bold w-full text-center p-4">Aucune sonde trouvée</h2>

                <div class="flex flex-row justify-center gap-3 py-4">
                    <button v-if="probe.usedPort !== undefined" class="bg-red-500 text-white p-2 rounded-md flex items-center gap-2" @click="disconnectProbe()">
                        <Icon name="mdi:close" />
                        Déconnecter
                    </button>

                    <button class="bg-[#000B58] text-white p-2 rounded-md flex items-center gap-2" @click="refreshAvailablePorts()">
                        <Icon name="mdi:refresh" />
                        Rafraîchir
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>