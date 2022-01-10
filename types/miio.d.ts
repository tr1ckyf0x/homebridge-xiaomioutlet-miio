interface MiioDevice {
    miioCall(method: string, args: [string]): any;
}

interface MiioDeviceOptions {
    address: string;
    token: string;
}

declare module 'miio' {
    function device(options: MiioDeviceOptions): MiioDevice;
};