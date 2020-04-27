import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function ZInput({...props}) {
    const [value, setValue] = useState<string>('');
    const locale = props.locale ? props.locale : 'pt';

    const handleChange = (inputedValue: string) => {
        setValue(inputedValue);
        if (props.onChange) {
            if (inputedValue) {
                props.onChange(inputedValue);
            } else {
                props.onChange('');
            }
        }
    };

    useEffect(() => {
        if (props.value !== value) {
            if (props.value) {
                setValue(props.value); 
            } else {
                setValue('');
            }
        }
    }, [props.value]);

    return (
        <TextField
            style={{width: '100%'}}
            id={props.id ? props.id : undefined}
            value={value}
            label={props.label ? props.label : undefined}
            onChange={(e) => handleChange(e.target.value)}
            margin={'none'}
        />
    );
}

ZInput.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ZInput;
