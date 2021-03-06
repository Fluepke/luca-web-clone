import { Button, Tooltip } from 'antd';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import React, { useCallback, useEffect, useState } from 'react';

import {
  createAdditionalData,
  deleteAdditionalData,
  getAdditionalData,
  updateAdditionalData,
} from 'network/api';
import {
  CardSection,
  CardSectionTitle,
  CardSectionDescription,
  LocationCard,
} from '../LocationCard';

import {
  StyledFooter,
  addButtonStyle,
  informationTooltipStyle,
  StyledSwitchContainer,
  StyledInformationText,
} from './CheckInQuery.styled';
import { AdditionalData } from './AdditionalData';
import { Switch } from '../../Switch';

export const CheckInQuery = ({ location }) => {
  const intl = useIntl();
  const [additionalData, setAdditionalData] = useState([]);
  const [isAdditionalDataEnabled, setIsAdditionalDataEnabled] = useState(
    !!additionalData.length
  );

  const {
    isLoading,
    error,
    data,
    refetch,
  } = useQuery(`additionalData/${location.uuid}`, () =>
    getAdditionalData(location.uuid)
  );

  const addAdditionalData = useCallback(() => {
    createAdditionalData(location.uuid, {
      key: '',
    })
      .then(refetch)
      .catch(refetch);
  }, [location.uuid, refetch]);

  const removeAdditionalData = useCallback(
    id => {
      deleteAdditionalData(id).then(refetch).catch(refetch);
    },
    [refetch]
  );

  useEffect(() => {
    if (isLoading || error) return;

    setAdditionalData(data.additionalData);
    setIsAdditionalDataEnabled(!!additionalData.length);
  }, [isLoading, data, error, additionalData.length]);

  const onChangeData = useCallback((uuid, key, value) => {
    updateAdditionalData(uuid, { [key]: value, isRequired: true });
  }, []);

  const onBlur = (event, additionalDataId) => {
    if (event.target.value.length === 0) {
      removeAdditionalData(additionalDataId);
    }
  };

  return (
    <LocationCard
      isCollapse
      title={intl.formatMessage({ id: 'settings.location.checkin.headline' })}
      testId="additionalData"
    >
      <CardSection isLast>
        <CardSectionTitle>
          <div>
            {intl.formatMessage({
              id: 'settings.location.checkin.additionalData.headline.main',
            })}
          </div>
          <div>
            <Tooltip
              style={informationTooltipStyle}
              placement="topLeft"
              title={intl.formatMessage({
                id: 'additionalData.tooltip',
              })}
            >
              <StyledInformationText>
                {intl.formatMessage({
                  id: 'general.information',
                })}
              </StyledInformationText>
            </Tooltip>
          </div>
          <StyledSwitchContainer>
            <Switch
              data-cy="selectAdditionalData"
              checked={isAdditionalDataEnabled}
              onChange={() => {
                setIsAdditionalDataEnabled(!isAdditionalDataEnabled);

                if (isAdditionalDataEnabled) {
                  for (const information of additionalData) {
                    removeAdditionalData(information.uuid);
                  }
                }
              }}
            />
          </StyledSwitchContainer>
        </CardSectionTitle>
        <CardSectionDescription>
          {intl.formatMessage({
            id: 'settings.location.checkin.additionalData.description',
          })}
        </CardSectionDescription>
        {additionalData.map(information => (
          <AdditionalData
            key={information.uuid}
            onChangeData={onChangeData}
            additionalData={information}
            removeAdditionalData={removeAdditionalData}
            onBlur={onBlur}
          />
        ))}
        <StyledFooter>
          {isAdditionalDataEnabled && (
            <Button
              onClick={addAdditionalData}
              style={addButtonStyle}
              data-cy="addRequestButton"
            >
              {intl.formatMessage({
                id: 'settings.location.checkin.additionalData.add',
              })}
            </Button>
          )}
        </StyledFooter>
      </CardSection>
    </LocationCard>
  );
};
