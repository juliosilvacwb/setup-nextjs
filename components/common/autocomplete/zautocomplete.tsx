import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export interface AutocompleteOption {
    label: string;
    value: string;
}

export interface AutocompleteProps {
    options: AutocompleteOption[];
    getOptionLabel: (option: AutocompleteOption) => string;
}

function ZAutocomplete({ ...props }) {

    const [autocompleteProps, setAutocompleteProps] =
        useState<AutocompleteProps>({options: [], getOptionLabel: (option: AutocompleteOption) => option.label});

    const [value, setValue] = useState<AutocompleteOption>({label: '', value: ''});

    useEffect(() => {
        if (props.autocompleteProps) {
            setAutocompleteProps(props.autocompleteProps);
        }
    }, [props.autocompleteProps]);

    useEffect(() => {
        if (value.value !== props.value) {
            const selecteds = autocompleteProps.options.filter((option) => option.value === props.value);
            if (selecteds.length > 0) {
                setValue(selecteds[0]);
            } else {
                setValue({label: '', value: ''});
            }
        }
    }, [props.value]);

    return (
        <>
            <Autocomplete
                {...autocompleteProps}
                id={props.id ? props.id : ''}
                value={value}
                noOptionsText={props.noOptionsText ? props.noOptionsText : ''}
                loadingText={''}
                onChange={(event: any, newValue: AutocompleteOption) => {
                    setValue(newValue);
                    if (props.onChange) {
                        props.onChange(newValue && newValue.value ? newValue.value : undefined);
                    }
                }}
                renderInput={(params) => <TextField {...params} margin='none' label={props.label ? props.label : undefined} />}
            />
        </>
    );
}

ZAutocomplete.propTypes = {
    onChange: PropTypes.func.isRequired,
    autocompleteProps: PropTypes.object.isRequired
};

export default ZAutocomplete;
