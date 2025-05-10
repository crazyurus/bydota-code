import type { RequestOption } from '@modern-js/runtime/server';

export async function post(
  context: RequestOption<never, { phone: string; vin: string }>,
) {
  const { phone, vin } = context.data;

  if (!/^1\d{10}$/.test(phone)) {
    return {
      code: -1,
      message: '本机号码格式不正确',
      data: null,
    };
  }

  if (!/^[a-zA-Z0-9]{6}$/.test(vin)) {
    return {
      code: -1,
      message: '车架号后 6 位格式不正确',
      data: null,
    };
  }

  const response = await fetch(process.env.BYD_MAP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      localNum: phone,
    }),
  });
  const { code, success, message, result } = await response.json();

  if (success) {
    if (
      result.vin === null ||
      result.vin.slice(-6).toLowerCase() === vin.toLowerCase()
    ) {
      return {
        code: 0,
        message: result.state,
        data: {
          activationTime: result.activationTime,
          activateCount: result.numOfSuccessfulActivation,
        },
      };
    } else {
      return {
        code: -2,
        message: '车架号后 6 位与本机号码不匹配',
        data: null,
      };
    }
  }

  return {
    code,
    message,
    data: null,
  };
}
