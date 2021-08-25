import React from 'react';

import { SelectField, SelectInput } from "react-admin";

const MediaTypes = [
    {id: 'show', name: 'Show'},
    {id: 'season', name: 'Season'},
    {id: 'episode', name: 'Episode'},
    {id: 'standalone', name: 'Standalone'},
];

export const MediaTypeInput = (props) => <SelectInput {...props} choices={MediaTypes}/>;
export const MediaTypeField = (props) => <SelectField {...props} choices={MediaTypes}/>;