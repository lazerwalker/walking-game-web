//
//  StepCounter.swift
//  App
//
//  Created by Em Lazer-Walker on 2021-07-12.
//

import Capacitor
import CoreMotion

@objc(StepCounterPlugin)
public class StepCounterPlugin: CAPPlugin {
    @objc func getStepsToday(_ call: CAPPluginCall) {  
        if (!CMPedometer.isStepCountingAvailable()) {
            call.reject("Step counting isn't available")
            return
        }
        
        if (CMPedometer.authorizationStatus() != .authorized) {
            call.reject("Motion data isn't authorized! You needs to allow us to access motion data in Settings.")
            return
        }
        
        let manager = CMPedometer()
        let calendar = Calendar(identifier: .iso8601)
        manager.queryPedometerData(from: calendar.startOfDay(for: Date()),
                                   to: Date()) { data, error in
            if let error = error {
                call.reject("Error: \(error.localizedDescription)")
                return
            }
            if let data = data {
                call.resolve(["data": data])
                return
            }
            call.reject("Had neither an error nor data")
        }
    }
}
