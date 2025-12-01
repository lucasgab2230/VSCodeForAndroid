const { TurboModuleRegistry } = require('react-native');
const { NativeEventEmitter, NativeModules } = require('react-native');

const TermuxIntegrationTurboModule = TurboModuleRegistry.getEnforcing('TermuxIntegration');

class TermuxIntegration {
  constructor() {
    this.emitter = new NativeEventEmitter(TermuxIntegrationTurboModule);
  }

  async checkTermuxAvailability() {
    return new Promise((resolve, reject) => {
      TermuxIntegrationTurboModule.checkTermuxAvailability((error, isAvailable) => {
        if (error) {
          reject(error);
        } else {
          resolve(isAvailable);
        }
      });
    });
  }

  async startTermux() {
    return new Promise((resolve, reject) => {
      TermuxIntegrationTurboModule.startTermux((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async executeTermuxCommand(command) {
    return new Promise((resolve, reject) => {
      TermuxIntegrationTurboModule.executeTermuxCommand(command, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async openTermuxInDirectory(directory) {
    return new Promise((resolve, reject) => {
      TermuxIntegrationTurboModule.openTermuxInDirectory(directory, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async installTermux() {
    return new Promise((resolve, reject) => {
      TermuxIntegrationTurboModule.installTermux((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getTermuxVersion() {
    return new Promise((resolve, reject) => {
      TermuxIntegrationTurboModule.getTermuxVersion((error, version) => {
        if (error) {
          reject(error);
        } else {
          resolve(version);
        }
      });
    });
  }

  onCommandExecuted(callback) {
    return this.emitter.addListener('TermuxCommandExecuted', callback);
  }

  onTerminalOutput(callback) {
    return this.emitter.addListener('TerminalOutput', callback);
  }
}

module.exports = TermuxIntegration;