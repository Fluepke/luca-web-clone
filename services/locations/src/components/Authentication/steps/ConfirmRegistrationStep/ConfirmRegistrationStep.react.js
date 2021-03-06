import React from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Button } from 'antd';

import {
  backButtonStyles,
  nextButtonStyles,
  CardTitle,
  CardSubTitle,
  ButtonWrapper,
  Step,
} from 'components/Authentication/Authentication.styled';

export const ConfirmRegistrationStep = ({
  email,
  setEmail,
  next,
  back,
  navigation,
}) => {
  const intl = useIntl();

  const onFinish = values => {
    setEmail(values.email);
    next();
  };

  return (
    <>
      <Step>{navigation}</Step>
      <CardTitle data-cy="confirmRegister">
        {intl.formatMessage({
          id: 'authentication.confirmRegister.title',
        })}
      </CardTitle>
      <CardSubTitle>
        {intl.formatMessage({
          id: 'authentication.confirmRegister.subTitle',
        })}
      </CardSubTitle>
      <Form onFinish={onFinish} initialValues={{ email }}>
        <Form.Item
          colon={false}
          label={intl.formatMessage({
            id: 'registration.form.email',
          })}
          name="email"
          rules={[
            {
              type: 'email',
              message: intl.formatMessage({
                id: 'error.email',
              }),
            },
            {
              required: true,
              message: intl.formatMessage({
                id: 'error.email',
              }),
            },
          ]}
        >
          <Input
            id="emailDisabled"
            disabled
            style={{
              border: '1px solid #696969',
              backgroundColor: 'transparent',
            }}
          />
        </Form.Item>

        <ButtonWrapper multipleButtons>
          <Button style={backButtonStyles} onClick={back}>
            {intl.formatMessage({
              id: 'authentication.form.button.back',
            })}
          </Button>
          <Button style={nextButtonStyles} htmlType="submit">
            {intl.formatMessage({
              id: 'authentication.form.button.next',
            })}
          </Button>
        </ButtonWrapper>
      </Form>
    </>
  );
};
