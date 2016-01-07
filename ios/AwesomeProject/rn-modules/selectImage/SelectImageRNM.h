//
//  SelectImageRNM.h//
//  Created by babytree-mbp13 on 16/1/7.
//

#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"
#import "RCTLog.h"


@interface SelectImageRNM:NSObject<RCTBridgeModule>



@property(nonatomic, strong)  RCTPromiseResolveBlock resolve;
@property(nonatomic, strong)  RCTPromiseRejectBlock reject;
 
@end
