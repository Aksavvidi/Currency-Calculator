export interface Users{
    username: string;
    password: string;
    email: string;
  }

  export interface UserAPIList {
    users: Users[]
  }

  export interface UserAPIUSerOne {
    status: boolean;
    data: Users;
  }
