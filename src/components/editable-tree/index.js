import React, { useState } from 'react';
import { Tree } from 'antd';
import {
  CheckOutlined,
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import update from 'immutability-helper';
import uniqueId from 'lodash/uniqueId'


const { TreeNode } = Tree;

function EditableTree({ treeData, ...res }) {
  // [
  //   {
  //     value: 'Root',
  //     defaultValue: 'Root',
  //     key: '0',
  //     parentKey: 'Root',
  //     isEditable: true
  //   }
  // ]
  const [data, setData] = useState(treeData);

  //渲染树
  const renderTreeNodes = data => data.map((item) => {
    let renderTitle
    if (item.isEditable) {
      renderTitle = (
        <div>
          <input
            value={item.value}
            onChange={(e) => onChange(e, item.key)} />
          <CloseOutlined style={{ marginLeft: 10 }} onClick={() => onClose(item.key, item.defaultValue)} />
          <CheckOutlined style={{ marginLeft: 10 }} onClick={() => onSave(item.key)} />
        </div>
      );
    } else {
      renderTitle = (
        <div>
          <span>
            {item.value}
          </span>
          <span>
            <EditOutlined style={{ marginLeft: 10 }} onClick={() => onEdit(item.key)} />
            <PlusOutlined style={{ marginLeft: 10 }} onClick={() => onAdd(item.key)} />
            {item.parentKey === 'Root' ? null : (<MinusOutlined style={{ marginLeft: 10 }} onClick={() => onDelete(item.key)} />)}
          </span>
        </div>
      )
    }

    if (item.children) {
      return (
        <TreeNode title={renderTitle} key={item.key} dataRef={item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    let { title, ...otherItem } = item
    return <TreeNode {...otherItem} title={renderTitle} />;
  })


  const onAdd = (e) => {
    setData(addNode(e, data));
  }

  //增加节点
  const addNode = (key, data) => data.map((item) => {
    if (item.key === key) {
      return update(item, {
        children: children => update(children || [], {
          $push: [{
            value: '页面',
            defaultValue: '新页面',
            key: key+"-"+uniqueId(),
            parentKey: key,
            isEditable: false
          }]
        })
      })
    }

    if (item.children) {
      return update(item, { children: () => addNode(key, item.children) })
    } else {
      return item
    }
  })

  //删除节点
  const onDelete = (key) => {
    console.log('delete');
    console.log(deleteNode(key, data))
    setData(deleteNode(key, data));
  }

  const deleteNode = (key, data) => data.map((item, index) => {
    if (item.key === key) {
      return null
    }
    if (item.children) {
      return update(item, { children: () => deleteNode(key, item.children).filter(x => x !== null) })
    } else {
      return item
    }
  })

  //编辑节点
  const onEdit = (key) => {
    console.log('edit');
    setData(editNode(key, data))
  }

  const editNode = (key, data) => data.map((item) => {
    if (item.key === key) {
      return update(item, { $merge: { isEditable: true, value: item.value } })
    }
    if (item.children) {
      return update(item, { children: () => editNode(key, item.children) })
    } else {
      return item
    }
  })

  const onClose = (key, defaultValue) => {
    console.log('close');
    setData(closeNode(key, defaultValue, data))
  }

  const closeNode = (key,defaultValue, data) => data.map((item) => {
    if (item.key === key) {
      return update(item, { $merge: { value: defaultValue, isEditable: false } })
    }
    if (item.children) {
      return update(item, { children: () => saveNode(key, item.children) })
    } else {
      return item
    }
  })

  const onSave = (key) => {
    console.log('save')
    setData(saveNode(key, data))
  }

  const saveNode = (key, data) => data.map((item) => {
    if (item.key === key) {
      return update(item, { $merge: { defaultValue: item.value, isEditable: false } })
    }
    if (item.children) {
      return update(item, { children: () => saveNode(key, item.children) })
    } else {
      return item
    }
  })

  const onChange = (e, key) => {
    console.log('onchange')
    setData(changeNode(key, e.target.value, data))
  }

  const changeNode = (key, value, data) => data.map((item) => {
    if (item.key === key) {
      return update(item, { $merge: { value: value } })
    }
    if (item.children) {
      return update(item, { children: () => changeNode(key, value, item.children) })
    } else {
      return item
    }
  })

  return (
    <div>
      <Tree
        showLine
        blockNode
        {...res}
      >
        {renderTreeNodes(data)}
      </Tree>
    </div>
  )

}

export default EditableTree;
