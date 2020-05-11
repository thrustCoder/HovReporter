export const appActions = {
    TimeUpdate: 'TimeUpdate',
    DateUpdate: 'DateUpdate',
    DateTimeUpdate: 'DateTimeUpdate',
    OccupantsUpdate: 'OccupantsUpdate',
    LicenseUpdate: 'LicenseUpdate',
    HighwayUpdate: 'HighwayUpdate',
    LocationUpdate: 'LocationUpdate',
    VehicleUpdate: 'VehicleUpdate',
    CommentsUpdate: 'CommentsUpdate',
    ClearAllState: 'ClearAllState'
};

export const updateTime = time => ({
        type: appActions.TimeUpdate,
        payload: time,
    }
);

export const updateDate = date => ({
        type: appActions.DateUpdate,
        payload: date,
    }
);

export const updateDateTime = () => ({
        type: appActions.DateTimeUpdate
    }
);

export const updateOccupants = occupants => ({
        type: appActions.OccupantsUpdate,
        payload: occupants,
    }
);

export const updateLicense = license => ({
        type: appActions.LicenseUpdate,
        payload: license,
    }
);

export const updateHighway = highway => ({
        type: appActions.HighwayUpdate,
        payload: highway,
    }
);

export const updateLocation = location => ({
    type: appActions.LocationUpdate,
    payload: location,
}
);

export const updateVehicle = vehicle => ({
        type: appActions.VehicleUpdate,
        payload: vehicle,
    }
);

export const updateComments = comments => ({
        type: appActions.CommentsUpdate,
        payload: comments,
    }
);

export const clearAllState = () => ({
        type: appActions.ClearAllState,
    }
);
