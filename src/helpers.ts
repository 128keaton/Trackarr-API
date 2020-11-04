export class Helpers {
    static titleizeWord(string: string): string {
        if (string.toLowerCase() === 'fedex') {
            return 'FedEx'
        } else if (string.toLowerCase() === 'usps') {
            return 'USPS'
        } else if (string.toLowerCase() === 'ups') {
            return 'UPS'
        }

        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    static getFormattedDate(date) {
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return month + '/' + day + '/' + year;
    }

    static formatAMPM(date: Date) {
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

}
