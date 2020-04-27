import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core';
import { useEffect, useState, useRef } from 'react';

export const textareaStyle = makeStyles((theme: Theme) => ({
    label: {
      color: theme.palette.primary.main,
    },
    textarea: {
        width: '100%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
}));

function ZTextarea({...props}) {

    const classes = textareaStyle();
    const area = useRef(null);

    const [value, setValue] = useState('');
    const [rows, setRows] = useState(3);

    const  handleValue = (val: string) => {
        setValue(val);
    };

    useEffect(() => {
        if (props.rows) {
            setRows(props.rows);
        }
    }, [props.rows]);

    useEffect(() => {
        if (props.value !== value) {

            if (props.value === undefined ) {
                setValue('');
            } else {
                setValue(props.value);
            }

        }
    }, [props.value]);

    useEffect(() => {
        props.onChange(value);
    }, [value]);

    return  <>
                <div style={{width: '100%'}}>
                    {
                        props.label &&
                        <Typography variant='caption' display='block' gutterBottom className={classes.label}>
                            {props.label }
                            {/* {props.value ? props.label : '\u00A0' } */}
                        </Typography>
                    }
                    <textarea
                        rows={rows}
                        ref={area}
                        className={classes.textarea}
                        placeholder={props.placeholder ? props.placeholder : ''}
                        onChange={(e) => handleValue(e.target.value)} value={value}>
                    </textarea>
                </div>
            </>;
}

export default ZTextarea;
