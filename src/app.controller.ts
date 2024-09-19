import { Controller, Get, Query } from "@nestjs/common";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

@Controller()
export class AppController {
  @Get("convert-time")
  convertTime(@Query("runAt") runAt: string): Date {
    const timeZone = "America/Mexico_City"; // Ajustar a GMT-6

    // Obtener la fecha y hora actual en la zona horaria local
    const nowInTimeZone = utcToZonedTime(new Date(), timeZone);

    // Parsear el parámetro runAt
    const [hour, minute] = runAt.split(":").map(Number);
    const targetTimeInTimeZone = new Date(nowInTimeZone);
    targetTimeInTimeZone.setHours(hour, minute, 0, 0);

    // Si la hora ya pasó hoy, programar para el siguiente día
    if (targetTimeInTimeZone < nowInTimeZone) {
      targetTimeInTimeZone.setDate(targetTimeInTimeZone.getDate() + 1);
    }

    // Convertir el tiempo objetivo a UTC
    const targetTimeInUtc = zonedTimeToUtc(targetTimeInTimeZone, timeZone);

    // Registrar la información
    console.log(
      `Current time in GMT-6: ${format(
        nowInTimeZone,
        "yyyy-MM-dd HH:mm:ss"
      )} UTC: ${format(new Date(), "yyyy-MM-dd HH:mm:ss")}\n` +
        `Target time in GMT-6: ${format(
          targetTimeInTimeZone,
          "yyyy-MM-dd HH:mm:ss"
        )} UTC: ${format(targetTimeInUtc, "yyyy-MM-dd HH:mm:ss")}`
    );

    // Devolver la fecha objetivo en UTC
    return targetTimeInUtc;
  }
}
