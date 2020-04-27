import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AutocompleteOption, AutocompleteProps } from '../autocomplete/zautocomplete';

function ZAutocompleteDinamicOptions({ ...props }) {
    const [isLoading, setIsLoading] = useState(false);
    const [defaultProps, setDefaultProps] =
        useState<AutocompleteProps>({options: [], getOptionLabel: (option: AutocompleteOption) => option.label});
    const [value, setValue] = useState<AutocompleteOption>({label: '', value: ''});

    useEffect(() => {
        if (props.options) {
            setDefaultProps(props.options);
        }
    }, [props.options]);

    useEffect(() => {
        setIsLoading(props.loading);
    }, [props.loading]);

    useEffect(() => {

        if (value.value !== props.value) {
            const selecteds = defaultProps.options.filter((option) => option.value === props.value);
            if (selecteds.length > 0) {
                setValue(selecteds[0]);
            } else {
                setValue({label: '', value: ''});
            }
        }

    }, [props.value, defaultProps]);

    let timeout = null;
    const callKeyDownStop = (inputedValue: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (props.keydown) {
                props.keydown(inputedValue);
            }
        }, 500);
    };

    return (
        <>
            <Autocomplete
                {...defaultProps}
                id={props.id ? props.id : ''}
                value={value}
                noOptionsText={props.noOptionsText ? props.noOptionsText : ''}
                loading={isLoading}
                loadingText={props.textLoading ? props.textLoading : ''}
                onChange={(event: any, newValue: AutocompleteOption) => {
                    setValue(newValue);
                    if (props.onChange) {
                        props.onChange(event, newValue);
                    }
                }}
                onInputChange={(event: object, inputedValue: string) => {
                    callKeyDownStop(inputedValue);
                }}
                renderInput={(params) => <TextField {...params} margin='none' label={props.label ? props.label : undefined}/>}
            />
        </>
    );
}

ZAutocompleteDinamicOptions.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    textLoading: PropTypes.string.isRequired
};

export default ZAutocompleteDinamicOptions;
