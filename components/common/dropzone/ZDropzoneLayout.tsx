import { Button, createStyles, makeStyles, Theme, useTheme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cancelButton: {
        marginTop: '0.5em',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    },
  }),
);

const ZDropzoneLayout = ({...props}) => {

    const css = useStyles(useTheme());
    const { input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } } = props;

    const { t } = useTranslation();

    const handleCancel = () => {
        props.files.forEach((item: any) => {
            item.remove();
        });
        submitButton.props.onSubmit();
    };

    return (
        <div>
            <Grid container spacing={2}>
                { previews }
            </Grid>

            <div {...dropzoneProps}
                style={{
                    border: '2px dashed #D6D6D6',
                    height: '15em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {files.length < maxFiles && input}
            </div>

            {/* {files.length > 0 && submitButton} */}
            <Button variant='contained'
                color={'primary'}
                style={{marginTop: '0.5em', marginRight: '0.5em'}}
                onClick={() => { submitButton.props.onSubmit(); } }
            >
                {t('dropzone.finish')}
            </Button>
            {/* <Button variant='contained'
                className={css.cancelButton}
                onClick={() => { handleCancel(); } }
            >
                {t('dropzone.cancel')}
            </Button> */}
        </div>
    );
};

export default ZDropzoneLayout;
