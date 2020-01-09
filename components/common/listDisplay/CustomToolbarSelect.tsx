import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

function CustomToolbarSelect({...props}) {

    return (
        <React.Fragment>
            <div>
                {
                    props.actions.map((action: any, index: number) => {
                        return (
                            <Tooltip title={action.label} style={{float: 'right'}} key={index}>
                                <IconButton onClick={() => action.action(props.selectedIdsRows, props.selected)}>
                                    { action.icon }
                                </IconButton>
                            </Tooltip>
                        );
                    })

                }
            </div>
        </React.Fragment>
    );

}

export default CustomToolbarSelect;
