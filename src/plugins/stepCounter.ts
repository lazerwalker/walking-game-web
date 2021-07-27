import { registerPlugin, Capacitor } from '@capacitor/core';

interface StepCounterAPI {
    getStepsToday(): Promise<any>
}

let StepCounter: StepCounterAPI

if (Capacitor.isNativePlatform()) {
    StepCounter = registerPlugin<StepCounterAPI>('StepCounter');
} else {
    StepCounter = {
        getStepsToday() {
            return Promise.resolve(1000)
        }
    }
}

export default StepCounter