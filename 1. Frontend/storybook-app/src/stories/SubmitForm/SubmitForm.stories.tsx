import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SubmitForm, SubmitFormProps } from './SubmitForm';

export default {
  title: 'Example/Submit Form',
  component: SubmitForm,
} as Meta;

const Template: Story<SubmitFormProps> = (args) => <SubmitForm {...args} />;

export const Submit = Template.bind({});
Submit.args = {
};

export const SubmittedFail = Template.bind({});
SubmittedFail.args = {
  nameNotValid: true,
  urlNotValid: true,
};

export const SubmittedSuccess = Template.bind({});
SubmittedSuccess.args = {
  submit: true
};

