import Description from './shared/Description';
import HeaderJob from './shared/HeaderJob';
import {useGetJobDetailQuery} from '@redux/JobSearch/services';
import {Tab, Text, TabView} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';

const JobDetail = ({route}) => {
  const [index, setIndex] = useState(0);

  console.log(index);
  return (
    <Container>
      <HeaderJob item={data} />
      <TabContainer>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          dense
          indicatorStyle={{
            backgroundColor: 'black',
            height: 2,
          }}>
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: 'white',
            })}
            titleStyle={{fontSize: 16, color: 'black'}}
            title="Description"
          />
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: 'white',
            })}
            titleStyle={{fontSize: 16, color: 'black'}}
            title="Company"
          />
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: 'white',
            })}
            titleStyle={{fontSize: 16, color: 'black'}}
            title="Aplicant"
          />
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: 'white',
            })}
            titleStyle={{fontSize: 16, color: 'black'}}
            title="Salary"
          />
        </Tab>
      </TabContainer>

      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{width: '100%'}}>
          <Description item={data} />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Cart</Text>
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Salary</Text>
        </TabView.Item>
      </TabView>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const TabContainer = styled.View`
  padding-top: 80px;
`;
export default JobDetail;
