import { useEffect, useCallback, useMemo, useState } from "react";
import { Select, Table } from "antd";
import _ from "lodash";
import useAsync from "./useAsync";

const endpoint = "https://60b2643d62ab150017ae21de.mockapi.io/";


interface Category {
  id: string;
  name: string;
  // 其他分类属性...
}

interface Article {
  id: string;
  title: string;
  categoryId: string;
  // 其他文章属性...
  category: Category | null;
}


const useArticles = () => {
  // 使用上面创建的 useAsync 获取文章列表
  const { execute, data, loading, error } = useAsync<Article[]>(
    useCallback(async () => {
      const res = await fetch(`${endpoint}/posts`);
      if (!res.ok) {
        throw new Error('网络请求失败');
      }
      return await res.json() as Article[];
    }, []),
  );

  useEffect(() => void execute(), [execute]);
  // 返回语义化的数据结构
  return {
    articles: data || [],
    articlesLoading: loading,
    articlesError: error,
  };
};

const useCategories = () => {
  // 使用上面创建的 useAsync 获取分类列表
  const { execute, data, loading, error } = useAsync<Category[]>(
    useCallback(async () => {
      const res = await fetch(`${endpoint}/categories`);
      return await res.json() as Category[];
    }, []),
  );
  useEffect(() => void execute(), [execute]);

  // 返回语义化的数据结构
  return {
    categories: data || [],
    categoriesLoading: loading,
    categoriesError: error,
  };
};

const useCombinedArticles = (articles: Article[], categories: Category[]) => {
  // 将文章数据和分类数据组合到一起
  return useMemo(() => {
    if (articles.length === 0 || categories.length === 0) return [];
    return articles.map((article) => {
      return {
        ...article,
        category: categories.find(
          (c) => String(c.id) === String(article.categoryId)
        ) || null, // 确保 category 为 null 或 Category 类型
      };
    });
  }, [articles, categories]);
};

const useFilteredArticles = (articles: Article[], selectedCategory: string | null) => {
  // 实现按照分类过滤
  return useMemo(() => {
    if (articles.length === 0) return []; // 如果没有文章，返回空数组
    if (!selectedCategory) return articles;
    return articles.filter((article) => {
      return String(article.category?.name) === String(selectedCategory);
    });
  }, [articles, selectedCategory]);
};

const columns = [
  { dataIndex: "title", title: "Title" },
  { dataIndex: ["category", "name"], title: "Category" },
  { dataIndex: ["category", "id"], title:"id" }
];

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // 获取文章列表
  const { articles, articlesError } = useArticles();
  // 获取分类列表
  const { categories, categoriesError } = useCategories();
  // 组合数据
  const combined = useCombinedArticles(articles, categories);
  // 实现过滤
  const result = useFilteredArticles(combined, selectedCategory);

  // 分类下拉框选项用于过滤
  const options  = useMemo(() => {
    const arr : {value: string | null, label: string}[]
      = _.uniqBy(categories, (c) => c.name).map((c) => ({
        value: c.name,
        label: c.name,
    }));
    arr.unshift({ value: null, label: "All" });
    return arr;
  }, [categories]);
  

  // 如果出错，简单返回 Failed
  if (articlesError || categoriesError) return "Failed";

  // 如果没有结果，说明正在加载
  if (articles.length === 0) return null;


  return (
    <div>
      <h1>Blog List</h1>
      <Select
        value={selectedCategory} // 修复类型错误，将 null 转换为 undefined
        onChange={setSelectedCategory} // 确保类型安全
        options={options} // 使用定义好的 options
        style={{ width: "200px" }}
        placeholder="Select a category"
      />
      <Table dataSource={result} columns={columns} /> 
    </div>
  );
}
