import { MultiSelectMap } from '@gurgelio/react-map';
import brazil from '@gurgelio/react-map/brazil';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MultiSelectMap> = {
  title: 'Components/MultiSelectMap',
  component: MultiSelectMap,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    map: {
      control: { disable: true }
    },
    colors: {
      control: { type: 'object' },
      description: 'Map colors'
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Brasil: Story = {
  args: {
    map: brazil,
    strokeColor: '#000000',
    selectColor: '#ff0000',
    hoverColor: '#303030',
    stateColor: '#ffffff'
  }
};

export const ComCallback: Story = {
  args: {
    map: brazil,
    size: 400,
    onSelect: (
      state: keyof typeof brazil,
      selectedStates: keyof (typeof brazil)[]
    ) => {
      console.log('Selecionado:', state, 'Todos:', selectedStates);
    }
  }
};

export const CoresCustomizadas: Story = {
  args: {
    map: brazil,
    size: 450,
    strokeColor: '#1a1a1a',
    selectColor: '#2563eb',
    hoverColor: '#3b82f6',
    stateColor: '#f0f9ff'
  }
};
