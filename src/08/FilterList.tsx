import React, { useState, useMemo } from "react";

// 定义数据项的接口
interface DataItem {
  id: number;
  title: string;
}

// 定义组件的 props 接口
interface FilterListProps {
  data: DataItem[];
}

function FilterList({ data }: FilterListProps) {
  const [searchKey, setSearchKey] = useState("");
  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey, data]);

  return (
    <div className="08-filter-list">
      <h2>Movies</h2>
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

// 添加显示名称并使用命名函数组件
const FilterListDemo = () => {
  const data: DataItem[] = [
    {
      id: 1,
      title: "Mein Kampf"
    },
    {
      id: 2,
      title: "Tumannost Andromedy"
    },
    {
      id: 3,
      title: "Terumae romae (Thermae Romae)"
    },
    {
      id: 4,
      title: "White Banners"
    },
    {
      id: 5,
      title: "Train, The"
    },
    {
      id: 6,
      title: "Julia and Julia (Giulia e Giulia)"
    },
    {
      id: 7,
      title: "Can Go Through Skin (Kan door huid heen)"
    },
    {
      id: 8,
      title: "Two Moon Junction"
    },
    {
      id: 9,
      title: "Bill & Ted's Bogus Journey"
    },
    {
      id: 10,
      title: "iSteve"
    },
    {
      id: 11,
      title: "Pee-wee's Big Adventure"
    },
    {
      id: 12,
      title: "Celestial Wives of the Meadow Mari (Nebesnye zheny lugovykh mari)"
    },
    {
      id: 13,
      title: "Railroaded!"
    },
    {
      id: 14,
      title: "Devil Hides in Doubt (Sollbruchstelle)"
    },
    {
      id: 15,
      title: "Honeymoon Killers, The"
    },
    {
      id: 16,
      title: "Hurricane, The"
    },
    {
      id: 17,
      title: "Cheaper by the Dozen"
    },
    {
      id: 18,
      title: "New Wave (Nouvelle vague)"
    },
    {
      id: 19,
      title: "Keep Your Right Up"
    },
    {
      id: 20,
      title: "Deathsport"
    }
  ];
  return <FilterList data={data} />;
};

export default FilterListDemo;
