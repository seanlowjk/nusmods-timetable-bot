import { SEMESTER_TYPES, THEME_COLOR, THEME_MODE, TIMETABLE_ORIENTATION } from "../utils/constants";
import { Class } from "./class";

export class Converter {
    data: any; 

    constructor() {
        this.data = {
            hidden: [],
            theme: {
              id: THEME_COLOR.EIGHTIES,
              timetableOrientation: TIMETABLE_ORIENTATION.HORIZONTAL,
              showTitle: false,
              _persist: {
                version: -1,
                rehydrated: true,
              },
            },
            settings: {
              mode: THEME_MODE.LIGHT,
            },
        }
    }

    parseUrlData(url: string) {
        this.parseSemester(url);
        this.parseClasses(url);
        this.parseColors(); 
    }

    parseSemester(url: string): void {
        const result = url.match(/(?<=timetable\/)(.*)(?=\/)/gm)
        if (result == null || result.length == 0) {
            this.data.semester = SEMESTER_TYPES.SEMESTER_ONE;
            return; 
        }

        const semester = result[0];

        switch(semester) {
            case 'sem-1':
                this.data.semester = SEMESTER_TYPES.SEMESTER_ONE;
                break;
            case 'sem-2':
                this.data.semester = SEMESTER_TYPES.SEMESTER_TWO;
                break;
            case 'st-i':
                this.data.semester = SEMESTER_TYPES.SPECIAL_TERM_ONE;
                break;
            case 'st-ii':
                this.data.semester = SEMESTER_TYPES.SPECIAL_TERM_TWO;
                break;
            default: 
                this.data.semester = SEMESTER_TYPES.SEMESTER_ONE;
                break;
        }
    }

    parseClasses(url: string): void {
        const match = url.match(/(?<=\?)(.*)(?=$)/gm)
        if (match == null || match.length == 0) {
            return;
        }

        const result = match[0].split("&");
        this.data.timetable = {};

        for (let i = 0; i < result.length; i++) {
            const data = result[i];
            const newClass = this.parseClass(data);
            this.data.timetable[newClass.title] = {};

            newClass.lessons.forEach(lesson => {
                this.data.timetable[newClass.title][lesson.type] = lesson.classNumber;
            })
        }
    } 

    parseClass(data: string): Class {
        const classData = data.split('=');
        const title = classData[0];
        const lessons = classData[1];

        const newClass = new Class(title);

        if (lessons === undefined) {
            return newClass; 
        }

        const lessonsData = lessons.split(',') 
        for (let i = 0; i < lessonsData.length; i++) {
            const lessonTypeData = lessonsData[i].split(':')
            newClass.addField(lessonTypeData[0], lessonTypeData[1]);
        }

        return newClass;
    }

    parseColors(): void {
        let counter = 1;

        if (this.data.timetable == null) {
            return; 
        }

        this.data.colors = {}; 

        Object.keys(this.data.timetable).forEach(key => {
            this.data.colors[key] = counter; 

            counter ++; 
            if (counter > 8) {
                counter %= 8; 
            }
        })
    }

    getJSONString(): string {
        return JSON.stringify(this.data);
    }
}
