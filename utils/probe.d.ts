interface Frame {
    pins: boolean[];
    ios: boolean[];
}

export interface SerialPortInfo {
    port_name: string;
    port_type: string;
}

export interface TauriUsbPortInfo {
    vid: number;
    pid: number;
    serial_number?: string;
    manufacturer?: string; 
    product?: string;
}

export interface TauriSerialPortInfo {
    port_name: string;
    port_type: string | TauriUsbPortInfo;
}