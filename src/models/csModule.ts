import { CS_MOD_API_KEY } from "../utils/constants";

export class CSModule {
    code: string;
    name: string; 
    credits: string; 
    semesterData: (CSSemesterData | null)[];

    constructor(data: any) {
        this.code = data[CS_MOD_API_KEY.CODE];
        this.name = data[CS_MOD_API_KEY.NAME];
        this.credits = data[CS_MOD_API_KEY.CREDITS];
        this.semesterData = CSModule.initSemesterDatas(data);
    }

    static initSemesterDatas(data: any): (CSSemesterData | null)[] {
        const semestersDatas = [];
        semestersDatas[0] = CSSemesterData.initSemesterData(CS_MOD_API_KEY.SEMESTER_ONE, data[CS_MOD_API_KEY.SEMESTERS][CS_MOD_API_KEY.SEMESTER_ONE]);
        semestersDatas[1] = CSSemesterData.initSemesterData(CS_MOD_API_KEY.SEMESTER_TWO, data[CS_MOD_API_KEY.SEMESTERS][CS_MOD_API_KEY.SEMESTER_TWO]);

        return semestersDatas;
    }

    public convertSemesterDataToText(semesterNumber: number): string | null {
        const result: string[] = [];

        switch(semesterNumber) {
            case 1:
                if (this.semesterData[0] == null ) return null; 
                result.push("**Semester 1**:");
                result.push(this.semesterData[0].toText());
                break;
            case 2: 
                if (this.semesterData[1] == null ) return null; 
                result.push("**Semester 2**:");
                result.push(this.semesterData[1].toText());
                break;
        }

        return result.join("\n"); 
    }

    public toText(semesterNumber: number): string | null {
        const semesterDatas = this.convertSemesterDataToText(semesterNumber);
        if (semesterDatas == null) return null; 

        const code = `**Module Code:** ${this.code}`;
        const name = `**Module Name:** ${this.name}`;
        const credits = `**Modular Credits:** ${this.credits}\n`;
       

        return [code, name, credits, semesterDatas].join("\n");
    }
}

class CSSemesterData {
    semesterNumber: string; 
    groups: string[];
    exams: string[];
    lecturers: string[];

    constructor(semesterNumber: string, data: any) {
        this.semesterNumber = semesterNumber;
        this.groups = data[CS_MOD_API_KEY.SEMESTER_GROUPS];
        this.exams = data[CS_MOD_API_KEY.SEMESTER_EXAMS];
        this.lecturers = data[CS_MOD_API_KEY.SEMESTER_LECTURERS];
    }

    static initSemesterData(semesterNumber: string, data: any): CSSemesterData | null {
        if (data == null) {
            return null;
        }

        return new CSSemesterData(semesterNumber, data);
    }

    public toText() {
        const exams = "**Exam**:\n" +  (this.exams.length == 0 ? "N/A" : this.exams.join("\n"));
        const lecturers = "**Lecturers**:\n" +  (this.lecturers.length == 0 ? "N/A" : this.lecturers.join("\n"));
        const groups = "**Groups**:\n" +  (this.groups.length == 0 ? "N/A" : this.groups.join("\n"));
        return [exams, lecturers, groups].join("\n") + "\n";
    }
}