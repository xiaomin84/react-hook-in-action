import { useState, useEffect, useCallback } from "react";
import { faker } from "@faker-js/faker";

// 获取横向，纵向滚动条位置
const getPosition = () => {
  return {
    x: window.scrollX,
    y: window.scrollY,
  };
};

const useScroll = () => {
  // 定一个 position 这个 state 保存滚动条位置
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition());
    };
    // 监听 scroll 事件，更新滚动条位置
    document.addEventListener("scroll", handler);
    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener("scroll", handler);
    };
  }, []);
  return position;
};

function ScrollTop() {
  const { y } = useScroll();

  const goTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const style: React.CSSProperties = {
    position: "fixed",
    right: "10px",
    bottom: "10px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "move",
  };
  // 当滚动条位置纵向超过 300 时，显示返回顶部按钮
  if (y > 300) {
    return (
      <button onClick={goTop} style={style}>
        Back to Top
      </button>
    );
  }
  // 否则不 render 任何 UI
  return null;
}

interface DataItem {
  id: number;
  name: string;
  introduction: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 20; i++) {

  data.push({
    id: i,
    name: faker.person.fullName(),
    introduction: faker.lorem.paragraph(),
  });
}

const UseScrollSample = () => {
  return (
    <div>
      <h1>Use Scroll Sample</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.introduction}</p>
        </div>
      ))}
      <ScrollTop />
    </div>
  );
};

export default UseScrollSample;
