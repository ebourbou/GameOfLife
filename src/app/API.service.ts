/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export type CreateGameInput = {
  description?: string | null;
  generations: number;
  pattern?: string | null;
  sizeX: number;
  sizeY: number;
};

export type CreatePatternInput = {
  author?: string | null;
  description?: string | null;
  heat?: number | null;
  locked?: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type?: string | null;
  year?: number | null;
};

export type CreatePatternRatingInput = {
  comment?: string | null;
  rating?: number | null;
  userId?: string | null;
};

export type CreateUserInput = {
  email?: string | null;
  id: string;
  lastLogin?: string | null;
  role?: string | null;
  username?: string | null;
};

export type DeleteGameInput = {
  id: string;
};

export type DeletePatternInput = {
  id: string;
};

export type DeletePatternRatingInput = {
  id: string;
};

export type DeleteUserInput = {
  id: string;
};

export type UpdateGameInput = {
  description?: string | null;
  generations?: number | null;
  id: string;
  pattern?: string | null;
  sizeX?: number | null;
  sizeY?: number | null;
};

export type UpdatePatternInput = {
  author?: string | null;
  description?: string | null;
  heat?: number | null;
  id: string;
  locked?: boolean | null;
  name?: string | null;
  pattern?: string | null;
  sizeX?: number | null;
  sizeY?: number | null;
  type?: string | null;
  year?: number | null;
};

export type UpdatePatternRatingInput = {
  comment?: string | null;
  id: string;
  rating?: number | null;
};

export type UpdateUserInput = {
  email?: string | null;
  id: string;
  lastLogin?: string | null;
  role?: string | null;
  username?: string | null;
};

export type TableGameFilterInput = {
  description?: TableStringFilterInput | null;
  generations?: TableIntFilterInput | null;
  id?: TableIDFilterInput | null;
  pattern?: TableStringFilterInput | null;
  sizeX?: TableIntFilterInput | null;
  sizeY?: TableIntFilterInput | null;
};

export type TableStringFilterInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
};

export type TableIntFilterInput = {
  between?: Array<number | null> | null;
  contains?: number | null;
  eq?: number | null;
  ge?: number | null;
  gt?: number | null;
  le?: number | null;
  lt?: number | null;
  ne?: number | null;
  notContains?: number | null;
};

export type TableIDFilterInput = {
  beginsWith?: string | null;
  between?: Array<string | null> | null;
  contains?: string | null;
  eq?: string | null;
  ge?: string | null;
  gt?: string | null;
  le?: string | null;
  lt?: string | null;
  ne?: string | null;
  notContains?: string | null;
};

export type TablePatternRatingFilterInput = {
  comment?: TableStringFilterInput | null;
  id?: TableIDFilterInput | null;
  patternId?: TableStringFilterInput | null;
  rating?: TableIntFilterInput | null;
  userId?: TableStringFilterInput | null;
};

export type TablePatternFilterInput = {
  author?: TableStringFilterInput | null;
  description?: TableStringFilterInput | null;
  heat?: TableIntFilterInput | null;
  id?: TableIDFilterInput | null;
  name?: TableStringFilterInput | null;
  pattern?: TableStringFilterInput | null;
  sizeX?: TableIntFilterInput | null;
  sizeY?: TableIntFilterInput | null;
  type?: TableStringFilterInput | null;
  year?: TableIntFilterInput | null;
};

export type TableUserFilterInput = {
  email?: TableStringFilterInput | null;
  id?: TableIDFilterInput | null;
  lastLogin?: TableStringFilterInput | null;
  role?: TableStringFilterInput | null;
  username?: TableStringFilterInput | null;
};

export type CreateGameMutation = {
  __typename: "Game";
  description: string | null;
  generations: number;
  id: string;
  pattern: string | null;
  sizeX: number;
  sizeY: number;
};

export type CreatePatternMutation = {
  __typename: "Pattern";
  author: string | null;
  description: string | null;
  heat: number | null;
  id: string;
  locked: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type: string | null;
  year: number | null;
};

export type CreatePatternRatingMutation = {
  __typename: "PatternRating";
  comment: string | null;
  id: string;
  rating: number | null;
  userId: string | null;
};

export type CreateUserMutation = {
  __typename: "User";
  email: string | null;
  id: string;
  lastLogin: string | null;
  role: string | null;
  username: string | null;
};

export type DeleteGameMutation = {
  __typename: "Game";
  description: string | null;
  generations: number;
  id: string;
  pattern: string | null;
  sizeX: number;
  sizeY: number;
};

export type DeletePatternMutation = {
  __typename: "Pattern";
  author: string | null;
  description: string | null;
  heat: number | null;
  id: string;
  locked: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type: string | null;
  year: number | null;
};

export type DeletePatternRatingMutation = {
  __typename: "PatternRating";
  comment: string | null;
  id: string;
  rating: number | null;
  userId: string | null;
};

