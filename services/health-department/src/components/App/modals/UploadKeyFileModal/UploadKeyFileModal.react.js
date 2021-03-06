import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { notification, Button } from 'antd';

import { base64ToHex, EC_KEYPAIR_FROM_PRIVATE_KEY } from '@lucaapp/crypto';

import { useModal } from 'components/hooks/useModal';

import { parsePrivateKeyFile } from 'utils/privateKey';
import { getPrivateKeySecret } from 'network/api';

import { storeHealthDepartmentPrivateKeys } from 'utils/cryptoKeyOperations';
import {
  UploadButton,
  HiddenUpload,
  Info,
  ButtonRow,
} from './UploadKeyFileModal.styled';

export const UploadKeyFileModal = ({ keysData, onFinish }) => {
  const intl = useIntl();
  const reader = useRef(new FileReader());
  const [, closeModal] = useModal();
  const { isLoading, data: privateKeySecret } = useQuery(
    'privateKeySecret',
    () => getPrivateKeySecret()
  );

  const loadKeyFile = string => {
    try {
      const keys = JSON.parse(string);

      if (
        base64ToHex(keysData.publicHDEKP) !==
        EC_KEYPAIR_FROM_PRIVATE_KEY(keys.hdekp).publicKey
      ) {
        throw new Error('invalid key');
      }
      storeHealthDepartmentPrivateKeys(keys.hdekp, keys.hdskp);
      closeModal();
      onFinish();
    } catch {
      notification.error({
        message: intl.formatMessage({ id: 'login.keyFile.error.title' }),
        description: intl.formatMessage({
          id: 'login.keyFile.error.description',
        }),
      });
    }
  };

  const onFile = onFileUploadEvent => {
    const keyFile = onFileUploadEvent.target.files[0];

    if (!keyFile) {
      return;
    }

    reader.current.addEventListener('load', addEventListenerEvent => {
      loadKeyFile(
        parsePrivateKeyFile(
          addEventListenerEvent.target.result,
          privateKeySecret
        )
      );
    });

    reader.current.readAsText(keyFile);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Info>
        {intl.formatMessage({
          id: 'modal.uploadKeyModal.info',
        })}
      </Info>
      <HiddenUpload type="file" onChange={onFile} accept=".luca" />
      <ButtonRow>
        <Button
          style={{
            backgroundColor: '#4e6180',
            padding: '0 40px',
            color: 'white',
          }}
        >
          <UploadButton href="#">
            {intl.formatMessage({
              id: 'modal.uploadKeyModal.button',
            })}
          </UploadButton>
        </Button>
      </ButtonRow>
    </>
  );
};
