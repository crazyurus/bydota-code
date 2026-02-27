import { Form, Table } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { useState, useRef, type ComponentProps } from 'react';
import { uniq } from 'lodash-es';

import { post as getRecord } from '@api/record';
import { brands } from '@shared/constant';

import styles from './page.module.scss';

type RadioChangeEvent = Parameters<
  NonNullable<ComponentProps<typeof Form.RadioGroup>['onChange']>
>[0];

const columns = [
  {
    title: '车型',
    dataIndex: '车型',
  },
  {
    title: '车辆版本号',
    dataIndex: '车辆版本号',
  },
  {
    title: '推送时间',
    dataIndex: '推送时间',
  },
];

function RecordPage(): JSX.Element {
  const { t } = useTranslation();
  const formRef = useRef<Form>(null);
  const [result, setResult] = useState<Record<string, any>[]>([]);

  const handleRecord = async (e: RadioChangeEvent) => {
    formRef.current?.formApi.reset();

    const result = await getRecord({
      data: {
        brand: e.target.value,
      },
    });

    if (result.data) {
      setResult(result.data.result as Record<string, any>[]);
    }
  };

  return (
    <Form ref={formRef}>
      {({ formState }) => (
        <>
          <Form.RadioGroup
            field="brand"
            label={t('form.field.brand')}
            type="button"
            rules={[
              {
                required: true,
              },
            ]}
            onChange={handleRecord}
          >
            optionList=
            {brands.map(item => (
              <Form.Radio key={item.id} value={item.id}>
                {item.name}
              </Form.Radio>
            ))}
          </Form.RadioGroup>
          <Form.Select
            className={styles.select}
            field="series"
            label={t('form.field.series')}
            placeholder="请选择车系"
            optionList={uniq(result.map(item => item['型号'])).map(item => ({
              label: item,
              value: item,
            }))}
            emptyContent="请先选择子品牌"
            showClear
            onChange={() => formRef.current?.formApi.reset(['model'])}
          />
          <Form.Select
            className={styles.select}
            field="model"
            label={t('form.field.model')}
            placeholder="请选择型号"
            optionList={uniq(
              result
                .filter(item => item['型号'] === formState.values.series)
                .map(item => item['车系']),
            ).map(item => ({
              label: item,
              value: item,
            }))}
            emptyContent="请先选择车系"
            showClear
          />
          <div className={styles.table}>
            {formState.values.model ? (
              <Table
                columns={columns}
                dataSource={result.filter(
                  item => item['车系'] === formState.values.model,
                )}
                pagination={false}
              />
            ) : null}
          </div>
        </>
      )}
    </Form>
  );
}

export default RecordPage;
