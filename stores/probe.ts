import { invoke, isTauri } from '@tauri-apps/api/core';
import type { Frame, SerialPortInfo, TauriSerialPortInfo } from '../utils/probe';

export const useProbeStore = defineStore('probe', () => {
    const PHY_PINS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    let write = (data: string): Promise<void> => { throw new Error("Not initialized"); };
    let read = (length: number): Promise<string> => { throw new Error("Not initialized"); };
    let open_port = (port: SerialPortInfo): Promise<boolean> => { throw new Error("Not initialized"); };
    let close_port = (): Promise<void> => { throw new Error("Not initialized"); };
    let available_ports = (): Promise<SerialPortInfo[]> => { throw new Error("Not initialized"); };
    let is_serial_port_open = (): Promise<boolean> => { throw new Error("Not initialized"); };

    const setCallbacks = (
        { write_cb, read_cb, open_port_cb, close_port_cb, available_ports_cb, is_serial_port_open_cb }: {
            write_cb: (data: string) => Promise<void>,
            read_cb: (length: number) => Promise<string>,
            open_port_cb: (port: SerialPortInfo) => Promise<boolean>,
            close_port_cb: () => Promise<void>,
            available_ports_cb: () => Promise<SerialPortInfo[]>,
            is_serial_port_open_cb: () => Promise<boolean>
        }
    ) => {
        write = write_cb;
        read = read_cb;
        open_port = open_port_cb;
        close_port = close_port_cb;
        available_ports = available_ports_cb;
        is_serial_port_open = is_serial_port_open_cb;
    };

    const to_output = async (pin: number) => {
        await write(`S${pin}:O\n`);
        let data = await read(4);
        console.log(`S${pin}:O -> (${data})`);
        return data.trim() == "OK";  
    };

    const to_input = async (pin: number) => {
        await write(`S${pin}:I\n`);
        let data = await read(4);
        console.log(`S${pin}:I -> (${data})`);
        return data.trim() == "OK";
    };
    
    const set_output = async (pin: number, value: boolean) => {
        await write(`W${pin}:${value ? "T" : "F"}\n`);
        let data = await read(4);
        console.log(`W${pin}:${value ? "T" : "F"} -> (${data})`);
        return data.trim() == "OK";
    };

    const read_input = async (pin: number) => {
        await write(`R${pin}\n`);
        let data = await read(3);
        console.log(`R${pin}: (${data})`);
        return data.trim() == "T";
    };

    const launch_test = async (frames_to_test: Frame[]) => {
        let frames_received: Frame[] = [];
    
        // Je prépare la structure des frames reçues
        frames_to_test.forEach(frame => {
            let pins = Array.from({length: PHY_PINS.length}, () => false);

            // Je récupére les valeurs des pins quand c'est un output (pas de raison de les tester)
            frame.ios.forEach((io, index) => {
                if (io == false) {
                    pins[index] = frame.pins[index];
                }
            });

            frames_received.push({pins: pins, ios: frame.ios});
        });

        // Je test frame par frame
        for (let index = 0; index < frames_to_test.length; index++) {
            const frame = frames_to_test[index];
            // Je définis les I/O et les valeurs de sortie
            console.log(`Frame ${index + 1} of ${frames_to_test.length}`);

            console.log(`Definition des I/O et des valeurs de sortie`);
            for (let i = 0; i < frame.ios.length; i++) {
                if (frame.ios[i] == true) {
                    await to_input(PHY_PINS[i]);
                } else {
                    await to_output(PHY_PINS[i]);
                    await set_output(PHY_PINS[i], frame.pins[i]);
                }
            }

            console.log(`Lecture des valeurs d'entrée`);
            // Je lit les valeurs d'entrée
            for (let i = 0; i < frame.ios.length; i++) {
                if (frame.ios[i] == true) {
                    frames_received[index].pins[i] = await read_input(PHY_PINS[i]);
                }
            }
        }

        // Je compare les frames reçues avec les frames à tester
        let error = false;
        for (let index = 0; index < frames_to_test.length; index++) {
            const frame = frames_to_test[index];
            frame.pins.forEach((pin, pindex) => {
                if (pin != frames_received[index].pins[pindex]) {
                    error = true;
                }
            });
        }

        return { frames_received, error };
    };

    if (isTauri()) {
        setCallbacks({
            write_cb: async (data: string) => {
                return await invoke<void>("send_data", { data });
            },
            read_cb: async (length: number) => {
                return await invoke<string>("read_data", { length });
            },
            open_port_cb: async (port: SerialPortInfo) => {
                let result = await invoke<boolean>("open_port", { portName: port.port_name });
                if (result) {
                    const store = useProbeStore();
                    (store.usedPort as SerialPortInfo | undefined) = port;
                }
                return result;
            },
            close_port_cb: async () => {
                await invoke<void>("close_port");
                const store = useProbeStore();
                (store.usedPort as SerialPortInfo | undefined) = undefined;
            },
            available_ports_cb: async () => {
                return invoke<TauriSerialPortInfo[]>("get_available_ports").then((ports) => {
                    return ports.map((port) => {
                        return {
                            port_name: port.port_name,
                            port_type: port.port_type.toString()
                        };
                    });
                }).catch((error) => {
                    console.error(`Error getting available ports: ${error}`);
                    return [];
                });
            },
            is_serial_port_open_cb: async () => {
                return await invoke<boolean>("is_serial_port_open");
            }
        });
    }

    return {
        usedPort: undefined as SerialPortInfo | undefined,
        setCallbacks,
        write,
        read,
        open_port,
        close_port,
        available_ports,
        is_serial_port_open,
        to_output,
        to_input,
        set_output,
        read_input,
        launch_test
    };
});