import Constants from 'expo-constants';

export const getAmplifyApEyeKee = () => {
    return Constants.manifest.extra.Amplitude.apEyeKee.replace(/\$/g, '');
}
