import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

function ZInputMoney({...props}) {
    const [value, setValue] = useState('');
    const currencySimbol = props.currencySimbol ? props.currencySimbol : '';

    const handleChange = (inputedValue: string) => {
        setValue(formatAmount(inputedValue));
    };

    useEffect(() => {
        if (value) {
            if (props.onChange) {
                props.onChange(parseFloat(value.replace(/\./g, '').replace(/,/g, '.')));
            }
        }
    }, [value]);

    useEffect(() => {
        if (props.value !== value) {

            if (props.value) {
                setValue(formatAmount(props.value.toFixed(2)));
            } else {
                setValue('');
            }
        }
    }, [props.value]);

    return (
        <FormControl fullWidth>
          { props.label && <InputLabel htmlFor='standard-adornment-amount'>{ props.label }</InputLabel> }
          <Input
            id={props.id ? props.id : undefined}
            value={ value }
            onChange={(e: any) => handleChange(e.target.value)}
            startAdornment={props.label && !value ? undefined : <InputAdornment position='start'>{currencySimbol}</InputAdornment>}
          />
        </FormControl>
    );
}

const formatAmountNoDecimals = ( value: any ) => {
    if (!value) {
        value = '';
    }

    if (typeof value !== 'string') {
        value = value .toString();
    }

    const rgx = /(\d+)(\d{3})/;
    while ( rgx.test( value ) ) {
        value = value.replace( rgx, '$1' + '.' + '$2' );
    }
    return value;
};

const formatAmount = ( value: any) => {

    if (!value) {
        value = '';
    }

    if (typeof value !== 'string') {
        value = value .toString();
    }

    // remove all the characters except the numeric values
    value = value.replace( /[^0-9]/g, '' );

    // set the default value
    if ( value.length === 0 ) {
        value = '0.00';
    } else if ( value.length === 1 ) {
        value = '0.0' + value;
    } else if ( value.length === 2 ) {
        value = '0.' + value;
    } else {
        value = value.substring( 0, value.length - 2 ) + '.' + value.substring( value.length - 2, value.length );
    }

    // set the precision
    // tslint:disable-next-line: no-construct
    value = new Number( value );
    value = value.toFixed( 2 );    // only works with the "."

    // change the splitter to ","
    value = value.replace( /\./g, ',' );

    // format the amount
    const x = value.split( ',' );
    const x1 = x[0];
    const x2 = x.length > 1 ? ',' + x[1] : '';

    return formatAmountNoDecimals( x1 ) + x2;
};

ZInputMoney.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ZInputMoney;
