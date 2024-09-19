import { Controller, Get, Query } from "@nestjs/common";
import { format, utcToZonedTime } from "date-fns-tz";

@Controller()
export class AppController {
  @Get("convert-time")
  convertTime(@Query("runAt") runAt: string): string {
    const timeZone = "America/Mexico_City"; // Ajustar a GMT-6

    // Obtener la fecha y hora actual en GMT-6
    const nowInGmtMinus6 = utcToZonedTime(new Date(), timeZone);

    // Parsear el parámetro runAt
    const [hour, minute] = runAt.split(":").map(Number);
    const targetTimeInGmtMinus6 = new Date(nowInGmtMinus6);
    targetTimeInGmtMinus6.setHours(hour, minute, 0, 0);

    // Si la hora ya pasó hoy, programar para el siguiente día
    if (targetTimeInGmtMinus6 < nowInGmtMinus6) {
      targetTimeInGmtMinus6.setDate(targetTimeInGmtMinus6.getDate() + 1);
    }

    // Convertir el tiempo objetivo a UTC
    const targetTimeInUtc = utcToZonedTime(targetTimeInGmtMinus6, timeZone);

    // Formatear las fechas
    return (
      `Current time in GMT-6: ${format(
        nowInGmtMinus6,
        "yyyy-MM-dd HH:mm:ss"
      )} UTC: ${format(new Date(), "yyyy-MM-dd HH:mm:ss")}\n` +
      `Target time in GMT-6: ${format(
        targetTimeInGmtMinus6,
        "yyyy-MM-dd HH:mm:ss"
      )} UTC: ${format(targetTimeInUtc, "yyyy-MM-dd HH:mm:ss")}`
    );
  }
}
