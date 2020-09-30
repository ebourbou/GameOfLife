/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import { Observable } from "zen-observable-ts";

export type CreatePatternInput = {
  Id: string;
};

export type UpdatePatternInput = {
  Id: string;
};

export type DeletePatternInput = {
  Id: string;
};

export type CreateUserInput = {
  name: string;
};

export type UpdateUserInput = {
  name: string;
};

export type DeleteUserInput = {
  name: string;
};

export type TablePatternFilterInput = {
  Id?: TableStringFilterInput | null;
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

export type TableUserFilterInput = {
  name?: TableStringFilterInput | null;
};

export type CreatePatternMutation = {
  __typename: "Pattern";
  Id: string;
};

export type UpdatePatternMutation = {
  __typename: "Pattern";
  Id: string;
};

export type DeletePatternMutation = {
  __typename: "Pattern";
  Id: string;
};

export type CreateUserMutation = {
  __typename: "User";
  name: string;
};

export type UpdateUserMutation = {
  __typename: "User";
  name: string;
};

export type DeleteUserMutation = {
  __typename: "User";
  name: string;
};

export type GetPatternQuery = {
  __typename: "Pattern";
  Id: string;
};

export type ListPatternsQuery = {
  __typename: "PatternConnection";
  items: Array<{
    __typename: "Pattern";
    Id: string;
  } | null> | null;
  nextToken: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  name: string;
};

export type ListUsersQuery = {
  __typename: "UserConnection";
  items: Array<{
    __typename: "User";
    name: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreatePatternSubscription = {
  __typename: "Pattern";
  Id: string;
};

export type OnUpdatePatternSubscription = {
  __typename: "Pattern";
  Id: string;
};

export type OnDeletePatternSubscription = {
  __typename: "Pattern";
  Id: string;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  name: string;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  name: string;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  name: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreatePattern(
    input: CreatePatternInput
  ): Promise<CreatePatternMutation> {
    const statement = `mutation CreatePattern($input: CreatePatternInput!) {
        createPattern(input: $input) {
          __typename
          Id
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
          Id
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
          Id
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
  async CreateUser(input: CreateUserInput): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          __typename
          name
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
          name
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
          name
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
  async GetPattern(Id: string): Promise<GetPatternQuery> {
    const statement = `query GetPattern($Id: String!) {
        getPattern(Id: $Id) {
          __typename
          Id
        }
      }`;
    const gqlAPIServiceArguments: any = {
      Id
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
            Id
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
  async GetUser(name: string): Promise<GetUserQuery> {
    const statement = `query GetUser($name: String!) {
        getUser(name: $name) {
          __typename
          name
        }
      }`;
    const gqlAPIServiceArguments: any = {
      name
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
            name
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
  OnCreatePatternListener: Observable<
    OnCreatePatternSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePattern($Id: String) {
        onCreatePattern(Id: $Id) {
          __typename
          Id
        }
      }`
    )
  ) as Observable<OnCreatePatternSubscription>;

  OnUpdatePatternListener: Observable<
    OnUpdatePatternSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePattern($Id: String) {
        onUpdatePattern(Id: $Id) {
          __typename
          Id
        }
      }`
    )
  ) as Observable<OnUpdatePatternSubscription>;

  OnDeletePatternListener: Observable<
    OnDeletePatternSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePattern($Id: String) {
        onDeletePattern(Id: $Id) {
          __typename
          Id
        }
      }`
    )
  ) as Observable<OnDeletePatternSubscription>;

  OnCreateUserListener: Observable<OnCreateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($name: String) {
        onCreateUser(name: $name) {
          __typename
          name
        }
      }`
    )
  ) as Observable<OnCreateUserSubscription>;

  OnUpdateUserListener: Observable<OnUpdateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser($name: String) {
        onUpdateUser(name: $name) {
          __typename
          name
        }
      }`
    )
  ) as Observable<OnUpdateUserSubscription>;

  OnDeleteUserListener: Observable<OnDeleteUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser($name: String) {
        onDeleteUser(name: $name) {
          __typename
          name
        }
      }`
    )
  ) as Observable<OnDeleteUserSubscription>;
}
