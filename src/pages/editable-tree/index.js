
import EditableTree from '../../components/editable-tree';

const treeData = [
  {
    value: '0-0',
    key: '0-0',
    children: [
      {
        value: '0-0-0',
        key: '0-0-0',
        children: [
          { value: '0-0-0-0', key: '0-0-0-0' },
          { value: '0-0-0-1', key: '0-0-0-1' },
          { value: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        value: '0-0-1',
        key: '0-0-1',
        children: [
          { value: '0-0-1-0', key: '0-0-1-0' },
          { value: '0-0-1-1', key: '0-0-1-1' },
          { value: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    value: '0-1',
    key: '0-1',
    children: [
      { value: '0-1-0-0', key: '0-1-0-0' },
      { value: '0-1-0-1', key: '0-1-0-1' },
      { value: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    value: '0-2',
    key: '0-2',
  },
]

const EditTreePage = () => {
  return (
    <EditableTree treeData={treeData} defaultExpandAll />
  );
};

export default EditTreePage;
