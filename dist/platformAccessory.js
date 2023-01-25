"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StadlerFormKarlPlatformAccessory = void 0;
const device_1 = __importDefault(require("./device"));
/**
 * Platform Accessory
 */
class StadlerFormKarlPlatformAccessory {
    constructor(platform, accessory) {
        this.platform = platform;
        this.accessory = accessory;
        this.device = new device_1.default(accessory.context.device.id, accessory.context.device.key, this.platform.log, this.platform);
        this.name = accessory.context.device.name;
        // set accessory information
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Stadler Form')
            .setCharacteristic(this.platform.Characteristic.Model, 'Karl')
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.UUID);
        // Initialize humidifier service
        this.device.humidifierService = this.accessory.getService(this.platform.Service.HumidifierDehumidifier) ||
            this.accessory.addService(this.platform.Service.HumidifierDehumidifier);
        this.device.humidifierService.setPrimaryService(true);
        // Active state
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.device.setActiveState.bind(this));
        // Target humidity
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.RelativeHumidityHumidifierThreshold)
            .setProps({
            minStep: 20,
            minValue: 20,
            maxValue: 100,
            validValues: [
                20,
                40,
                60,
                80,
                100, // CO
            ],
        })
            .onSet(this.device.setTargetHumidity.bind(this));
        // Fan speed
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.RotationSpeed)
            .setProps({
            minStep: 25,
            minValue: 25,
            maxValue: 100,
            validValues: [25, 50, 75, 100],
        })
            .onSet(this.device.setFanSpeed.bind(this));
        // Current state (humidifying or idle)
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.CurrentHumidifierDehumidifierState)
            .setProps({
            validValues: [1, 2],
        });
        // Target state (auto or humidify)
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.TargetHumidifierDehumidifierState)
            .setProps({
            validValues: [0, 1],
        })
            .onSet(this.device.setState.bind(this));
        // Current humidity
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.CurrentRelativeHumidity);
        // Add water level characteristic
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.WaterLevel);
        // Filter change characteristic
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.FilterChangeIndication);
        // Filter live level characteristic
        this.device.humidifierService
            .getCharacteristic(this.platform.Characteristic.FilterLifeLevel);
        // Display service
        // this.device.lightService = this.accessory.getService(this.platform.Service.Lightbulb) ||
        //   this.accessory.addService(this.platform.Service.Lightbulb);
        // this.accessory.removeService(this.device.lightService);
        // this.device.humidifierService.addLinkedService(this.device.lightService);
        // this.device.lightService
        //   .getCharacteristic(this.platform.Characteristic.Brightness)
        //   .setProps({
        //     minStep: 50,
        //     minValue: 0,
        //     maxValue: 100,
        //     validValues: [0, 50, 100],
        //   })
        //   .onSet(this.device.setLight.bind(this));
    }
}
exports.StadlerFormKarlPlatformAccessory = StadlerFormKarlPlatformAccessory;
//# sourceMappingURL=platformAccessory.js.map