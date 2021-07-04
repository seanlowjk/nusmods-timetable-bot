import { Converter } from "../models/converter";
import { Config } from "../utils/constants";

export function fetchTimetable(message: any, args: string[]) {
    const converter = new Converter();
    converter.parseUrlData(args[1]);

    const url = Config.EXPORT_URL + encodeURIComponent(converter.getJSONString()) + encodeURI("&&pixelRatio=1.25");

    fetch(url).then((res: { body: any }) => {
      message.channel.send(
        `Here is your timetable ${message.author.toString()}:`, 
      {
        files: [res.body],
      });
    });
}