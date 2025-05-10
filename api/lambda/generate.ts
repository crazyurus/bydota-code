import type { RequestOption } from '@modern-js/runtime/server';
import { EncryptUtil } from '../utils/encrypt';

export async function post(
  context: RequestOption<never, { mcu: number; imei: string }>,
) {
  const { mcu, imei } = context.data;

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
}
