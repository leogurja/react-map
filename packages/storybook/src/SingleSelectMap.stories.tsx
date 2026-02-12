import { SingleSelectMap } from '@gurgelio/react-map';
import brazil from '@gurgelio/react-map/brazil';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SingleSelectMap> = {
  title: 'Components/SingleSelectMap',
  component: SingleSelectMap,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    map: {
      control: { disable: true }
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Brasil: Story = {
  args: {
    map: brazil,
    size: 400,
    strokeColor: '#000000',
    selectColor: '#ff0000',
    hoverColor: '#303030',
    stateColor: '#ffffff'
  }
};

export const SemInteracao: Story = {
  args: {
    map: brazil,
    size: 400,
    disableClick: true,
    disableHover: true
  }
};
