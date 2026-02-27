import type { RequestOption } from '@modern-js/runtime/server';
import { brands } from '@shared/constant';

import { readRemoteExcel } from '../utils/excel';

export async function post(context: RequestOption<never, { brand: string }>) {
  const { brand } = context.data;

  if (!brands.find(item => item.id === brand)) {
    return {
      code: -1,
      message: '品牌参数不正确',
      data: null,
    };
  }

  const databaseURL = `https://${process.env.SERVICE_DOMAIN}/OTA/${brand}OTA.xlsx`;
  const result = await readRemoteExcel(databaseURL);

  return {
    code: 0,
    message: 'ok',
    data: {
      result,
    },
  };
}
