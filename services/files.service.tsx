import { TFunction } from 'i18next';
import MessageBuilder from '../components/common/message/model/builders/MessageBuilder';
import { loadingsAction } from '../state/actions/loadings';
import { messagesAction } from '../state/actions/messages.action';
import { getCookie } from '../utils/cookie';
import CustomFetch from './custom.fetch';

export default class FilesService {

    public static justDelete(id: number) {
        const url = `/files/${id}`;
        CustomFetch.delete(url)
        .catch((error: Error) => {
            throw error.message;
        });
    }

    public static download(id: number, name: string) {
        const url = `/downloads?fileId=${id}`;
        const headers = new Headers();
        const token = getCookie('token');

        if (token && !url.includes('auth')) {
          headers.set('Authorization', token);
        }

        let requestInfo: any;

        requestInfo = { headers  };

        return fetch(`${process.env.API}${url}`, requestInfo)
        .then((res: any) => res.blob())
        .then((res: any) => {
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(res);
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

    }
}
