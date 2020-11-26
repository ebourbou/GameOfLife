/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateUserInput = {
  id: string;
  username?: string | null;
  role?: string | null;
  email?: string | null;
  lastLogin?: string | null;
};

export type UpdateUserInput = {
  id: string;
  username?: string | null;
  role?: string | null;
  email?: string | null;
  lastLogin?: string | null;
};

export type DeleteUserInput = {
  id: string;
};

export type CreatePatternInput = {
  author?: string | null;
  sizeX: number;
  sizeY: number;
  description?: string | null;
  heat?: number | null;
  name: string;
  pattern: string;
  type?: string | null;
  year?: number | null;
  locked?: boolean | null;
};

export type UpdatePatternInput = {
  id: string;
  author?: string | null;
  sizeX?: number | null;
  sizeY?: number | null;
  description?: string | null;
  heat?: number | null;
  name?: string | null;
  pattern?: string | null;
  type?: string | null;
  year?: number | null;
  locked?: boolean | null;
};

export type DeletePatternInput = {
  id: string;
};

export type CreatePatternRatingInput = {
  comment?: string | null;
  rating?: number | null;
  userId?: string | null;
};

export type UpdatePatternRatingInput = {
  id: string;
  comment?: string | null;
  rating?: number | null;
};

export type DeletePatternRatingInput = {
  id: string;
};

export type TableUserFilterInput = {
  id?: TableIDFilterInput | null;
  username?: TableStringFilterInput | null;
  role?: TableStringFilterInput | null;
  email?: TableStringFilterInput | null;
  lastLogin?: TableStringFilterInput | null;
};

export type TableIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type TableStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type TablePatternFilterInput = {
  id?: TableIDFilterInput | null;
  author?: TableStringFilterInput | null;
  sizeX?: TableIntFilterInput | null;
  sizeY?: TableIntFilterInput | null;
  description?: TableStringFilterInput | null;
  heat?: TableIntFilterInput | null;
  name?: TableStringFilterInput | null;
  pattern?: TableStringFilterInput | null;
  type?: TableStringFilterInput | null;
  year?: TableIntFilterInput | null;
};

export type TableIntFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  contains?: number | null;
  notContains?: number | null;
  between?: Array<number | null> | null;
};

export type TablePatternRatingFilterInput = {
  id?: TableIDFilterInput | null;
  comment?: TableStringFilterInput | null;
  rating?: TableIntFilterInput | null;
  patternId?: TableStringFilterInput | null;
  userId?: TableStringFilterInput | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  username: string | null;
  role: string | null;
  email: string | null;
  lastLogin: string | null;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  username: string | null;
  role: string | null;
  email: string | null;
  lastLogin: string | null;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  username: string | null;
  role: string | null;
  email: string | null;
  lastLogin: string | null;
};

export type CreatePatternMutation = {
  __typename: "Pattern";
  id: string;
  author: string | null;
  sizeX: number;
  sizeY: number;
  description: string | null;
  heat: number | null;
  name: string;
  pattern: string;
  type: string | null;
  year: number | null;
  locked: boolean | null;
};

export type UpdatePatternMutation = {
  __typename: "Pattern";
  id: string;
  author: string | null;
  sizeX: number;
  sizeY: number;
  description: string | null;
  heat: number | null;
  name: string;
  pattern: string;
  type: string | null;
  year: number | null;
  locked: boolean | null;
};

export type DeletePatternMutation = {
  __typename: "Pattern";
  id: string;
  author: string | null;
  sizeX: number;
  sizeY: number;
  description: string | null;
  heat: number | null;
  name: string;
  pattern: string;
  type: string | null;
  year: number | null;
  locked: boolean | null;
};

export type CreatePatternRatingMutation = {
  __typename: "PatternRating";
  id: string;
  userId: string | null;
  comment: string | null;
  rating: number | null;
};

export type UpdatePatternRatingMutation = {
  __typename: "PatternRating";
  id: string;
  userId: string | null;
  comment: string | null;
  rating: number | null;
};

export type DeletePatternRatingMutation = {
  __typename: "PatternRating";
  id: string;
  userId: string | null;
  comment: string | null;
  rating: number | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  username: string | null;
  role: string | null;
  email: string | null;
  lastLogin: string | null;
};

