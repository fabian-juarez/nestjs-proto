import { Controller, Get, Query } from "@nestjs/common";
import * as moment from "moment-timezone";

@Controller()
export class AppController {
  @Get("convert-time")
  convertTime(@Query("runAt") runAt: string) {
    // Hora actual del servidor en UTC
    const currentUtcTime = moment.utc();

    // Hora actual en GMT-6 (América/México_City)
    const currentGmt6Time = moment.tz("America/Mexico_City");

    // Convertir la hora ingresada (runAt) en GMT-6
    const [hours, minutes] = runAt.split(":").map(Number);
    let scheduledTimeGmt6 = moment.tz("America/Mexico_City").set({
      hour: hours,
      minute: minutes,
      second: 0,
      millisecond: 0,
    });

    // Si el tiempo ya ha pasado hoy en GMT-6, programar para mañana
    if (scheduledTimeGmt6.isBefore(currentGmt6Time)) {
      scheduledTimeGmt6 = scheduledTimeGmt6.add(1, "day");
    }

    // Convertir el tiempo programado a UTC
    const scheduledTimeUtc = scheduledTimeGmt6.clone().utc();

    // Devolver la información en ambos husos horarios
    return {
      currentTime: {
        utc: currentUtcTime.format("YYYY-MM-DD HH:mm:ss"),
        gmt6: currentGmt6Time.format("YYYY-MM-DD HH:mm:ss"),
      },
      scheduledTime: {
        utc: scheduledTimeUtc.format("YYYY-MM-DD HH:mm:ss"),
        gmt6: scheduledTimeGmt6.format("YYYY-MM-DD HH:mm:ss"),
      },
    };
  }
}
