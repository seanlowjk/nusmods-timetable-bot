import { fetchTimetable } from "./fetch-timetable";

export function execute(message: any, args: string[] | undefined): any {
    if (args === undefined) {
        return; 
    }

    const command = args[0]; 
    switch(command) {
        case 'fetch': 
            fetchTimetable(message, args); 
            break; 
        default:
            break; 
    }
}

