import { useIntl } from 'react-intl';
import React from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';

import QR_PRINT_LOGO from 'assets/qrPrintLogo.svg';
import { QR_PRINT_LINK } from 'constants/links';
import {
  QrPrintWrapper,
  LinkWrapper,
  QrPrintLogo,
  QrPrintText,
  PrintLink,
  QrPrintStep,
} from './QrPrint.styled';

export const QrPrint = () => {
  const intl = useIntl();

  return (
    <QrPrintWrapper>
      <QrPrintLogo src={QR_PRINT_LOGO} />
      <QrPrintText>{intl.formatMessage({ id: 'qrPrint.info' })}</QrPrintText>
      <QrPrintStep>{intl.formatMessage({ id: 'qrPrint.step1' })}</QrPrintStep>
      <QrPrintStep>
        {intl.formatMessage(
          { id: 'qrPrint.step2' },
          {
            link: (
              <PrintLink>
                {intl.formatMessage({ id: 'qrPrint.link' })}
              </PrintLink>
            ),
          }
        )}
      </QrPrintStep>
      <QrPrintStep>{intl.formatMessage({ id: 'qrPrint.step3' })}</QrPrintStep>
      <LinkWrapper
        href={QR_PRINT_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PrintLink>{intl.formatMessage({ id: 'qrPrint.link' })}</PrintLink>
        <ArrowRightOutlined style={{ margin: 'auto 0 auto 16px' }} />
      </LinkWrapper>
    </QrPrintWrapper>
  );
};
