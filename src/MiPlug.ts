import miio from "miio";

export class MiPlug {
    constructor(private ip: string, private token: string) {}

    public async get(): Promise<boolean> {
		const device = await this.connect();
		const rawPower = await device.miioCall('get_prop', ['power']);
		const power = this.convertState(rawPower[0]);
		return power;
	}

    public async set(power: boolean): Promise<string | 'unknown'> {
		const device = await this.connect();
        const message = power ? "on" : "off";
		const result = await device.miioCall('set_power', [message]);
		if (result[0] !== 'ok') return 'UNKNOWN';
        const state = await this.get();
		return state ? 'ON' : 'OFF';
	}

    private async connect(): Promise<any> {
        return await miio.device({address: this.ip, token: this.token});
	}

    private convertState(state: string): boolean {
        if (state === "on") return true;
        return false;
	}
}