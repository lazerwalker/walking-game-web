//
//  StepCounterPlugin.m
//  App
//
//  Created by Em Lazer-Walker on 2021-07-12.
//

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(StepCounterPlugin, "StepCounter",
    CAP_PLUGIN_METHOD(getStepsToday, CAPPluginReturnPromise);
)
