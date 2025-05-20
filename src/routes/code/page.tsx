import { Button, Form, Modal, Typography, Toast } from '@douyinfe/semi-ui';
import { useSearchParams } from '@modern-js/runtime/router';
import { useTranslation } from 'react-i18next';

import { post as generate } from '@api/generate';
import { useLoading } from '../../hooks';

import styles from './page.module.scss';

const mcuVersions = [13, 15, 16, 17, 18, 21, 23, 26, 31, 34];

function IndexPage(): JSX.Element {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const imei = searchParams.get('imei');
  const [handleGenerate, loading] = useLoading(async values => {
    const { code, message, data } = await generate({
      data: values,
    });

    if (code === 0 && data) {
      Modal.success({
        title: t('modal.title'),
        content: (
          <pre>{`${t('modal.content')}\n${data.result.join('\n')}`}</pre>
        ),
        okText: t('modal.ok.text'),
        onOk() {
          navigator.clipboard.writeText(data.result[0]);

          Toast.success(t('modal.copy.success'));
        },
        cancelText: t('modal.cancel.text'),
      });
    } else {
      Toast.error(message);
    }
  });

  return (
    <div className={styles.container}>
      <Form
        initValues={{
          mcu: 13,
          imei: imei ? imei.slice(-6) : '',
        }}
        onSubmit={values => handleGenerate(values)}
      >
        <Form.RadioGroup
          field="mcu"
          label={t('form.field.mcu')}
          extraText={t('form.field.mcu.placeholder')}
          type="button"
          rules={[
            {
              required: true,
              message: t('form.field.mcu.required'),
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
          label={t('form.field.imei')}
          type="tel"
          placeholder={t('form.field.mcu.placeholder')}
          extraText={
            <>
              {t('tips')}{' '}
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
              message: t('form.field.imei.required'),
            },
          ]}
        />
        <div className={styles.footer}>
          <Button
            htmlType="submit"
            loading={loading}
            type="primary"
            theme="solid"
          >
            {t('form.button.submit')}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default IndexPage;
