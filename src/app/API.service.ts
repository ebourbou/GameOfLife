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

export type CreateGameInput = {
  id: string;
  name?: string | null;
  pattern?: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description?: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags?: string | null;
};

export type UpdateGameInput = {
  id: string;
  name?: string | null;
  pattern?: string | null;
  generations?: number | null;
  sizeX?: number | null;
  sizeY?: number | null;
  description?: string | null;
  ruleSetId?: string | null;
  userId?: string | null;
  creationDate: string;
};

export type DeleteGameInput = {
  id: string;
  creationDate: string;
};

export type CreateRatingInput = {
  id: string;
  userId: string;
  rateId?: string | null;
  comment?: string | null;
  rating?: number | null;
};

export type UpdateRatingInput = {
  id: string;
  userId: string;
  rateId?: string | null;
  comment?: string | null;
  rating?: number | null;
};

export type DeleteRatingInput = {
  id: string;
  userId: string;
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

export type TableGameFilterInput = {
  id?: TableIDFilterInput | null;
  name?: TableStringFilterInput | null;
  pattern?: TableStringFilterInput | null;
  generations?: TableIntFilterInput | null;
  sizeX?: TableIntFilterInput | null;
  sizeY?: TableIntFilterInput | null;
  description?: TableStringFilterInput | null;
  ruleSetId?: TableStringFilterInput | null;
  userId?: TableStringFilterInput | null;
  creationDate?: TableStringFilterInput | null;
};

export type TableRatingFilterInput = {
  id?: TableIDFilterInput | null;
  userId?: TableStringFilterInput | null;
  rateId?: TableStringFilterInput | null;
  comment?: TableStringFilterInput | null;
  rating?: TableIntFilterInput | null;
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

export type CreateGameMutation = {
  __typename: "Game";
  id: string;
  name: string | null;
  pattern: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags: string | null;
};

export type UpdateGameMutation = {
  __typename: "Game";
  id: string;
  name: string | null;
  pattern: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags: string | null;
};

export type DeleteGameMutation = {
  __typename: "Game";
  id: string;
  name: string | null;
  pattern: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags: string | null;
};

export type CreateRatingMutation = {
  __typename: "Rating";
  id: string;
  userId: string | null;
  rateId: string | null;
  comment: string | null;
  rating: number | null;
};

export type UpdateRatingMutation = {
  __typename: "Rating";
  id: string;
  userId: string | null;
  rateId: string | null;
  comment: string | null;
  rating: number | null;
};

export type DeleteRatingMutation = {
  __typename: "Rating";
  id: string;
  userId: string | null;
  rateId: string | null;
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

export type GetGameQuery = {
  __typename: "Game";
  id: string;
  name: string | null;
  pattern: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags: string | null;
};

export type ListGamesQuery = {
  __typename: "GameConnection";
  items: Array<{
    __typename: "Game";
    id: string;
    name: string | null;
    pattern: string | null;
    generations: number;
    sizeX: number;
    sizeY: number;
    description: string | null;
    ruleSetId: string;
    userId: string;
    creationDate: string;
    score: number;
    scoreTags: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type GetRatingQuery = {
  __typename: "Rating";
  id: string;
  userId: string | null;
  rateId: string | null;
  comment: string | null;
  rating: number | null;
};

export type ListRatingsQuery = {
  __typename: "RatingConnection";
  items: Array<{
    __typename: "Rating";
    id: string;
    userId: string | null;
    rateId: string | null;
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

export type OnCreateGameSubscription = {
  __typename: "Game";
  id: string;
  name: string | null;
  pattern: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags: string | null;
};

export type OnUpdateGameSubscription = {
  __typename: "Game";
  id: string;
  name: string | null;
  pattern: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags: string | null;
};

export type OnDeleteGameSubscription = {
  __typename: "Game";
  id: string;
  name: string | null;
  pattern: string | null;
  generations: number;
  sizeX: number;
  sizeY: number;
  description: string | null;
  ruleSetId: string;
  userId: string;
  creationDate: string;
  score: number;
  scoreTags: string | null;
};

export type OnCreateRatingSubscription = {
  __typename: "Rating";
  id: string;
  userId: string | null;
  rateId: string | null;
  comment: string | null;
  rating: number | null;
};

export type OnUpdateRatingSubscription = {
  __typename: "Rating";
  id: string;
  userId: string | null;
  rateId: string | null;
  comment: string | null;
  rating: number | null;
};

export type OnDeleteRatingSubscription = {
  __typename: "Rating";
  id: string;
  userId: string | null;
  rateId: string | null;
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
  async CreateGame(input: CreateGameInput): Promise<CreateGameMutation> {
    const statement = `mutation CreateGame($input: CreateGameInput!) {
        createGame(input: $input) {
          __typename
          id
          name
          pattern
          generations
          sizeX
          sizeY
          description
          ruleSetId
          userId
          creationDate
          score
          scoreTags
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateGameMutation>response.data.createGame;
  }
  async UpdateGame(input: UpdateGameInput): Promise<UpdateGameMutation> {
    const statement = `mutation UpdateGame($input: UpdateGameInput!) {
        updateGame(input: $input) {
          __typename
          id
          name
          pattern
          generations
          sizeX
          sizeY
          description
          ruleSetId
          userId
          creationDate
          score
          scoreTags
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateGameMutation>response.data.updateGame;
  }
  async DeleteGame(input: DeleteGameInput): Promise<DeleteGameMutation> {
    const statement = `mutation DeleteGame($input: DeleteGameInput!) {
        deleteGame(input: $input) {
          __typename
          id
          name
          pattern
          generations
          sizeX
          sizeY
          description
          ruleSetId
          userId
          creationDate
          score
          scoreTags
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteGameMutation>response.data.deleteGame;
  }
  async CreateRating(input: CreateRatingInput): Promise<CreateRatingMutation> {
    const statement = `mutation CreateRating($input: CreateRatingInput!) {
        createRating(input: $input) {
          __typename
          id
          userId
          rateId
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
    return <CreateRatingMutation>response.data.createRating;
  }
  async UpdateRating(input: UpdateRatingInput): Promise<UpdateRatingMutation> {
    const statement = `mutation UpdateRating($input: UpdateRatingInput!) {
        updateRating(input: $input) {
          __typename
          id
          userId
          rateId
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
    return <UpdateRatingMutation>response.data.updateRating;
  }
  async DeleteRating(input: DeleteRatingInput): Promise<DeleteRatingMutation> {
    const statement = `mutation DeleteRating($input: DeleteRatingInput!) {
        deleteRating(input: $input) {
          __typename
          id
          userId
          rateId
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
    return <DeleteRatingMutation>response.data.deleteRating;
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
  async GetGame(id: string, creationDate: string): Promise<GetGameQuery> {
    const statement = `query GetGame($id: ID!, $creationDate: AWSDateTime!) {
        getGame(id: $id, creationDate: $creationDate) {
          __typename
          id
          name
          pattern
          generations
          sizeX
          sizeY
          description
          ruleSetId
          userId
          creationDate
          score
          scoreTags
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
      creationDate
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetGameQuery>response.data.getGame;
  }
  async ListGames(
    filter?: TableGameFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListGamesQuery> {
    const statement = `query ListGames($filter: TableGameFilterInput, $limit: Int, $nextToken: String) {
        listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            pattern
            generations
            sizeX
            sizeY
            description
            ruleSetId
            userId
            creationDate
            score
            scoreTags
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
    return <ListGamesQuery>response.data.listGames;
  }
  async GetRating(id: string, userId: string): Promise<GetRatingQuery> {
    const statement = `query GetRating($id: ID!, $userId: String!) {
        getRating(id: $id, userId: $userId) {
          __typename
          id
          userId
          rateId
          comment
          rating
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
      userId
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetRatingQuery>response.data.getRating;
  }
  async ListRatings(
    filter?: TableRatingFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListRatingsQuery> {
    const statement = `query ListRatings($filter: TableRatingFilterInput, $limit: Int, $nextToken: String) {
        listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            userId
            rateId
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
    return <ListRatingsQuery>response.data.listRatings;
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

  OnCreateGameListener: Observable<
    SubscriptionResponse<OnCreateGameSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateGame($id: ID, $name: String, $pattern: String, $generations: Int, $sizeX: Int) {
        onCreateGame(id: $id, name: $name, pattern: $pattern, generations: $generations, sizeX: $sizeX) {
          __typename
          id
          name
          pattern
          generations
          sizeX
          sizeY
          description
          ruleSetId
          userId
          creationDate
          score
          scoreTags
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateGameSubscription>>;

  OnUpdateGameListener: Observable<
    SubscriptionResponse<OnUpdateGameSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateGame($id: ID, $name: String, $pattern: String, $generations: Int, $sizeX: Int) {
        onUpdateGame(id: $id, name: $name, pattern: $pattern, generations: $generations, sizeX: $sizeX) {
          __typename
          id
          name
          pattern
          generations
          sizeX
          sizeY
          description
          ruleSetId
          userId
          creationDate
          score
          scoreTags
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateGameSubscription>>;

  OnDeleteGameListener: Observable<
    SubscriptionResponse<OnDeleteGameSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteGame($id: ID, $name: String, $pattern: String, $generations: Int, $sizeX: Int) {
        onDeleteGame(id: $id, name: $name, pattern: $pattern, generations: $generations, sizeX: $sizeX) {
          __typename
          id
          name
          pattern
          generations
          sizeX
          sizeY
          description
          ruleSetId
          userId
          creationDate
          score
          scoreTags
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteGameSubscription>>;

  OnCreateRatingListener: Observable<
    SubscriptionResponse<OnCreateRatingSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateRating($id: ID, $userId: String, $rateId: String, $comment: String, $rating: Int) {
        onCreateRating(id: $id, userId: $userId, rateId: $rateId, comment: $comment, rating: $rating) {
          __typename
          id
          userId
          rateId
          comment
          rating
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateRatingSubscription>>;

  OnUpdateRatingListener: Observable<
    SubscriptionResponse<OnUpdateRatingSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateRating($id: ID, $userId: String, $rateId: String, $comment: String, $rating: Int) {
        onUpdateRating(id: $id, userId: $userId, rateId: $rateId, comment: $comment, rating: $rating) {
          __typename
          id
          userId
          rateId
          comment
          rating
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateRatingSubscription>>;

  OnDeleteRatingListener: Observable<
    SubscriptionResponse<OnDeleteRatingSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteRating($id: ID, $userId: String, $rateId: String, $comment: String, $rating: Int) {
        onDeleteRating(id: $id, userId: $userId, rateId: $rateId, comment: $comment, rating: $rating) {
          __typename
          id
          userId
          rateId
          comment
          rating
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteRatingSubscription>>;
}
