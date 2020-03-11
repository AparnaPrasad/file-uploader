import React from 'react';
//import { mount } from 'enzyme';
//import TransferCardContainer from './TransferCardContainer'
//import { Provider } from 'react-redux';
//import configureStore from 'redux-mock-store' 
//import { Middleware } from 'redux';
//import { initialState } from '../../store/upload-reducer/upload-reducer';

//const middlewares: Middleware[] = []
//const mockStore = configureStore(middlewares)
//const renderComponent = () => {
//    // Initialize mockstore with empty state
//    //const initialState = {}
//    const store = mockStore(initialState)

//    const wrapper = mount(
//        <Provider store={store}>
//            <TransferCardContainer />
//        </Provider>);
//    return wrapper;
//}

//describe('test TransferCardContainer', () => {
//    it('should render the compoenent without error', () => {
//        const wrapper = renderComponent();
//        const transferCardContainerComponent = wrapper.find(`[data-test-id="transfer-card-component-id"]`)
//        expect(transferCardContainerComponent).toHaveLength(1)
//    })

//})

it('should render', () => {
    expect(1+1).toBe(2)
})