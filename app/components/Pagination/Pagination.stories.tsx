import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { View } from "react-native"
import { Pagination } from "./Pagination"
import { Text } from "../Text"

const meta: Meta<typeof Pagination> = {
  title: "Layout/Pagination",
  component: Pagination,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "simple", "compact"],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Pagination>

const InteractivePagination = (args: any) => {
  const [page, setPage] = useState(args.currentPage || 1)
  return (
    <View style={{ alignItems: "center" }}>
      <Pagination {...args} currentPage={page} onPageChange={setPage} />
      <Text text={`Current page: ${page}`} style={{ marginTop: 16 }} />
    </View>
  )
}

export const Default: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
}

export const MiddlePage: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
  },
}

export const ManyPages: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 15,
    totalPages: 50,
  },
}

export const FewPages: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 2,
    totalPages: 3,
  },
}

export const Simple: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: "simple",
  },
}

export const Compact: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 2,
    totalPages: 5,
    variant: "compact",
  },
}

export const NoFirstLast: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    showFirstLast: false,
  },
}

export const NoPrevNext: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 10,
    showPrevNext: false,
    showFirstLast: false,
  },
}

export const AllVariants: Story = {
  render: () => {
    const [page, setPage] = useState(3)
    return (
      <View style={{ gap: 32 }}>
        <View style={{ alignItems: "center" }}>
          <Text text="Default" size="xs" style={{ marginBottom: 8 }} />
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
            variant="default"
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text text="Simple" size="xs" style={{ marginBottom: 8 }} />
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
            variant="simple"
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text text="Compact" size="xs" style={{ marginBottom: 8 }} />
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
            variant="compact"
          />
        </View>
      </View>
    )
  },
}
