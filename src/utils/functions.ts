import cx, { ClassName } from 'classix';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassName[]) => {
    return twMerge(cx(...classes));
};

export const jubilees: number[] = [25, 50, 60, 75, 100, 125, 150, 160, 175, 200, 225, 250, 260, 275, 300];
export const preJubilees: number[] = [24, 49, 59, 74, 99, 124, 149, 159, 174, 199, 224, 249, 259, 274, 299];

export const getCelebrating = (year: number | string): string => {
    const parsedYear = parseInt(year as string);
    if (jubilees.includes(parsedYear)) {
        return populateCel(parsedYear);
    } else if (preJubilees.includes(parsedYear)) {
        return populateCel(parsedYear, true);
    }
    return '--';
};

export const populateCel = (year: number, pre: boolean = false): string => {
    const adjustedYear = pre ? year + 1 : year;
    let name = '';

    switch (adjustedYear) {
        case 25:
            name = "Silver";
            break;
        case 50:
            name = "Golden";
            break;
        case 60:
            name = "Diamond";
            break;
        case 75:
            name = "Platinum";
            break;
        case 100:
            name = "Centennial";
            break;
    }
    name = pre ? 'Pre ' + name : name;

    return name ? name + " Jubilee" : "Jubilee";
};

export const getYear = (estd: number | string, year?: number): string => {
    const parsedEstd = parseInt(estd as string);
    const currentYear = year ?? new Date().getFullYear();
    return parsedEstd ? (currentYear - parsedEstd + 1).toString() : 'Not Known';
};

export const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

export const formatDate = (date: string | Date, showDay: boolean = false): string => {
    const parsedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    const day = parsedDate.getDate();
    const daySuffix = getDaySuffix(day);
    if (showDay) {
        const dayOfWeek = parsedDate.getDay();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${daysOfWeek[dayOfWeek]}, ${day}${daySuffix} ${parsedDate.toLocaleDateString('en-US', options)}`;
    }
    return `${day}${daySuffix} ${parsedDate.toLocaleDateString('en-US', options)}`;
};

export const getDay = (date: string | Date): string => {
    const parsedDate = new Date(date);
    const dayOfWeek = parsedDate.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayOfWeek];
};

export const getDateByIndex = (data: { dates?: { date?: string } [] }, index: number): Date => {
    const dates = data?.dates ?? [];
    return dates[index]?.date ? new Date(dates[index].date) : new Date();
};

export const getUrlSlug = (text: string): string => {
    return text.toLowerCase().trim().replaceAll(' ', '-').replace(/[._(),;]/g, '');
};

export const generateUrlSearchParams = (basePath: string, obj: Record<string, any>): string => {
    const params = new URLSearchParams();

    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            params.append(key, JSON.stringify(obj[key]));
        } else {
            params.append(key, obj[key]);
        }
    }

    return `${basePath}?${params.toString()}`;
}

export const getDescription = (puja: any, pujadescriptions: any, count: any): string => {
    const descriptionIndex = getDescriptionIndex(puja?.reference_id, pujadescriptions?.content?.length || 1);
    return pujadescriptions?.content?.[descriptionIndex]
        ?.replaceAll('{pujaName}', puja?.puja_name)
        .replaceAll('{zone}', puja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar')
        .replaceAll('{count}', count.toString());
}

export const getDescriptionIndex = (referenceId: string, totalDescriptions: number): number => {
    const hash = referenceId.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
    }, 0);
    
    return Math.abs(hash) % totalDescriptions;
}

export const stripHtmlAndLimit = (text: string, limit: number = 160): string => {
    const strippedText = text.replace(/<\/?[^>]+(>|$)/g, "");
    return strippedText.length > limit ? strippedText.substring(0, limit).trim() + "..." : strippedText;
}

export const getRndInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const timestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const options: any = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const parts = formatter.formatToParts(date);
    const getPart = (type: any) => parts.find(p => p.type === type)?.value;

    return `${getPart('year')}-${getPart('month')}-${getPart('day')}T` + `${getPart('hour')}:${getPart('minute')}:${getPart('second')}+05:30`;
}

export const sanitizeSearchQuery = (query: string | number): string => {
    if (typeof query !== 'string') {
        query = String(query);
    }

    return query
        .trim()
        .slice(0, 100) // Limit to 100 characters
        .replace(/[<>{}[\]\\\/]/g, '') // Remove potentially dangerous characters
        //.replace(/[&]/g, ' and ') // Replace & with 'and'
        .replace(/\s+/g, ' '); // Replace multiple spaces with single space
}