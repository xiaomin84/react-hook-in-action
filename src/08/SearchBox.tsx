import React, { useCallback, useMemo } from "react";
import { useSearchParam } from "react-use";

// 为 data 参数添加类型定义
interface Item {
  id: number;
  title: string;
}

interface SearchBoxProps {
  data: Item[];
}

function SearchBox({ data }: SearchBoxProps) {
  const searchKey = useSearchParam("key") || "";
  const filtered = useMemo(() => {
    return data.filter((item: Item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey, data]);

  const handleSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?key=${evt.target.value}`
    );
  }, []);
  return (
    <div className="08-filter-list">
      <h2>Movies (Search key in URL)</h2>
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={handleSearch}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item: Item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

// 为匿名导出组件添加显示名称
const SearchBoxWrapper = () => {
  const data: Item[] = [
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
  return <SearchBox data={data} />;
};

export default SearchBoxWrapper;