export type ListUsersQuery = {
  __typename: "UserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    username: string | null;
    role: string | null;
    email: string | null;
    lastLogin: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetPatternQuery = {
  __typename: "Pattern";
  id: string;
  author: string | null;
  sizeX: number;
  sizeY: number;
  description: string | null;
  heat: number | null;
  name: string;
  pattern: string;
  type: string | null;
  year: number | null;
  locked: boolean | null;
};

export type ListPatternsQuery = {
  __typename: "PatternConnection";
  items: Array<{
    __typename: "Pattern";
    id: string;
    author: string | null;
    sizeX: number;
    sizeY: number;
    description: string | null;
    heat: number | null;
    name: string;
    pattern: string;
    type: string | null;
    year: number | null;
    locked: boolean | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetPatternRatingQuery = {
  __typename: "PatternRating";
  id: string;
  userId: string | null;
  comment: string | null;
  rating: number | null;
};

export type ListPatternRatingsQuery = {
  __typename: "PatternRatingConnection";
  items: Array<{
    __typename: "PatternRating";
    id: string;
    userId: string | null;
    comment: string | null;
    rating: number | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  username: string | null;
  role: string | null;
  email: string | null;
  lastLogin: string | null;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  username: string | null;
  role: string | null;
  email: string | null;
  lastLogin: string | null;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  username: string | null;
  role: string | null;
  email: string | null;
  lastLogin: string | null;
};

export type OnCreatePatternSubscription = {
  __typename: "Pattern";
  id: string;
  author: string | null;
  sizeX: number;
  sizeY: number;
  description: string | null;
  heat: number | null;
  name: string;
  pattern: string;
  type: string | null;
  year: number | null;
  locked: boolean | null;
};

export type OnUpdatePatternSubscription = {
  __typename: "Pattern";
  id: string;
  author: string | null;
  sizeX: number;
  sizeY: number;
  description: string | null;
  heat: number | null;
  name: string;
  pattern: string;
  type: string | null;
  year: number | null;
  locked: boolean | null;
};

export type OnDeletePatternSubscription = {
  __typename: "Pattern";
  id: string;
  author: string | null;
  sizeX: number;
  sizeY: number;
  description: string | null;
  heat: number | null;
  name: string;
  pattern: string;
  type: string | null;
  year: number | null;
  locked: boolean | null;
};

export type OnCreatePatternRatingSubscription = {
  __typename: "PatternRating";
  id: string;
  userId: string | null;
  comment: string | null;
  rating: number | null;
};

export type OnUpdatePatternRatingSubscription = {
  __typename: "PatternRating";
  id: string;
  userId: string | null;
  comment: string | null;
  rating: number | null;
};

export type OnDeletePatternRatingSubscription = {
  __typename: "PatternRating";
  id: string;
  userId: string | null;
  comment: string | null;
  rating: number | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateUser(input: CreateUserInput): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          __typename
          id
          username
          role
          email
          lastLogin
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(input: UpdateUserInput): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          __typename
          id
          username
          role
          email
          lastLogin
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(input: DeleteUserInput): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!) {
        deleteUser(input: $input) {
          __typename
          id
          username
          role
          email
          lastLogin
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async CreatePattern(
    input: CreatePatternInput
  ): Promise<CreatePatternMutation> {
    const statement = `mutation CreatePattern($input: CreatePatternInput!) {
        createPattern(input: $input) {
          __typename
          id
          author
          sizeX
          sizeY
          description
          heat
          name
          pattern
          type
          year
          locked
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePatternMutation>response.data.createPattern;
  }
  async UpdatePattern(
    input: UpdatePatternInput
  ): Promise<UpdatePatternMutation> {
    const statement = `mutation UpdatePattern($input: UpdatePatternInput!) {
        updatePattern(input: $input) {
          __typename
          id
          author
          sizeX
          sizeY
          description
          heat
          name
          pattern
          type
          year
          locked
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePatternMutation>response.data.updatePattern;
  }
  async DeletePattern(
    input: DeletePatternInput
  ): Promise<DeletePatternMutation> {
    const statement = `mutation DeletePattern($input: DeletePatternInput!) {
        deletePattern(input: $input) {
          __typename
          id
          author
          sizeX
          sizeY
          description
          heat
          name
          pattern
          type
          year
          locked
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePatternMutation>response.data.deletePattern;
  }
  async CreatePatternRating(
    input: CreatePatternRatingInput
  ): Promise<CreatePatternRatingMutation> {
    const statement = `mutation CreatePatternRating($input: CreatePatternRatingInput!) {
        createPatternRating(input: $input) {
          __typename
          id
          userId
          comment
          rating
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePatternRatingMutation>response.data.createPatternRating;
  }
  async UpdatePatternRating(
    input: UpdatePatternRatingInput
  ): Promise<UpdatePatternRatingMutation> {
    const statement = `mutation UpdatePatternRating($input: UpdatePatternRatingInput!) {
        updatePatternRating(input: $input) {
          __typename
          id
          userId
          comment
          rating
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePatternRatingMutation>response.data.updatePatternRating;
  }
  async DeletePatternRating(
    input: DeletePatternRatingInput
  ): Promise<DeletePatternRatingMutation> {
    const statement = `mutation DeletePatternRating($input: DeletePatternRatingInput!) {
        deletePatternRating(input: $input) {
          __typename
          id
          userId
          comment
          rating
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePatternRatingMutation>response.data.deletePatternRating;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          username
          role
          email
          lastLogin
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: TableUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: TableUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            role
            email
            lastLogin
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  async GetPattern(id: string): Promise<GetPatternQuery> {
    const statement = `query GetPattern($id: ID!) {
        getPattern(id: $id) {
          __typename
          id
          author
          sizeX
          sizeY
          description
          heat
          name
          pattern
          type
          year
          locked
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPatternQuery>response.data.getPattern;
  }
  async ListPatterns(
    filter?: TablePatternFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPatternsQuery> {
    const statement = `query ListPatterns($filter: TablePatternFilterInput, $limit: Int, $nextToken: String) {
        listPatterns(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            author
            sizeX
            sizeY
            description
            heat
            name
            pattern
            type
            year
            locked
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPatternsQuery>response.data.listPatterns;
  }
  async GetPatternRating(id: string): Promise<GetPatternRatingQuery> {
    const statement = `query GetPatternRating($id: ID!) {
        getPatternRating(id: $id) {
          __typename
          id
          userId
          comment
          rating
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPatternRatingQuery>response.data.getPatternRating;
  }
  async ListPatternRatings(
    filter?: TablePatternRatingFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPatternRatingsQuery> {
    const statement = `query ListPatternRatings($filter: TablePatternRatingFilterInput, $limit: Int, $nextToken: String) {
        listPatternRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userId
            comment
            rating
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPatternRatingsQuery>response.data.listPatternRatings;
  }
  OnCreateUserListener: Observable<
    SubscriptionResponse<OnCreateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($id: ID, $username: String, $role: String, $email: AWSEmail, $lastLogin: AWSDateTime) {
        onCreateUser(id: $id, username: $username, role: $role, email: $email, lastLogin: $lastLogin) {
          __typename
          id
          username
          role
          email
          lastLogin
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateUserSubscription>>;

  OnUpdateUserListener: Observable<
    SubscriptionResponse<OnUpdateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser($id: ID, $username: String, $role: String, $email: AWSEmail, $lastLogin: AWSDateTime) {
        onUpdateUser(id: $id, username: $username, role: $role, email: $email, lastLogin: $lastLogin) {
          __typename
          id
          username
          role
          email
          lastLogin
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateUserSubscription>>;

  OnDeleteUserListener: Observable<
    SubscriptionResponse<OnDeleteUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser($id: ID, $username: String, $role: String, $email: AWSEmail, $lastLogin: AWSDateTime) {
        onDeleteUser(id: $id, username: $username, role: $role, email: $email, lastLogin: $lastLogin) {
          __typename
          id
          username
          role
          email
          lastLogin
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteUserSubscription>>;

  OnCreatePatternListener: Observable<
    SubscriptionResponse<OnCreatePatternSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePattern($id: ID, $author: String, $sizeX: Int, $sizeY: Int, $description: String) {
        onCreatePattern(id: $id, author: $author, sizeX: $sizeX, sizeY: $sizeY, description: $description) {
          __typename
          id
          author
          sizeX
          sizeY
          description
          heat
          name
          pattern
          type
          year
          locked
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreatePatternSubscription>>;

  OnUpdatePatternListener: Observable<
    SubscriptionResponse<OnUpdatePatternSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePattern($id: ID, $author: String, $sizeX: Int, $sizeY: Int, $description: String) {
        onUpdatePattern(id: $id, author: $author, sizeX: $sizeX, sizeY: $sizeY, description: $description) {
          __typename
          id
          author
          sizeX
          sizeY
          description
          heat
          name
          pattern
          type
          year
          locked
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdatePatternSubscription>>;

  OnDeletePatternListener: Observable<
    SubscriptionResponse<OnDeletePatternSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePattern($id: ID, $author: String, $sizeX: Int, $sizeY: Int, $description: String) {
        onDeletePattern(id: $id, author: $author, sizeX: $sizeX, sizeY: $sizeY, description: $description) {
          __typename
          id
          author
          sizeX
          sizeY
          description
          heat
          name
          pattern
          type
          year
          locked
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeletePatternSubscription>>;

  OnCreatePatternRatingListener: Observable<
    SubscriptionResponse<OnCreatePatternRatingSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePatternRating($id: ID, $comment: String, $rating: Int) {
        onCreatePatternRating(id: $id, comment: $comment, rating: $rating) {
          __typename
          id
          userId
          comment
          rating
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreatePatternRatingSubscription>>;

  OnUpdatePatternRatingListener: Observable<
    SubscriptionResponse<OnUpdatePatternRatingSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePatternRating($id: ID, $comment: String, $rating: Int) {
        onUpdatePatternRating(id: $id, comment: $comment, rating: $rating) {
          __typename
          id
          userId
          comment
          rating
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdatePatternRatingSubscription>>;

  OnDeletePatternRatingListener: Observable<
    SubscriptionResponse<OnDeletePatternRatingSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePatternRating($id: ID, $comment: String, $rating: Int) {
        onDeletePatternRating(id: $id, comment: $comment, rating: $rating) {
          __typename
          id
          userId
          comment
          rating
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeletePatternRatingSubscription>>;
}
