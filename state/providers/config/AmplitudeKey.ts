import globalConfig from '../../../config/global.json';

export const getAmplitudeApEyeKee = () => {
    return globalConfig.Amplitude.apEyeKee.replace(/\$/g, '');
}
