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

export const updateDate = date => ({
        type: 'DateUpdate',
        payload: date,
    }
);

export const updateDateTime = () => ({
        type: 'DateTimeUpdate'
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

export const updateVehicle = vehicle => ({
        type: 'VehicleUpdate',
        payload: vehicle,
    }
);

export const updateComments = comments => ({
        type: 'CommentsUpdate',
        payload: comments,
    }
);

export const clearAllState = () => ({
        type: 'ClearAllState',
    }
);
