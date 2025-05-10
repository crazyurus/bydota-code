import crypto from 'crypto';
import { Buffer } from 'buffer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

const HOUR_RANGE = [-3, -2, -1, 0, 1, 2, 3];

export class EncryptUtil {
  private imei: string;

  private iv: string;

  private date: Date;

  constructor(imei: string, iv: string) {
    this.imei = imei;
    this.iv = iv;
    this.date = dayjs().toDate();
  }

  encrypt(): string[] {
    const keys = this.getAESKeys();
    const values = this.getAESValues();

    return keys
      .map((key, i) =>
        key && values[i] ? this.aesEncrypt(key, values[i]) : null,
      )
      .filter(Boolean)
      .map(encrypted => encrypted?.toString('base64') || '');
  }

  aesEncrypt(key: string, value: string): Buffer {
    const keyBuffer = Buffer.from(
      key.padEnd(16, '\0').substring(0, 16),
      'utf8',
    );
    const ivBuffer = Buffer.from(this.iv, 'utf8');
    const cipher = crypto.createCipheriv(
      'aes-128-cbc' as any,
      keyBuffer as any,
      ivBuffer as any,
    );
    const firstChunk = cipher.update(value, 'utf8');
    const secondChunk = cipher.final();

    return Buffer.concat([firstChunk as any, secondChunk]);
  }

  getAESKeys(): string[] {
    return HOUR_RANGE.map(hourOffset => {
      const calDate = dayjs().add(hourOffset, 'hour');

      return this.imei + calDate.format('MMDDYYYYHH');
    });
  }

  getAESValues(): string[] {
    return HOUR_RANGE.map(hourOffset => {
      const calDate = dayjs(this.date).add(hourOffset, 'hour');
      return `OTA${calDate.format('YYYYDDMMHH')}${this.imei}`;
    });
  }

  secondEncrypt(text: string, index: number): string {
    const calDate = dayjs(this.date).add(HOUR_RANGE[index], 'hour');
    const timeString = calDate.format('MMDDHH');

    const ints = [...this.imei].map(
      (x, i) => parseInt(x, 10) + parseInt(timeString[i], 10),
    );
    const sb1 = [...this.imei].map(x => text[parseInt(x, 10)]).join('');
    const sb2 = ints.map(x => text[x]).join('');

    const xored = this.xor(Buffer.from(sb1, 'utf8'), Buffer.from(sb2, 'utf8'));
    const encoded = xored.toString('base64');

    if (encoded && encoded.length >= 6) {
      if (/^[a-zA-Z0-9]+$/.test(encoded)) {
        return encoded.substring(0, 6).toUpperCase();
      } else {
        const result = encoded.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);
        return result.padEnd(6, 'B').toUpperCase();
      }
    }

    return '';
  }

  xor(bytes1: Buffer, bytes2: Buffer): Buffer {
    // eslint-disable-next-line no-bitwise
    return Buffer.from(bytes1.map((byte, i) => byte ^ bytes2[i]));
  }

  generatePassword(): string[] {
    const encrypted = this.encrypt();

    return encrypted.map(this.secondEncrypt.bind(this));
  }
}
