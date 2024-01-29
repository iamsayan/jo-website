import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const cn = (...classes) => {
    return twMerge( classNames( classes ) )
}

export const jubilees = [25, 50, 60, 75, 100, 125, 150, 160, 175, 200, 225, 250, 260, 275, 300];
export const preJubilees = [24, 49, 59, 74, 99, 124, 149, 159, 174, 199, 224, 249, 259, 274, 299];

export const getCelebrating = year => {
    year = parseInt(year)
    if (jubilees.includes(year)) {
        return populateCel(year)
    } else if (preJubilees.includes(year)) {
        return populateCel(year, true)
    } else if (!year) {
        return "Adi Puja"
    }
    return '--'
}

export const populateCel = (year, pre = false) => {
    year = pre ? year + 1 : year;
    let name = ''

    switch (year) {
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
    }
    name = pre ? 'Pre ' + name : name;

    return name ? name + " Jubilee" : "Jubilee"
}


export const getYear = (estd, year) => {
    estd = parseInt(estd)
    year = year ?? new Date().getFullYear();
    return estd ? year - estd + 1 : 'Not Known';
}

export const getDaySuffix = day => {
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
}

export const formatDate = (date, showDay = false) => {
    date = new Date(date);
    const options = { month: 'long', year: 'numeric' };
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    if (showDay) {
        const dayOfWeek = date.getDay();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${daysOfWeek[dayOfWeek]}, ${day}${daySuffix} ${date.toLocaleDateString('en-US', options)}`;
    }
    return `${day}${daySuffix} ${date.toLocaleDateString('en-US', options)}`;
}

export const getDay = date => {
    date = new Date(date);
    const dayOfWeek = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayOfWeek]
}

export const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
}

export const getDateByIndex = (data, index) => {
    const dates = data?.dates ?? []
    return dates[index]?.value?.date ? new Date(dates[index]?.value?.date) : new Date()
}

export const getUrlSlug = text => {
    return text.toLowerCase().trim().replaceAll(' ', '-').replace(/[._(),;]/g, '');
}