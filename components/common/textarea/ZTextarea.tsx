import { makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const textareaStyle = makeStyles((theme: Theme) => ({
    field: {
        position: 'relative',
    },
    label: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1rem',
        position: 'absolute',
        top: 19,
        left: 1,
        pointerEvents: 'none',
        transition: '0.25s ease all',
    },
    textarea: {
        width: '100%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        marginTop: '16px',
        border: 0,
        borderBottom: '1px solid #ccc!important',
        resize: 'none',
        outline: 'none',
        boxShadow: 'none',
        overflow: 'auto',
        fontSize: '1.2em',
        transition: '0.25s ease all',
        '&:hover': {
            borderBottom: '2px solid #000!important',
            transition: '0.25s ease all',
        },
        '&:focus': {
            borderBottom: `2px solid ${theme.palette.primary.main}!important`,
            transition: '0.25s ease all',
        },
    },
    labelActive: {
        fontSize: '0.75rem',
        top: -4,
        left: 0,
        color: theme.palette.primary.main,
        transition: 'all 0.25s'
    },
}));

function ZTextarea({...props}) {

    const classes = textareaStyle();

    const [value, setValue] = useState('');
    const [rows, setRows] = useState(3);
    const [textareaFocusedOrFilled, setTextareaFocusedOrFilled] = useState(false);

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
                <div className={classes.field}>
                    {
                        props.label &&
                        <Typography variant='caption' display='block' gutterBottom>
                            <span className={clsx(classes.label, {[classes.labelActive]: textareaFocusedOrFilled })}>
                                { props.label }
                            </span>
                            {/* { '\u00A0' } */}
                        </Typography>
                    }
                    <textarea
                        rows={rows}
                        onFocus={() => setTextareaFocusedOrFilled(true) }
                        onBlur={() => {
                            if (!value) {
                                setTextareaFocusedOrFilled(false);
                            }
                        }}
                        className={clsx(classes.textarea)}
                        // placeholder={!textareaFocusedOrFilled ? props.label : undefined}
                        onChange={(e) => handleValue(e.target.value)} value={value}>
                    </textarea>
                </div>
            </>;
}

export default ZTextarea;
