import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Spin } from 'antd';

const Task = ({loading, task}) => {
    if (loading) {
        return <Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>;
    }
    return (
        <div>
            { !loading && task && <div>{task.title}</div> }
            <div>Task</div>
        </div>
    );
}

// 1
const TASK_QUERY = gql`
  # 2
  {
    task(id: 13) {
        task_id
        task_parent_id
        assigned_user_id
        project_id
        project_phase_id
        jira_issue_id
        title
        created
        updated
        opened
        closed
        type
        status
        number
        story_points
    }
  }
`

// 3
export default graphql(TASK_QUERY, {
    props: ({ data }) => ({...data})
})(Task);