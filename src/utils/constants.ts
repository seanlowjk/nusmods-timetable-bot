const config = require("../../config.json");

// Lesson Types 
export const LESSON_TYPES: { [field: string]: string } = {
    'DLEC': 'Design Lecture',
    'LAB': 'Laboratory', 
    'LEC': 'Lecture', 
    'PLEC': 'Packaged Lecture', 
    'PTUT': 'Packaged Tutorial', 
    'REC': 'Recitation', 
    'SEC': 'Sectional Teaching', 
    'SEM': 'Seminar-Style Module Class', 
    'TUT': 'Tutorial', 
    'TUT2': 'Tutorial Type 2', 
    'TUT3': 'Tutorial Type 3', 
    'WS': 'Workshop'
};

// Configs for Timetable Image 
export const SEMESTER_TYPES = {
    SEMESTER_ONE: 1, 
    SEMESTER_TWO: 2, 
    SPECIAL_TERM_ONE: 3, 
    SPECIAL_TERM_TWO: 4, 
};

export const TIMETABLE_ORIENTATION = {
    HORIZONTAL: "HORIZONTAL", 
    VERTICAL: "VERTICAL"
};

export const THEME_MODE = {
    DARK: "DARK", 
    LIGHT: "LIGHT", 
}

export const THEME_COLOR = {
    ASHES: "ashes", 
    CHALK: "chalk", 
    EIGHTIES: "eighties", 
    GOOGLE: "google", 
    MOCHA: "mocha", 
    MONOKAI: "monokai", 
    OCEAN: "ocean", 
    OCEANIC_NEXT: "oceanic-next", 
    PARASIO: "parasio", 
    RAILSCASTS: "railscasts", 
    TOMORROW: "tomorrow", 
    TWILIGHT: "twilight"
};

export const CS_MOD_API_KEY = {
    CODE: "module_code", 
    NAME: "module_name", 
    CREDITS: "modular_credits", 
    SEMESTERS: "semesters", 
    SEMESTER_ONE: "1", 
    SEMESTER_TWO: "2", 
    SEMESTER_GROUPS: "groups", 
    SEMESTER_EXAMS: "exams", 
    SEMESTER_LECTURERS: "lecturers"
}; 

// Configurations for Application 
export const Config = config; 
