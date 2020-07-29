import Constants from 'expo-constants';

export const getAmplitudeApEyeKee = () => {
    return Constants.manifest.extra.Amplitude.apEyeKee.replace(/\$/g, '');
}
