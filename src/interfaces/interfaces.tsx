export interface Group {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}

export interface UserListProps {
  email: string;
  first_name: string;
  group: {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    students: string[];
  };
  last_name: string;
  role: string;
  status: string;
  _id: string;
}

export interface StudentProps {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  _id: string;
}
