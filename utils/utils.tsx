import moment from 'moment';

export default class Utils {

    public static firstUppercase(value: string) {
        return value[0].toUpperCase() + value.slice(1);
    }

    public static onlyNumbers(x: string) {
        if (!x) {
            return x;
        }
        return x.replace(/[^0-9\-]/g, '').replace('-', '');
    }

    public static formatCpfCnpj(value: string) {
        if (value) {
            value = this.onlyNumbers(value);
            if (value.length <= 11) {
                value = this.formatCpf(value);
            } else {
                value = this.formatCnpj(value);
            }
        }
        return value;
    }

    public static formatCpf(value: string) {
        if (value) {
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
        }
        return value;
    }

    public static formatCnpj(value: string) {
        if (value) {
            return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
        }
        return value;
    }

    public static brazilianFormatMoney(value: string | number) {
        if (!value) {
            return '';
        }
        value = this.onlyNumbers(value.toString());

        // tslint:disable-next-line: one-variable-per-declaration
        let inteiro = null, decimal = null, c = null, j = null;
        const aux = new Array();
        value = '' + value;
        c = value.indexOf('.', 0);
        if (c > 0) {
            inteiro = value.substring(0, c);
            decimal = value.substring(c + 1, value.length);
        } else {
            inteiro = value;
        }

        for (j = inteiro.length, c = 0; j > 0; j -= 3, c++) {
            aux[c] = inteiro.substring(j - 3, j);
        }

        inteiro = '';
        for (c = aux.length - 1; c >= 0; c--) {
            inteiro += aux[c] + '.';
        }

        inteiro = inteiro.substring(0, inteiro.length - 1);

        // tslint:disable-next-line: radix
        decimal = parseInt(decimal);
        if (isNaN(decimal)) {
            decimal = '00';
        } else {
            decimal = '' + decimal;
            if (decimal.length === 1) {
                decimal = decimal + '0';
            }
        }
        value = inteiro + ',' + decimal;
        return value;
    }

    public static formatDate(date: string, language: string) {
        switch (language) {
            case 'es':
            case 'pt':
                return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
            default:
                return moment(date, 'YYYY-MM-DD').format('YYYY/MM/DD');
        }
    }

    public static dateToString(date: Date, language: string) {
        switch (language) {
            case 'es':
            case 'pt':
                return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
            default:
                return moment(date, 'YYYY-MM-DD').format('YYYY/MM/DD');
        }
    }

    public static createDateFromString(date: string, language: string) {
        switch (language) {
            case 'es':
            case 'pt':
                return moment(date, 'DD/MM/YYYY').toDate();
            default:
                return moment(date, 'YYYY/MM/DD').toDate();
        }
    }

    public static compareArrayIsEqual(a: any[], array: any[]) {

        if (!a && array) {
            return false;
        }

        if (!a && !array) {
            return true;
        }

        if (!array) {
            return false;
        }

        if (a.length !== array.length) {
            return false;
        }

        for (let i = 0, l = a.length; i < l; i++) {
            if (a[i] instanceof Array && array[i] instanceof Array) {
                if (!this.compareArrayIsEqual(a[i], array[i])) {
                    return false;
                }
            } else if (a[i] !== array[i]) {
                return false;
            }
        }
        return true;
    }

    public static convertArrayToObject(array: any[]) {
        const initialValue = {};
        return array.reduce((obj: any, item: any) => {
            return {
                ...obj,
                item,
            };
        }, initialValue);
    }

    public static getParam(url: string, param: string) {
        const urlSplited = url.split('?');

        if (urlSplited.length < 2) {
            return null;
        }

        const paramns = urlSplited[1].split('&');

        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < paramns.length; index++) {
            const element = paramns[index];
            if (element.startsWith(param + '=')) {
                return element.split('=')[1];
            }

        }

        return null;
    }

    public static encondeJsonInBase64URIComponent(json: any) {
        const jsonString = JSON.stringify(json);
        const jsonStringtBase64 = btoa(jsonString);
        const jsonStringtBase64EncodedUriComponent = encodeURIComponent(jsonStringtBase64);
        return jsonStringtBase64EncodedUriComponent;
    }

    public static decodeJsonFromBase64URIComponent(jsonStringtBase64EncodedUriComponent: string) {
        const jsonStringtBase64 = decodeURIComponent(jsonStringtBase64EncodedUriComponent);
        const jsonString = atob(jsonStringtBase64);
        const json = JSON.parse(jsonString);
        return json;
    }

}
