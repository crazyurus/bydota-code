import { Button, Form, Modal, Typography, Toast } from '@douyinfe/semi-ui';

import { post as generate } from '@api/generate';
import { useLoading } from '../../hooks';

import styles from './page.module.scss';

const mcuVersions = [13, 15, 16, 17, 18, 21, 23, 26];

function IndexPage(): JSX.Element {
  const [handleGenerate, loading] = useLoading(async values => {
    const { code, message, data } = await generate({
      data: values,
    });

    if (code === 0 && data) {
      Modal.success({
        title: '验证码查询成功',
        content: (
          <pre>
            {`以下验证码请任选一个，3 小时内有效：\n${data.result.join('\n')}`}
          </pre>
        ),
        cancelButtonProps: {
          style: {
            display: 'none',
          },
        },
      });
    } else {
      Toast.error(message);
    }
  });

  return (
    <div className={styles.container}>
      <Form
        initValues={{ mcu: 13 }}
        onSubmit={values => handleGenerate(values)}
      >
        <Form.RadioGroup
          field="mcu"
          label="控制器版本"
          extraText="可在多媒体版本对话框中查看"
          type="button"
          rules={[
            {
              required: true,
              message: '请选择控制器版本',
            },
          ]}
        >
          optionList=
          {mcuVersions.map(item => (
            <Form.Radio key={item} value={item}>
              {item}
            </Form.Radio>
          ))}
        </Form.RadioGroup>
        <Form.Input
          field="imei"
          label="IMEI 后 6 位"
          type="tel"
          placeholder="可在多媒体版本对话框中查看，例如：123456"
          extraText={
            <>
              如遇到扫描二维码，请使用 BYDOTA 二维码助手，下载链接：{' '}
              <Typography.Text
                link={{
                  href: 'https://pan.quark.cn/s/f6cc8f418d62',
                  target: '_blank',
                }}
              >
                https://pan.quark.cn/s/f6cc8f418d62
              </Typography.Text>
            </>
          }
          maxLength={6}
          required
          rules={[
            {
              pattern: /^\d{6}$/,
              message: '请输入正确的 IMEI 后 6 位',
            },
          ]}
        />
        <div className="mt-4">
          <Button
            htmlType="submit"
            loading={loading}
            type="primary"
            theme="solid"
          >
            查询
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default IndexPage;
