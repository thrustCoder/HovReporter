import * as Amplitude from 'expo-analytics-amplitude';
import metricNames from '../state/MetricNames';

export const logPageViewEvent = (viewName) => {
    if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
            Amplitude.logEventWithProperties(metricNames.PageView, {
            name: viewName
        });
    }
}
