export const updateLicenseState = licenseState => ({
        type: 'LicenseStateUpdate',
        payload: licenseState,
    }
);

export const updateTime = time => ({
        type: 'TimeUpdate',
        payload: time,
    }
);

export const updateOccupants = occupants => ({
        type: 'OccupantsUpdate',
        payload: occupants,
    }
);

export const updateLicense = license => ({
        type: 'LicenseUpdate',
        payload: license,
    }
);

export const updateHighway = highway => ({
        type: 'HighwayUpdate',
        payload: highway,
    }
);
