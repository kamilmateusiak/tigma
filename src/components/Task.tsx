import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from 'components/Loader';

interface Task {
    task_id: number;
    title: string;
}

interface Props {
    loading: boolean;
    task: Task;
}

const SingleTask = ({loading, task}: Props) => {
    if (loading) {
        return <Loader />;
    }
    return (
        <div>
            { !loading && task && <div>{task.title}</div> }
            <div>Task</div>
        </div>
    );
};

// 1
const TASK_QUERY = gql`
  # 2
  {
    task(id: 13) {
        task_id
        title
    }
  }
`;

// 3
export default graphql<Props>(TASK_QUERY, {
    props: ({ data }: any) => ({...data})
})(SingleTask);