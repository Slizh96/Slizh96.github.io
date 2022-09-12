import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {Task1} from "../Task1";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task1',
    component: Task1,
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task1>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task1> = (args) => <Task1  {...args}/>;

export const Task1Story = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Task1Story.args = {
    taskID: '11',
    todolistID: 'todolistId2',
};
