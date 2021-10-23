export enum DISTRICT_FILTERS {
    DARNYTSIA = 'darnytsia',
    DESNIANSKYI = 'desnianskyi',
    DNIPROVSKYI = 'dniprovskyi',
    HOLOSIIV = 'holosiiv',
    OBOLONSKYI = 'obolonskyi',
    PECHERSKYI = 'pecherskyi',
    PODIL = 'podil',
    SHEVCHENKIVSKYI = 'shevchenkivskyi',
    SOLOMIANSKYI = 'solomianskyi',
    SVIATOSHYNSKYI = 'sviatoshynskyi',
}

export enum POST_STATUS {
    IDLE = 'idle',
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

export const ALL_STATUSES = [POST_STATUS.IDLE, POST_STATUS.DRAFT, POST_STATUS.ACTIVE, POST_STATUS.ARCHIVE];
