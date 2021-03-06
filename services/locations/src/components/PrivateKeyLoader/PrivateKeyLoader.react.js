import React, { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { notification, Progress, Spin, Upload } from 'antd';
import { base64ToHex, EC_KEYPAIR_FROM_PRIVATE_KEY } from '@lucaapp/crypto';

import { getPrivateKeySecret } from 'network/api';
import { parsePrivateKeyFile, usePrivateKey } from 'utils/privateKey';

import {
  CustomButton,
  FinishButtonWrapper,
  InfoBlock,
  RequestContent,
  UploadButton,
  UploadMessage,
  UploadProgress,
} from './PrivateKeyLoader.styled';
import { uploadMessages } from './PrivateKeyLoader.helper';

export const PrivateKeyLoader = ({
  publicKey,
  onSuccess = () => {},
  onError = () => {},
  infoTextId = 'privateKey.modal.info',
  footerItem = null,
}) => {
  const intl = useIntl();
  const [progressPercent, setProgressPercent] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadMessageId, setUploadMessageId] = useState(
    uploadMessages.initial
  );

  const uploadException = 'exception';

  const { data: privateKeySecret, isLoading } = useQuery(
    'privateKeySecret',
    getPrivateKeySecret,
    {
      retry: false,
      onError: error => {
        notification.error(
          intl.formatMessage({ id: 'privateKey.modal.secret.error' })
        );
        onError(error);
      },
    }
  );
  const [existingPrivateKey, setPrivateKey] = usePrivateKey(privateKeySecret);

  const processPrivateKey = (privateKey, fileData) => {
    setProgressPercent(100);
    const keyPair = EC_KEYPAIR_FROM_PRIVATE_KEY(privateKey);
    const isKeyCorrect = keyPair?.publicKey === base64ToHex(publicKey);

    if (isKeyCorrect) {
      setUploadMessageId(uploadMessages.done);
      setUploadStatus('');
      setPrivateKey(fileData);
      onSuccess(privateKey);
    } else {
      setUploadStatus(uploadException);
      setUploadMessageId(uploadMessages.error);

      notification.error({
        message: intl.formatMessage({
          id: 'shareData.privkey.error.description',
        }),
      });
    }
  };

  const onFile = ({ file }) => {
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', event => {
      const stringValue = event.target.result;
      const privateKey = parsePrivateKeyFile(stringValue, privateKeySecret);
      processPrivateKey(privateKey, stringValue);
    });

    reader.readAsText(file);
  };

  const reset = () => {
    setProgressPercent(0);
    setUploadStatus('');
    setUploadMessageId(uploadMessages.initial);
  };

  useEffect(() => {
    if (existingPrivateKey) {
      onSuccess(existingPrivateKey);
    }
  }, [existingPrivateKey, onSuccess]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <RequestContent>
        <InfoBlock>{intl.formatMessage({ id: infoTextId })}</InfoBlock>
        <Upload
          type="file"
          customRequest={onFile}
          accept=".luca"
          showUploadList={false}
        >
          <UploadMessage>
            {intl.formatMessage({ id: uploadMessageId })}
          </UploadMessage>
          {progressPercent <= 0 && (
            <UploadButton>
              {intl.formatMessage({ id: 'shareData.privateKey.btnLabel' })}
            </UploadButton>
          )}
          {progressPercent > 0 && (
            <UploadProgress>
              <Progress
                percent={progressPercent}
                status={uploadStatus}
                trailColor="#fff"
              />
            </UploadProgress>
          )}
        </Upload>
      </RequestContent>
      <FinishButtonWrapper
        align={
          uploadStatus !== uploadException ? 'flex-start' : 'space-between'
        }
      >
        {footerItem}
        <CustomButton
          onClick={reset}
          $bgColor="#f3f5f7"
          hidden={uploadStatus !== uploadException}
        >
          {intl.formatMessage({ id: 'shareData.tryAgain' })}
        </CustomButton>
      </FinishButtonWrapper>
    </>
  );
};
