import { CharacteristicValue, Service, Logger } from 'homebridge';
import { StadlerFormKarlHomebridgePlatform } from './platform';
export default class Device {
    private readonly id;
    private humidifier;
    private logger;
    private platform;
    humidifierService: Service | null;
    lightService: Service | null;
    fanService: Service | null;
    constructor(id: string, key: string, logger: Logger, platform: StadlerFormKarlHomebridgePlatform);
    setActiveState: (value: CharacteristicValue) => void;
    setTargetHumidity: (value: CharacteristicValue) => void;
    setState: (value: CharacteristicValue) => void;
    setLight: (value: CharacteristicValue) => void;
    setFanSpeed: (value: CharacteristicValue) => void;
    handleRefresh: (data: any) => void;
    init(): void;
}
//# sourceMappingURL=device.d.ts.map