export type DeleteUserMutation = {
  __typename: "User";
  email: string | null;
  id: string;
  lastLogin: string | null;
  role: string | null;
  username: string | null;
};

export type UpdateGameMutation = {
  __typename: "Game";
  description: string | null;
  generations: number;
  id: string;
  pattern: string | null;
  sizeX: number;
  sizeY: number;
};

export type UpdatePatternMutation = {
  __typename: "Pattern";
  author: string | null;
  description: string | null;
  heat: number | null;
  id: string;
  locked: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type: string | null;
  year: number | null;
};

export type UpdatePatternRatingMutation = {
  __typename: "PatternRating";
  comment: string | null;
  id: string;
  rating: number | null;
  userId: string | null;
};

export type UpdateUserMutation = {
  __typename: "User";
  email: string | null;
  id: string;
  lastLogin: string | null;
  role: string | null;
  username: string | null;
};

export type GetGameQuery = {
  __typename: "Game";
  description: string | null;
  generations: number;
  id: string;
  pattern: string | null;
  sizeX: number;
  sizeY: number;
};

export type GetPatternQuery = {
  __typename: "Pattern";
  author: string | null;
  description: string | null;
  heat: number | null;
  id: string;
  locked: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type: string | null;
  year: number | null;
};

export type GetPatternRatingQuery = {
  __typename: "PatternRating";
  comment: string | null;
  id: string;
  rating: number | null;
  userId: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  email: string | null;
  id: string;
  lastLogin: string | null;
  role: string | null;
  username: string | null;
};

export type ListGamesQuery = {
  __typename: "GameConnection";
  items: Array<{
    __typename: "Game";
    description: string | null;
    generations: number;
    id: string;
    pattern: string | null;
    sizeX: number;
    sizeY: number;
  } | null> | null;
  nextToken: string | null;
};

