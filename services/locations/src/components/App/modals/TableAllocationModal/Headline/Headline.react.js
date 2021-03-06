import React from 'react';
import moment from 'moment';
import { Button } from 'antd';
import { useIntl } from 'react-intl';

// Components
import {
  ActiveTableCount,
  buttonStyles,
  HeaderRow,
  RefreshTime,
  AlignSelfEnd,
} from '../TableAllocationModal.styled';

export const Headline = ({ activeTables, callback, lastRefresh }) => {
  const intl = useIntl();

  return (
    <>
      <HeaderRow>
        <ActiveTableCount>{`${intl.formatMessage({
          id: 'modal.tableAllocation.activeTableCount',
        })}: ${Object.keys(activeTables).length}`}</ActiveTableCount>
        <Button style={buttonStyles} onClick={callback}>
          {intl.formatMessage({
            id: 'refresh',
          })}
        </Button>
      </HeaderRow>
      <AlignSelfEnd>
        <RefreshTime>
          {`${intl.formatMessage({
            id: 'modal.tableAllocation.lastRefresh',
          })}: ${moment(lastRefresh).format('DD.MM.YYYY - HH:mm:ss')}`}
        </RefreshTime>
      </AlignSelfEnd>
    </>
  );
};
