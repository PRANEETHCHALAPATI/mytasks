import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class MyTasks extends Component {
  state = {
    tag: 'HEALTH',
    task: '',
    taskList: [],
    activetabId: '',
  }

  changeActivetabId = id => {
    this.setState({activetabId: id})
  }

  onChangeTags = event => {
    this.setState({tag: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {task, tag} = this.state
    const {tagList} = this.props

    if (!task.trim()) return

    const newTask = {
      id: uuidv4(),
      tag,
      task,
    }

    this.setState(prev => ({
      taskList: [...prev.taskList, newTask],
      task: '',
      tag: tagList[0].displayText,
    }))
  }

  render() {
    const {tagList} = this.props
    const {tag, task, taskList, activetabId} = this.state

    const filteredTasks =
      activetabId === ''
        ? taskList
        : taskList.filter(each => each.tag === activetabId)

    return (
      <div className="main-container">
        <div className="left">
          <h1 className="main-heading">Create a Task!</h1>

          <form className="task-form" onSubmit={this.onSubmitForm}>
            <label htmlFor="taskInput">Task</label>
            <input
              id="taskInput"
              className="input"
              type="text"
              placeholder="Enter the task here!"
              value={task}
              onChange={this.onChangeTask}
              aria-label="Task"
            />

            <label htmlFor="tagSelect">Tags</label>
            <select
              id="tagSelect"
              className="select"
              value={tag}
              onChange={this.onChangeTags}
              aria-label="Tags"
            >
              {tagList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button className="add-button" type="submit">
              Add Task
            </button>
          </form>
        </div>

        <div className="right">
          <div className="tags">
            <h1 className="tasks-heading">Tags</h1>
            <ul className="tags-list" role="tablist">
              <li key="all">
                <button
                  type="button"
                  className={`tag-button ${activetabId === '' ? 'active' : ''}`}
                  onClick={() => this.changeActivetabId('')}
                >
                  All
                </button>
              </li>

              {tagList.map(each => (
                <li key={each.optionId}>
                  <button
                    type="button"
                    className={`tag-button ${
                      activetabId === each.displayText ? 'active' : ''
                    }`}
                    onClick={() => this.changeActivetabId(each.optionId)}
                  >
                    {each.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="tasks">
            <h1>Tasks</h1>
            <p className="tasks-heading">
              {activetabId === '' ? 'All Tasks' : `${activetabId} Tasks`}
            </p>

            {filteredTasks.length === 0 ? (
              <p className="empty">No Tasks Added Yet</p>
            ) : (
              <ul className="tasks-list" aria-live="polite">
                {filteredTasks.map(each => (
                  <li key={each.id} className="task-item">
                    <div className="task-meta">
                      <p className="task-tag">{each.tag}</p>
                      <p className="task-id">{each.id}</p>
                    </div>
                    <p className="task-text">{each.task}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