export type ListPatternRatingsQuery = {
  __typename: "PatternRatingConnection";
  items: Array<{
    __typename: "PatternRating";
    comment: string | null;
    id: string;
    rating: number | null;
    userId: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type ListPatternsQuery = {
  __typename: "PatternConnection";
  items: Array<{
    __typename: "Pattern";
    author: string | null;
    description: string | null;
    heat: number | null;
    id: string;
    locked: boolean | null;
    name: string;
    pattern: string;
    sizeX: number;
    sizeY: number;
    type: string | null;
    year: number | null;
  } | null> | null;
  nextToken: string | null;
};

export type ListUsersQuery = {
  __typename: "UserConnection";
  items: Array<{
    __typename: "User";
    email: string | null;
    id: string;
    lastLogin: string | null;
    role: string | null;
    username: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateGameSubscription = {
  __typename: "Game";
  description: string | null;
  generations: number;
  id: string;
  pattern: string | null;
  sizeX: number;
  sizeY: number;
};

export type OnCreatePatternSubscription = {
  __typename: "Pattern";
  author: string | null;
  description: string | null;
  heat: number | null;
  id: string;
  locked: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type: string | null;
  year: number | null;
};

export type OnCreatePatternRatingSubscription = {
  __typename: "PatternRating";
  comment: string | null;
  id: string;
  rating: number | null;
  userId: string | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  email: string | null;
  id: string;
  lastLogin: string | null;
  role: string | null;
  username: string | null;
};

export type OnDeleteGameSubscription = {
  __typename: "Game";
  description: string | null;
  generations: number;
  id: string;
  pattern: string | null;
  sizeX: number;
  sizeY: number;
};

export type OnDeletePatternSubscription = {
  __typename: "Pattern";
  author: string | null;
  description: string | null;
  heat: number | null;
  id: string;
  locked: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type: string | null;
  year: number | null;
};

export type OnDeletePatternRatingSubscription = {
  __typename: "PatternRating";
  comment: string | null;
  id: string;
  rating: number | null;
  userId: string | null;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  email: string | null;
  id: string;
  lastLogin: string | null;
  role: string | null;
  username: string | null;
};

export type OnUpdateGameSubscription = {
  __typename: "Game";
  description: string | null;
  generations: number;
  id: string;
  pattern: string | null;
  sizeX: number;
  sizeY: number;
};

export type OnUpdatePatternSubscription = {
  __typename: "Pattern";
  author: string | null;
  description: string | null;
  heat: number | null;
  id: string;
  locked: boolean | null;
  name: string;
  pattern: string;
  sizeX: number;
  sizeY: number;
  type: string | null;
  year: number | null;
};

export type OnUpdatePatternRatingSubscription = {
  __typename: "PatternRating";
  comment: string | null;
  id: string;
  rating: number | null;
  userId: string | null;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  email: string | null;
  id: string;
  lastLogin: string | null;
  role: string | null;
  username: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateGame(input: CreateGameInput): Promise<CreateGameMutation> {
    const statement = `mutation CreateGame($input: CreateGameInput!) {
        createGame(input: $input) {
          __typename
          description
          generations
          id
          pattern
          sizeX
          sizeY
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
  async CreatePattern(
    input: CreatePatternInput
  ): Promise<CreatePatternMutation> {
    const statement = `mutation CreatePattern($input: CreatePatternInput!) {
        createPattern(input: $input) {
          __typename
          author
          description
          heat
          id
          locked
          name
          pattern
          sizeX
          sizeY
          type
          year
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
  async CreatePatternRating(
    input: CreatePatternRatingInput
  ): Promise<CreatePatternRatingMutation> {
    const statement = `mutation CreatePatternRating($input: CreatePatternRatingInput!) {
        createPatternRating(input: $input) {
          __typename
          comment
          id
          rating
          userId
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
  async CreateUser(input: CreateUserInput): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          __typename
          email
          id
          lastLogin
          role
          username
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
  async DeleteGame(input: DeleteGameInput): Promise<DeleteGameMutation> {
    const statement = `mutation DeleteGame($input: DeleteGameInput!) {
        deleteGame(input: $input) {
          __typename
          description
          generations
          id
          pattern
          sizeX
          sizeY
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
  async DeletePattern(
    input: DeletePatternInput
  ): Promise<DeletePatternMutation> {
    const statement = `mutation DeletePattern($input: DeletePatternInput!) {
        deletePattern(input: $input) {
          __typename
          author
          description
          heat
          id
          locked
          name
          pattern
          sizeX
          sizeY
          type
          year
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
  async DeletePatternRating(
    input: DeletePatternRatingInput
  ): Promise<DeletePatternRatingMutation> {
    const statement = `mutation DeletePatternRating($input: DeletePatternRatingInput!) {
        deletePatternRating(input: $input) {
          __typename
          comment
          id
          rating
          userId
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
  async DeleteUser(input: DeleteUserInput): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!) {
        deleteUser(input: $input) {
          __typename
          email
          id
          lastLogin
          role
          username
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
  async UpdateGame(input: UpdateGameInput): Promise<UpdateGameMutation> {
    const statement = `mutation UpdateGame($input: UpdateGameInput!) {
        updateGame(input: $input) {
          __typename
          description
          generations
          id
          pattern
          sizeX
          sizeY
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
  async UpdatePattern(
    input: UpdatePatternInput
  ): Promise<UpdatePatternMutation> {
    const statement = `mutation UpdatePattern($input: UpdatePatternInput!) {
        updatePattern(input: $input) {
          __typename
          author
          description
          heat
          id
          locked
          name
          pattern
          sizeX
          sizeY
          type
          year
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
  async UpdatePatternRating(
    input: UpdatePatternRatingInput
  ): Promise<UpdatePatternRatingMutation> {
    const statement = `mutation UpdatePatternRating($input: UpdatePatternRatingInput!) {
        updatePatternRating(input: $input) {
          __typename
          comment
          id
          rating
          userId
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
  async UpdateUser(input: UpdateUserInput): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          __typename
          email
          id
          lastLogin
          role
          username
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
  async GetGame(id: string): Promise<GetGameQuery> {
    const statement = `query GetGame($id: ID!) {
        getGame(id: $id) {
          __typename
          description
          generations
          id
          pattern
          sizeX
          sizeY
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetGameQuery>response.data.getGame;
  }
  async GetPattern(id: string): Promise<GetPatternQuery> {
    const statement = `query GetPattern($id: ID!) {
        getPattern(id: $id) {
          __typename
          author
          description
          heat
          id
          locked
          name
          pattern
          sizeX
          sizeY
          type
          year
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
  async GetPatternRating(id: string): Promise<GetPatternRatingQuery> {
    const statement = `query GetPatternRating($id: ID!) {
        getPatternRating(id: $id) {
          __typename
          comment
          id
          rating
          userId
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
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          email
          id
          lastLogin
          role
          username
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
            description
            generations
            id
            pattern
            sizeX
            sizeY
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
            comment
            id
            rating
            userId
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
            author
            description
            heat
            id
            locked
            name
            pattern
            sizeX
            sizeY
            type
            year
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
            email
            id
            lastLogin
            role
            username
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
  OnCreateGameListener: Observable<OnCreateGameSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateGame($generations: Int, $id: ID, $pattern: String, $sizeX: Int, $sizeY: Int) {
        onCreateGame(generations: $generations, id: $id, pattern: $pattern, sizeX: $sizeX, sizeY: $sizeY) {
          __typename
          description
          generations
          id
          pattern
          sizeX
          sizeY
        }
      }`
    )
  ) as Observable<OnCreateGameSubscription>;

  OnCreatePatternListener: Observable<
    OnCreatePatternSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePattern($author: String, $description: String, $id: ID, $sizeX: Int, $sizeY: Int) {
        onCreatePattern(author: $author, description: $description, id: $id, sizeX: $sizeX, sizeY: $sizeY) {
          __typename
          author
          description
          heat
          id
          locked
          name
          pattern
          sizeX
          sizeY
          type
          year
        }
      }`
    )
  ) as Observable<OnCreatePatternSubscription>;

  OnCreatePatternRatingListener: Observable<
    OnCreatePatternRatingSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePatternRating($comment: String, $id: ID, $rating: Int) {
        onCreatePatternRating(comment: $comment, id: $id, rating: $rating) {
          __typename
          comment
          id
          rating
          userId
        }
      }`
    )
  ) as Observable<OnCreatePatternRatingSubscription>;

  OnCreateUserListener: Observable<OnCreateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser($email: AWSEmail, $id: ID, $lastLogin: AWSDateTime, $role: String, $username: String) {
        onCreateUser(email: $email, id: $id, lastLogin: $lastLogin, role: $role, username: $username) {
          __typename
          email
          id
          lastLogin
          role
          username
        }
      }`
    )
  ) as Observable<OnCreateUserSubscription>;

  OnDeleteGameListener: Observable<OnDeleteGameSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteGame($generations: Int, $id: ID, $pattern: String, $sizeX: Int, $sizeY: Int) {
        onDeleteGame(generations: $generations, id: $id, pattern: $pattern, sizeX: $sizeX, sizeY: $sizeY) {
          __typename
          description
          generations
          id
          pattern
          sizeX
          sizeY
        }
      }`
    )
  ) as Observable<OnDeleteGameSubscription>;

  OnDeletePatternListener: Observable<
    OnDeletePatternSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePattern($author: String, $description: String, $id: ID, $sizeX: Int, $sizeY: Int) {
        onDeletePattern(author: $author, description: $description, id: $id, sizeX: $sizeX, sizeY: $sizeY) {
          __typename
          author
          description
          heat
          id
          locked
          name
          pattern
          sizeX
          sizeY
          type
          year
        }
      }`
    )
  ) as Observable<OnDeletePatternSubscription>;

  OnDeletePatternRatingListener: Observable<
    OnDeletePatternRatingSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePatternRating($comment: String, $id: ID, $rating: Int) {
        onDeletePatternRating(comment: $comment, id: $id, rating: $rating) {
          __typename
          comment
          id
          rating
          userId
        }
      }`
    )
  ) as Observable<OnDeletePatternRatingSubscription>;

  OnDeleteUserListener: Observable<OnDeleteUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser($email: AWSEmail, $id: ID, $lastLogin: AWSDateTime, $role: String, $username: String) {
        onDeleteUser(email: $email, id: $id, lastLogin: $lastLogin, role: $role, username: $username) {
          __typename
          email
          id
          lastLogin
          role
          username
        }
      }`
    )
  ) as Observable<OnDeleteUserSubscription>;

  OnUpdateGameListener: Observable<OnUpdateGameSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateGame($generations: Int, $id: ID, $pattern: String, $sizeX: Int, $sizeY: Int) {
        onUpdateGame(generations: $generations, id: $id, pattern: $pattern, sizeX: $sizeX, sizeY: $sizeY) {
          __typename
          description
          generations
          id
          pattern
          sizeX
          sizeY
        }
      }`
    )
  ) as Observable<OnUpdateGameSubscription>;

  OnUpdatePatternListener: Observable<
    OnUpdatePatternSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePattern($author: String, $description: String, $id: ID, $sizeX: Int, $sizeY: Int) {
        onUpdatePattern(author: $author, description: $description, id: $id, sizeX: $sizeX, sizeY: $sizeY) {
          __typename
          author
          description
          heat
          id
          locked
          name
          pattern
          sizeX
          sizeY
          type
          year
        }
      }`
    )
  ) as Observable<OnUpdatePatternSubscription>;

  OnUpdatePatternRatingListener: Observable<
    OnUpdatePatternRatingSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePatternRating($comment: String, $id: ID, $rating: Int) {
        onUpdatePatternRating(comment: $comment, id: $id, rating: $rating) {
          __typename
          comment
          id
          rating
          userId
        }
      }`
    )
  ) as Observable<OnUpdatePatternRatingSubscription>;

  OnUpdateUserListener: Observable<OnUpdateUserSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser($email: AWSEmail, $id: ID, $lastLogin: AWSDateTime, $role: String, $username: String) {
        onUpdateUser(email: $email, id: $id, lastLogin: $lastLogin, role: $role, username: $username) {
          __typename
          email
          id
          lastLogin
          role
          username
        }
      }`
    )
  ) as Observable<OnUpdateUserSubscription>;
}
