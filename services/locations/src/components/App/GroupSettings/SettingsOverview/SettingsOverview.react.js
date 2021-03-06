import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Button, notification } from 'antd';

import { updateGroup } from 'network/api';

import {
  buttonStyles,
  Overview,
  Heading,
  ButtonWrapper,
  AddressRow,
  AddressHeader,
  Address,
} from './SettingsOverview.styled';

export const SettingsOverview = ({ group, refetch }) => {
  const intl = useIntl();
  const formReference = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const baseLocation = group.locations.find(location => !location.name);

  const onFinish = values => {
    updateGroup({ groupId: group.groupId, data: values })
      .then(() => {
        refetch();
        notification.success({
          message: intl.formatMessage({
            id: 'notification.updateGroup.success',
          }),
        });
        setIsButtonDisabled(true);
      })
      .catch(() => {
        notification.error({
          message: intl.formatMessage({
            id: 'notification.updateGroup.error',
          }),
        });
      });
  };

  const submitForm = () => {
    formReference.current.submit();
  };

  const onValueUpdate = (_, values) => {
    if (!values.name) {
      setIsButtonDisabled(true);
      return;
    }

    if (values.name !== group.name || values.phone !== baseLocation.phone) {
      setIsButtonDisabled(false);
      return;
    }
    setIsButtonDisabled(true);
  };

  return (
    <Overview>
      <Heading>{intl.formatMessage({ id: 'profile.overview' })}</Heading>
      <Form
        onFinish={onFinish}
        style={{ maxWidth: 350 }}
        ref={formReference}
        initialValues={{
          name: group.name,
          phone: baseLocation.phone,
        }}
        onValuesChange={onValueUpdate}
      >
        <Form.Item
          name="name"
          colon={false}
          label={intl.formatMessage({
            id: 'settings.group.name',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'error.groupName',
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          colon={false}
          label={intl.formatMessage({
            id: 'settings.location.phone',
          })}
          name="phone"
        >
          <Input />
        </Form.Item>
      </Form>
      <Address>
        <AddressHeader>
          {intl.formatMessage({ id: 'settings.location.address' })}
        </AddressHeader>
        <AddressRow>{`${baseLocation.streetName} ${baseLocation.streetNr}`}</AddressRow>
        <AddressRow>{`${baseLocation.zipCode} ${baseLocation.city}`}</AddressRow>
      </Address>
      <ButtonWrapper>
        <Button
          data-cy="editGroupName"
          onClick={submitForm}
          style={buttonStyles}
          disabled={isButtonDisabled}
        >
          {intl.formatMessage({ id: 'profile.overview.submit' })}
        </Button>
      </ButtonWrapper>
    </Overview>
  );
};
