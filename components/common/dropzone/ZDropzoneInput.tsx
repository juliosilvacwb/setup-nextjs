import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const ZDropzoneInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const { t } = useTranslation();
    const text = files.length > 0 ? 'Add more files' : 'Choose files';

    return (
        <label style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <Typography variant='h5' gutterBottom style={{ color: '#808B96', textAlign: 'center' }} >
                {t('dropzone.dropfile')}
            </Typography>
            <input
                style={{ display: 'none' }}
                type='file'
                accept={accept}
                multiple
                onChange={(e) => {
                    getFilesFromEvent(e).then((chosenFiles) => {
                        onFiles(chosenFiles);
                    });
                }}
            />
        </label>
    );
};

export default ZDropzoneInput;
