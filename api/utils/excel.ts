import * as XLSX from 'xlsx';
import axios from 'axios';
import { Buffer } from 'node:buffer';

export async function readRemoteExcel(url: string): Promise<unknown[]> {
  const response = await axios.get(url, {
    headers: {
      referer: `https://${process.env.SERVICE_DOMAIN}/OTA/BYD.html`,
    },
    responseType: 'arraybuffer',
  });
  const buffer = Buffer.from(response.data);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return jsonData;
}
