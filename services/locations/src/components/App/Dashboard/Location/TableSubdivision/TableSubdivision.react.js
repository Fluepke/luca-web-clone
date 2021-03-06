import React from 'react';
import { useIntl } from 'react-intl';

import { Form, InputNumber } from 'antd';
import { useQueryClient } from 'react-query';

import { updateLocation } from 'network/api';

import { Switch } from '../../Switch';
import { CardSection, CardSectionTitle, LocationCard } from '../LocationCard';
import { StyledSwitchContainer } from '../GenerateQRCodes/GenerateQRCodes.styled';

export function TableSubdivision({ location }) {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const isTableSubdivisionActive = location.tableCount > 0;

  const refetch = () => {
    queryClient.invalidateQueries(`location/${location.uuid}`);
  };

  return (
    <LocationCard
      isCollapse
      title={intl.formatMessage({ id: 'settings.location.tables.headline' })}
      testId="tableSubdivision"
    >
      <CardSection isLast>
        <CardSectionTitle>
          {intl.formatMessage({
            id: 'settings.location.tables.description',
          })}
          <StyledSwitchContainer>
            <Switch
              data-cy="activateTableSubdivision"
              checked={isTableSubdivisionActive}
              onChange={() => {
                updateLocation({
                  locationId: location.uuid,
                  data: { tableCount: isTableSubdivisionActive ? null : 10 },
                })
                  .then(refetch)
                  .catch(refetch);
              }}
            />
          </StyledSwitchContainer>
        </CardSectionTitle>
        {isTableSubdivisionActive && (
          <>
            <Form
              initialValues={location}
              onValuesChange={({ tableCount }) => {
                if (tableCount && `${tableCount}`.match(/^\d+$/)) {
                  updateLocation({
                    locationId: location.uuid,
                    // eslint-disable-next-line radix
                    data: { tableCount: parseInt(tableCount) },
                  })
                    .then(refetch)
                    .catch(refetch);
                }
              }}
              style={{ width: '100%', marginTop: '16px' }}
            >
              <Form.Item
                name="tableCount"
                label={intl.formatMessage({
                  id: 'settings.location.tables.input',
                })}
                rules={[
                  {
                    type: 'number',
                    required: true,
                    message: intl.formatMessage({
                      id: 'error.tableCount',
                    }),
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} min={1} />
              </Form.Item>
            </Form>
          </>
        )}
      </CardSection>
    </LocationCard>
  );
}
