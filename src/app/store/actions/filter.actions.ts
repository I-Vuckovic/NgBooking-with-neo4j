import { Action } from '@ngrx/store';

export const CHANGE_FROM_DESTINATION = '[FILTER] Change from destinatino';
export const CHANGE_TO_DESTINATION = '[FILTER] Change to destinatino';
export const CHANGE_START_DATE = '[FILTER] Change start date';
export const CHANGE_END_DATE = '[FILTER] Change end date';

export class ChangeFromDestination implements Action{
    readonly type = CHANGE_FROM_DESTINATION;
    constructor(public payload: string){}
}

export class ChangeToDestination implements Action{
    readonly type = CHANGE_TO_DESTINATION;
    constructor(public payload: string){}
}

export class ChangeEndDate implements Action{
    readonly type = CHANGE_END_DATE;
    constructor(public payload: Date){}
}

export class ChangeStartDate implements Action{
    readonly type = CHANGE_START_DATE;
    constructor(public payload: Date){}
}

export type FilterActions = ChangeFromDestination | ChangeToDestination | ChangeEndDate | ChangeStartDate;
