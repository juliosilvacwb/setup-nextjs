import { createStyles, lighten, LinearProgress, Theme, withStyles } from '@material-ui/core';

const ZBorderLinearProgress = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 10,
            backgroundColor: lighten(theme.palette.primary.main, 0.5),
        },
        bar: {
            backgroundColor: theme.palette.primary.main,
        },
    }))(LinearProgress);

export default ZBorderLinearProgress;
