import { Grid } from '@material-ui/core';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import FilesService from '../../../services/files.service';
import { getCookie } from '../../../utils/cookie';
import ZDropzoneInput from './ZDropzoneInput';
import ZDropzoneLayout from './ZDropzoneLayout';
import ZPreLoaded from './ZPreLoaded';
import ZPreview from './ZPreview';

function ZDropzone({...props}) {
    const urlUpload = `${process.env.API}/uploads`;
    const [files, setFiles] = useState<any[]>([]);
    const [filesOfProps, setFilesOfProps] = useState<any[]>([]);
    useEffect(() => { 
        setFilesOfProps(props.files); 
    }, [props.files]);

    const getUploadParams = ({file, meta }) => {
        const body = new FormData();
        body.append('file', file);
        return { url: urlUpload, headers: { 'Authorization': getCookie('token') } };
    };

    const handleChangeStatus = ({ meta, file }, status, xhtr) => {
        if (status === 'done') {
            setFiles(
                xhtr.map((element: any) => {
                    if (element.xhr && element.xhr.responseText) {
                        return JSON.parse(element.xhr.responseText).body;
                    }
                })
            );
        }
        if (status === 'removed') {
            if (files.filter((f: any) => f && file.name && f.name && file.name === f.name).length > 0) {
                const id = files.filter((f: any) => f && file.name && f.name && file.name === f.name)[0].id;
                if (id) {
                    FilesService.justDelete(id);
                    setFiles(files.filter((f: any) => f.id !== id));
                }
            }
        }
    };

    const handleSubmit = () => {
        props.setFiles([...filesOfProps, ...files]);
        props.done();
    };

    const getFilesFromEvent = (e: any) => {
        return new Promise<any>((resolve: any) => {
            getDroppedOrSelectedFiles(e).then((chosenFiles: any) => {
                resolve(chosenFiles.map((f: any) => f.fileObject));
            });
        });
    };

    return  <div style={{padding: '2em', maxHeight: '90vh', overflow: 'auto'}}>
                <Grid container>
                    <Grid item xs={12} >
                        {
                            filesOfProps.map((fileMap: any, index: number) => {
                                return <ZPreLoaded file={fileMap} remove={() => {
                                            FilesService.justDelete(fileMap.id);
                                            setFilesOfProps(filesOfProps.filter((f: any) => f.id !== fileMap.id));
                                        }} key={index} />;
                            })
                        }
                    </Grid>
                    <Grid item xs={12} style={{paddingTop: '1.5em'}}>
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            onSubmit={handleSubmit}
                            multiple={true}
                            maxSizeBytes={1048575}
                            PreviewComponent={ZPreview}
                            LayoutComponent={ZDropzoneLayout}
                            InputComponent={ZDropzoneInput}
                            getFilesFromEvent={getFilesFromEvent}
                            accept='image/*'
                            styles={{
                                dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                                // tslint:disable-next-line: no-shadowed-variable
                                inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                                dropzone: { minHeight: 200, maxHeight: 250 },
                            }}
                        />
                    </Grid>
                </Grid>
            </div>;
}

export default ZDropzone;
