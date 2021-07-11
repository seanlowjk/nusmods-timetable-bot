import { CSModule } from "../models/csModule";
import { Config } from "../utils/constants";

export function fetchCSModule(message: any, args: string[]) {
    const moduleCode = args[1]; 

    fetch(`${Config.SCRAPER_URL}${moduleCode}`).then((res: any) => {
      res.json().then((data: any) => {
        if (data["message"] !== undefined) {
            message.channel.send(
                data["message"]
            )
        } else {
            const csModule = new CSModule(data)
            const semesterOneData = csModule.toText(1);
            const semesterTwoData = csModule.toText(2);
        
            if (semesterOneData != null && semesterTwoData != null) {
                message.channel.send(
                    semesterOneData
                );

                message.channel.send(
                    csModule.convertSemesterDataToText(2)
                );
            } else if (semesterOneData == null) {
                message.channel.send(
                    csModule.toText(2)
                );
            } else if (semesterTwoData == null) {
                message.channel.send(
                    csModule.toText(1)
                );
            }
        }
      })
    });
}