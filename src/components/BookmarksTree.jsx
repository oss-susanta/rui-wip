import React, { useMemo, useState } from "react";
import { Dropdown, Input, Menu, Tree } from "antd";
import { useDebounce } from "@react-hook/debounce";
import {
  BsFileText,
  BsFolder,
  BsFolder2Open,
  BsFolderPlus,
  BsPen,
  BsTrash,
} from "react-icons/bs";
import { RiShareLine } from "react-icons/ri";

const bookmarks = [
  {
    id: 0,
    name: "Official",
    type: "folder",
    children: [
      {
        id: 1,
        name: "Market Risk",
        type: "folder",
        children: [
          {
            id: 2,
            name: "VaR",
            type: "file",
          },
        ],
      },
      {
        id: 3,
        name: "Credit Risk",
        type: "folder",
        children: [
          {
            id: 4,
            name: "Experiments",
            type: "folder",
            children: [
              {
                id: 5,
                name: "New Thing",
                type: "file",
              },
            ],
          },
          {
            id: 6,
            name: "VaR",
            type: "file",
          },
          {
            id: 7,
            name: "Credit",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Personal",
    type: "folder",
    children: [
      {
        id: 9,
        name: "Susanta",
        type: "file",
      },
    ],
  },
  {
    id: 10,
    name: "Test",
    type: "file",
  },
];

export default function BookmarksTree() {
  const [activeNode, setActiveNode] = useState(null);
  const [search, setSearch] = useDebounce("");
  const handleRightClick = ({ node }) => {
    setActiveNode({ id: node.key, type: node.dataType });
  };

  const tree = useMemo(() => {
    function loop(entries) {
      return entries.map((entry) => {
        const node = {
          key: entry.id,
          title: entry.name,
          dataType: entry.type,
        };
        if (Array.isArray(entry.children)) {
          node.children = loop(entry.children);
          node.icon = ({ expanded }) =>
            expanded ? (
              <BsFolder2Open className="text-xl" />
            ) : (
              <BsFolder className="text-xl" />
            );
        } else {
          node.icon = <BsFileText className="text-xl" />;
        }
        return node;
      });
    }
    return loop(bookmarks);
  }, [bookmarks]);
  const searchTree = useMemo(() => {
    const searchLower = search.toLowerCase();
    function loop(nodes) {
      const innerSearchTree = [];
      nodes.forEach((node) => {
        if (node.children) {
          const children = loop(node.children);
          if (children.length) {
            innerSearchTree.push({ ...node, children });
          }
        } else if (node.title.toLowerCase().includes(searchLower)) {
          innerSearchTree.push(node);
        }
      });
      return innerSearchTree;
    }
    return loop(tree);
  }, [tree, search]);

  const overlay = (
    <Menu>
      {activeNode?.type === "folder" ? (
        <Menu.Item key="create" icon={<BsFolderPlus className="text-base" />}>
          Create Folder
        </Menu.Item>
      ) : (
        <Menu.Item key="open" icon={<BsFileText className="text-base" />}>
          Open
        </Menu.Item>
      )}
      <Menu.Item key="rename" icon={<BsPen className="text-base" />}>
        Rename
      </Menu.Item>
      <Menu.Item key="share" icon={<RiShareLine className="text-base" />}>
        Share
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="remove" icon={<BsTrash className="text-base" />}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="w-full h-full overflow-hidden flex flex-col gap-2">
      <header className="flex-none p-1">
        <Input.Search
          enterButton
          placeholder="Search ..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </header>
      <div className="flex-1 min-h-0 overflow-auto">
        <Dropdown
          overlay={overlay}
          trigger={["contextMenu"]}
          visible={!!activeNode}
          onVisibleChange={(visible) => !visible && setActiveNode(null)}
        >
          <Tree
            showIcon
            treeData={searchTree}
            onRightClick={handleRightClick}
          />
        </Dropdown>
      </div>
    </section>
  );
}
