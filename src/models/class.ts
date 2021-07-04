import { LESSON_TYPES } from "../utils/constants";
import { Lesson } from "./lesson";

export class Class {
    title: string; 
    lessons: Lesson[]; 

    constructor(title: string) {
        this.title = title; 
        this.lessons = [];
    }

    addField(field: string, value: string) {
        const type: string = LESSON_TYPES[field];
        this.lessons.push(new Lesson(type, value))
    }
}
