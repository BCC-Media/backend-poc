import React from 'react';

import { SelectField, SelectInput } from "react-admin";

const Statuses = [
    {id: 0, name: 'Inactive'},
    {id: 1, name: 'Active'},
];

export const StatusInput = (props) => {
    return (
        <SelectInput {...props} choices={Statuses}/>
    );
};

export const StatusField = (props) => {
    return (
        <SelectField {...props} choices={Statuses}/>
    );
};