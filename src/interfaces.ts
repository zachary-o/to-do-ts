export interface ICategory {
  categoryId: string;
  name: string;
  color?: string;
}

export interface ICategoryProps {
  allCategories: ICategory[];
  setAllCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

export interface ITodo {
  taskId: string;
  taskName: string;
  isCompleted: boolean;
  categoryName?: string;
}

export interface ITodoProps {
  allTodos: ITodo[];
  setAllTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}
