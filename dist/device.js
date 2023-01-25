"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tuyapi_1 = __importDefault(require("tuyapi"));
class Device {
    constructor(id, key, logger, platform) {
        this.setActiveState = (value) => {
            this.logger.info(`Setting active state to ${value} for device ${this.id}.`);
            this.humidifier.set({ dps: 1, set: value === 1 });
        };
        this.setTargetHumidity = (value) => {
            let newValue;
            if (value === 20) {
                newValue = '40';
            }
            else if (value === 40) {
                newValue = '45';
            }
            else if (value === 60) {
                newValue = '50';
            }
            else if (value === 80) {
                newValue = '55';
            }
            else if (value === 100) {
                newValue = 'CO';
            }
            this.logger.info(`Setting target humidity to ${newValue} for device ${this.id}.`);
            this.humidifier.set({ dps: 103, set: newValue });
        };
        this.setState = (value) => {
            this.logger.info(`Setting state to ${value} for device ${this.id}.`);
            this.humidifier.set({ dps: 102, set: value === 0 });
        };
        this.setLight = (value) => {
            this.logger.info(`Setting light to ${value} for device ${this.id}.`);
            let newValue;
            if (value === 0) {
                newValue = 'Close';
            }
            else if (value === 50) {
                newValue = 'Half';
            }
            else {
                newValue = 'Fully';
            }
            this.humidifier.set({ dps: 34, set: newValue });
        };
        this.setFanSpeed = (value) => {
            this.logger.info(`Setting fan speed to ${value} for device ${this.id}.`);
            let newValue;
            if (value === 25) {
                newValue = 'level_1';
            }
            else if (value === 50) {
                newValue = 'level_2';
            }
            else if (value === 75) {
                newValue = 'level_3';
            }
            else if (value === 100) {
                newValue = 'level_4';
            }
            this.humidifier.set({ dps: 101, set: newValue });
        };
        this.handleRefresh = (data) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const deviceData = data['dps'];
            if (deviceData) {
                if (deviceData['1'] !== undefined) {
                    // Active state
                    const active = deviceData['1'] ? 1 : 0;
                    this.logger.debug(`Update active state to ${active} for device ${this.id}.`);
                    (_a = this.humidifierService) === null || _a === void 0 ? void 0 : _a.updateCharacteristic(this.platform.Characteristic.Active, active);
                }
                // Current target humidity
                if (deviceData['103'] !== undefined) {
                    let relativeHumidityHumidifierThreshold = deviceData['103'].toString();
                    if (relativeHumidityHumidifierThreshold === '40') {
                        relativeHumidityHumidifierThreshold = '20';
                    }
                    else if (relativeHumidityHumidifierThreshold === '45') {
                        relativeHumidityHumidifierThreshold = '40';
                    }
                    else if (relativeHumidityHumidifierThreshold === '50') {
                        relativeHumidityHumidifierThreshold = '60';
                    }
                    else if (relativeHumidityHumidifierThreshold === '55') {
                        relativeHumidityHumidifierThreshold = '80';
                    }
                    else if (relativeHumidityHumidifierThreshold === 'CO') {
                        relativeHumidityHumidifierThreshold = '100';
                    }
                    this.logger.debug(`Update target humidity to ${relativeHumidityHumidifierThreshold} for device ${this.id}.`);
                    (_b = this.humidifierService) === null || _b === void 0 ? void 0 : _b.updateCharacteristic(this.platform.Characteristic.RelativeHumidityHumidifierThreshold, relativeHumidityHumidifierThreshold);
                }
                // Current humidity
                if (deviceData['14'] !== undefined) {
                    const currentRelativeHumidity = deviceData['14'].toString();
                    this.logger.debug(`Update current humidity to ${currentRelativeHumidity} for device ${this.id}.`);
                    (_c = this.humidifierService) === null || _c === void 0 ? void 0 : _c.updateCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity, currentRelativeHumidity);
                }
                // Current state
                if (deviceData['102'] !== undefined) {
                    const state = deviceData['102'] ? 0 : 1;
                    this.logger.debug(`Update state to ${state} for device ${this.id}.`);
                    (_d = this.humidifierService) === null || _d === void 0 ? void 0 : _d.updateCharacteristic(this.platform.Characteristic.TargetHumidifierDehumidifierState, state);
                }
                // Fan speed
                if (deviceData['101'] !== undefined) {
                    let fanSpeed = deviceData['101'].toString();
                    if (fanSpeed === 'level_1') {
                        fanSpeed = '25';
                    }
                    else if (fanSpeed === 'level_2') {
                        fanSpeed = '50';
                    }
                    else if (fanSpeed === 'level_3') {
                        fanSpeed = '75';
                    }
                    else if (fanSpeed === 'level_4') {
                        fanSpeed = '100';
                    }
                    this.logger.debug(`Update fan speed to ${fanSpeed} for device ${this.id}.`);
                    (_e = this.humidifierService) === null || _e === void 0 ? void 0 : _e.updateCharacteristic(this.platform.Characteristic.RotationSpeed, fanSpeed);
                }
                // Water level
                if (deviceData['22'] !== undefined) {
                    const waterLevel = deviceData['22'] === 1 ? 0 : 100;
                    this.logger.debug(`Update water level to ${waterLevel} for device ${this.id}.`);
                    (_f = this.humidifierService) === null || _f === void 0 ? void 0 : _f.updateCharacteristic(this.platform.Characteristic.WaterLevel, waterLevel);
                }
                if (deviceData['33'] !== undefined) {
                    // Filter change
                    const filterChange = deviceData['33'] === 0 ? 1 : 0;
                    this.logger.debug(`Update filter change indication ${filterChange} for device ${this.id}.`);
                    (_g = this.humidifierService) === null || _g === void 0 ? void 0 : _g.updateCharacteristic(this.platform.Characteristic.FilterChangeIndication, filterChange);
                    // Filter life level
                    const filterLifeLevel = deviceData['33'].toString();
                    this.logger.debug(`Update filter live level ${filterLifeLevel} for device ${this.id}.`);
                    (_h = this.humidifierService) === null || _h === void 0 ? void 0 : _h.updateCharacteristic(this.platform.Characteristic.FilterLifeLevel, filterLifeLevel);
                }
                // Light
                // if (deviceData['34'] !== undefined) {
                //   let currentValue;
                //   if (deviceData['34'] === 'Close') {
                //     currentValue = '0';
                //   } else if (deviceData['34'] === 'Half') {
                //     currentValue = '50';
                //   } else {
                //     currentValue = '100';
                //   }
                //   this.humidifierService?.updateCharacteristic(
                //     this.platform.Characteristic.CurrentRelativeHumidity,
                //     currentValue,
                //   );
                // }
            }
        };
        this.id = id;
        this.humidifier = new tuyapi_1.default({
            id: id,
            key: key,
        });
        this.logger = logger;
        this.platform = platform;
        this.humidifierService = null;
        this.lightService = null;
        this.fanService = null;
        this.init();
    }
    init() {
        const mapping = {
            '1': 'power',
            '14': 'humidity_current',
            '22': 'fault',
            '29': true,
            '33': '',
            '34': '',
            '101': 'fan_speed',
            '102': 'auto',
            '103': 'humidity_target',
        };
        // Find device on network
        this.humidifier.find().then(() => {
            // Connect to device
            this.humidifier.connect();
        });
        // Add event listeners
        this.humidifier.on('connected', () => {
            this.logger.info(`Connected to device: ${this.id}!`);
        });
        this.humidifier.on('disconnected', () => {
            this.logger.warn(`Disconnected from device ${this.id}. Retrying in 5 seconds...`);
            setTimeout(() => {
                this.init();
            }, 5000);
        });
        this.humidifier.on('error', error => {
            this.logger.error(`Error for device: ${this.id}!`, error);
        });
        this.humidifier.on('dp-refresh', data => {
            this.logger.debug(`Data from device ${this.id}:`, data);
            this.handleRefresh(data);
        });
        this.humidifier.on('data', data => {
            this.logger.debug(`Data from device ${this.id}:`, data);
            this.handleRefresh(data);
        });
    }
}
exports.default = Device;
//# sourceMappingURL=device.js.map