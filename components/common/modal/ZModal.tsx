import { Card, CardContent, Grid, Modal } from '@material-ui/core';
import React from 'react';

export default function ZModal({...props}) {
    return <Modal
                open={props.open}
                onClose={props.handleClose}
                >
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        <Card style={{padding: '0', maxHeight: '90%', overflow: 'auto', justifyContent: 'center'}}>
                            <CardContent style={{ padding: '0.5em' }}>
                                { props.children }
                            </CardContent>
                        </Card>
                    </div>
            </Modal>;
}
