import { Grid, Tooltip, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import ZBorderLinearProgress from './ZBorderLinearProgress';

const ZPreLoaded = ({...props }) => {
    const file = props.file;
    const remove = props.remove;
    const { t } = useTranslation();
    return (
        <Grid item xs={12}>
            <div style={{display: 'flex'}}>
                <div style={{flexGrow: 1, paddingRight: '0.5em'}}>
                    <ZBorderLinearProgress
                        variant='determinate'
                        color='secondary'
                        value={100}
                    />
                    <Grid container direction='row' justify='center' alignItems='center'>
                        <Grid item xs={6}>
                            <Typography variant='body2' gutterBottom>Filename: {file.name}</Typography>
                        </Grid>
                        <Grid item xs={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Typography variant='body2' gutterBottom>{100}%</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Tooltip title={t('dropzone.remove')} style={{float: 'right'}}>
                        <Clear color={'error'} onClick={ () => remove()} style={{cursor: 'pointer'}}/>
                    </Tooltip>
                </div>
            </div>
        </Grid>
    );
};

export default ZPreLoaded;
