import { Api, Data } from '@modern-js/plugin-bff/server';
import z from 'zod';

import { EncryptUtil } from '../utils/encrypt';

export const post = Api(
  Data(
    z.object({
      mcu: z.number(),
      imei: z.string(),
    }),
  ),
  async ({ data }) => {
    const { mcu, imei } = data;

    if (!/^\d{2}$/.test(mcu.toString())) {
      return {
        code: -1,
        message: '控制器版本格式不正确',
        data: null,
      };
    }

    if (!/^\d{6}$/.test(imei)) {
      return {
        code: -1,
        message: 'IMEI 后 6 位格式不正确',
        data: null,
      };
    }

    if (mcu === 26) {
      return {
        code: 0,
        message: 'ok',
        data: {
          result: ['230629'],
        },
      };
    }

    const iv = process.env.SECRET_KEY || '';
    const generator = new EncryptUtil(imei, iv);

    return {
      code: 0,
      message: 'ok',
      data: {
        result: generator.generatePassword(),
      },
    };
  },
);
