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

@Injectable({
  providedIn: "root"
})
export class APIService {
  async createPattern(
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
  async updatePattern(
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
  async deletePattern(
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
  async getPattern(Id: string): Promise<GetPatternQuery> {
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
  async listPatterns(
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
}
