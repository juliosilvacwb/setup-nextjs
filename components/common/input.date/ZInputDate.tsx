import DateFnsUtils from '@date-io/date-fns';
import { TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import enLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ptBrLocale from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Utils from '../../../utils/utils';

const localeMap = {
    en: enLocale,
    es: esLocale,
    pt: ptBrLocale,
};

function ZInputDate({...props}) {
    const [value, setValue] = useState<Date | null>(null);
    const locale = props.locale ? props.locale : 'pt';

    useEffect(() => {
        if (value !== Utils.createDateFromString(props.value, locale)) {
            setValue(props.value ? Utils.createDateFromString(props.value, locale) : null);
        }
    }, [props.value]);

    const handleChange = (inputedValue: Date | null) => {
        setValue(inputedValue);
        if (props.onChange && inputedValue !== props.value) {
            if (inputedValue && inputedValue.toString() !== 'Invalid Date') {
                const date = Utils.dateToString(inputedValue, locale);
                props.onChange(date);
            } else {
                props.onChange('');
            }
        }
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
            <KeyboardDatePicker
                margin='none'
                autoComplete='off'
                invalidDateMessage={props.invalidDateMessage ? props.invalidDateMessage : ''}
                variant='inline'
                id={ props.id ? props.id : undefined }
                label={ props.label ? props.label : '' }
                format={ props.format ? props.format : 'dd/MM/yyyy'}
                value={value}
                onChange={handleChange}
                autoOk={true}
                maxDateMessage={''}
                minDateMessage={''}
                KeyboardButtonProps={{
                    'aria-label': `${props.areaLabel ? props.areaLabel : ''}`,
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

ZInputDate.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ZInputDate;
