import { Badge } from 'components'
import { BadgeColors } from 'components/Badge'
import { Todo, TodoStatus } from 'models/todo'
import React from 'react'

type TGroup = {
  key: string,
  label: string
  color: BadgeColors
  count?: number
}

type TGroups = TGroup[]

const TODO_GROUPS: TGroups = [
  {
    key: 'ALL',
    label: "All",
    color: "gray"
  }, {
    key: TodoStatus.ACTIVE,
    label: "Active",
    color: "blue"
  },
 {
    key: TodoStatus.COMPLETED,
    label: "Completed",
    color: "green"
  },
  {
    key: "PRIORITY",
    label: "Priority",
    color: "red"
  },
]

interface TodoGroupsProps {
  filterByGroup: (status: string) => void
  activeGroup?: string
  todos?: Todo[]
}

interface GroupProps {
  content: TGroup
}

const TodoGroups = ({
  filterByGroup,
  todos = [],
  activeGroup = "ALL",
}: TodoGroupsProps) => {

  const mainGroups = TODO_GROUPS.map((todo) => {
    const count = todos.reduce((acc, item) => {
      return item.status === todo.key ? acc += 1
        : item.isPriority && todo.key === "PRIORITY" ? acc += 1 : acc
    }, 0)

    return ({
      ...todo,
      count
    })
  })
  
  const newGroups = (
    Array.from(new Set(todos.map(
      todo => todo?.label?.toLowerCase())))
    ).map((label => {

    const count = todos.reduce((acc, item) => {
      return item.label === label ? acc += 1 : acc
    }, 0)

    return ({
      key: label,
      label: label,
      color: "gray",
      count,
    })
  }))


  const Group = ({ content }: GroupProps) => (
    <button
      aria-label={content.label}
      className={`
        btn btn--unstyled flex justify-between w-full items-center
        ${activeGroup.toLowerCase() === content.key.toLowerCase() ? 'btn--active' : ''}`
      }
      key={content.key} 
      onClick={() => filterByGroup(content.key)}
    >
      <div className="flex items-center">
        <Badge colorScheme={content.color} />
        <div className="btn__label">
          {content.label}
        </div>
      </div>
      <div role="note" className="Todo__count" aria-label={content.label}>
        {content.key === "ALL" ? todos.length : content.count}
      </div>
    </button>
  )

  return (
    <div className="Todo__groups">
        {mainGroups.map((content) => (
          <Group key={content.key} content={content} />
        ))}
        {newGroups.length > 0 && (
          <div className="Todo__new-groups">
            <div className="Todo__tag-title">Lists</div>
            {newGroups.map((content) => (
              <Group key={content.key} content={content as TGroup} />
            ))}
          </div>
        )}
    </div>
  )
}

export default TodoGroups;